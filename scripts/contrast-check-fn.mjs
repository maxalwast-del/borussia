/** Läuft im Browser. Verrechnet Transparenz korrekt, statt halbdurchsichtige
    Farben als deckend zu behandeln. */
export function findLowContrast() {
  const parse = (c) => {
    const n = (c.match(/[\d.]+/g) || []).map(Number);
    return { r: n[0] || 0, g: n[1] || 0, b: n[2] || 0, a: n.length > 3 ? n[3] : 1 };
  };
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const effectiveBg = (el) => {
    const layers = [];
    let n = el;
    while (n && n.nodeType === 1) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c.a > 0) layers.push(c);
      n = n.parentElement;
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return base;
  };
  const bad = [];
  for (const el of document.querySelectorAll('body *')) {
    const txt = (el.textContent || '').trim();
    if (!txt || el.children.length > 0) continue;
    const st = getComputedStyle(el);
    if (st.display === 'none' || st.visibility === 'hidden' || Number(st.opacity) === 0) continue;
    const bg = effectiveBg(el);
    const fg = over(parse(st.color), bg);
    const l1 = lum(fg), l2 = lum(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(st.fontSize);
    const large = size >= 24 || (Number(st.fontWeight) >= 700 && size >= 18.66);
    const needed = large ? 3 : 4.5;
    if (ratio < needed) bad.push({ txt: txt.slice(0, 26), ratio: Number(ratio.toFixed(2)), needed });
  }
  return bad;
}
