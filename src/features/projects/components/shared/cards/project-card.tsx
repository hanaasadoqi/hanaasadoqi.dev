'use client';

import { CardMedia } from '@/components/shared/display';
import { StatusBadge } from '@/components/shared/display/badges';
import {
  getProjectDisplay,
  type ProjectLink,
} from '@/features/projects/lib/project-display';
import type { Project } from '@/types';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ProjectChipRail } from '../project-chip-rail';
import { ProjectCardFooter, ProjectCardHeader } from '../cards';
import { prepareIcons } from '@/features/icons/tech-stack';

export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  mediaSrc?: string;
  layout?: 'default' | 'imageFirst' | 'split';
}

export function ProjectCard({
  project,
  featured,
  mediaSrc,
  layout = 'default',
}: ProjectCardProps) {
  const display = getProjectDisplay(project);
  const isFeatured = display.isFeaturedProject && featured;
  const techStackIcons = prepareIcons(project.techStack ?? []);
  const hasProblemSolution = project.problem || project.solution;

  const content = (
    <article
      className={`group relative inline-block w-full overflow-hidden rounded-lg border p-6 shadow-sm motion-safe:transition-all motion-safe:duration-200 ${display.link.isDisabled ? 'border-border/30 bg-card/40 opacity-75' : 'hover:border-border/70 hover:bg-card/80 focus-within:ring-ring focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'border-border/60 bg-card/80' : 'border-border/50 bg-card/60'} h-full`}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      {/* Status badge - top right */}
      <div className="absolute right-6 top-6">
        <StatusBadge status={display.status}>{display.status}</StatusBadge>
      </div>

      <div
        className={`flex h-full flex-col space-y-3 ${layout === 'split' ? 'md:flex-row md:space-y-0 md:space-x-6' : ''}`}
      >
        {layout === 'imageFirst' && mediaSrc ? (
          <CardMedia src={mediaSrc} alt={display.title} className="mb-4" />
        ) : null}

        {/* Header without badges */}
        <ProjectCardHeader
          title={display.title}
          meta={display.meta}
          subtitle={display.subtitle}
          status={display.status}
          showBadges={false}
          techSlot={null}
          className="pr-20"
        />

        {/* Collapsible problem/solution section */}
        {hasProblemSolution && (
          <details className="group/details">
            <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground/70 motion-safe:transition-colors motion-safe:duration-200 hover:text-muted-foreground/90 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 rounded px-2 py-1 -mx-2">
              <span className="inline-block motion-safe:transition-transform motion-safe:duration-200 group-open/details:rotate-90">
                ›
              </span>
              <span>Details</span>
            </summary>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground/60 pl-6">
              {project.problem && (
                <div>
                  <p className="font-medium text-muted-foreground/80 text-xs uppercase tracking-wide mb-1">
                    Problem
                  </p>
                  <p>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <p className="font-medium text-muted-foreground/80 text-xs uppercase tracking-wide mb-1">
                    Solution
                  </p>
                  <p>{project.solution}</p>
                </div>
              )}
            </div>
          </details>
        )}

        <ProjectChipRail
          status={display.status}
          isFeatured={isFeatured}
          caseStudyCount={display.caseStudyCount}
          tags={display.focus}
        />

        <div className="flex-1" />
        <ProjectCardFooter
          linkLabel={display.link.label}
          linkDisabled={display.link.isDisabled}
          linkExternal={display.link.isExternal}
          techItems={techStackIcons}
          linkClassName={
            display.link.isDisabled ? undefined : 'group-hover:text-foreground'
          }
          techClassName="transition-[opacity,scale] hover:scale-115 hover:opacity-100 motion-safe:duration-200 motion-safe:ease-linear"
        />
      </div>
    </article>
  );

  return <ProjectCardLink link={display.link}>{content}</ProjectCardLink>;
}

function ProjectCardLink({
  children,
  link,
}: {
  children: ReactNode;
  link: ProjectLink;
}) {
  if (link.isDisabled) return children;

  if (link.isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:ring-ring block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className="focus-visible:ring-ring block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}
