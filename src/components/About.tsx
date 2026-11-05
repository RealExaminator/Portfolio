const languages = [
  ['Swedish', 'Native'],
  ['Finnish', 'Excellent · full professional'],
  ['English', 'Excellent · full professional'],
  ['German', 'Good'],
];

export default function About() {
  return (
    <section id="about" className="bg-[#1c1917] text-[#f6f3ee]">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">02 — About</p>
            <h2 className="mt-4 font-['Outfit'] text-4xl font-semibold tracking-tight sm:text-5xl">
              Software, support, and systems that hold up.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-stone-300">
            <p>
              I have a strong technical base and a clear interest in IT service management and application support. I pick up new systems quickly and stay organised when the work is under pressure.
            </p>
            <p>
              Swedish is my native language. I work fluently in Finnish and English, and I am comfortable in collaborative and user-facing situations.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/15 pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">Languages</p>
          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-4">
            {languages.map(([language, level]) => (
              <div key={language} className="bg-[#1c1917] px-5 py-5">
                <dt className="font-['Outfit'] text-xl font-semibold">{language}</dt>
                <dd className="mt-1 text-sm text-stone-400">{level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
