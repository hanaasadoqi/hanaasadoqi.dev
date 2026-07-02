'use client';

import { LinkButton } from '@/components/shared/buttons/link-button';
import { Container } from '@/components/layout/container';
import { ThemeToggle } from '@/components/shared/theme/theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { siteNavigationLinks } from '@/constants';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Logo } from '../shared/logo';

export type NavLink = {
  href: string;
  label: string;
};

export function Navbar({
  navLinks = siteNavigationLinks,
}: {
  navLinks?: NavLink[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-border/50 bg-background/95 supports-[backdrop-filter]:bg-background/70 fixed inset-x-0 top-0 z-50 border-b backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <span className="block md:sr-only md:hidden">
          <Image
            src="/icons/icon.png"
            alt="Hanaa Sadoqi"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
        </span>
        <span className="hidden md:block">
          <Logo />
        </span>
        <nav className="ml-4 hidden gap-1 sm:flex">
          {navLinks.map((link) => (
            <LinkButton
              key={link.href}
              href={link.href}
              variant="ghost"
              className="type-body-sm text-muted-foreground hover:bg-muted hover:text-foreground h-full px-3 py-2 font-medium motion-safe:transition-colors"
            >
              {link.label}
            </LinkButton>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="bg-muted/80 text-foreground hover:border-brand hover:text-brand focus-visible:border-ring focus-visible:ring-ring/50 inline-flex size-10 items-center justify-center rounded-lg border border-transparent transition-[colors,border] duration-200 ease-in-out focus-visible:ring-3 focus-visible:outline-none sm:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(22rem,85vw)] p-0">
              <SheetHeader className="border-border/40 border-b px-5 py-5">
                <SheetTitle>Navigate</SheetTitle>
                <SheetDescription>Move between main pages.</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                  <LinkButton
                    key={link.href}
                    href={link.href}
                    variant="ghost"
                    className="type-body w-full justify-start px-3 py-5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </LinkButton>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <ThemeToggle className="!size-10" />
        </div>
      </Container>
    </header>
  );
}
