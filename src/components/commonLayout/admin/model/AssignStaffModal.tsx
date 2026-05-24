/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useGetAllStaffQuery, useAssignStaffMutation } from '@/redux/api/staff.api';
import { useGetMeQuery } from '@/redux/api/user.api';
import { useAppSelector } from '@/redux/hooks';
import { UserCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AssignStaffModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  bookingId: string | null;
}

export default function AssignStaffModal({
  open,
  setOpen,
  bookingId,
}: AssignStaffModalProps) {
  const [selectedStaffId, setSelectedStaffId] = useState<string>('');
  const authUser = useAppSelector((state) => state.auth.user);
  const { data: profileData } = useGetMeQuery({});
  const [assignStaff, { isLoading: isAssigning }] = useAssignStaffMutation();

  console.log('authUser', authUser);

  const { data: staffData, isLoading: isStaffLoading } =
    useGetAllStaffQuery({});

  const staffList = staffData?.data || [];
  const profile = profileData?.data;

  const handleAssign = async () => {
    if (!selectedStaffId) {
      toast.error('Please select a staff member');
      return;
    }

    const providerId =
      profile?.admin?.id || profile?.provider?.id || authUser?.id;

    console.log('Assignment Payload Check:', {
      bookingId,
      staffId: selectedStaffId,
      providerId: providerId,
      profileFound: !!profile,
      authUserFound: !!authUser,
    });

    if (!providerId) {
      toast.error('Admin ID not found. Please log in again.');
      return;
    }

    try {
      const payload = {
        bookingId,
        staffId: selectedStaffId,
        providerId: providerId,
      };
      console.log('Sending Flat Payload:', payload);

      await assignStaff(payload).unwrap();

      toast.success('Staff assigned successfully');
      setOpen(false);
      setSelectedStaffId('');
    } catch (err: any) {
      console.error('Assignment Error:', err);
      toast.error(err?.data?.message || 'Failed to assign staff');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold text-center flex items-center justify-center gap-2">
            <UserCheck className="h-5 w-5 text-secondary" />
            Assign Staff Member
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 w-full">
          <div className="space-y-1.5 w-full">
            <Label htmlFor="staff" className="text-sm font-medium">
              Select Staff
            </Label>

            <Select value={selectedStaffId} onValueChange={setSelectedStaffId}>
              <SelectTrigger
                id="staff"
                className="h-12 w-full flex items-center justify-between text-left">
                <SelectValue
                  className="text-left"
                  placeholder={
                    isStaffLoading
                      ? 'Loading staff...'
                      : 'Select a staff member'
                  }
                />
              </SelectTrigger>

              <SelectContent className="w-full">
                {staffList.map((staff: any) => (
                  <SelectItem
                    key={staff.id}
                    value={staff.id}
                    className="cursor-pointer border py-1 shadow-2xs text-start my-2">
                    <div className="flex flex-col w-full">
                      <span className="font-medium">
                        {staff.name} •{' '}
                        <span className="lowercase">{staff.status}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {staff.email} • ID: {staff.staffId}
                      </span>
                    </div>
                  </SelectItem>
                ))}

                {staffList.length === 0 && !isStaffLoading && (
                  <div className="p-2 text-sm text-muted-foreground text-center">
                    No available staff found
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="min-w-24">
            Cancel
          </Button>

          <Button
            onClick={handleAssign}
            disabled={isAssigning}
            className="min-w-40 bg-secondary text-background hover:bg-secondary/90">
            {isAssigning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning...
              </>
            ) : (
              'Assign Staff'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
