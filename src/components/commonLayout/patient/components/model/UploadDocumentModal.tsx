'use client';

import {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Upload} from 'lucide-react';
import {useUploadMedicalReportMutation} from '@/redux/api/document.api';
import {toast} from 'sonner';

export default function UploadDocumentDialog({
  open,
  onOpenChange,
  patientId,
  visitId,
  bookingId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  visitId?: string;
  bookingId?: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [documentCategory, setDocumentCategory] = useState('');

  const [uploadDocument, {isLoading}] = useUploadMedicalReportMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || !documentCategory) {
      toast.error('Please select a file and document type.');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('documents', file);
      formData.append('documentCategory', documentCategory);
      formData.append('patientId', patientId);
      if (bookingId) {
        formData.append('bookingId', bookingId);
      } else if (visitId) {
        formData.append('visitId', visitId);
      }

      const res = await uploadDocument(formData).unwrap();

      if (res.success) {
        toast.success('Medical documents uploaded successfully!');
      }

      // reset
      setFile(null);
      setDocumentCategory('');
      onOpenChange(false);
    } catch (error) {
      console.error('Upload failed', error);
      toast.error('Upload failed. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* File Upload */}
          <div>
            <Label
              htmlFor="documents"
              className="block text-sm font-medium mb-1">
              Select File *
            </Label>

            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                file
                  ? 'border-primary bg-primary/5'
                  : 'border-input hover:border-primary'
              }`}
              onClick={() => document.getElementById('documents')?.click()}>
              <Upload className="mx-auto h-8 w-8 text-blue-500 mb-2" />

              <p className="text-sm">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOC, DOCX, JPG, PNG (max 10MB)
              </p>
            </div>

            <Input
              id="documents"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Document Type */}
          <div>
            <Label
              htmlFor="documentCategory"
              className="block text-sm font-medium mb-1">
              Document Type *
            </Label>

            <select
              id="documentCategory"
              value={documentCategory}
              onChange={(e) => setDocumentCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required>
              <option value="">Select document type</option>
              <option value="LAB_REPORT">Lab Report</option>
              <option value="PRESCRIPTION">Prescription</option>
              <option value="BLOOD_TEST">Blood Test</option>
              <option value="PREVIOUS_VISIT">Previous Visit</option>
              <option value="XRAY">XRAY</option>
              <option value="MRI">MRI</option>
              <option value="CT_SCAN">CT Scan</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-secondary text-background hover:bg-secondary">
            {isLoading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
