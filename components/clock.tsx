'use client';

import { useEffect, useState } from 'react';

const MINUTE = 60_000;

const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});

export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = new Date();
      setNow(current);
      const untilNextMinute = MINUTE - (current.getSeconds() * 1000 + current.getMilliseconds());
      timer = setTimeout(tick, untilNextMinute);
    };

    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <time dateTime={now ? now.toISOString() : ''}>{now ? timeFormat.format(now) : '--:-- --'}</time>
  );
}
