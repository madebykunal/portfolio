import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';

import type { Project } from '@/content/projects';

const SHOT_SIZES = '(min-width: 640px) 240px, calc(100vw - 6.75rem)';

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-xl bg-card p-2.5 no-underline shadow-card transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className={`overflow-hidden rounded-lg px-5 pt-5 ${project.tint}`}>
        <Image
          src={project.shot}
          alt={project.shotAlt}
          sizes={SHOT_SIZES}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          className="aspect-[5/3] w-full rounded-t-md object-cover object-top shadow-shot"
        />
      </div>

      <div className="px-1 pt-3.5 pb-2">
        <div className="flex items-center gap-x-2">
          <Image src={project.logo} alt="" width={16} height={16} className="rounded-[3px]" />
          <h3 className="font-title text-ink">{project.name}</h3>
          <ArrowUpRightIcon
            size={13}
            aria-hidden="true"
            className="ml-auto text-faint transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent motion-reduce:transition-none"
          />
        </div>

        <p className="mt-1.5 text-meta text-muted">{project.summary}</p>
      </div>
    </a>
  );
}
