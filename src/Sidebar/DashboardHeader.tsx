'use client';

import { BellIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/authSlice';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetMeQuery } from '@/redux/api/user.api';
import { UserProfileDropdown } from '@/shared/UserProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { baseApi } from '@/redux/api/baseApi';
import { useLogoutUserMutation } from '@/redux/features/auth/auth.api';
import { persistor } from '@/redux/store';
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
  Notification,
  notificationsApi
} from '@/redux/api/notifications.api';
import { useSocket } from '@/hooks/useSocket';
import { useEffect } from 'react';
import { X } from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    user: 'Chris Tompson',
    action: 'requested review on',
    target: 'PR #42',
    timestamp: '15 minutes ago',
    unread: true,
    image: '/origin/avatar-80-01.jpg',
  },
];

function Dot({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      height="6"
      width="6"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export default function DashboardHeader() {
  const { data: userData } = useGetMeQuery({});
  const user = userData?.data;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();
  const [searchOpen, setSearchOpen] = useState(false);

  const { data: notificationsData } = useGetNotificationsQuery({
    limit: 10,
    page: 1,
  });
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [markAsRead] = useMarkAsReadMutation();

  const notifications = notificationsData?.data || [];
  const unreadCount = notifications.filter((n: Notification) => !n.isRead).length;

  const { lastEvent } = useSocket(user?.id ? [user.id] : null);

  useEffect(() => {
    if (lastEvent?.type === 'NEW_NOTIFICATION') {
      dispatch(notificationsApi.util.invalidateTags(['notifications']));
    }
  }, [lastEvent, dispatch]);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success('All notifications marked as read');
    } catch {
      toast.error('Failed to mark all as read');
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    try {
      await markAsRead(notification.id).unwrap();

      // Handle navigation based on metadata
      if (notification.metadata?.bookingId) {
        router.push(`/shared/care-history/${notification.metadata.bookingId}`);
      }
    } catch {
      // toast.error('Failed to mark as read');
    }
  };

  // Kept here in case it's called from outside UserProfileDropdown in future
  const handleLogoutConfirm = async () => {
    const toastId = toast.loading('Logging out... Please wait a moment.');
    try {
      await logoutUser({}).unwrap();
    } catch {
      // Proceed with client-side cleanup even if backend call fails
    }
    dispatch(logout());
    await persistor.purge();
    dispatch(baseApi.util.resetApiState());
    toast.success('Logout successful', { id: toastId });
    router.push('/');
  };

  return (
    <>
      <header className="h-16 border-b bg-background flex items-center justify-between lg:justify-end px-4 lg:px-6 gap-4">
        {/* Mobile Search */}
        <div className="lg:hidden flex-1 max-w-xs">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search..."
                className="h-9"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="md:hidden">
              <SearchIcon size={16} />
            </Button>
          )}
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex lg:hidden flex-1 max-w-sm">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 h-9" />
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <BellIcon size={16} />
                {unreadCount > 0 && (
                  <Badge className="-top-2 -translate-x-1/2 absolute left-full min-w-5 px-1 text-xs text-rose-600 bg-rose-200">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-1" align="end">
              <div className="flex items-baseline justify-between gap-4 px-3 py-2">
                <div className="font-semibold text-sm">Notifications</div>
                {unreadCount > 0 && (
                  <button
                    className="font-medium text-xs hover:underline text-secondary"
                    onClick={handleMarkAllAsRead}>
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="h-px bg-border my-1" />
              <div className="max-h-75 overflow-y-auto scrollbar-hide">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="relative rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent cursor-pointer"
                      onClick={() => handleNotificationClick(n)}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/origin/avatar.jpg" alt={n.title} />
                          <AvatarFallback className="font-bold text-gray-700">
                            {n?.title?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="text-left text-foreground/80 w-full">
                            <span className="font-semibold text-foreground">
                              {n.title}
                            </span>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {n.message}
                            </p>
                          </div>
                          <div className="text-muted-foreground text-[10px]">
                            {new Date(n.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      {!n.isRead && (
                        <div className="absolute end-2 top-1/2 -translate-y-1/2">
                          <Dot className="text-secondary" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-muted-foreground text-xs uppercase tracking-wider">
                    No notifications
                  </div>
                )}
              </div>
              <div className="h-px bg-border my-1" />
              <button
                className="w-full py-2 text-xs font-semibold text-secondary hover:underline text-center"
                onClick={() => router.push('/notifications')}>
                See All Notifications
              </button>
            </PopoverContent>
          </Popover>

          {/* Avatar Dropdown */}
          {user && <UserProfileDropdown user={user} />}
        </div>
      </header>
    </>
  );
}

// Add missing XIcon component
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
