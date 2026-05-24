/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useState} from 'react';
import AppButton from '@/components/ui/AppButton';
import {PatientProfileCard} from '../../card/UserProfileCard';
import {Plus} from 'lucide-react';
import AddPatientModal from '../../model/AddPatientModal';
import {useGetMyPatientProfilesQuery} from '@/redux/api/patient.api';

const PatientProfilesPage = () => {
  const [open, setOpen] = useState(false);
  const {data: profilesResponse, isLoading} = useGetMyPatientProfilesQuery({});

  const patients = profilesResponse?.data || [];

  console.log(patients);

  return (
    <div className="space-y-6">
      {/* Add button */}
      <div className="flex justify-end">
        <AppButton
          label="Add Patient Profile"
          icon={<Plus />}
          onClick={() => setOpen(true)}
          className="bg-secondary hover:bg-secondary"
          textColor="text-background"
        />
      </div>

      {/* Modal */}
      <AddPatientModal open={open} onClose={() => setOpen(false)} />

      {/* Grid of Patient Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-10 text-center">
            Loading profiles...
          </div>
        ) : patients.length === 0 ? (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            No patient profiles found. Add your first one!
          </div>
        ) : (
          patients.map((patient: any) => {
            let latestAddress = null;

            if (
              Array.isArray(patient.addresses) &&
              patient.addresses.length > 0
            ) {
              latestAddress = [...patient.addresses].sort((a: any, b: any) => {
                const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                return bTime - aTime;
              })[0];
            }

            const formattedAddress = latestAddress
              ? [latestAddress.city, latestAddress.street, latestAddress.area]
                  .filter(Boolean)
                  .join(', ')
              : 'No Address';

            return (
              <PatientProfileCard
                key={patient.id}
                name={patient?.name}
                relation={patient.relationship}
                age={patient.age}
                lastVisit={patient.lastVisit || 'N/A'}
                conditions={
                  patient.medicalConditions || patient.conditions || 'None'
                }
                avatarUrl={patient.profilePhoto}
                patientId={patient.id}
                address={formattedAddress}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default PatientProfilesPage;
