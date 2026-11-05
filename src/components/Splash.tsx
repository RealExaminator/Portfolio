import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { publicUrl } from '../publicUrl';

export default function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
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
      <div className="flex w-full max-w-xs flex-col items-center px-6 text-center">
        <img
          src={publicUrl('favicon.png')}
          alt=""
          className="h-24 w-24"
        />
        <p className="mt-6 font-['Outfit'] text-3xl font-semibold tracking-tight">Ikenna Ihetu</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
          Computer science · Helsinki
        </p>
        <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-[#e7e0d6]">
          <motion.div
            className="h-full w-full origin-left rounded-full bg-[#1c1917]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: leaving ? 1 : 0.92 }}
            transition={{ duration: leaving ? 0.25 : 1.15, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
