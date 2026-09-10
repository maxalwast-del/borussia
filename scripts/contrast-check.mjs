/**
 * Sucht Text, dessen Kontrast zum Hintergrund unter WCAG AA liegt.
 *
 *   node scripts/contrast-check.mjs demo               # die Demo-Datei
 *   node scripts/contrast-check.mjs http://localhost:3000
 *
 * Geprüft wird im Dunkelmodus des Betrachters, weil dort die Fehler
 * auftreten, die im Hellmodus unsichtbar bleiben: Bedienelemente ohne
 * eigene Textfarbe fallen dann auf Weiß.
 *
 * CHROMIUM_PATH setzen, falls Playwright den Browser nicht selbst findet.
 */
import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { findLowContrast } from './contrast-check-fn.mjs';

const mode = process.argv[2];
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const ctx = await b.newContext({ viewport: { width: 1440, height: 1500 }, locale: 'de-DE', colorScheme: 'dark' });
const p = await ctx.newPage();

if (mode === 'demo') {
  const body = readFileSync(new URL('../demo/borussia-demo.html', import.meta.url), 'utf8');
  await p.setContent(`<!doctype html><html lang="de" data-theme="dark"><head><meta charset="utf-8">
    <style>:root{color-scheme:light dark}body{margin:0;font:14px system-ui}[hidden]{display:none!important}</style>
    </head><body>${body}</body></html>`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(900);
  for (const page of ['start','leistungen','referenzen','ablauf','termin','jobs','kontakt']) {
    await p.evaluate((id) => document.querySelector(`[data-go="${id}"]`)?.click(), page);
    await p.waitForTimeout(450);
    const bad = await p.evaluate(findLowContrast);
    console.log(page.padEnd(12), bad.length ? JSON.stringify(bad.slice(0, 4)) : 'ok');
  }
  await p.evaluate(() => document.querySelector('[data-go="termin"]')?.click());
  await p.waitForTimeout(500);
  await p.evaluate(() => document.querySelectorAll('.typebtn')[1]?.click());
  await p.waitForTimeout(250);
  await p.evaluate(() => document.querySelector('.slot')?.click());
  await p.waitForTimeout(400);
  const bad = await p.evaluate(findLowContrast);
  console.log('termin gewählt'.padEnd(12), bad.length ? JSON.stringify(bad.slice(0, 4)) : 'ok');
  
} else {
  for (const path of ['/', '/termin', '/leistungen', '/referenzen', '/ablauf', '/jobs', '/kontakt']) {
    await p.goto(mode + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(900);
    const bad = await p.evaluate(findLowContrast);
    console.log(path.padEnd(13), bad.length ? JSON.stringify(bad.slice(0, 4)) : 'ok');
  }
}
await b.close();
