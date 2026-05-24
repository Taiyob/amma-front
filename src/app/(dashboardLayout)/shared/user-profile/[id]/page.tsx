/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useParams, useRouter} from 'next/navigation';
import AppButton from '@/components/ui/AppButton';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ArrowLeft} from 'lucide-react';
import {NextAppointmentAndVisitHistoryCard} from '@/components/commonLayout/patient/components/card/NextAppointmentAndVisithistoryCard';

import HealthSummaryCard from '@/shared/HealthSummaryCard';
import {
  useGetSinglePatientAiInsightQuery,
  useGetSinglePatientProfilesQuery,
} from '@/redux/api/patient.api';
import Image from 'next/image';
import {IHealthInsightPatient} from '@/types/patient';
import UpdateHealthModal from './_components/UpdateHealthModal';

import {useAppSelector} from '@/redux/hooks';

const ProfileDetails = () => {
  const {id} = useParams<{id: string}>();
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role || 'PATIENT';
  const router = useRouter();

  const {data: patientAiHealth} = useGetSinglePatientAiInsightQuery(id);

  const {data: patientsData, isLoading: isPatientsLoading} =
    useGetSinglePatientProfilesQuery(id);

  const aiHealthInsight: IHealthInsightPatient | null =
    patientAiHealth?.data ?? null;

  const patient = patientsData?.data;

  if (isPatientsLoading) {
    return <p className="text-center py-6">Loading patient details...</p>;
  }

  if (!patient) {
    return <p className="text-center py-6">Patient not found!</p>;
  }

  // Address formatting
  let latestAddress = null;

  if (Array.isArray(patient.addresses) && patient.addresses.length > 0) {
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
    : 'N/A';

  // Personal Info Dynamic Values
  const fullName = patient.name || 'N/A';

  const dob = patient.dateOfBirth
    ? new Date(patient.dateOfBirth).toLocaleDateString()
    : 'N/A';

  const gender = patient.gender || 'N/A';

  const bloodType = patient.bloodGroup || 'N/A';

  const address = formattedAddress || 'N/A';

  const phone = patient.mobileNumber || 'N/A';
  const image = patient.profilePhoto || '/default-patient.png';

  // Safe AI Values
  const current = {
    weight: aiHealthInsight?.weight || 'N/A',
    systolic: aiHealthInsight?.bloodPressure?.split('/')?.[0] || 'N/A',
    diastolic: aiHealthInsight?.bloodPressure?.split('/')?.[1] || 'N/A',
    glucose: aiHealthInsight?.bloodGlucose || 'N/A',
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 mx-auto ">
      {/* Back & Edit */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppButton
          label="Back"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => router.back()}
          bgColor="bg-secondary hover:bg-secondary/90"
          textColor="text-background"
        />
        {role === 'STAFF' ? (
          ''
        ) : (
          <AppButton
            label="Edit Profile"
            href={`/shared/edit-profile/${patient.id}`}
            bgColor="bg-secondary hover:bg-secondary/80"
            textColor="text-background"
          />
        )}
      </div>

      {/* Update Health Modal */}
      <div className="flex justify-end">
        {(aiHealthInsight || role === 'ADMIN') && patient?.id && (
          <UpdateHealthModal
            current={current}
            patientId={patient.id}
            insightsId={aiHealthInsight?.id}
          />
        )}
      </div>

      {/* Patient Header */}
      <Card className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Image
          src={image}
          alt={patient.name || 'Patient'}
          height={100}
          width={100}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
        />

        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-xl font-semibold">{patient.name}</h2>
          <p className="text-sm text-muted-foreground">
            {patient.relationship} · {patient.age || 'N/A'} years
          </p>
          <p className="text-xs text-muted-foreground">
            {patient.gender} · Blood Type: {patient.bloodGroup || 'N/A'}
          </p>
        </div>
      </Card>

      {/* Health Summary */}
      <HealthSummaryCard
        overallScore={aiHealthInsight?.overallScore}
        lastUpdated={
          aiHealthInsight?.updatedAt
            ? new Date(aiHealthInsight.updatedAt).toLocaleDateString()
            : 'N/A'
        }
        bloodPressure={aiHealthInsight?.bloodPressure || 'N/A'}
        bloodGlucose={aiHealthInsight?.bloodGlucose || 'N/A'}
        weight={
          aiHealthInsight?.weight ? `${aiHealthInsight.weight} KG` : 'N/A'
        }
      />

      {/* Personal Information Card */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">👤</span>
            <CardTitle className="text-lg font-semibold">
              Personal Information
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Full Name</p>
              <p className="font-medium">{fullName}</p>
            </div>

            <div>
              <p className="text-muted-foreground mb-1">Date of Birth</p>
              <p className="font-medium">{dob}</p>
            </div>

            <div>
              <p className="text-muted-foreground mb-1">Gender</p>
              <p className="font-medium">{gender}</p>
            </div>

            <div>
              <p className="text-muted-foreground mb-1">Blood Type</p>
              <p className="font-medium">{bloodType}</p>
            </div>

            <div>
              <p className="text-muted-foreground mb-1">Address</p>
              <p className="font-medium">{address}</p>
            </div>

            <div>
              <p className="text-muted-foreground mb-1">Phone</p>
              <p className="font-medium">{phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medical Conditions */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg text-secondary">📋</span>
              <CardTitle className="text-lg font-semibold">
                Medical Conditions
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {patient.medicalConditions || 'No medical conditions recorded.'}
            </p>
          </CardContent>
        </Card>

        {/* Medical History */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg text-secondary">📜</span>
              <CardTitle className="text-lg font-semibold">
                Medical History
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {patient.medicalHistory || 'No medical history recorded.'}
            </p>
          </CardContent>
        </Card>
      </div>

      <NextAppointmentAndVisitHistoryCard patient={patient?.id} />
    </div>
  );
};

export default ProfileDetails;

// 'use client';

// import {useState} from 'react';
// import {useParams, useSearchParams} from 'next/navigation';
// import AppButton from '@/components/ui/AppButton';
// import {Card, CardContent, CardHeader} from '@/components/ui/card';
// import {ArrowLeft} from 'lucide-react';
// import {NextAppointmentAndVisitHistoryCard} from '@/components/commonLayout/patient/components/card/NextAppointmentAndVisithistoryCard';

// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {Button} from '@/components/ui/button';
// import {Input} from '@/components/ui/input';
// import {Label} from '@/components/ui/label';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import HealthSummaryCard from '@/shared/HealthSummaryCard';
// import {
//   useGetSinglePatientAiInsightQuery,
//   useGetSinglePatientProfilesQuery,
// } from '@/redux/api/patient.api';
// import Image from 'next/image';
// import {IHealthInsightPatient} from '@/types/patient';

// const ProfileDetails = () => {
//   const {id} = useParams<{id: string}>();
//   const searchParams = useSearchParams();
//   const [open, setOpen] = useState(false);
//   const role = searchParams.get('role') || 'PATIENT';

//   const {data: patientAiHealth, isLoading} =
//     useGetSinglePatientAiInsightQuery(id);

//   const {data: patientsData, isLoading: isPatientsLoading} =
//     useGetSinglePatientProfilesQuery(id);

//   console.log('[patientAiHealth]', patientAiHealth);
//   console.log('[patientsData]', patientsData);

//   const aiHealthInsight: IHealthInsightPatient = patientAiHealth?.data;
//   const patient = patientsData?.data;

//   if (isPatientsLoading) {
//     return <p className="text-center py-6">Loading patient details...</p>;
//   }

//   if (!patient) {
//     return <p className="text-center py-6">Patient not found!</p>;
//   }

//   let backUrl = '/login';
//   switch (role.toUpperCase()) {
//     case 'ADMIN':
//       backUrl = '/admin/pending-requests';
//       break;
//     case 'PATIENT':
//       backUrl = '/patient/profile';
//       break;
//     case 'STAFF':
//       backUrl = '/staff/dashboard';
//       break;
//   }

//   // Address formatting
//   const formattedAddress = patient.address
//     ? `${patient.address.street}, ${patient.address.area}, ${patient.address.city}`
//     : 'N/A';

//   // Hardcoded current & previous values (match your screenshot)
//   const current = {
//     weight: aiHealthInsight?.weight || 'N/A',
//     systolic: aiHealthInsight?.bloodPressure?.split('/')[0] || 'N/A',
//     diastolic: aiHealthInsight?.bloodPressure?.split('/')[1] || 'N/A',
//     glucose: aiHealthInsight?.bloodGlucose || 'N/A',
//   };

//   const previousReadings = [
//     {
//       date: 'Jan 14, 2026, 10:30 AM',
//       bp: '142/89mmHg',
//       glucose: '112mg/dL',
//       weight: '183KG',
//     },
//     {
//       date: 'Jan 7, 2026, 09:15 AM',
//       bp: '138/85mmHg',
//       glucose: '108mg/dL',
//       weight: '185KG',
//     },
//     {
//       date: 'Dec 31, 2025, 08:00 AM',
//       bp: '145/92mmHg',
//       glucose: '115mg/dL',
//       weight: '186KG',
//     },
//   ];

//   const handleUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Update submitted');
//     setOpen(false);
//   };

//   return (
//     <div className="space-y-6 p-4 sm:p-6 lg:p-8 mx-auto ">
//       {/* Back & Edit */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <AppButton
//           label="Back"
//           icon={<ArrowLeft className="w-4 h-4" />}
//           href={backUrl}
//           bgColor="bg-secondary hover:bg-secondary/90"
//           textColor="text-background"
//         />
//         {role === 'ADMIN' ? (
//           ''
//         ) : (
//           <AppButton
//             label="Edit Profile"
//             href={`/shared/edit-profile/${patient.id}?role=${role}`}
//             bgColor="bg-secondary hover:bg-secondary/90"
//             textColor="text-background"
//           />
//         )}
//       </div>

//       {/* Update Health Details Button → opens modal */}
//       <div className="flex justify-end">
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             {role === 'ADMIN' ? (
//               ''
//             ) : (
//               <Button className="bg-secondary hover:bg-secondary text-white px-6 py-2 rounded-lg">
//                 Update Health Details
//               </Button>
//             )}
//           </DialogTrigger>

//           <DialogContent className="sm:max-w-150 p-0 overflow-hidden">
//             <form onSubmit={handleUpdate}>
//               <div className="p-6 bg-white flex flex-col gap-6">
//                 {/* Header */}
//                 <div className="flex justify-between items-center">
//                   <DialogTitle className="text-base font-bold text-neutral-950">
//                     Update health details
//                   </DialogTitle>
//                   <Button
//                     type="submit"
//                     className="w-28 bg-orange-400 hover:bg-orange-500 text-white font-medium">
//                     Update
//                   </Button>
//                 </div>

//                 {/* Form Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label className="text-sm text-gray-600">
//                       Weight (KG)
//                     </Label>
//                     <Input
//                       defaultValue={current.weight}
//                       className="rounded-[10px] border-gray-300"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label className="text-sm text-gray-600">
//                       Blood Pressure - Diastolic (mmHg)
//                     </Label>
//                     <Input
//                       defaultValue={current.diastolic}
//                       className="rounded-[10px] border-gray-300"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label className="text-sm text-gray-600">
//                       Blood Pressure - Systolic (mmHg)
//                     </Label>
//                     <Input
//                       defaultValue={current.systolic}
//                       className="rounded-[10px] border-gray-300"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label className="text-sm text-gray-600">
//                       Blood Glucose (mg/dL)
//                     </Label>
//                     <Input
//                       defaultValue={current.glucose}
//                       className="rounded-[10px] border-gray-300"
//                     />
//                   </div>
//                 </div>

//                 {/* Previous Readings */}
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <h3 className="text-base font-bold text-neutral-950">
//                       Previous Readings
//                     </h3>
//                     <span className="text-sm text-gray-500">
//                       ({previousReadings.length} total)
//                     </span>
//                   </div>

//                   <div className="border rounded-lg overflow-hidden">
//                     <Table>
//                       <TableHeader className="bg-gray-50">
//                         <TableRow>
//                           <TableHead className="w-1/4">Date & Time</TableHead>
//                           <TableHead>Blood Pressure</TableHead>
//                           <TableHead>Blood Glucose</TableHead>
//                           <TableHead className="text-right">Weight</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {previousReadings.map((reading, idx) => (
//                           <TableRow key={idx}>
//                             <TableCell className="font-medium">
//                               {reading.date}
//                             </TableCell>
//                             <TableCell>{reading.bp}</TableCell>
//                             <TableCell>{reading.glucose}</TableCell>
//                             <TableCell className="text-right">
//                               {reading.weight}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Patient Header */}
//       <Card className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
//         <Image
//           src={
//             patient.profilePhoto ||
//             'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
//           }
//           alt={patient.name || 'Patient'}
//           height={100}
//           width={100}
//           className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
//         />

//         <div className="space-y-1 text-center sm:text-left">
//           <h2 className="text-xl font-semibold">{patient.name}</h2>
//           <p className="text-sm text-muted-foreground">
//             {patient.relationship} · {patient.age || 'N/A'} years
//           </p>
//           <p className="text-xs text-muted-foreground">
//             {patient.gender} · Blood Type: {patient.bloodGroup || 'N/A'}
//           </p>
//         </div>
//       </Card>

//       <HealthSummaryCard
//         overallScore={aiHealthInsight.overallScore}
//         lastUpdated={new Date(aiHealthInsight.updatedAt).toLocaleDateString()}
//         bloodPressure={aiHealthInsight.bloodPressure || 'N/A'}
//         bloodGlucose={aiHealthInsight.bloodGlucose || 'N/A'}
//         weight={
//           aiHealthInsight.weight ? `${aiHealthInsight.weight} KG` : 'N/A'
//         }
//         fullName={patient.name}
//         dob={patient.dateOfBirth || 'N/A'}
//         gender={patient.gender}
//         bloodType={patient.bloodGroup || 'N/A'}
//         address={formattedAddress}
//         phone={patient.mobileNumber || 'N/A'}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Medical Conditions */}
//         <Card className="p-6 border shadow-sm">
//           <CardHeader className="p-0 pb-4">
//             <h3 className="text-lg font-semibold flex items-center gap-2">
//               <span className="text-secondary text-2xl">📋</span> Medical
//               Conditions
//             </h3>
//           </CardHeader>
//           <CardContent className="p-0">
//             <p className="text-sm text-muted-foreground whitespace-pre-wrap">
//               {patient.medicalConditions || 'No medical conditions recorded.'}
//             </p>
//           </CardContent>
//         </Card>

//         {/* Medical History */}
//         <Card className="p-6 border shadow-sm">
//           <CardHeader className="p-0 pb-4">
//             <h3 className="text-lg font-semibold flex items-center gap-2">
//               <span className="text-secondary text-2xl">📜</span> Medical
//               History
//             </h3>
//           </CardHeader>
//           <CardContent className="p-0">
//             <p className="text-sm text-muted-foreground whitespace-pre-wrap">
//               {patient.medicalHistory || 'No medical history recorded.'}
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <NextAppointmentAndVisitHistoryCard patientId={patient.id} />
//     </div>
//   );
// };

// export default ProfileDetails;
