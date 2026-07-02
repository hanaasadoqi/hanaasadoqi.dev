import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        '-m-3 inline-flex items-center gap-0.5 rounded-md px-3 py-2 text-xl font-semibold tracking-tight transition',
        'group hover:text-brand/80 hover:opacity-80focus-visible:ring-brand focus-visible:ring-offset-background',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      aria-label="hanaa. — home"
    >
      hanaa
      <span className="text-brand group-hover:text-foreground mt-0.5 font-extrabold transition ease-in-out">
        .
      </span>
    </Link>
  );
}
