// app/types/Register.types.ts
export type FormStep = 1 | 2 | 3 | 4 | 5;

export interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  otp?: string;

  patientName: string;
  relationship: string;
  dateOfBirth: string;
  mobileNumber: string;
  gender: string;
  bloodGroup: string;
  address: {
    street: string;
    city: string;
    area: string;
  };
  medicalConditions: string;
  medicalHistory: string;
  serviceType: string;
  indication: string;
  preferredDate: string;
  preferredTime: string;
  paymentMethod: string;
  profilePhoto?: any;
}

export const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  patientName: '',
  relationship: '',
  dateOfBirth: '',
  mobileNumber: '',
  gender: '',
  bloodGroup: '',
  address: {
    street: '',
    city: '',
    area: '',
  },
  medicalConditions: '',
  medicalHistory: '',
  serviceType: '',
  indication: '',
  preferredDate: '',
  preferredTime: '',
  paymentMethod: '',
};
