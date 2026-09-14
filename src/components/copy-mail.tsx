'use client';

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/ssr';
import { useEffect, useRef, useState } from 'react';

import { MAIL } from '@/content/profile';

const RESET_AFTER = 2400;

type CopyState = 'idle' | 'copied' | 'failed';

export function CopyMail() {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    let copied = true;
    try {
      await navigator.clipboard.writeText(MAIL);
    } catch {
      copied = false;
    }

    setState(copied ? 'copied' : 'failed');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), RESET_AFTER);
  };

  return (
    <>
      <a href={`mailto:${MAIL}`}>mail</a>
      <button
        type="button"
        onClick={copy}
        title={`Copy ${MAIL}`}
        aria-label={`Copy email address, ${MAIL}`}
        className="ml-0.5 cursor-pointer align-[-0.15em] text-faint transition-colors duration-200 ease-out hover:text-accent motion-reduce:transition-none"
      >
        {state === 'copied' ? (
          <CheckIcon size={14} aria-hidden="true" className="text-accent" />
        ) : (
          <CopyIcon size={14} aria-hidden="true" />
        )}
      </button>
      <span role="status" className="sr-only">
        {state === 'copied'
          ? 'Email address copied.'
          : state === 'failed'
            ? `Copy failed. The address is ${MAIL}`
            : ''}
      </span>
    </>
  );
}
