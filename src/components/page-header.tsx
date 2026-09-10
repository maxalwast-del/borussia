export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="border-b border-navy/10 bg-white/50">
      <div className="container-page py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading-lg mt-4 max-w-3xl">{title}</h1>
        {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
      </div>
    </section>
  );
}
