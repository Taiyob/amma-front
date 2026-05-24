'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Column } from '@/components/reUseAbleComponents/DataTable';
import { Service } from '@/types/service.type';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useDeleteServiceMutation } from '@/redux/api/services.api';
import { toast } from 'sonner';
import ServiceModal from '@/components/commonLayout/admin/components/global/ServiceModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ActionCell = ({ service }: { service: Service }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

  const handleDelete = async () => {
    try {
      await deleteService(service.id).unwrap();
      toast.success('Service deleted successfully');
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to delete service');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        onClick={() => setIsEditModalOpen(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <ServiceModal
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        service={service}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="py-2">
              Are you sure you want to delete the service <strong>{service.name}</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 ">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const ServiceColumns: Column<Service>[] = [
  {
    key: 'name',
    label: 'Name',
    className: 'min-w-[180px]',
    render: (_, row) => (
      <div className="font-medium leading-tight py-1">{row.name}</div>
    ),
  },
  {
    key: 'type',
    label: 'Type',
    className: 'min-w-[150px]',
    render: (_, row) => (
      <span className="text-sm text-muted-foreground">{row.type}</span>
    ),
  },
  {
    key: 'category',
    label: 'Category',
    className: 'w-28 text-center',
    render: (_, row) => (
      <Badge
        className={`font-medium ${row.category === 'SERVICE'
          ? 'bg-blue-100 text-blue-700 border-blue-200'
          : 'bg-purple-100 text-purple-700 border-purple-200'
          }`}
        variant="outline"
      >
        {row.category}
      </Badge>
    ),
  },
  {
    key: 'basePrice',
    label: 'Price',
    className: 'min-w-[100px]',
    render: (_, row) => (
      <span className="text-sm font-medium whitespace-nowrap">
        ${row.basePrice}
      </span>
    ),
  },
  {
    key: 'durationMinutes',
    label: 'Duration',
    className: 'min-w-[100px]',
    render: (_, row) => (
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {row.durationMinutes ? `${row.durationMinutes} mins` : 'N/A'}
      </span>
    ),
  },
  {
    key: 'isActive',
    label: 'Status',
    className: 'w-24 text-center',
    render: (_, row) => (
      <Badge
        className={`font-medium ${row.isActive
          ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
          : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        variant="outline"
      >
        {row.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    key: 'id',
    label: 'Actions',
    className: 'w-24 text-right',
    render: (_, row) => <ActionCell service={row} />,
  },
];
