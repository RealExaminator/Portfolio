import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Github, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { publicUrl } from '../publicUrl';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  imageAlt: string;
  frame?: 'phone' | 'document';
  cover?: string;
  tags: string[];
  github?: string;
}

const projects: Project[] = [
  {
    id: 'webshop',
    title: 'WebShop',
    category: 'React and Django',
    description: 'A full-stack web application with React on the front and Django on the server.',
    longDescription: 'I developed the application in React and Django. It uses REST APIs, client-server data flow, and database logic, and I debugged it end to end. The source is public.',
    images: [publicUrl('assets/webshop-browse.png')],
    imageAlt: 'WebShop catalog, with product photos, search, and prices',
    tags: ['React', 'Django', 'JavaScript', 'Python'],
    github: 'https://github.com/RealExaminator/Webshop',
  },
  {
    id: 'studyplanner',
    title: 'Study Planner',
    category: 'Mobile application',
    description: 'A mobile application from a software project, built around application logic and a usable interface.',
    longDescription: 'I designed and implemented the app as part of a practical software engineering project. The work focused on application logic, modular interface pieces, and usability.',
    images: [
      publicUrl('assets/aistudio/Studyplanner1_48d80712.jpg'),
      publicUrl('assets/aistudio/Studyplanner2_bb0325ed.jpg'),
    ],
    imageAlt: 'Study Planner profile screen on a phone',
    frame: 'phone',
    tags: ['Mobile', 'Application logic', 'UI'],
  },
  {
    id: 'thesis',
    title: "Bachelor's thesis",
    category: 'Machine learning',
    description: 'How gameplay data from Teamfight Tactics can be turned into strategic recommendations.',
    longDescription: 'The bachelor’s thesis, written at Åbo Akademi, treats Teamfight Tactics match data as a strategy problem. I processed the data in Python and used machine learning to look for patterns a player could act on.',
    images: [publicUrl('assets/tft-strategy-mock.jpg')],
    imageAlt: 'Abstract hex board used as a stand-in for the Teamfight Tactics thesis',
    cover: 'Teamfight Tactics',
    tags: ['Python', 'Machine learning', 'Data analysis'],
  },
];

function Cover({ project }: { project: Project }) {
  if (project.frame === 'phone' && project.images[0]) {
    return (
      <div className="flex h-full min-h-[22rem] justify-center overflow-hidden bg-[#f7f4ef] px-8 pt-8">
        <img
          src={project.images[0]}
          alt={project.imageAlt}
          className="h-[30rem] w-auto rounded-[1.6rem] shadow-[0_24px_40px_-28px_rgba(28,25,23,0.35)] ring-1 ring-black/5"
        />
      </div>
    );
  }
  if (project.frame === 'document' && project.images[0]) {
    return (
      <div className="flex h-full min-h-[24rem] items-center justify-center bg-[#f3eee6] p-8 sm:p-12">
        <img
          src={project.images[0]}
          alt={project.imageAlt}
          className="max-h-[28rem] w-auto max-w-full bg-white shadow-[0_24px_50px_-28px_rgba(28,25,23,0.55)]"
        />
      </div>
    );
  }
  if (project.images[0]) {
    return (
      <img src={project.images[0]} alt={project.imageAlt} className="h-full w-full object-cover object-top" />
    );
  }
  return (
    <div className="flex h-full min-h-56 flex-col justify-between bg-[#1c1917] p-8 text-[#f6f3ee]">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">Åbo Akademi · 2026</span>
      <div>
        <p className="font-['Outfit'] text-3xl font-semibold">{project.cover}</p>
        <p className="mt-2 text-sm text-stone-400">Bachelor's thesis</p>
      </div>
    </div>
  );
}

function modalImageClass(frame?: Project['frame']) {
  if (frame === 'phone') return 'mx-auto h-[28rem] w-auto rounded-[1.4rem] border border-[#e7e0d6]';
  if (frame === 'document') return 'mx-auto max-h-[68vh] w-auto bg-white shadow-[0_18px_40px_-24px_rgba(28,25,23,0.45)]';
  return 'w-full rounded-2xl border border-[#e7e0d6]';
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="work" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <div className="flex flex-col gap-6 border-b border-[#e7e0d6] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c2410c]">01 — Selected work</p>
            <h2 className="mt-4 max-w-xl font-['Outfit'] text-4xl font-semibold tracking-tight sm:text-5xl">
              Three projects worth opening.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-stone-500">
            A full-stack shop, a mobile app, and the bachelor’s thesis.
          </p>
        </div>

        <div className="mt-12 grid gap-14">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="grid overflow-hidden rounded-[1.75rem] border border-[#e7e0d6] bg-[#f7f4ef] text-left shadow-[0_20px_50px_-36px_rgba(28,25,23,0.45)] md:grid-cols-2"
            >
              <div className={`h-full min-h-64 ${index % 2 ? 'md:order-2' : ''}`}>
                <Cover project={project} />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="font-['Outfit'] text-sm font-semibold tracking-[0.18em] text-stone-400">
                  0{index + 1}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{project.category}</p>
                <h3 className="mt-3 font-['Outfit'] text-3xl font-semibold">{project.title}</h3>
                <p className="mt-4 max-w-md text-stone-600">{project.description}</p>
                <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#1c1917] px-4 py-2 text-sm font-semibold">
                  Open the project
                  <ArrowRight size={15} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-[#1c1917]/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.5rem] bg-[#f6f3ee] p-6 shadow-2xl sm:p-10"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="sticky top-2 z-10 float-right rounded-full bg-white p-2 shadow-sm"
                aria-label="Close project"
              >
                <X size={18} />
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{selected.category}</p>
              <h2 id="project-title" className="mt-3 font-['Outfit'] text-4xl font-semibold">{selected.title}</h2>
              <p className="mt-4 max-w-2xl text-stone-600">{selected.longDescription}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-sm">{tag}</span>
                ))}
              </div>
              {selected.github && (
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1c1917] px-5 py-3 text-sm font-semibold text-white"
                >
                  <Github size={16} /> View source
                </a>
              )}
              <div className={`mt-8 grid gap-4 ${selected.frame === 'phone' ? 'sm:grid-cols-2' : ''}`}>
                {selected.images.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={selected.imageAlt}
                    className={modalImageClass(selected.frame)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
