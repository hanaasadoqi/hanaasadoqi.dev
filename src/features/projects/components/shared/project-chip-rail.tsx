'use client';

import { PillList } from '@/components/shared/display/badges';
import { cn } from '@/lib/utils';
import type { StatusType } from '@/types';

type ProjectChipRailProps = {
  status?: StatusType;
  isFeatured?: boolean;
  caseStudyCount?: number;
  tags?: string[];
  compactCaseStudyLabel?: boolean;
  tagsLimit?: number;
  className?: string;
  topRowClassName?: string;
  tagsClassName?: string;
  showStatusBadge?: boolean;
  showFeaturedBadge?: boolean;
};

export function ProjectChipRail({
  caseStudyCount = 0,
  tags = [],
  compactCaseStudyLabel = false,
  tagsLimit = 2,
  className,
  tagsClassName,
  showStatusBadge = false,
  showFeaturedBadge = false,
}: ProjectChipRailProps) {
  const hasTags = tags.length > 0;
  const hasCaseStudy = caseStudyCount > 0;
  const caseStudyLabel = compactCaseStudyLabel
    ? caseStudyCount === 1
      ? 'study'
      : 'studies'
    : caseStudyCount === 1
      ? 'case study'
      : 'case studies';

  // If no content to show, return null
  if (!hasTags && !hasCaseStudy) {
    return null;
  }

  return (
    <div className={cn('space-y-2', className)}>
      {hasTags ? (
        <PillList
          items={tags}
          limit={tagsLimit}
          overflowLabel="count"
          className={tagsClassName}
        />
      ) : null}

      {hasCaseStudy ? (
        <div>
          <span className="border-brand/20 bg-brand/5 text-brand inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
            <span aria-hidden="true">↳</span>
            {caseStudyCount} {caseStudyLabel}
          </span>
        </div>
      ) : null}
    </div>
  );
}
