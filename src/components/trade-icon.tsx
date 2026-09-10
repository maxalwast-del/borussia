import type { TradeId } from '@/config/site';

/**
 * Symbole für die sechs Gewerke, angelehnt an die Icon-Reihe des
 * Firmenschilds: Kelle, Fliesen, Rolle, Haus, Mauerwerk, Dielen.
 */
const PATHS: Record<TradeId, React.ReactNode> = {
  // Ständerwerk mit Beplankung, angelehnt an das Fenstermotiv des Logos
  trockenbau: <path d="M2.5 3h8.2v7.2H2.5zM13.3 3h8.2v7.2h-8.2zM2.5 12.8h5.2V21H2.5zM10.3 12.8h11.2V21H10.3z" />,
  // Drei Fliesen auf der Spitze
  fliesen: <path d="m12 2 4.6 4.6L12 11.2 7.4 6.6 12 2ZM5.6 9.4l4.6 4.6-4.6 4.6L1 14l4.6-4.6ZM18.4 9.4 23 14l-4.6 4.6L13.8 14l4.6-4.6Z" />,
  // Malerrolle mit Bügel und Griff
  maler: (
    <>
      <rect x="2.6" y="3.4" width="12.4" height="5.4" rx="1.2" />
      <rect x="15" y="5.3" width="4.6" height="1.6" />
      <rect x="18" y="5.3" width="1.6" height="6.2" />
      <rect x="11.8" y="9.9" width="7.8" height="1.6" />
      <rect x="10.5" y="11.5" width="3" height="9.1" rx="1.4" />
    </>
  ),
  // Haus mit Giebel
  innenausbau: <path d="M12 2.4 1.6 10.9l1.5 1.9L4.8 11.4V21.6h5.4v-5.9h3.6v5.9h5.4V11.4l1.7 1.4 1.5-1.9L12 2.4Z" />,
  // Mauerwerk im Verband
  sanierung: <path d="M2 4.2h6.6v4H2zM10 4.2h12v4H10zM2 9.6h12v4H2zM15.4 9.6H22v4h-6.6zM2 15h6.6v4H2zM10 15h12v4H10z" />,
  // Dielen
  boden: <path d="M2.4 3.6h5.6v16.8H2.4zM9.4 3.6H15v16.8H9.4zM16.4 3.6H22v16.8h-5.6Z" />,
};

export function TradeIcon({ id, className = '' }: { id: TradeId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      {PATHS[id]}
    </svg>
  );
}
