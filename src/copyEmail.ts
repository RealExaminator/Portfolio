import { useEffect, useRef, useState } from 'react';

export const EMAIL = 'ikennaihetu40@gmail.com';
export const COPIED_LABEL = 'Email copied to clipboard!';

export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const area = document.createElement('textarea');
      area.value = EMAIL;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return { copied, copy, label: copied ? COPIED_LABEL : EMAIL };
}
