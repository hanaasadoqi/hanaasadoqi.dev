'use client';

import { StatusBadge } from '@/components/shared/display/badges';
import { TechStackIcons } from '@/features/icons/tech-stack';
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
  const hasFocusAreas = display.focus && display.focus.length > 0;
  const hasTechStack = techStackIcons.length > 0;

  const content = (
    <article
      className={`group relative inline-block w-full overflow-hidden rounded-lg border shadow-sm motion-safe:transition-all motion-safe:duration-200 ${display.link.isDisabled ? 'border-border/30 bg-card/40 opacity-75' : 'hover:border-border/70 hover:bg-card/80 focus-within:ring-ring focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'border-border/60 bg-card/80' : 'border-border/50 bg-card/60'} h-full flex flex-col`}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      {/* Header with Title + Status Badge (top-right) */}
      <div className="relative px-6 pt-6 pb-3">
        {/* Status Badge - Absolute Top Right */}
        <div className="absolute right-6 top-6">
          <StatusBadge status={display.status} />
        </div>

        {/* Title, Meta, Subtitle */}
        <div className="pr-16">
          <ProjectCardHeader
            title={display.title}
            meta={display.meta}
            subtitle={display.subtitle}
            status={display.status}
            showBadges={false}
            techSlot={null}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 py-4 space-y-3">
        {/* Description */}
        <p className="type-body-sm text-muted-foreground/80">{display.subtitle}</p>

        {/* Inline Focus Tags + Tech Icons (Horizontal) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {hasFocusAreas && display.focus.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-muted-foreground/70 border border-border/40 bg-background/40"
            >
              {tag}
            </span>
          ))}
          {hasTechStack && (
            <div className="flex items-center gap-1 ml-auto">
              <TechStackIcons
                items={techStackIcons}
                className="size-4"
                showLabel={false}
              />
            </div>
          )}
        </div>

        {/* Case Study Count */}
        {display.caseStudyCount > 0 && (
          <div className="pt-1">
            <ProjectChipRail caseStudyCount={display.caseStudyCount} tags={[]} />
          </div>
        )}

        {/* Collapsible Problem/Solution */}
        {hasProblemSolution && (
          <details className="group/details pt-2">
            <summary className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-foreground/60 hover:text-muted-foreground/80 motion-safe:transition-colors uppercase tracking-wide focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 rounded px-1">
              <span className="inline-block motion-safe:transition-transform motion-safe:duration-200 group-open/details:rotate-90">
                ›
              </span>
              <span>Details</span>
            </summary>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground/70 pl-5 pt-2">
              {project.problem && (
                <div>
                  <p className="font-medium text-xs uppercase tracking-wide text-muted-foreground/60 mb-1">
                    Problem
                  </p>
                  <p className="leading-relaxed text-muted-foreground/75">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="pt-1">
                  <p className="font-medium text-xs uppercase tracking-wide text-muted-foreground/60 mb-1">
                    Solution
                  </p>
                  <p className="leading-relaxed text-muted-foreground/75">{project.solution}</p>
                </div>
              )}
            </div>
          </details>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-4 border-t border-border/20">
        <ProjectCardFooter
          linkLabel={display.link.label}
          linkDisabled={display.link.isDisabled}
          linkExternal={display.link.isExternal}
          linkClassName={
            display.link.isDisabled ? undefined : 'group-hover:text-foreground'
          }
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
