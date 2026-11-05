const languages = [
  ['Swedish', 'Native'],
  ['Finnish', 'Excellent'],
  ['English', 'Excellent'],
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
              A builder who cares how it looks and how it works.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-stone-300">
            <p>
              I am a Finnish-Nigerian computer science graduate, currently in the master's programme in information technology at Åbo Akademi.
            </p>
            <p>
              I like turning a rough idea into something a person can click through. That has meant a marketplace with accounts and a cart, a study app for a phone, and a thesis on how game data can suggest a strategy.
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
