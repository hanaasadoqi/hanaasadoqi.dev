'use client';

import { CardMedia } from '@/components/shared/display';
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
      className={`group relative inline-block w-full overflow-hidden rounded-lg border p-6 shadow-sm motion-safe:transition-all motion-safe:duration-200 ${display.link.isDisabled ? 'border-border/30 bg-card/40 opacity-75' : 'hover:border-border/70 hover:bg-card/80 focus-within:ring-ring focus-within:ring-2 focus-within:outline-none'} ${isFeatured ? 'border-border/60 bg-card/80' : 'border-border/50 bg-card/60'} h-full flex flex-col`}
      aria-label={`${display.title}: ${display.link.label}`}
    >
      {/* Header Section */}
      <div className="mb-3">
        {/* Top row: status badge, title area, featured indicator */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <ProjectCardHeader
              title={display.title}
              meta={display.meta}
              subtitle={display.subtitle}
              status={display.status}
              showBadges={false}
              techSlot={null}
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isFeatured && (
              <div className="flex items-center justify-center w-5 h-5 rounded-full border border-amber-500/40 bg-amber-500/10">
                <div className="w-2 h-2 rounded-full bg-amber-500/60" aria-label="Featured project" />
              </div>
            )}
            <StatusBadge status={display.status}>{display.status}</StatusBadge>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col space-y-3">
        {/* Information Grid: Focus Areas + Tech Stack */}
        {(hasFocusAreas || hasTechStack) && (
          <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-border/25">
            {/* Left: Focus Areas */}
            {hasFocusAreas && (
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/50">
                  Focus
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {display.focus.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-foreground/5 text-foreground/70 border border-foreground/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Right: Tech Stack Icons */}
            {hasTechStack && (
              <div className="space-y-1 flex flex-col items-end">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/50">
                  Built with
                </p>
                <div className="flex justify-end">
                  <TechStackIcons
                    items={techStackIcons}
                    className="opacity-60"
                    showLabel={false}
                  />
                </div>
              </div>
            )}

            {/* If only one, make it full width */}
            {hasFocusAreas && !hasTechStack && (
              <div className="col-span-1" />
            )}
            {hasTechStack && !hasFocusAreas && (
              <div className="col-span-1" />
            )}
          </div>
        )}

        {/* Case Study Count */}
        {display.caseStudyCount > 0 && (
          <div className="pt-1">
            <ProjectChipRail caseStudyCount={display.caseStudyCount} tags={[]} />
          </div>
        )}

        {/* Collapsible problem/solution section */}
        {hasProblemSolution && (
          <details className="group/details pt-1">
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
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3">
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
