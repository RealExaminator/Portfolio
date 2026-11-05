import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { publicUrl } from '../publicUrl';
import { useCopyEmail } from '../copyEmail';

const portrait = publicUrl('assets/aistudio/me_989522cc.PNG');

const facts = [
  ['Studying', 'M.Sc. Information Technology'],
  ['Degree', 'B.Sc. Computer Science'],
  ['Languages', 'Swedish, Finnish, English, German'],
  ['Based in', 'Helsinki, Finland'],
];

export default function Hero() {
  const email = useCopyEmail();

  return (
    <section id="top" className="bg-[#f7f4ef]">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-36">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#c2410c]">
            Technical Solutions Specialist
          </p>
          <h1 className="font-['Outfit'] text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            Ikenna Ihetu
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-600">
            Bachelor of Science in Computer Science, now in the Information Technology master's at Åbo Akademi. I build software and applications, work with client-server systems, and troubleshoot technical problems.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-[#1c1917] px-6 py-3 text-sm font-semibold text-[#f6f3ee] hover:bg-[#c2410c] transition-colors">
              Selected work
              <ArrowRight size={16} />
            </a>
            <button
              type="button"
              onClick={email.copy}
              className="rounded-full border border-stone-300 bg-white/70 px-6 py-3 text-sm font-semibold hover:border-[#1c1917] transition-colors"
              aria-live="polite"
            >
              {email.label}
            </button>
          </div>
          <dl className="mt-14 grid max-w-xl grid-cols-2 overflow-hidden rounded-2xl border border-[#e4d9cc] bg-white/60">
            {facts.map(([label, value], index) => (
              <div
                key={label}
                className={`px-4 py-4 ${index % 2 === 0 ? 'border-r border-[#e4d9cc]' : ''} ${index < 2 ? 'border-b border-[#e4d9cc]' : ''}`}
              >
                <dt className="text-xs uppercase tracking-[0.14em] text-stone-500">{label}</dt>
                <dd className="mt-2 text-sm font-semibold leading-snug">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="overflow-hidden rounded-[2rem] border border-[#e4d9cc] bg-white/50"
        >
          <img
            src={portrait}
            alt="Ikenna Ihetu"
            className="w-full"
          />
          <figcaption className="border-t border-[#e4d9cc] px-5 py-4 text-sm text-stone-600">
            Interested in IT service management and application support.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
