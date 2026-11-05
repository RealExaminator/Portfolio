import { motion } from 'motion/react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCopyEmail } from '../copyEmail';

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const email = useCopyEmail();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#f7f4ef]/90 backdrop-blur-xl border-b border-[#e7e0d6]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <nav className="flex h-16 items-center justify-between gap-6">
          <a href="#top" className="font-['Outfit'] text-lg font-semibold tracking-tight">
            Ikenna Ihetu
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-[#c2410c] transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a href="https://github.com/RealExaminator" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-[#1c1917]" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/ikenna-ihetu/" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-[#1c1917]" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#contact" className="rounded-full bg-[#1c1917] px-4 py-2 text-sm font-semibold text-[#f6f3ee] hover:bg-[#c2410c] transition-colors">
              Get in touch
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 top-16 border-b border-[#e7e0d6] bg-[#f7f4ef] shadow-[0_24px_40px_-24px_rgba(28,25,23,0.45)] md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
            <button type="button" onClick={email.copy} className="pt-2 text-left text-sm font-semibold text-[#c2410c]" aria-live="polite">
              {email.label}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
