import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Figtree, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';

const sans = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Kunal Singh',
  description:
    'Kunal Singh is a product designer and engineer at Calxmap, where he leads design and supports the engineering team with frontend work.',
};

export const viewport: Viewport = {
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <main className="mx-auto max-w-column px-6 py-10 wide:py-28">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
