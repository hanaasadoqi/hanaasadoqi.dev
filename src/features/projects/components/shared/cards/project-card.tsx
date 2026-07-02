'use client';

import { CardMedia } from '@/components/shared/display';
import { StatusBadge, Tag } from '@/components/shared/display/badges';
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
      {/* ═════ HEADER SECTION ═════ */}
      <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <ProjectCardHeader
            title={display.title}
            meta={display.meta}
            subtitle={display.subtitle}
            status={display.status}
            showBadges={false}
            techSlot={null}
          />
        </div>
        <div className="flex items-center gap-2 shrink-0 pt-1">
          {isFeatured && (
            <div
              className="flex items-center justify-center w-5 h-5 rounded-full border border-foreground/20 bg-foreground/5"
              title="Featured project"
              aria-label="Featured"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
            </div>
          )}
          <StatusBadge status={display.status} />
        </div>
      </div>

      {/* ═════ DIVIDER ═════ */}
      <div className="border-t border-border/30" />

      {/* ═════ CONTENT SECTION ═════ */}
      <div className="flex-1 flex flex-col px-6 py-4 space-y-4">
        {/* Two-Column Info Grid: Focus Areas + Tech Stack */}
        {(hasFocusAreas || hasTechStack) && (
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column: Focus Areas */}
            <div className="space-y-2 min-w-0">
              {hasFocusAreas && (
                <>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/50 px-1">
                    Focus
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {display.focus.slice(0, 3).map((focusItem) => (
                      <Tag
                        key={focusItem}
                        variant="solid"
                        className="text-xs"
                      >
                        {focusItem}
                      </Tag>
                    ))}
                    {display.focus.length > 3 && (
                      <Tag variant="solid" className="text-xs">
                        +{display.focus.length - 3}
                      </Tag>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Right Column: Tech Stack Icons */}
            <div className="space-y-2 flex flex-col items-end min-w-0">
              {hasTechStack && (
                <>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/50 px-1">
                    Built with
                  </p>
                  <div className="flex justify-end">
                    <TechStackIcons
                      items={techStackIcons}
                      className="size-4"
                      showLabel={false}
                      showTooltip={true}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Case Study Count */}
        {display.caseStudyCount > 0 && (
          <>
            <div className="border-t border-border/30" />
            <ProjectChipRail caseStudyCount={display.caseStudyCount} tags={[]} />
          </>
        )}

        {/* Collapsible Details */}
        {hasProblemSolution && (
          <>
            <div className="border-t border-border/30" />
            <details className="group/details">
              <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground/70 motion-safe:transition-colors motion-safe:duration-200 hover:text-muted-foreground/90 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 rounded px-2 py-1 -mx-2">
                <span className="inline-block motion-safe:transition-transform motion-safe:duration-200 group-open/details:rotate-90">
                  ›
                </span>
                <span>Details</span>
              </summary>
              <div className="mt-3 space-y-3 text-sm text-muted-foreground/70 pl-6">
                {project.problem && (
                  <div>
                    <p className="font-medium text-muted-foreground/80 text-xs uppercase tracking-wide mb-1.5">
                      Problem
                    </p>
                    <p className="leading-relaxed">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <p className="font-medium text-muted-foreground/80 text-xs uppercase tracking-wide mb-1.5">
                      Solution
                    </p>
                    <p className="leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </div>
            </details>
          </>
        )}
      </div>

      {/* ═════ DIVIDER ═════ */}
      <div className="border-t border-border/30" />

      {/* ═════ FOOTER ═════ */}
      <div className="px-6 py-4">
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
