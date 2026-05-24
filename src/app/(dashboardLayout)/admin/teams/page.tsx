'use client';

import { useState, Suspense } from 'react';
import TeamListTable from '@/components/reUseAbleComponents/columns/Action/TeamListTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TeamForm from '@/components/reUseAbleComponents/forms/TeamForm';
import { DashboardSkeleton } from '@/Skeleton/DashboardSkeleton';

function TeamsPageContent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">Manage your organization&apos;s team members</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#3f2a1d] hover:bg-[#2f1f15] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <TeamListTable />

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
          </DialogHeader>
          <TeamForm
            onSuccess={() => setIsAddModalOpen(false)}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default function TeamsPage() {
  return (
    <section>
      <div className="space-y-6">
        <Suspense fallback={<DashboardSkeleton />}>
          <TeamsPageContent />
        </Suspense>
      </div>
    </section>
  );
}
