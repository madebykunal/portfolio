'use client';

import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

const MAIL = 'madebykunal@gmail.com';
const RESET_AFTER = 2400;

type CopyState = 'idle' | 'copied' | 'failed';

function legacyCopy(text: string) {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'absolute';
  field.style.left = '-9999px';
  document.body.appendChild(field);
  field.select();

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }

  document.body.removeChild(field);
  return copied;
}

export function CopyMail() {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => clearTimeout(timer.current ?? undefined), []);

  const report = (copied: boolean) => {
    setState(copied ? 'copied' : 'failed');
    clearTimeout(timer.current ?? undefined);
    timer.current = setTimeout(() => setState('idle'), RESET_AFTER);
  };

  const copy = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(MAIL);
        report(true);
        return;
      } catch {
        report(legacyCopy(MAIL));
        return;
      }
    }

    report(legacyCopy(MAIL));
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
