'use client';
import {cn} from '@/lib/utils';
import {useScroll} from '@/hooks/use-scroll';
import {Button} from '@/components/ui/button';
import {MobileNav} from '@/components/mobile-nav';
import Logo from '@/shared/Logo/Logo';
import {useGetMeQuery} from '@/redux/api/user.api';
import {UserProfileDropdown} from '@/shared/UserProfile';
import Link from 'next/link';
import {useState, useRef} from 'react';
import {ChevronDown} from 'lucide-react';

export const navLinks = [
  {label: 'Home', href: '/'},
  {label: 'Services', href: '/#services'},
  {label: 'About', href: '/about-us'},
  {label: 'Membership', href: '/pricing'},
  {label: 'FAQs', href: '/faq'},
  {label: 'Contact', href: '/contact'},
];

const quickLinks = [
  {name: 'Urgent Care', href: '/urgent-care'},
  {name: 'Routine Care', href: '/rouitine-care'},
  {name: 'AI Health Insights', href: '/aiinsight'},
  {name: 'Electronic Health Record', href: '/electronic-health-record'},
  // {name: 'Telemedicine', href: '/talemadicine'},
  // {name: 'Mobile Clinic', href: '/mobile-clinic'},
  // { name: 'Pricing', href: '/pricing' },
];

const aboutLinks = [
  {name: 'Leadership', href: '/about-us'},
  {name: 'Careers', href: '/career'},
  // {name: 'Membership', href: '/pricing'},
];

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Button
        size="sm"
        variant="ghost"
        className="hover:bg-secondary/10 text-lg hover:text-secondary duration-200 flex items-center gap-1">
        <Link href="/#services">Services</Link>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200 pointer-events-none',
            open && 'rotate-180',
          )}
        />
      </Button>

      {/* Dropdown Panel */}
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 top-[calc(100%+6px)] z-50',
          'w-56 rounded-xl border border-border bg-background shadow-lg',
          'py-1.5 overflow-hidden',
          'transition-all duration-200 origin-top',
          open
            ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none',
        )}>
        {/* little caret arrow */}
        <div className="absolute -top-1.25 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border-l border-t border-border bg-background" />

        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm text-foreground',
              'hover:bg-secondary/10 hover:text-secondary',
              'transition-colors duration-150',
            )}>
            <span className="h-1.5 w-1.5 rounded-full bg-secondary/50 shrink-0" />
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function AboutDropdown() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Button
        size="sm"
        variant="ghost"
        className="hover:bg-secondary/10 text-lg hover:text-secondary duration-200 flex items-center gap-1">
        <Link href="/about-us">About</Link>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200 pointer-events-none',
            open && 'rotate-180',
          )}
        />
      </Button>

      {/* Dropdown Panel */}
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 top-[calc(100%+6px)] z-50',
          'w-56 rounded-xl border border-border bg-background shadow-lg',
          'py-1.5 overflow-hidden',
          'transition-all duration-200 origin-top',
          open
            ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none',
        )}>
        {/* little caret arrow */}
        <div className="absolute -top-1.25 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border-l border-t border-border bg-background" />

        {aboutLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm text-foreground',
              'hover:bg-secondary/10 hover:text-secondary',
              'transition-colors duration-150',
            )}>
            <span className="h-1.5 w-1.5 rounded-full bg-secondary/50 shrink-0" />
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const scrolled = useScroll(10);
  const {data, isLoading, refetch} = useGetMeQuery({});
  const user = data?.data;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto w-full max-w-360 border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out text-foreground',
        {
          'border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/70 md:top-2 md:max-w-7xl md:shadow text-foreground':
            scrolled,
        },
      )}>
      <nav
        className={cn(
          'flex h-16 w-full items-center justify-between px-4 md:h-20 md:transition-all md:ease-out',
          {'md:px-2 h-14 md:h-16': scrolled},
        )}>
        {/* Left: Logo */}
        <div className="flex flex-1 justify-start">
          <Logo />
        </div>

        {/* Middle: Nav Links (Desktop) */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.label === 'Services') {
                return <ServicesDropdown key="services" />;
              }
              if (link.label === 'About') {
                return <AboutDropdown key="about" />;
              }
              return (
                <Button
                  asChild
                  key={link.label}
                  size="sm"
                  variant="ghost"
                  className="hover:bg-secondary/10 text-lg hover:text-secondary duration-200">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Right: Auth and Mobile Nav */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden items-center gap-2 md:flex">
            {isLoading ? (
              <span className="text-sm text-muted-foreground">Loading...</span>
            ) : user ? (
              <UserProfileDropdown user={user} refetch={refetch} />
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="ghost" className="text-lg">
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-secondary text-white hover:bg-secondary/90 text-lg">
                  <Link href="/register">Join Now</Link>
                </Button>
              </div>
            )}
          </div>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
