import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const PHRASE = 'IT Solutions';
const COLLAPSE_MS = 200;
const WIPE_MS = 520;

function pageProgress() {
  const images = Array.from(document.images);
  const imagesDone = images.length === 0 || images.every((img) => img.complete);
  const documentDone = document.readyState === 'complete';
  if (documentDone && imagesDone) return 1;

  const documentPart = documentDone ? 1 : document.readyState === 'interactive' ? 0.5 : 0.15;
  const imagePart = images.length === 0 ? 1 : images.filter((img) => img.complete).length / images.length;
  return Math.min(0.97, documentPart * 0.4 + imagePart * 0.6);
}

function binary() {
  return Math.random() < 0.5 ? '0' : '1';
}

function ScrambleLetter({
  char,
  startAt,
  reduced,
  onLock,
}: {
  char: string;
  startAt: number;
  reduced: boolean;
  onLock: () => void;
}) {
  const [shown, setShown] = useState('');
  const locked = useRef(false);

  useEffect(() => {
    if (!Number.isFinite(startAt)) return;
    const delay = Math.max(0, startAt - performance.now());
    let interval = 0;
    const begin = window.setTimeout(() => {
      const finish = (value: string) => {
        setShown(value);
        if (!locked.current) {
          locked.current = true;
          onLock();
        }
      };
      if (char === ' ' || reduced) {
        finish(char === ' ' ? '\u00a0' : char);
        return;
      }
      const frames = [binary(), binary(), binary()];
      let index = 0;
      setShown(frames[0]);
      interval = window.setInterval(() => {
        index += 1;
        if (index >= frames.length) {
          window.clearInterval(interval);
          finish(char);
        } else {
          setShown(frames[index]);
        }
      }, 42);
    }, delay);
    return () => {
      window.clearTimeout(begin);
      window.clearInterval(interval);
    };
  }, [startAt, char, reduced, onLock]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{char === ' ' ? '\u00a0' : char}</span>
      <span className="absolute inset-0">{shown || '\u00a0'}</span>
    </span>
  );
}

export default function Splash({ onDone }: { onDone: () => void }) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const phraseRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const [starts, setStarts] = useState<number[]>(() => PHRASE.split('').map(() => Number.POSITIVE_INFINITY));
  const [allLocked, setAllLocked] = useState(false);
  const [phase, setPhase] = useState<'reveal' | 'collapse' | 'wipe' | 'fade'>('reveal');
  const [lineWidth, setLineWidth] = useState(0);
  const [lineTop, setLineTop] = useState(0);
  const lockedCount = useRef(0);

  const onLock = useCallback(() => {
    lockedCount.current += 1;
    if (lockedCount.current >= PHRASE.length) setAllLocked(true);
  }, []);

  useEffect(() => {
    const started = new Array<boolean>(PHRASE.length).fill(false);
    const startTimes = PHRASE.split('').map(() => Number.POSITIVE_INFINITY);
    let frame = 0;
    let stopped = false;

    const tick = () => {
      if (stopped) return;
      const next = pageProgress();
      setProgress((current) => (Math.abs(current - next) < 0.01 && next < 1 ? current : next));

      let batch = 0;
      let changed = false;
      for (let index = 0; index < PHRASE.length; index += 1) {
        const due = next >= 1 || next > index / PHRASE.length;
        if (due && !started[index]) {
          started[index] = true;
          startTimes[index] = performance.now() + batch * 36;
          batch += 1;
          changed = true;
        }
      }
      if (changed) setStarts([...startTimes]);
      if (next < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    const wake = () => {
      if (stopped) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(tick);
    };
    const images = Array.from(document.images);
    window.addEventListener('load', wake);
    images.forEach((img) => {
      img.addEventListener('load', wake);
      img.addEventListener('error', wake);
    });

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('load', wake);
      images.forEach((img) => {
        img.removeEventListener('load', wake);
        img.removeEventListener('error', wake);
      });
    };
  }, []);

  useEffect(() => {
    if (phase !== 'reveal' || progress < 1 || !allLocked) return;
    if (phraseRef.current) {
      const phrase = phraseRef.current.getBoundingClientRect();
      const splash = phraseRef.current.closest('[role="status"]')?.getBoundingClientRect();
      setLineWidth(phrase.width);
      if (splash) setLineTop(phrase.top - splash.top + phrase.height / 2);
    }
    setPhase(reduced ? 'fade' : 'collapse');
  }, [phase, progress, allLocked, reduced]);

  useEffect(() => {
    if (phase === 'collapse') {
      const timer = window.setTimeout(() => setPhase('wipe'), COLLAPSE_MS);
      return () => window.clearTimeout(timer);
    }
    if (phase === 'wipe') {
      const timer = window.setTimeout(() => onDoneRef.current(), WIPE_MS);
      return () => window.clearTimeout(timer);
    }
    if (phase === 'fade') {
      const timer = window.setTimeout(() => onDoneRef.current(), 280);
      return () => window.clearTimeout(timer);
    }
  }, [phase]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#f7f4ef]"
      initial={{ y: '0%', opacity: 1 }}
      animate={
        phase === 'wipe'
          ? { y: '-100%', opacity: 1 }
          : phase === 'fade'
            ? { y: '0%', opacity: 0 }
            : { y: '0%', opacity: 1 }
      }
      transition={{ duration: phase === 'fade' ? 0.25 : 0.5, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Loading"
    >
      <div className="scale-[1.7] sm:scale-[2.75]">
        <motion.div
          className="flex w-full max-w-xs origin-center flex-col items-center px-6 text-center"
          animate={{ scaleY: phase === 'reveal' || phase === 'fade' ? 1 : 0, opacity: phase === 'reveal' || phase === 'fade' ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.2, ease: [0.4, 0, 1, 1] }}
        >
          <p className="font-['Outfit'] text-3xl font-semibold tracking-tight">Ikenna Ihetu</p>
          <p ref={phraseRef} className="mt-3 font-['Outfit'] text-sm font-semibold tracking-[0.14em] text-[#1c1917]">
            {PHRASE.split('').map((char, index) => (
              <ScrambleLetter
                key={`${char}-${index}`}
                char={char}
                startAt={starts[index]}
                reduced={reduced}
                onLock={onLock}
              />
            ))}
          </p>
        </motion.div>
      </div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 h-px -translate-x-1/2 -translate-y-1/2 bg-[#1c1917]"
        style={{ top: lineTop }}
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: phase === 'collapse' || phase === 'wipe' ? lineWidth : 0,
          opacity: phase === 'collapse' ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: [0.4, 0, 1, 1] }}
      />
    </motion.div>
  );
}
