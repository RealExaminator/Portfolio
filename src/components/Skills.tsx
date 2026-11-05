const groups = [
  {
    title: 'Programming',
    note: 'Scripting and application code.',
    accent: 'bg-[#c2410c]',
    skills: ['Python', 'Java', 'JavaScript', 'R'],
  },
  {
    title: 'Web and databases',
    note: 'Applications, APIs, and the data behind them.',
    accent: 'bg-[#1c1917]',
    skills: ['React', 'Django', 'REST APIs', 'SQL (basics)'],
  },
  {
    title: 'Platforms and practice',
    note: 'Systems, documentation, and troubleshooting.',
    accent: 'bg-[#a89078]',
    skills: ['Windows', 'Linux (basics)', 'Microsoft Azure (basics)', 'Git', 'Client-server architecture', 'Technical documentation'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-[#efe6da]">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c2410c]">03 — Skills</p>
        <h2 className="mt-4 font-['Outfit'] text-4xl font-semibold tracking-tight sm:text-5xl">What I use</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {groups.map((group) => (
            <article key={group.title} className="flex flex-col rounded-[1.5rem] bg-white p-6 shadow-[0_16px_40px_-32px_rgba(28,25,23,0.5)]">
              <span className={`h-1.5 w-12 rounded-full ${group.accent}`} />
              <h3 className="mt-5 font-['Outfit'] text-2xl font-semibold">{group.title}</h3>
              <p className="mt-2 text-sm text-stone-500">{group.note}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-[#f7f4ef] px-3 py-1.5 text-sm font-medium">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
