'use client';

import { useState } from 'react';
import { DataTable } from '@/components/reUseAbleComponents/DataTable';
import { PatientProfilesColumns } from '@/components/reUseAbleComponents/columns/PatientProfilesColumns';
import EditPatientModal from '../model/EditPatientModal';

// shadcn/ui components
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

// lucide icons
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  User,
  Plus,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import AppButton from '@/components/ui/AppButton';
import AddPatientModal from '../../patient/components/model/AddPatientModal';
import { useGetSingleUserQuery } from '@/redux/api/user.api';
import { useGetPatientsByUserQuery } from '@/redux/api/patient.api';
import { IPatientProfileDetail } from '@/types/user';
import { useRouter } from 'next/navigation';

interface PatientProfilesDetailsProps {
  id: string;
}

function PatientProfilesDetails({ id }: PatientProfilesDetailsProps) {
  const { data: response, isLoading: isUserLoading, isError: isUserError } = useGetSingleUserQuery(id);
  const user = response?.data;

  const { data: patientsResponse, isLoading: isPatientsLoading } = useGetPatientsByUserQuery(id);

  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const profiles = patientsResponse?.data || [];

  const selectedPatient = selectedPatientId
    ? profiles.find((p: IPatientProfileDetail) => p.id === selectedPatientId) || null
    : null;

  const handleEdit = (row: IPatientProfileDetail) => {
    setSelectedPatientId(row.id);
    setIsEditOpen(true);
  };

  const handleRowClick = (row: IPatientProfileDetail) => {
    router.push(`/shared/user-profile/${row.id}`);
  };

  // We pass handleEdit to columns so the edit button works
  const columns = PatientProfilesColumns(handleEdit);

  if (isUserLoading || isPatientsLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isUserError || !user) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
        <p className="text-destructive font-medium">
          Failed to load user details.
        </p>
        <AppButton label="Go Back" href="/admin/user-list" />
      </div>
    );
  }


  const address = user.primaryAddress;
  const locationText = address
    ? `${address.street}, ${address.area}, ${address.city}`
    : 'No address set';

  return (
    <div className="space-y-6">
      <AppButton
        label="Back"
        icon={<ArrowLeft />}
        onClick={() => router.back()}
        bgColor="hover:bg-secondary bg-secondary"
        textColor="text-background"
      />
      {/* User Info Card */}
      <Card className="p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{address?.city || 'Not specified'}</span>
            </div>
          </div>

          <Badge
            variant="outline"
            className={`px-3 py-1 text-sm font-medium self-start sm:self-auto ${user.status === 'active'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}>
            {user.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Email
              </Label>
              <p className="text-sm font-medium mt-0.5">{user.email}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Phone
              </Label>
              <p className="text-sm font-medium mt-0.5">{user.phone || '—'}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Location
              </Label>
              <p className="text-sm font-medium mt-0.5">{locationText}</p>
            </div>
          </div>

          {/* Joined */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Joined
              </Label>
              <p className="text-sm font-medium mt-0.5">
                {user.joined ? new Date(user.joined).toLocaleDateString() : '—'}
              </p>
            </div>
          </div>

          {/* Patient Profiles Count */}
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Patient Profiles
              </Label>
              <p className="text-sm font-medium mt-0.5">
                {user.patientProfilesCount} profiles
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Patient Profiles Table Section */}
      <Card className="space-y-4 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Patient Profiles</h3>
            <p className="text-sm text-muted-foreground">
              Manage profiles under this user
            </p>
          </div>
          <AppButton
            label="Add Profile"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => setIsAddOpen(true)}
            bgColor="bg-secondary hover:bg-secondary "
            textColor="text-background"
          />
        </div>

        <DataTable
          columns={columns}
          data={profiles}
          emptyMessage="No patient profiles found"
          onRowClick={handleRowClick}
        />
      </Card>

      {/* Modals */}
      <EditPatientModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        patient={selectedPatient}
      />

      <AddPatientModal open={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}

export default PatientProfilesDetails;
