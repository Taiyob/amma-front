'use client';

import AppButton from '@/components/ui/AppButton';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useRequestCare} from '@/context/RequestCareContext';
import {useState} from 'react';
import AddPatientModal from '../../../model/AddPatientModal';
import {useGetMyPatientProfilesQuery} from '@/redux/api/patient.api';
import {IPatientProfileDetail} from '@/types/user';
import Image from 'next/image';

export const Step2 = () => {
  const {selectedPatient, setSelectedPatient} = useRequestCare();
  const [open, setOpen] = useState(false);

  const {data, isLoading} = useGetMyPatientProfilesQuery({});
  console.log(data);

  return (
    <Card className="w-full max-w-xl mx-auto border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle>Select Patient</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select
          value={selectedPatient || ''}
          onValueChange={setSelectedPatient}>
          <SelectTrigger className="w-full focus:border-secondary cursor-pointer">
            <SelectValue placeholder="Select family member" />
          </SelectTrigger>
          <SelectContent>
            {!isLoading &&
              data?.data?.map((patient: IPatientProfileDetail) => (
                <SelectItem
                  className="cursor-pointer"
                  key={patient.id}
                  value={patient.id}>
                  <Image
                    src={patient?.profilePhoto || '/default-patient.png'}
                    alt={patient.name}
                    height={200}
                    width={200}
                    className="w-8 h-8 rounded-full object-contain"
                  />
                  {patient.name} ({patient.relationship}) • {patient.age} years
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground">or</span>
          </div>
        </div>

        <AppButton
          label="Create New Patient Profile"
          className="w-full border-secondary text-background hover:bg-secondary"
          onClick={() => setOpen(true)}
          textColor=""
        />
        {/* Modal */}
        <AddPatientModal open={open} onClose={() => setOpen(false)} />
      </CardContent>
    </Card>
  );
};
