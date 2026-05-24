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

export interface IPatient {
  id: string;
  name: string;
  mobileNumber: string;

  relationship: Relationship;
  gender: Gender;
  bloodGroup: BloodGroup;

  address?: {
    city: string;
    street: string;
    area: string;
  };
  age: number | null;

  dateOfBirth: string;

  medicalConditions?: string;
  medicalHistory?: string;
  medicalReports?: string;

  profilePhoto?: string;
}

export interface IPatientPreviousInfo {
  patientId: string;
  visitPurpose: string;
  relationship: Relationship;
  visitDocuments: string;
  visitDate: string;
  diagnosis?: string;
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';

// export interface IPatientProfileAIInsight {
//   id: string;
//   userId: string;

//   name: string;
//   relationship: string;

//   gender: Gender;

//   age: number | null;
//   dateOfBirth: string | null;

//   bloodGroup: string | null;

//   mobileNumber: string | null;
//   emergencyContact: string | null;

//   allergies: string | null;
//   currentMedications: string | null;

//   medicalConditions: string | null;
//   medicalHistory: string | null;

//   profilePhoto: string | null;

//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
// }

// extracted data type
export interface ExtractedHealthData {
  age: string | null;
  dob: string | null;
  sex: string | null;
  diagnosis: string | null;
  biopsySite: string | null;
  biopsySize: string | null;
  biopsyDepth: string | null;
  patientName: string | null;
  examinationDate: string | null;
}

// main health insight data type
export interface IHealthInsightPatient {
  id: string;
  patientId: string;
  patient: IPatient;

  overallScore: number;

  bloodPressure: string | null;
  bloodGlucose: string | null;
  weight: string | null;

  insights: string[];

  extractedData: ExtractedHealthData;

  lastUpdated: string; // ISO date
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}
