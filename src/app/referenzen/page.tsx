import type { Metadata } from 'next';
import { LocalNav } from '@/components/local-nav';
import { ProjectGallery } from '@/components/project-gallery';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Referenzen',
  description:
    'Ausgeführte Projekte in Berlin, Potsdam und Brandenburg: Trockenbau, Fliesen, Maler, Innenausbau, Sanierung und Boden.',
};

export default function ReferenzenPage() {
  return (
    <>
      <LocalNav title="Referenzen" href="/referenzen" />
      <PageHero
        title={
          <>
            Projekte, die wir
            <br className="hidden sm:block" /> <span className="text-gradient">vorzeigen dürfen.</span>
          </>
        }
        lede="Zu jedem Projekt steht dabei, was daran schwierig war."
      />
      <section className="bg-canvas py-16 sm:py-20">
        <div className="container-page">
          <ProjectGallery />
        </div>
      </section>
    </>
  );
}
