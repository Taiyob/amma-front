/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SelectNative } from '@/components/ui/select-native';
import { useUpdatePatientAdminMutation } from '@/redux/api/patient.api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export enum BloodGroup {
  A_POS = 'A+',
  A_NEG = 'A-',
  B_POS = 'B+',
  B_NEG = 'B-',
  AB_POS = 'AB+',
  AB_NEG = 'AB-',
  O_POS = 'O+',
  O_NEG = 'O-',
}

export enum Relationship {
  Father = 'father',
  Mother = 'mother',
  Son = 'son',
  Daughter = 'daughter',
  Husband = 'husband',
  Wife = 'wife',
  Brother = 'brother',
  Sister = 'sister',
  Grandfather = 'grandfather',
  Grandmother = 'grandmother',
  Other = 'other',
}

type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';

interface UserInfoEditTabProps {
  patientId: string;
  initialData: {
    name: string;
    age: string;
    gender: Gender | string;
    bloodType: string;
    relationship: string;
  };
  onCancel: () => void;
}

export function UserInfoEditTab({
  patientId,
  initialData,
  onCancel,
}: UserInfoEditTabProps) {
  const [updatePatient, { isLoading }] = useUpdatePatientAdminMutation();

  const [data, setData] = useState(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updatePatient({
        id: patientId,
        data: {
          name: data.name,
          age: data.age ? Number(data.age) : undefined,
          gender: data.gender || undefined,
          bloodGroup: data.bloodType || undefined,
          relationship: data.relationship || undefined,
        },
      }).unwrap();

      toast.success('Patient info updated successfully!');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update patient info.');
    }
  };

  return (
    <TabsContent value="basic" className="p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Full Name</Label>
          <Input
            name="name"
            value={data.name}
            onChange={handleInputChange}
            placeholder="Patient name"
          />
        </div>


        <div className="space-y-1">
          <Label>Relationship</Label>
          <SelectNative
            name="relationship"
            value={data.relationship}
            onChange={handleSelectChange}>
            <option value="">Select relationship</option>
            {Object.entries(Relationship).map(([label, value]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectNative>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Gender</Label>
          <SelectNative
            name="gender"
            value={data.gender}
            onChange={handleSelectChange}>
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
            <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
          </SelectNative>
        </div>

        <div className="space-y-1">
          <Label>Blood Type</Label>
          <SelectNative
            name="bloodType"
            value={data.bloodType}
            onChange={handleSelectChange}>
            <option value="">Select blood type</option>
            {Object.values(BloodGroup).map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </SelectNative>
        </div>
      </div>


      <div className="flex justify-end gap-3 mt-6 border-t pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-secondary text-background hover:bg-secondary">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Save Changes
        </Button>
      </div>
    </TabsContent>
  );
}
