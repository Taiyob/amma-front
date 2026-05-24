/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {useStaffInvitationMutation} from '@/redux/api/staff.api';
import {toast} from 'sonner';
import {Loader2, Mail} from 'lucide-react';

interface StaffModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function StaffModal({open, setOpen}: StaffModalProps) {
  const [email, setEmail] = useState('');
  const [inviteStaff, {isLoading}] = useStaffInvitationMutation();

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email address.');
      return;
    }

    try {
      await inviteStaff({email, role: 'STAFF'}).unwrap();
      toast.success(`Invitation sent to ${email}`);
      setEmail('');
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send invitation.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold text-center">
            Invite Staff Member
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="staff@example.com"
                className="h-10 pl-9"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
            className="min-w-25">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="min-w-40 bg-secondary text-background hover:bg-secondary">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Send Invitation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
