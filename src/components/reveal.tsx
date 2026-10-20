'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Blendet Elemente mit `data-reveal` ein, sobald sie ins Bild kommen.
 *
 * Markiert wird über ein data-Attribut statt über eine Klasse, weil React
 * `className` bei jedem Rendern neu setzt und die Markierung sonst verloren
 * ginge. Nach einem Seitenwechsel und für nachgeladene Elemente meldet sich
 * der MutationObserver.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__revealReady = true;
    const root = document.documentElement;
    if (!root.classList.contains('js-reveal')) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = '';
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );

    const observeAll = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>('[data-reveal]:not([data-shown])').forEach((el) => io.observe(el));
    };
    observeAll(document);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('[data-reveal]:not([data-shown])')) io.observe(node);
          observeAll(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
