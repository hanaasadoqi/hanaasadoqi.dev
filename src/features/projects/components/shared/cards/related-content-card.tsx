'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { StatusBadge } from '@/components/shared/display/badges';

export interface RelatedContentCardProps {
  title: string;
  description: string;
  publishedDate?: string;
  readTime?: string;
  tags?: string[];
  href: string;
  ctaLabel?: string;
  status?: string;
  isExternal?: boolean;
  isDisabled?: boolean;
}

export function RelatedContentCard({
  title,
  description,
  publishedDate,
  readTime,
  tags = [],
  href,
  ctaLabel = 'Read',
  status,
  isExternal = false,
  isDisabled = false,
}: RelatedContentCardProps) {
  const content = (
    <article
      className={`group relative inline-block w-full overflow-hidden rounded-lg border p-5 sm:p-6 shadow-sm motion-safe:transition-all motion-safe:duration-200 ${isDisabled ? 'border-border/30 bg-card/40 opacity-75' : 'hover:border-border/70 hover:bg-card/80 focus-within:ring-ring focus-within:ring-2 focus-within:outline-none'} border-border/40 bg-card/60 h-full flex flex-col`}
      aria-label={`${title}: ${ctaLabel}`}
    >
      {/* Header: Status Badge + Title */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate">
            {title}
          </h3>
        </div>
        {status && (
          <div className="shrink-0 pt-0.5">
            <StatusBadge status={status} />
          </div>
        )}
      </div>

      {/* Metadata: Date + Read Time */}
      {(publishedDate || readTime) && (
        <p className="text-xs text-muted-foreground/60 mb-3">
          {publishedDate}
          {publishedDate && readTime && ' · '}
          {readTime}
        </p>
      )}

      {/* Description */}
      <p className="text-sm text-muted-foreground/75 mb-3 line-clamp-3 flex-1">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium text-muted-foreground/70 border border-border/40 bg-background/40"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="border-t border-border/20 pt-4 mt-auto">
        <button className="text-sm font-medium text-foreground/70 hover:text-foreground motion-safe:transition-colors group-hover:text-foreground">
          → {ctaLabel}
        </button>
      </div>
    </article>
  );

  if (isDisabled) return content;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:ring-ring block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="focus-visible:ring-ring block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {content}
    </Link>
  );
}
