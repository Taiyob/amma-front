'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/shared/Logo/Logo';
import AppButton from '@/components/ui/AppButton';
import { Menu, X } from 'lucide-react';
import { useGetMeQuery } from '@/redux/api/user.api';
import { UserProfileDropdown } from '@/shared/UserProfile';

type NavItem = {
  label: string;
  href: string;
  mobileOnly?: boolean;
  hiddenOnMobile?: boolean;
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, refetch } = useGetMeQuery({});
  const user = data?.data;

  const navItems: NavItem[] = [
    { label: 'About Us', href: '/about-us' },
    { label: 'FAQs', href: '/faq' },
    { label: 'AI Health Insights', href: '/aiinsight' },
    { label: 'Pricing', href: '/pricing' },
    // {label: 'Admin Dashboard', href: '/admin/dashboard', hiddenOnMobile: true},
    // {label: 'Staff Dashboard', href: '/staff/dashboard', hiddenOnMobile: true},
    // {label: 'Patient Dashboard', href: '/patient/dashboard', hiddenOnMobile: true},
    { label: 'Register', href: '/register', mobileOnly: true },
    { label: 'Login', href: '/login', mobileOnly: true },
  ];

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="border-b bg-primary sticky top-0 z-50">
      <section className="container mx-auto px-4 flex justify-between items-center py-3 md:py-4 h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right Section */}
        <div
          ref={menuRef}
          className="flex items-center gap-2 md:gap-4 relative">
          {/* Desktop Actions */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <span className="text-sm text-muted-foreground">Loading...</span>
            ) : user ? (
              <UserProfileDropdown user={user} refetch={refetch} />
            ) : (
              <>
                <Link
                  href="/login"
                  className={`text-xs sm:text-sm font-medium hover:underline ${pathname === '/login' ? 'text-accent font-semibold' : ''
                    }`}>
                  Login
                </Link>

                <AppButton
                  label="Join Now"
                  href="/register"
                  bgColor="bg-secondary"
                  textColor="text-background"
                  rounded="rounded-2xl md:rounded-3xl"
                  hoverBgColor="hover:bg-secondary"
                  className={`px-3 py-1 md:px-4 md:py-2 text-xs sm:text-sm ${pathname === '/register'
                    ? 'bg-accent text-white font-semibold'
                    : ''
                    }`}
                />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:text-secondary duration-200"
            aria-label="Toggle menu">
            {open ? (
              <X className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>

          {/* Mobile Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-12 md:top-14 w-40 md:w-48 rounded-xl border bg-background shadow-lg overflow-hidden animate-in fade-in zoom-in-95">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    block px-3 py-2 text-xs sm:text-sm hover:bg-accent
                    ${pathname === item.href
                      ? 'bg-secondary text-white font-semibold hover:bg-secondary'
                      : ''
                    }
                    ${item.hiddenOnMobile ? 'hidden md:block' : ''}
                    ${item.mobileOnly ? 'md:hidden' : ''}
                  `}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
