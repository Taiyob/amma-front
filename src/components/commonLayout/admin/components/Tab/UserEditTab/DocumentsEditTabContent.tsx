/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, X, Loader2 } from 'lucide-react';
import UploadFile from '@/components/commonLayout/patient/components/upload/useUploade';
import {
  useUploadDocumentPatientMutation,
  useDeleteDocumentPatientMutation,
} from '@/redux/api/patient.api';
import { toast } from 'sonner';
import { useState } from 'react';

interface MedicalRecord {
  id: string;
  title: string;
  fileUrl: string;
  fileType: string;
  uploadedAt: string;
}

interface DocumentsEditTabContentProps {
  patientId: string;
  existingDocuments: MedicalRecord[];
  onCancel: () => void;
}

export function DocumentsEditTabContent({
  patientId,
  existingDocuments,
  onCancel,
}: DocumentsEditTabContentProps) {
  const [uploadDocument, { isLoading: isUploading }] =
    useUploadDocumentPatientMutation();
  const [deleteDocument, { isLoading: isDeleting }] =
    useDeleteDocumentPatientMutation();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [title, setTitle] = useState(''); // ✅ title state

  const handleUpload = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title.');
      return;
    }

    if (pendingFiles.length === 0) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', pendingFiles[0]);
    formData.append('title', title); // ✅ append title

    try {
      await uploadDocument({ id: patientId, data: formData }).unwrap();
      toast.success('Document uploaded successfully!');
      setPendingFiles([]);
      setTitle(''); // ✅ reset title
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to upload document.');
    }
  };

  const handleDelete = async (docId: string) => {
    setDeletingId(docId);
    try {
      await deleteDocument(docId).unwrap();
      toast.success('Document deleted.');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to delete document.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <TabsContent value="docs" className="p-6 space-y-6">
      <div>
        <h3 className="font-medium text-lg mb-3">Upload Document</h3>

        {/* ✅ Title Input */}
        <Input
          placeholder="Enter document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3"
        />

        <UploadFile onChange={(files) => setPendingFiles(files)} />

        {pendingFiles.length > 0 && (
          <Button
            className="mt-3 bg-secondary text-background hover:bg-secondary"
            onClick={handleUpload}
            disabled={isUploading}>
            {isUploading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Upload
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Existing Documents</h3>
        {existingDocuments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No documents uploaded yet.
          </p>
        ) : (
          existingDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex justify-between items-center border p-4 rounded-lg">
              <div className="flex gap-3 items-center overflow-hidden">
                <FileText className="text-primary shrink-0 h-5 w-5" />
                <div className="overflow-hidden">
                  <p className="font-medium text-sm truncate">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.fileType} •{' '}
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                disabled={isDeleting && deletingId === doc.id}
                onClick={() => handleDelete(doc.id)}>
                {isDeleting && deletingId === doc.id ? (
                  <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                ) : (
                  <X className="h-4 w-4 text-destructive" />
                )}
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button variant="outline" onClick={onCancel}>
          Close
        </Button>
      </div>
    </TabsContent>
  );
}
