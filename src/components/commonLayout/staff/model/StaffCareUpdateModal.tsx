/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {SelectNative} from '@/components/ui/select-native';
import {
  User,
  Pill,
  FileText,
  Plus,
  X,
  Loader2,
  Upload,
  Activity,
} from 'lucide-react';
import {useUpdateCareRequestMutation} from '@/redux/api/staff.api';
import {toast} from 'sonner';
import {IPatientProfileDetail} from '@/types/user';
import {IVitals} from '../card/OngoingAppointmentCard';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface BasicInfo {
  name: string;
  age: string;
  gender: string;
  relationship: string;
  bloodGroup: string;
}

interface VitalsData {
  weight: string;
  bloodGlucose: string;
  systolic: number | string;
  diastolic: number | string;
}

const TIMING_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Night'] as const;

interface Medication {
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  specialInstructions: string;
  timing: string[];
}

const emptyMed = (): Medication => ({
  medicationName: '',
  dosage: '',
  frequency: '',
  duration: '',
  specialInstructions: '',
  timing: [],
});

interface StaffCareUpdateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  bookingId: string;
  patient?: IPatientProfileDetail;
  vitals?: IVitals;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function StaffCareUpdateModal({
  open,
  setOpen,
  bookingId,
  patient,
  vitals,
}: StaffCareUpdateModalProps) {
  console.log('patient', patient);
  // Basic Info
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: patient?.name ?? '',
    age: patient?.age?.toString() ?? '',
    gender: patient?.gender ?? '',
    relationship: patient?.relationship ?? '',
    bloodGroup: patient?.bloodType ?? '',
  });

  // Vitals
  const [vitalsState, setVitalsState] = useState<VitalsData>({
    weight: vitals?.weight || '',
    systolic: vitals?.bloodPressure
      ? Number(vitals.bloodPressure.split('/')[0]?.replace(/[^0-9.]/g, '')) ||
        ''
      : '',
    diastolic: vitals?.bloodPressure
      ? Number(vitals.bloodPressure.split('/')[1]?.replace(/[^0-9.]/g, '')) ||
        ''
      : '',
    bloodGlucose: vitals?.bloodGlucose || '',
  });

  // Medications — draft form + added list
  const [medDraft, setMedDraft] = useState<Medication>(emptyMed());
  const [draftTiming, setDraftTiming] = useState<string[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);

  // Documents
  const [documentCategory, setDocumentCategory] = useState('LAB_REPORT');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [updateCareRequest, {isLoading}] = useUpdateCareRequestMutation();

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleBasicChange = (field: keyof BasicInfo, value: string) =>
    setBasicInfo((prev) => ({...prev, [field]: value}));

  const handleVitalsChange = (field: keyof VitalsData, value: string) =>
    setVitalsState((prev) => ({
      ...prev,
      [field]:
        field === 'systolic' || field === 'diastolic'
          ? value === ''
            ? ''
            : Number(value)
          : value,
    }));

  const handleMedDraftChange = (field: keyof Medication, value: string) =>
    setMedDraft((prev) => ({...prev, [field]: value}));

  const toggleDraftTiming = (time: string) =>
    setDraftTiming((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    );

  const handleAddMedication = () => {
    if (!medDraft.medicationName.trim() || !medDraft.dosage.trim()) {
      toast.error('Medication Name and Dosage are required.');
      return;
    }
    setMedications((prev) => [...prev, {...medDraft, timing: draftTiming}]);
    setMedDraft(emptyMed());
    setDraftTiming([]);
  };

  const handleRemoveMedication = (index: number) =>
    setMedications((prev) => prev.filter((_, i) => i !== index));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    // Reset the input so same file can be re-selected
    e.target.value = '';
  };

  const handleRemoveFile = (index: number) =>
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

  // ── Save — single API call ────────────────────────────────────────────────────
  const handleSave = async () => {
    const dataPayload = {
      basicInfo: {
        name: basicInfo.name || undefined,
        age: basicInfo.age ? Number(basicInfo.age) : undefined,
        gender: basicInfo.gender || undefined,
        relationship: basicInfo.relationship || undefined,
      },
      medications: medications.length > 0 ? medications : undefined,
      documents: selectedFiles.length > 0 ? {documentCategory} : undefined,
      vitals:
        vitalsState.weight ||
        vitalsState.bloodGlucose ||
        vitalsState.systolic ||
        vitalsState.diastolic
          ? {
              weight: vitalsState.weight || undefined,
              bloodGlucose: vitalsState.bloodGlucose || undefined,
              systolic: vitalsState.systolic
                ? Number(vitalsState.systolic)
                : undefined,
              diastolic: vitalsState.diastolic
                ? Number(vitalsState.diastolic)
                : undefined,
            }
          : undefined,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(dataPayload));
    selectedFiles.forEach((file) => formData.append('documents', file));

    try {
      await updateCareRequest({bookingId, formData}).unwrap();
      toast.success('Care request updated successfully!');
      // Reset state
      setMedDraft(emptyMed());
      setDraftTiming([]);
      setMedications([]);
      setSelectedFiles([]);
      setDocumentCategory('LAB_REPORT');
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update care request.');
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <DialogTitle>
            Update Appointment —{' '}
            <span className="text-muted-foreground font-normal">
              {basicInfo.name || 'Patient'}
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="basic"
          className="flex flex-col flex-1 overflow-hidden">
          {/* Tab Nav */}
          <div className="px-6 pt-4 border-b bg-muted/40 shrink-0">
            <ScrollArea>
              <TabsList className="bg-transparent p-0">
                <TabsTrigger
                  value="basic"
                  className="cursor-pointer hover:text-secondary">
                  <User className="h-4 w-4 mr-1" /> Basic
                </TabsTrigger>
                <TabsTrigger
                  value="meds"
                  className="cursor-pointer hover:text-secondary">
                  <Pill className="h-4 w-4 mr-1" /> Medi
                  {medications.length > 0 && (
                    <span className="ml-1.5 bg-secondary text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                      {medications.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="docs"
                  className="cursor-pointer hover:text-secondary">
                  <FileText className="h-4 w-4 mr-1" /> Doc
                  {selectedFiles.length > 0 && (
                    <span className="ml-1.5 bg-secondary text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                      {selectedFiles.length}
                    </span>
                  )}
                </TabsTrigger>

                <TabsTrigger
                  value="health"
                  className="cursor-pointer hover:text-secondary">
                  <Activity className="h-4 w-4 mr-1" /> Health
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* ── Tab 1: Basic Info ────────────────────────────────────────── */}
          <TabsContent
            value="basic"
            className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input
                  placeholder="Patient name"
                  value={basicInfo.name}
                  onChange={(e) => handleBasicChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>Gender</Label>
                <SelectNative
                  value={basicInfo.gender}
                  onChange={(e) => handleBasicChange('gender', e.target.value)}>
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </SelectNative>
              </div>
              {/* <div className="space-y-1">
                <Label>Age</Label>
                <Input
                  type="number"
                  placeholder="e.g. 34"
                  value={basicInfo.age}
                  onChange={(e) => handleBasicChange('age', e.target.value)}
                />
              </div> */}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Relationship</Label>
                <SelectNative
                  value={basicInfo.relationship}
                  onChange={(e) =>
                    handleBasicChange('relationship', e.target.value)
                  }>
                  <option value="">Select relationship</option>
                  <option value="Self">Self</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="husband">Husband</option>
                  <option value="wife">Wife</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="grandfather">Grandfather</option>
                  <option value="grandmother">Grandmother</option>
                  <option value="other">Other</option>
                </SelectNative>
              </div>

              <div className="space-y-1">
                <Label>Blood Group</Label>
                <SelectNative
                  value={basicInfo.bloodGroup}
                  onChange={(e) =>
                    handleBasicChange('bloodGroup', e.target.value)
                  }>
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </SelectNative>
              </div>
            </div>

            <SaveFooter
              onCancel={handleClose}
              onSave={handleSave}
              isLoading={isLoading}
            />
          </TabsContent>

          {/* ── Tab 2: Medications ───────────────────────────────────────── */}
          <TabsContent
            value="meds"
            className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* ─ Draft Form ─ */}
            <div className="border rounded-lg p-4 space-y-3 bg-muted/20">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Add Medication
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Medication Name *</Label>
                  <Input
                    placeholder="e.g. Aspirin"
                    value={medDraft.medicationName}
                    onChange={(e) =>
                      handleMedDraftChange('medicationName', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Dosage *</Label>
                  <Input
                    placeholder="e.g. 100mg"
                    value={medDraft.dosage}
                    onChange={(e) =>
                      handleMedDraftChange('dosage', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Frequency</Label>
                  <Input
                    placeholder="e.g. After meals"
                    value={medDraft.frequency}
                    onChange={(e) =>
                      handleMedDraftChange('frequency', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Duration</Label>
                  <Input
                    placeholder="e.g. 7 days"
                    value={medDraft.duration}
                    onChange={(e) =>
                      handleMedDraftChange('duration', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Special Instructions</Label>
                <Input
                  placeholder="e.g. Take after meals"
                  value={medDraft.specialInstructions}
                  onChange={(e) =>
                    handleMedDraftChange('specialInstructions', e.target.value)
                  }
                />
              </div>

              {/* Timing toggles */}
              <div className="space-y-1.5">
                <Label className="text-xs">Timing</Label>
                <div className="flex flex-wrap gap-2">
                  {TIMING_OPTIONS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => toggleDraftTiming(time)}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        draftTiming.includes(time)
                          ? 'bg-secondary text-white'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAddMedication}
                variant="secondary"
                className="w-full text-white gap-1.5">
                <Plus className="h-4 w-4" /> Add Medication
              </Button>
            </div>

            {/* ─ Added medications preview list ─ */}
            {medications.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Added medications ({medications.length})
                </p>
                {medications.map((med, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-blue-200 bg-blue-50 p-4 hover:bg-blue-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <p className="font-medium text-sm">
                          {med.medicationName} {med.dosage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {med.frequency && `${med.frequency}`}
                          {med.duration && ` • Duration: ${med.duration}`}
                        </p>
                        {med.specialInstructions && (
                          <p className="text-xs text-blue-600 italic">
                            {med.specialInstructions}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 ml-2"
                        onClick={() => handleRemoveMedication(i)}>
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    {med.timing.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {med.timing.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-xs rounded-md bg-secondary/40 text-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <SaveFooter
              onCancel={handleClose}
              onSave={handleSave}
              isLoading={isLoading}
            />
          </TabsContent>

          {/* ── Tab 3: Documents ────────────────────────────────────────── */}
          <TabsContent
            value="docs"
            className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Document Category */}
            <div className="space-y-1">
              <Label>Document Category</Label>
              <SelectNative
                value={documentCategory}
                onChange={(e) => setDocumentCategory(e.target.value)}>
                <option value="LAB_REPORT">Lab Report</option>
                <option value="PRESCRIPTION">Prescription</option>
                <option value="IMAGING">Imaging</option>
                <option value="DISCHARGE_SUMMARY">Discharge Summary</option>
                <option value="CONSENT_FORM">Consent Form</option>
                <option value="OTHER">Other</option>
              </SelectNative>
            </div>

            {/* Drop zone */}
            <label
              htmlFor="staff-doc-upload"
              className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">
                Click to select or drag & drop files
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, JPG, PNG, DOCX — multiple files supported
              </p>
              <input
                id="staff-doc-upload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Selected files preview */}
            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Selected files ({selectedFiles.length})
                </p>
                {selectedFiles.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border rounded-lg px-4 py-3 bg-muted/30">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm truncate font-medium">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 ml-2"
                      onClick={() => handleRemoveFile(i)}>
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <SaveFooter
              onCancel={handleClose}
              onSave={handleSave}
              isLoading={isLoading}
            />
          </TabsContent>

          {/* ── Tab 4: Health Insight ────────────────────────────────────── */}
          <TabsContent
            value="health"
            className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <Activity className="h-5 w-5" />
              <h3 className="text-lg font-medium">Update Health Metrics</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label>Weight (KG)</Label>
                <Input
                  placeholder="e.g. 75"
                  value={vitalsState.weight}
                  onChange={(e) => handleVitalsChange('weight', e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label>Blood Glucose (mmol/L)</Label>
                <Input
                  placeholder="e.g. 110"
                  value={vitalsState.bloodGlucose}
                  onChange={(e) =>
                    handleVitalsChange('bloodGlucose', e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <Label>Blood Pressure - Systolic (mmHg)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 120"
                  value={vitalsState.systolic}
                  onChange={(e) =>
                    handleVitalsChange('systolic', e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <Label>Blood Pressure - Diastolic (mmHg)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 80"
                  value={vitalsState.diastolic}
                  onChange={(e) =>
                    handleVitalsChange('diastolic', e.target.value)
                  }
                />
              </div>
            </div>

            <SaveFooter
              onCancel={handleClose}
              onSave={handleSave}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// ─── Reusable footer ───────────────────────────────────────────────────────────
function SaveFooter({
  onCancel,
  onSave,
  isLoading,
}: {
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex justify-end gap-3 border-t pt-4 mt-4">
      <Button variant="outline" onClick={onCancel} disabled={isLoading}>
        Cancel
      </Button>
      <Button
        onClick={onSave}
        disabled={isLoading}
        className="bg-secondary text-background hover:bg-secondary/90 min-w-28">
        {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
        Save
      </Button>
    </div>
  );
}
