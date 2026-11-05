import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1c1917] font-['Plus_Jakarta_Sans']">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#c2410c] origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
