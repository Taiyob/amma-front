'use client';

import PatientProfilesDetails from '@/components/commonLayout/admin/user/PatientProfilesDetails';
import { useParams } from 'next/navigation';

const UserDetails = () => {
  const { id }: { id: string } = useParams();

  return (
    <div>
      <PatientProfilesDetails id={id} />
    </div>
  );
};

export default UserDetails;
