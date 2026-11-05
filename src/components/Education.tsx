const education = [
  {
    period: '2022 – 2027',
    title: 'Computer Science & Information Technology',
    place: 'Åbo Akademi University',
    note: 'B.Sc. in Computer Science, completed. M.Sc. in Information Technology, in progress.',
  },
];

const experience = [
  {
    period: '2026',
    title: 'Terminal worker',
    place: 'FedEx, Turku Airport',
    note: 'Cargo terminal work under tight deadlines. Accurate, independent, and part of the team.',
  },
  {
    period: '—',
    title: 'Warehouse worker',
    place: 'Henkilöstöliiga & Me Group AB',
    note: 'Reliable daily work, with precision and consistent routines.',
  },
  {
    period: '2021',
    title: 'Squad leader',
    place: 'Finnish Defence Forces',
    note: 'Responsibility for the squad’s work, and calm decisions under pressure.',
  },
];

function List({ items, onDark = false }: { items: typeof education; onDark?: boolean }) {
  return (
    <ol className={onDark ? 'border-t border-white/10' : 'border-t border-[#e4d9cc]'}>
      {items.map((item) => (
        <li
          key={item.title}
          className={`grid gap-2 py-6 sm:grid-cols-[8.5rem_1fr] ${onDark ? 'border-b border-white/10' : 'border-b border-[#e4d9cc]'}`}
        >
          <p className={`text-sm ${onDark ? 'text-stone-400' : 'text-stone-500'}`}>{item.period}</p>
          <div>
            <h3 className="font-['Outfit'] text-xl font-semibold">{item.title}</h3>
            <p className={`mt-1 text-sm font-medium ${onDark ? 'text-orange-200' : 'text-[#c2410c]'}`}>{item.place}</p>
            <p className={`mt-2 ${onDark ? 'text-stone-300' : 'text-stone-600'}`}>{item.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Education() {
  return (
    <section id="experience" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c2410c]">04 — Background</p>
        <h2 className="mt-4 font-['Outfit'] text-4xl font-semibold tracking-tight sm:text-5xl">Study and work</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] bg-[#f3eee6] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c2410c]">Education</p>
            <h3 className="mt-3 font-['Outfit'] text-3xl font-semibold">Åbo Akademi</h3>
            <div className="mt-6">
              <List items={education} />
            </div>
          </article>
          <article className="rounded-[1.75rem] bg-[#1c1917] p-7 text-[#f6f3ee] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-200">Experience</p>
            <h3 className="mt-3 font-['Outfit'] text-3xl font-semibold">Work so far</h3>
            <div className="mt-6">
              <List items={experience} onDark />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
