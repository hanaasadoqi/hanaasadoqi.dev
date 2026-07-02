'use client';

import {
  TechStackIcons,
  type TechStackIcon,
} from '@/features/icons/tech-stack';
import { cn } from '@/lib/utils';

export function ProjectCardFooter({
  linkLabel,
  linkDisabled,
  linkExternal,
  techItems,
  className,
  linkClassName,
  techClassName,
  techContainerClassName,
}: {
  linkLabel: string;
  linkDisabled?: boolean;
  linkExternal?: boolean;
  techItems?: TechStackIcon[];
  className?: string;
  linkClassName?: string;
  techClassName?: string;
  techContainerClassName?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      <span
        className={cn(
          'type-caption inline-flex font-medium',
          linkDisabled ? 'text-muted-foreground/50' : 'text-foreground/60',
          linkClassName,
        )}
      >
        {linkLabel}
        {!linkDisabled && (
          <span aria-hidden="true" className="ml-1">
            {linkExternal ? '↗' : '→'}
          </span>
        )}
      </span>

      {techItems && techItems.length > 0 ? (
        <TechStackIcons
          items={techItems}
          className={cn('opacity-70', techClassName)}
          containerClassName={techContainerClassName}
          showLabel={false}
        />
      ) : null}
    </div>
  );
}

export default ProjectCardFooter;
