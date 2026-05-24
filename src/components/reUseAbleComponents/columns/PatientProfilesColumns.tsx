/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Column } from '@/components/reUseAbleComponents/DataTable';
import { Edit, Trash, MoreVertical, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { IPatientProfileDetail } from '@/types/user';
import { useDeletePatientByAdminMutation, useDeletePatientMutation } from '@/redux/api/patient.api';
import { toast } from 'sonner';

// ─── Delete Action Component (Desktop) ────────────────────────────────────
function PatientDeleteAction({ patientId }: { patientId: string }) {
  const [deletePatient, { isLoading }] = useDeletePatientMutation();

  const handleConfirmDelete = async () => {
    try {
      await deletePatient(patientId).unwrap();
      toast.success('Patient profile deleted successfully');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to delete patient profile');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          disabled={isLoading}
          onClick={(e) => e.stopPropagation()}
          aria-label="Delete">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Patient Profile?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this patient profile? This action
            cannot be undone and all associated data will be permanently
            removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleConfirmDelete}>
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Delete Menu Item (Mobile) ─────────────────────────────────────────────
function PatientDeleteMenuItem({ patientId }: { patientId: string }) {
  const [deletePatient, { isLoading }] = useDeletePatientByAdminMutation();

  const handleConfirmDelete = async () => {
    try {
      await deletePatient(patientId).unwrap();
      toast.success('Patient profile deleted successfully');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to delete patient profile');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
          disabled={isLoading}
          onSelect={(e) => e.preventDefault()}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
          <span>Delete</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Patient Profile?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this patient profile? This action
            cannot be undone and all associated data will be permanently
            removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleConfirmDelete}>
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Column Definitions ────────────────────────────────────────────────────
export const PatientProfilesColumns = (
  onEdit: (row: IPatientProfileDetail) => void,
): Column<IPatientProfileDetail>[] => [
    {
      key: 'serial',
      label: '#',
      className: 'w-12 md:w-16 font-medium',
      render: (_, __, index) => index + 1,
    },
    {
      key: 'name',
      label: 'Name',
      className: 'min-w-[140px] md:min-w-[180px]',
      render: (_, row) => (
        <div className="font-medium text-sm md:text-base">{row.name}</div>
      ),
    },
    {
      key: 'relationship',
      label: 'Relation',
      className: 'w-24 md:w-auto capitalize',
      responsiveHide: 'sm',
      render: (_, row) => (
        <span className="text-sm">{row.relationship || '—'}</span>
      ),
    },
    {
      key: 'age',
      label: 'Age',
      className: 'w-16 md:w-auto',
      render: (_, row) => (
        <div className="text-sm">{row.age ? `${row.age} yrs` : '—'}</div>
      ),
    },
    {
      key: 'gender',
      label: 'Gender',
      className: 'w-20 md:w-auto',
      responsiveHide: 'sm',
      render: (_, row) => <span className="text-sm">{row.gender || '—'}</span>,
    },
    {
      key: 'bloodType',
      label: 'Blood Type',
      className: 'w-24 md:w-auto',
      responsiveHide: 'md',
      render: (_, row) => (
        <div className="text-sm font-medium">
          {row.bloodGroup || <span className="text-muted-foreground">—</span>}
        </div>
      ),
    },
    {
      key: 'lastVisit',
      label: 'Last Visit',
      className: 'min-w-[100px] md:min-w-[120px]',
      responsiveHide: 'sm',
      render: (_, row) => {
        const lastVisitDate = row.lastVisit
          ? new Date(row.lastVisit).toLocaleDateString()
          : 'No visit recorded';

        return (
          <div className="text-sm" title={lastVisitDate}>
            {formatLastVisit(row.lastVisit)}
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      className: 'w-20 md:w-32',
      render: (_, row) => (
        <div
          className="flex justify-end gap-2 md:gap-3"
          onClick={(e) => e.stopPropagation()}>
          {/* Desktop buttons */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row);
              }}
              aria-label="Edit">
              <Edit className="h-4 w-4" />
            </Button>
            <PatientDeleteAction patientId={row.id} />
          </div>

          {/* Mobile dropdown */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(row);
                  }}>
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <PatientDeleteMenuItem patientId={row.id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ),
    },
  ];

const formatLastVisit = (dateString?: string | null) => {
  if (!dateString) return '—';

  const visitDate = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - visitDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  if (diffDays < 30) return `${diffDays} days ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12)
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
};
