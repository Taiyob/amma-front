/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAddress {
  id: string;
  userId: string;
  label: string | null;
  street: string;
  area: string;
  city: string;
  division: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  bookingId: string | null;
}

export interface IMedication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export interface IMedicalRecord {
  id: string;
  title: string;
  fileUrl: string;
  fileType: string;
  uploadedAt: string;
}

export interface IPatientProfileDetail {
  id: string;
  name: string;
  relationship: string;
  age: number | null;
  gender: string;
  bloodGroup?: string | null;
  bloodType?: string | null;
  lastVisit: string | null;
  mobileNumber: string | null;
  medicalConditions: string | null;
  medicalHistory: string | null;
  emergencyContact: string | null;
  allergies: string | null;
  currentMedications: IMedication[];
  medicalRecords: IMedicalRecord[];
  profilePhoto: string;
  visits: any[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joined: string; // ISO date string
  patientProfilesCount: number;
  address: string;
  avatarUrl: string | null;
  role: 'ADMIN' | 'STAFF' | 'PATIENT';
}

export interface IUserDetail extends Omit<IUser, 'address'> {
  primaryAddress: IAddress | null;
  patientProfiles: IPatientProfileDetail[];
}

export interface IUserResponse {
  success: boolean;
  message: string;
  meta: {
    requestId: string;
    timestamp: string;
  };
  data: {
    users: IUser[];
  };
}

export interface IUserDetailResponse {
  success: boolean;
  message: string;
  meta: {
    requestId: string;
    timestamp: string;
  };
  data: IUserDetail;
}
