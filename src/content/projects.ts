import type { StaticImageData } from 'next/image';

import calxbookLogo from '@/assets/calxbook-logo.png';
import calxbookShot from '@/assets/calxbook-shot.jpg';
import calxmapLogo from '@/assets/calxmap-logo.png';
import calxmapShot from '@/assets/calxmap-shot.jpg';

export type Project = {
  name: string;
  href: string;
  logo: StaticImageData;
  shot: StaticImageData;
  shotAlt: string;
  tint: string;
  summary: string;
};

export const PROJECTS: Project[] = [
  {
    name: 'Calxbook',
    href: 'https://calxbook.com',
    logo: calxbookLogo,
    shot: calxbookShot,
    shotAlt: 'The Calxbook home page',
    tint: 'bg-[#f9ded6]',
    summary: 'Learn live from verified experts',
  },
  {
    name: 'Calxmap',
    href: 'https://calxmap.com',
    logo: calxmapLogo,
    shot: calxmapShot,
    shotAlt: 'The Calxmap home page',
    tint: 'bg-[#f3e0ee]',
    summary: 'The expert marketplace platform',
  },
];
