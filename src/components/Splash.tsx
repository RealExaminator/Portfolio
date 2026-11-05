import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minimum = new Promise((resolve) => window.setTimeout(resolve, reduced ? 250 : 1200));
    const ready =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener('load', () => resolve(undefined), { once: true }));

    let fadeTimer = 0;
    let cancelled = false;
    Promise.all([minimum, ready]).then(() => {
      if (cancelled) return;
      setLeaving(true);
      fadeTimer = window.setTimeout(() => onDoneRef.current(), reduced ? 0 : 550);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#f7f4ef]"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex w-full max-w-xs origin-center scale-[1.7] flex-col items-center px-6 text-center sm:scale-[2.75]">
        <p className="font-['Outfit'] text-3xl font-semibold tracking-tight">Ikenna Ihetu</p>
        <p className="relative mt-3 font-['Outfit'] text-sm font-semibold tracking-[0.14em] text-[#d6cfc4]">
          <span aria-hidden>IT Solutions</span>
          <motion.span
            className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-[#1c1917]"
            initial={{ width: reduced ? '100%' : '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: reduced ? 0 : 1.2, ease: 'easeInOut' }}
          >
            IT Solutions
          </motion.span>
        </p>
      </div>
    </motion.div>
  );
}
