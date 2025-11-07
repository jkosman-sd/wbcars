'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export interface NavigationLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface PageHeaderProps {
  navigationLinks: NavigationLink[];
  className?: string;
}

/**
 * PageHeader - Main navigation header component
 *
 * Features:
 * - Fixed positioning at top of viewport
 * - Solid background at top, semi-transparent with blur on scroll
 * - Logo on the left, navigation links on the right
 * - Responsive design (desktop-first from Figma)
 * - Keyboard accessible navigation
 * - Supports both regular links and anchor links (e.g., /#section)
 * - Smooth scroll behavior for anchor links
 */
export const Header = ({ navigationLinks, className }: PageHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open but keep scrollbar visible
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);

    // Check if it's an anchor link (starts with # or /#)
    if (href.startsWith('#') || href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace(/^\/?#/, '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Get header height to offset scroll position
        const header = document.querySelector('header');
        const headerHeight = header?.offsetHeight || 0;

        // Calculate target position minus header height
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        // Scroll to position with offset
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update URL without page reload
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 right-0 left-0 z-50 w-full',
        'transition-all duration-300',
        // Always show solid background when mobile menu is open or when scrolled
        isMobileMenuOpen || isScrolled ? 'bg-neutral-900' : 'bg-neutral-900',
        // Add blur effect only when scrolled and menu is closed
        !isMobileMenuOpen && isScrolled && 'bg-[rgba(26,26,26,0.5)] backdrop-blur-sm',
        'px-2 md:px-4 xl:px-0',
        className
      )}
    >
      <div className='m-auto flex w-full max-w-7xl items-center justify-between py-4'>
        {/* Logo */}
        <Link href='/' className='relative flex h-16 w-80 shrink-0' aria-label='Strona główna'>
          <Image
            src='/images/wb-cars-logo.svg'
            alt='WB Cars Logo'
            fill
            className='object-contain object-left'
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden items-center gap-8 lg:flex lg:gap-10' aria-label='Nawigacja główna'>
          {navigationLinks.map((link, index) => (
            <Link
              key={`${link.href}-${index}`}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={cn(
                'font-montserrat text-[13px] leading-tight font-bold uppercase',
                'text-neutral-50 transition-colors duration-200',
                'hover:text-primary',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            'flex flex-col gap-1.5 lg:hidden',
            '-mr-2 p-2',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
          )}
          aria-label='Menu'
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={cn(
              'block h-0.5 w-6 bg-neutral-50 transition-all duration-300',
              isMobileMenuOpen && 'translate-y-2 rotate-45'
            )}
          />
          <span
            className={cn('block h-0.5 w-6 bg-neutral-50 transition-all duration-300', isMobileMenuOpen && 'opacity-0')}
          />
          <span
            className={cn(
              'block h-0.5 w-6 bg-neutral-50 transition-all duration-300',
              isMobileMenuOpen && '-translate-y-2 -rotate-45'
            )}
          />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'overflow-hidden lg:hidden',
          'absolute top-full right-0 left-0',
          'bg-neutral-900',
          'origin-top transition-all duration-300 ease-in-out',
          'px-2 md:px-4 xl:px-0',
          isMobileMenuOpen ? 'visible max-h-screen opacity-100' : 'invisible max-h-0 opacity-0'
        )}
      >
        <div className='m-auto w-full max-w-7xl'>
          <nav
            className='flex max-h-[calc(100vh-6rem)] flex-col gap-1 overflow-y-auto p-4'
            aria-label='Nawigacja mobilna'
          >
            {navigationLinks.map((link, index) => (
              <Link
                key={`mobile-${link.href}-${index}`}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={cn(
                  'font-montserrat text-base leading-tight font-bold uppercase',
                  'text-neutral-50 transition-colors duration-200',
                  'hover:text-primary active:text-primary',
                  'rounded-lg px-4 py-4',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
