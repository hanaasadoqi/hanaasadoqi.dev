'use client';

import { LinkButton } from '@/components';
import { StatusBadge } from '@/components/shared/display/badges';
import { prepareIcons, TechStackIcons } from '@/features/icons/tech-stack';
import ProjectCardHeader from '@/features/projects/components/shared/cards/card-primitives/header';
import { getProjectDisplay } from '@/features/projects/lib/project-display';
import type { CaseStudy, Project } from '@/features/projects/types';
import { isDraftContent } from '@/lib/content/content-visibility';
import Link from 'next/link';

type FeaturedProject = CaseStudy | Project;
type ProjectDisplay = ReturnType<typeof getProjectDisplay>;

export function FeaturedProjectCard({
  featured,
}: {
  featured: FeaturedProject;
}) {
  const studyId = featured.title.toLowerCase().replace(/\s+/g, '-');
  const display = getProjectDisplay(featured);
  const techStackIcons = prepareIcons(featured.techStack ?? []);

  return (
    <article
      id={studyId}
      className="group border-border/40 bg-background/40 text-card-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:border-border/70 relative flex h-[min(76svh,660px)] min-h-[540px] max-w-[min(84vw,520px)] min-w-[min(84vw,520px)] snap-start flex-col rounded-2xl border p-7 backdrop-blur-sm motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:motion-safe:-translate-y-1.5 sm:max-w-[560px] sm:min-w-[560px] md:max-w-[640px] md:min-w-[640px] md:p-9 lg:max-w-[720px] lg:min-w-[720px]"
      aria-label={`Featured project: ${featured.title}`}
    >
      {/* Header: Eyebrow Badge + Title + Tech Stack */}
      <div className="relative flex flex-col space-y-3 mb-2">
        {/* Status Badge as Eyebrow */}
        <div className="flex items-center gap-2">
          <StatusBadge status={featured.status.value} />
          {techStackIcons.length > 0 && (
            <TechStackIcons
              items={techStackIcons}
              className="size-4 opacity-50 ml-auto"
              showLabel={false}
            />
          )}
        </div>

        {/* Title + Subtitle + Meta */}
        <div>
          <h2 className="type-panel-title text-balance">{featured.title}</h2>
          {featured.subtitle && (
            <p className="type-body-sm text-muted-foreground/75 mt-2">
              {featured.subtitle}
            </p>
          )}
          {display.meta && (
            <p className="type-caption text-muted-foreground/50 mt-1">
              {display.meta}
            </p>
          )}
        </div>
      </div>

      <FeaturedProjectDetails featured={featured} />

      <FeaturedProjectFooter display={display} featured={featured} />
    </article>
  );
}

function FeaturedProjectDetails({ featured }: { featured: FeaturedProject }) {
  return (
    <div className="relative min-h-0 flex-1 mt-6">
      <div
        tabIndex={0}
        aria-label={`Details for ${featured.title}`}
        className="no-scrollbar focus-visible:ring-ring h-full overflow-y-auto rounded-md pr-3 focus-visible:ring-2 focus-visible:outline-none"
      >
        <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 sm:gap-7">
          <div className="space-y-6">
            {featured.problem && (
              <ProjectDetailBlock label="The problem" text={featured.problem} />
            )}
            {featured.solution && (
              <ProjectDetailBlock
                label="The solution"
                text={featured.solution}
              />
            )}
          </div>

          <div className="space-y-6">
            <ProjectDetailList
              items={featured.challenges ?? []}
              label="Key challenges"
            />
            <ProjectDetailList
              items={featured.learnings ?? []}
              label="Key learnings"
            />
          </div>
        </div>
      </div>
      <div
        className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

function ProjectDetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground/60 mb-3">
        {label}
      </p>
      <p className="type-body-sm text-muted-foreground/80 leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function ProjectDetailList({
  items,
  label,
}: {
  items: string[];
  label: string;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground/60 mb-3">
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="type-body-sm text-muted-foreground/80 flex items-start gap-2 leading-relaxed">
            <span
              className="mt-[5px] size-1 shrink-0 rounded-full bg-current opacity-35 flex-shrink-0"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FeaturedProjectFooter({
  display,
  featured,
}: {
  display: ProjectDisplay;
  featured: FeaturedProject;
}) {
  return (
    <footer className="border-border/30 mt-6 flex shrink-0 items-center justify-between border-t pt-6">
      <RelatedCaseStudiesLink
        display={display}
        projectSlug={featured.slug}
        projectTitle={featured.title}
      />
      <FeaturedProjectCta display={display} featured={featured} />
    </footer>
  );
}

function RelatedCaseStudiesLink({
  display,
  projectTitle,
  projectSlug,
}: {
  display: ProjectDisplay;
  projectTitle: string;
  projectSlug: string;
}) {
  return (
    <div className="flex flex-col items-end justify-center gap-2">
      {display.caseStudyCount > 0 && (
        <Link
          href={`/projects/${projectSlug}/#related-case-studies`}
          aria-label={`View related case studies for ${projectTitle}`}
        >
          <span className="border-brand/20 bg-brand/5 text-brand inline-flex items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium">
            <span aria-hidden="true">↳</span>
            {display.caseStudyCount}{' '}
            {display.caseStudyCount === 1 ? 'case study' : 'case studies'}
          </span>
        </Link>
      )}
    </div>
  );
}

function FeaturedProjectCta({
  display,
  featured,
}: {
  display: ProjectDisplay;
  featured: FeaturedProject;
}) {
  const projectHref = `/projects/${featured.slug}`;
  const isDraft = isDraftContent(featured);

  if (display.link.isDisabled && !isDraft) {
    return (
      <span className="type-body-sm text-muted-foreground/50 ml-auto inline-flex w-fit items-center rounded font-medium">
        Coming
      </span>
    );
  }

  if (display.link.isExternal) {
    return (
      <a
        href={display.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="type-body-sm text-foreground hover:text-brand focus-visible:ring-ring inline-flex w-fit items-center gap-1 rounded font-medium focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors"
        aria-label={`${display.link.label} for ${featured.title}`}
      >
        {display.link.label}
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <LinkButton
      href={projectHref}
      className="type-body-sm text-foreground hover:text-brand focus-visible:ring-ring ml-auto inline-flex w-fit items-center rounded font-medium focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-colors"
      variant="ghost"
      aria-label={`Discover ${featured.title}`}
      // iconRight={<span aria-hidden="true">→</span>}
    >
      Discover More
    </LinkButton>
  );
}
