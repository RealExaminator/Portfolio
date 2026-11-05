import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { publicUrl } from '../publicUrl';

const links = [
  {
    href: 'mailto:ikennaihetu40@gmail.com',
    label: 'Email',
    value: 'ikennaihetu40@gmail.com',
    icon: Mail,
  },
  {
    href: 'https://www.linkedin.com/in/ikenna-ihetu/',
    label: 'LinkedIn',
    value: 'ikenna-ihetu',
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
  {
    href: '',
    label: 'File',
    value: 'Download the PDF',
    icon: FileText,
    download: '',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-[#14110f] text-[#f6f3ee]">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">05 — Contact</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="font-['Outfit'] text-4xl font-semibold tracking-tight sm:text-5xl">
            If a role fits, write to me.
          </h2>
          <p className="max-w-md text-stone-400">
            I am looking for frontend and junior product-engineering roles, internships included. The email goes straight to me.
          </p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                download={link.download}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-5 ring-1 ring-white/10 transition-colors hover:bg-[#c2410c] hover:ring-[#c2410c]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.14em] text-stone-400 group-hover:text-orange-100">{link.label}</span>
                  <span className="mt-1 block break-words font-semibold">{link.value}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
