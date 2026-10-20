'use client';

import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/icon';

/**
 * Waagerechte Galerie, die bis an den Fensterrand läuft.
 *
 * Gescrollt wird nativ: Schwung, Abbremsen, Einrasten und das Gummiband am
 * Ende kommen vom Betriebssystem und fühlen sich deshalb überall richtig an.
 * Die runden Knöpfe blättern zusätzlich für Maus und Tastatur.
 */
export function Gallery({
  children,
  label,
  itemClassName = 'w-[300px] sm:w-[372px]',
}: {
  children: React.ReactNode;
  label: string;
  itemClassName?: string;
}) {
  const scroller = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setEdges({ start: node.scrollLeft <= 4, end: node.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    measure();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    node.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [measure]);

  const page = (direction: 1 | -1) => {
    const node = scroller.current;
    if (!node) return;
    const item = node.querySelector('li');
    const step = item ? item.getBoundingClientRect().width + 20 : node.clientWidth * 0.8;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollBy({ left: direction * step, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div role="region" aria-roledescription="Galerie" aria-label={label}>
      <ul ref={scroller} className="scroller gap-5 pb-10 pt-3">
        {Children.map(children, (child) => (
          <li className={`shrink-0 ${itemClassName}`}>{child}</li>
        ))}
        <li aria-hidden="true" className="w-px shrink-0" />
      </ul>
      <div className="container-page -mt-2 flex justify-end gap-3.5">
        <button type="button" className="paddle" onClick={() => page(-1)} disabled={edges.start} aria-label="Zurückblättern">
          <Icon name="chevron-left" className="h-4 w-4" strokeWidth={2.4} />
        </button>
        <button type="button" className="paddle" onClick={() => page(1)} disabled={edges.end} aria-label="Weiterblättern">
          <Icon name="chevron-right" className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
