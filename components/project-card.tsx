import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import Image, { type StaticImageData } from 'next/image';

export type Project = {
  name: string;
  href: string;
  logo: StaticImageData;
  shot: StaticImageData;
  shotAlt: string;
  tint: string;
  summary: string;
};

const SHOT_SIZES = '(max-width: 719px) calc(100vw - 5.75rem), 240px';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener"
      className="group flex h-full flex-col rounded-xl bg-card p-2.5 no-underline shadow-card transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className={`overflow-hidden rounded-lg px-5 pt-5 ${project.tint}`}>
        <Image
          src={project.shot}
          alt={project.shotAlt}
          sizes={SHOT_SIZES}
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
