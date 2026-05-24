/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {useUpdateUserRoleMutation} from '@/redux/api/user.api';
import {IUser} from '@/types/user';
import {ChevronDownIcon, Loader2} from 'lucide-react';
import {toast} from 'sonner';

interface UserRoleActionProps {
  user: IUser;
}

export const UserRoleAction = ({user}: UserRoleActionProps) => {
  const [updateRole, {isLoading}] = useUpdateUserRoleMutation();

  const handleRoleUpdate = async (newRole: 'ADMIN' | 'STAFF' | 'PATIENT') => {
    if (user.role === newRole) return;

    try {
      await updateRole({
        id: user.id,
        data: {role: newRole},
      }).unwrap();
      toast.success(`User role updated to ${newRole}`);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update role');
    }
  };

  const getRoleStyles = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'STAFF':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'PATIENT':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-1 ${getRoleStyles(user.role)}`}
          disabled={isLoading}
          onClick={(e) => e.stopPropagation()}>
          {isLoading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            user.role
          )}
          <ChevronDownIcon className="-me-1 opacity-60" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-1"
        onClick={(e) => e.stopPropagation()}>
        {['PATIENT', 'STAFF', 'ADMIN'].map((role) => (
          <DropdownMenuItem
            key={role}
            className="cursor-pointer px-4 py-2 rounded-md"
            onSelect={(e) => {
              e.preventDefault();
              handleRoleUpdate(role as any);
            }}>
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
