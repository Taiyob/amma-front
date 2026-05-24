/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AppButton from '@/components/ui/AppButton';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, ChevronDown, ChevronUp, Download, FileText, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import UploadDocumentDialog from '../../model/UploadDocumentModal';
import { Badge } from '@/components/ui/badge';
import { useDeleteDocumentMutation } from '@/redux/api/document.api';
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
import { toast } from 'sonner';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

/** Group an array by a string key derived from each item */
function groupByDate<T>(items: T[], getKey: (item: T) => string): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}

/** Collapsible date section */
const DateSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 w-full text-left"
      >
        <span className="bg-secondary text-white hover:bg-secondary/90 cursor-pointer flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-input group-hover:bg-muted transition-colors">
          <Calendar className="h-3.5 w-3.5" />
          {label}
        </span>
        <div className="flex-1 h-px bg-border" />
        {open ? (
          <ChevronUp className="h-6 w-6 text-muted-foreground shrink-0 cursor-pointer" />
        ) : (
          <ChevronDown className="h-6 w-6 text-muted-foreground shrink-0 cursor-pointer" />
        )}
      </button>

      {open && <div className="space-y-2 pl-1">{children}</div>}
    </div>
  );
};

export const DocumentsTabContent = ({
  documents,
  visitDate,
  visitPurpose,
  patientId,
  visitId,
  bookingId,
  isReadOnly = false,
}: any) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteDocument, { isLoading }] = useDeleteDocumentMutation();

  const handleDelete = async (id: string) => {
    const loadingToast = toast.loading('Deleting document...');

    try {
      await deleteDocument(id).unwrap();

      toast.success('Document deleted successfully', {
        id: loadingToast,
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Failed to delete document. Try again.',
        { id: loadingToast },
      );
    }
  };

  // Group documents by their date (createdAt if available, else visitDate)
  const grouped = documents?.length
    ? groupByDate(documents, (doc: any) => {
      const raw = doc.createdAt || visitDate;
      return raw
        ? new Date(raw).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
        : 'Unknown Date';
    })
    : {};

  // Sort date keys descending (newest first)
  const sortedDateKeys = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <div className="space-y-8">
      {!isReadOnly && (
        <div className="flex justify-end">
          <AppButton
            icon={<Plus />}
            label="Upload documents"
            onClick={() => setIsUploadModalOpen(true)}
            bgColor="bg-secondary hover:bg-secondary"
            textColor="text-background"
          />
        </div>
      )}

      {!documents?.length && (
        <p className="p-6 border shadow-2xs rounded-lg">
          No medical records found.
        </p>
      )}

      <div className="space-y-6">
        {sortedDateKeys.map((dateLabel) => (
          <DateSection key={dateLabel} label={dateLabel}>
            {grouped[dateLabel].map((doc: any) => (
              <div
                key={doc.id}
                className="flex w-full items-center justify-between gap-4 rounded-md border border-input p-4 shadow-sm transition hover:bg-muted/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-secondary">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      {doc.title}
                      <Badge className="ml-2 bg-chart-2/30 text-chart-2">
                        {doc.documentCategory}
                      </Badge>
                    </Label>

                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(doc.createdAt || visitDate)} · {visitPurpose}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <Button
                    onClick={() => window.open(doc.fileUrl)}
                    className="flex items-center gap-2 text-sm font-medium bg-muted text-secondary hover:underline"
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  {/* DELETE CONFIRMATION */}
                  {!isReadOnly && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="flex items-center gap-2 text-sm font-medium bg-rose-100 hover:bg-rose-200 duration-300 text-rose-600">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete
                            this document from the system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            disabled={isLoading}
                            onClick={() => handleDelete(doc.id)}
                            className="bg-rose-600 hover:bg-rose-700 text-white"
                          >
                            {isLoading ? 'Deleting...' : 'Delete'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            ))}
          </DateSection>
        ))}
      </div>

      <UploadDocumentDialog
        patientId={patientId}
        visitId={visitId}
        bookingId={bookingId}
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </div>
  );
};
