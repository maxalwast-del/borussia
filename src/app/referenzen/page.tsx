import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { ProjectGallery } from '@/components/project-gallery';

export const metadata: Metadata = {
  title: 'Referenzen',
  description:
    'Ausgeführte Trockenbauprojekte in Berlin, Potsdam und Brandenburg: Altbausanierung, Dachausbau, Akustikdecken, Feuchtraum.',
};

export default function ReferenzenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Referenzen"
        title="Projekte, die wir vorzeigen dürfen"
        lede="Jedes Projekt mit dem, was tatsächlich die Schwierigkeit war – nicht nur mit schönen Bildern."
      />
      <section className="container-page py-16">
        <ProjectGallery />
      </section>
    </>
  );
}
