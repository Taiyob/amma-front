'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { LogOutIcon, ChevronDownIcon, LayoutDashboard } from 'lucide-react';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/authSlice';
import { toast } from 'sonner';
import { baseApi } from '@/redux/api/baseApi';
import { Badge } from '@/components/ui/badge';
import { useLogoutUserMutation } from '@/redux/features/auth/auth.api';
import { persistor } from '@/redux/store';

interface UserProfileDropdownProps {
  user: {
    displayName?: string;
    email?: string;
    photoURL?: string | null;
    role?: string;
  };
  refetch?: () => void;
}

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    try {
      // 1. Call backend to clear HttpOnly cookie (fixes live-site logout bug)
      await logoutUser({}).unwrap();
    } catch {
      // Even if backend call fails, proceed with client-side cleanup
    }

    // 2. Clear Redux state
    dispatch(logout());

    // 3. Clear redux-persist localStorage
    await persistor.purge();

    // 4. Clear RTK Query cache
    dispatch(baseApi.util.resetApiState());

    setLogoutDialogOpen(false);
    toast.success('Logout successful', { id: toastId });
    router.push('/');
  };

  const handleDashboardRedirect = () => {
    if (!user?.role) return router.push('/');
    switch (user.role.toUpperCase()) {
      case 'ADMIN':
        router.push('/admin/dashboard');
        break;
      case 'STAFF':
        router.push('/staff/dashboard');
        break;
      case 'PATIENT':
        router.push('/patient/dashboard');
        break;
      default:
        router.push('/');
    }
  };

  const showDashboardLink =
    !pathname.startsWith('/admin/dashboard') &&
    !pathname.startsWith('/staff/dashboard') &&
    !pathname.startsWith('/patient/dashboard');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.photoURL || '/origin/avatar.jpg'}
              alt="Profile image"
            />
            <AvatarFallback className="font-bold text-gray-700">
              {user?.displayName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon size={16} className="opacity-60 hidden lg:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="flex flex-col gap-1 p-4">
          <span className="font-medium text-sm truncate">
            {user?.displayName} <Badge>{user?.role}</Badge>
          </span>

          <div className="flex  justify-between">
            <span className="text-xs text-muted-foreground truncate">
              {user?.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {showDashboardLink && (
            <DropdownMenuItem
              onClick={handleDashboardRedirect}
              className="cursor-pointer">
              <LayoutDashboard size={16} className="opacity-60 mr-2" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setLogoutDialogOpen(true)}
          className="cursor-pointer text-destructive">
          <LogOutIcon size={16} className="opacity-60 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* Logout confirmation */}
      {logoutDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-background p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Confirm Logout</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to logout? You will need to sign in again.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setLogoutDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-rose-500 hover:bg-rose-400 text-white"
                onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </DropdownMenu>
  );
}
