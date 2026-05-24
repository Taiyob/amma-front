/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {useUpdateUserStatusMutation} from '@/redux/api/user.api';
import {IUser} from '@/types/user';
import {ChevronDownIcon, Loader2} from 'lucide-react';
import {toast} from 'sonner';

interface UserStatusActionProps {
  user: IUser;
}

export const UserStatusAction = ({user}: UserStatusActionProps) => {
  const [updateStatus, {isLoading}] = useUpdateUserStatusMutation();

  const handleStatusUpdate = async (newStatus: 'active' | 'inactive') => {
    if (user.status === newStatus) return;

    try {
      await updateStatus({
        id: user.id,
        data: {status: newStatus},
      }).unwrap();
      toast.success(`User status updated to ${newStatus}`);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-1 ${
            user.status === 'active'
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          disabled={isLoading}
          onClick={(e) => e.stopPropagation()}>
          {isLoading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : user.status === 'active' ? (
            'Active'
          ) : (
            'Inactive'
          )}
          <ChevronDownIcon className="-me-1 opacity-60" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-1"
        onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem
          className="cursor-pointer px-4 py-2 rounded-md"
          onSelect={(e) => {
            e.preventDefault();
            handleStatusUpdate('active');
          }}>
          Active
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer px-4 py-2 rounded-md"
          onSelect={(e) => {
            e.preventDefault();
            handleStatusUpdate('inactive');
          }}>
          Inactive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
