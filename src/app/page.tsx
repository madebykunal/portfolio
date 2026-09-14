import { Clock } from '@/components/clock';
import { CopyMail } from '@/components/copy-mail';
import { ProjectCard } from '@/components/project-card';
import { LINKS } from '@/content/profile';
import { PROJECTS } from '@/content/projects';

export default function Home() {
  return (
    <div className="flex flex-col gap-9 wide:gap-10">
      <div className="flex flex-col gap-6">
        <header className="space-y-1">
          <h1 className="text-display font-title">Kunal Singh</h1>
          <p className="text-muted">Product Designer &amp; Engineer</p>
        </header>

        <div className="space-y-3.5">
          <p>
            Currently at <a href={LINKS.calxmap}>Calxmap</a>, where I design the product and then
            build it — the interface, and the Node services behind it.
          </p>
          <p>
            Self-taught, the long way round — documentation, a lot of R&amp;D, and a lot of
            rebuilding. Right now I&apos;m learning Rust.
          </p>
          <p>While being offline, I keep myself grounded with books and music.</p>
          <p>
            Reach me on <CopyMail />,{' '}
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            , or{' '}
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            . You can also read my{' '}
            <a href={LINKS.resume} target="_blank" rel="noopener noreferrer">
              résumé
            </a>
            .
          </p>
        </div>
      </div>

      <section>
        <ul className="grid gap-3 wide:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <li key={project.name}>
              <ProjectCard project={project} eager={index === 0} />
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink/8 pt-5 text-foot text-muted">
        <p>Good things happen once, others are created.</p>
        <p className="font-mono tabular-nums">
          UTC+5:30 <Clock />
        </p>
      </footer>
    </div>
  );
}
