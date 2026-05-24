/* eslint-disable react-hooks/static-components */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBAR_CONFIG } from './sidebar.config';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';
import Logo from '@/shared/Logo/Logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { MenuIcon, XIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProfileSelectDropdown from '@/components/reUseAbleComponents/UserProfile';

interface SidebarProps {
  role: UserRole;
}

export default function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside className="hidden lg:flex w-64 border-r bg-background flex-col h-screen max-h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b">
        <Logo />
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {SIDEBAR_CONFIG.filter((section) => section.roles.includes(role)).map(
          (section, i) => (
            <div key={i} className="space-y-1 mt-2">
              {section.items.map((item) => {
                const isActive = pathname === item.url;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.url}
                    href={item.url}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 transition',
                      isActive
                        ? 'bg-background text-sidebar-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground',
                    )}>
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          ),
        )}
      </nav>
      {role === 'PATIENT' && <ProfileSelectDropdown />}
    </aside>
  );

  // Mobile Sidebar (Sheet)
  const MobileSidebar = () => (
    <>
      {/* Mobile Sidebar Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 rounded-md bg-background text-sidebar-foreground border shadow-sm"
              aria-label="Open menu">
              {isOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center justify-center h-16 border-b px-4">
                <Logo />
                {/* <SheetClose className="absolute right-4">
                  <XIcon className="h-5 w-5" />
                </SheetClose> */}
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {SIDEBAR_CONFIG.filter((section) =>
                  section.roles.includes(role),
                ).map((section, i) => (
                  <div key={i} className="space-y-1 mt-2">
                    {section.items.map((item) => {
                      const isActive = pathname === item.url;
                      const Icon = item.icon;

                      return (
                        <SheetClose asChild key={item.url}>
                          <Link
                            href={item.url}
                            className={cn(
                              'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition',
                              isActive
                                ? 'bg-secondary text-foreground'
                                : 'hover:bg-muted text-muted-foreground hover:text-foreground',
                            )}>
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="truncate">{item.title}</span>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                ))}
              </nav>

              {/* Patient profile selector */}
              <div className="p-4 border-t">
                {role === 'PATIENT' && <ProfileSelectDropdown />}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}
