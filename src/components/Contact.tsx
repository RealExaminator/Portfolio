import { Github, Linkedin, Mail } from 'lucide-react';
import { EMAIL, useCopyEmail } from '../copyEmail';

const links = [
  {
    href: `mailto:${EMAIL}`,
    label: 'Email',
    value: EMAIL,
    icon: Mail,
  },
  {
    href: 'https://www.linkedin.com/in/ikenna-ihetu/',
    label: 'LinkedIn',
    value: 'Ikenna Ihetu',
    icon: Linkedin,
    external: true,
  },
  {
    href: 'https://github.com/RealExaminator',
    label: 'GitHub',
    value: 'RealExaminator',
    icon: Github,
    external: true,
  },
];

export default function Contact() {
  const email = useCopyEmail();

  return (
    <section id="contact" className="bg-[#14110f] text-[#f6f3ee]">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">05 — Contact</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="font-['Outfit'] text-4xl font-semibold tracking-tight sm:text-5xl">
            If a role fits, write to me.
          </h2>
          <p className="max-w-md text-stone-400">
            I am interested in IT service management, application support, and software development. The email goes straight to me.
          </p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => {
            const Icon = link.icon;
            const className = 'group flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-5 text-left ring-1 ring-white/10 transition-colors hover:bg-[#c2410c] hover:ring-[#c2410c]';
            const body = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.14em] text-stone-400 group-hover:text-orange-100">{link.label}</span>
                  <span className="mt-1 block break-words font-semibold" aria-live={link.label === 'Email' ? 'polite' : undefined}>
                    {link.label === 'Email' ? email.label : link.value}
                  </span>
                </span>
              </>
            );
            if (link.label === 'Email') {
              return (
                <button key={link.label} type="button" onClick={email.copy} className={className}>
                  {body}
                </button>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {body}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
