/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Request {
  [x: string]: any;
  familyMemberCount: any;
  name: string;
  role: string;
  specialization: string;
  id: string;
  patient: string;
  email: string;
  relation: string;
  location: string;
  phoneNumber: string;
  service: string;
  date: string;
  time: string;
  familyMember: string;
  priority: "Urgent care" | "Routine Care" | "Physician Care" | "ROUTINE" | "URGENT";
  status: "active" | "inactive" | "pending" | "completed";
  workStatus: "On Duty" | "Active";
  age: number;
  gender: string;
  blood: string;
  lastVisit: string;
  familyPhone?: string;
  avatarUrl?: string;
}

export interface CareRequest {
  id: string;
  referenceNo: string;
  patientId: string;
  serviceId: string;
  addressId: string;
  scheduledDate: string;
  preferredTime: string;
  status: string;
  symptomsDescription: string;
  specialInstructions: string;
  totalAmount: number;
  serviceFee: number;
  discount: number;
  paidAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  priority: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  completedAt: string | null;
  bloodPressure: string;
  bloodGlucose: string;
  weight: string;
  summary: string | null;
  patient: {
    id: string;
    userId: string;
    emergencyContact: string | null;
    bloodGroup: string | null;
    allergies: string | null;
    currentMedications: string | null;
    name: string;
    relationship: string;
    gender: string;
    dateOfBirth: string;
    mobileNumber: string;
    medicalConditions: string | null;
    medicalHistory: string | null;
    profilePhoto: string | null;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
  address: {
    id: string;
    userId: string;
    label: string | null;
    street: string;
    area: string;
    city: string;
    division: string | null;
    postalCode: string;
    phoneNumber: string | null;
    latitude: number | null;
    longitude: number | null;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    patientId: string;
  };
  bookingItems: Array<{
    id: string;
    bookingId: string;
    serviceId: string;
    price: number;
    isPackage: boolean;
    createdAt: string;
    deletedAt: string | null;
    service: {
      id: string;
      name: string;
      code: string | null;
      type: string;
      category: string;
      description: string;
      imageUrl: string | null;
      icon: string | null;
      durationMinutes: number | null;
      basePrice: number;
      isActive: boolean;
      priority: string;
      createdAt: string;
      updatedAt: string;
    };
  }>;
  assignment: any;
}

export const dummyRequests: Request[] = [
  {
    id: "REQ001",
    patient: "John Doe",
    relation: "Father",
    location: "House 45",
    service: "Home Visit - General Checkup",
    date: "Jan 6, 2026",
    time: "10:00 AM",
    priority: "Physician Care",
    familyMember: "Jane Doe",
    familyPhone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    phoneNumber: "+880 1234-567890",
    status: "active",
    workStatus: "On Duty",
    age: 68,
    gender: "Male",
    blood: "A+",
    lastVisit: "",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    familyMemberCount: undefined,
    name: "",
    role: "",
    specialization: ""
  },
  {
    id: "REQ002",
    patient: "Sarah Ahmed",
    relation: "Mother",
    location: "House 78",
    service: "Lab Test - Blood Panel",
    date: "Jan 7, 2026",
    time: "2:00 PM",
    priority: "Routine Care",
    familyMember: "Ali Ahmed",
    familyPhone: "+1 (555) 987-6543",
    email: "sarah.ahmed@example.com",
    phoneNumber: "+880 9876-543210",
    status: "inactive",
    workStatus: "On Duty",
    age: 54,
    gender: "Female",
    blood: "B+",
    lastVisit: "",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    familyMemberCount: undefined,
    name: "",
    role: "",
    specialization: ""
  },
  {
    id: "REQ003",
    patient: "Ali Hassan",
    relation: "Grandmother",
    location: "House 23",
    service: "Home Visit - Follow-up",
    date: "Jan 6, 2026",
    time: "4:00 PM",
    priority: "Urgent care",
    familyMember: "Fatima Hassan",
    familyPhone: "+1 (555) 234-5678",
    email: "ali.hassan@example.com",
    phoneNumber: "+880 5678-123456",
    status: "inactive",
    workStatus: "On Duty",
    age: 72,
    gender: "Female",
    blood: "O+",
    lastVisit: "",
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    familyMemberCount: undefined,
    name: "",
    role: "",
    specialization: ""
  },
  {
    id: "REQ004",
    patient: "Michael Wong",
    relation: "Father",
    location: "House 56",
    service: "ECG Test",
    date: "Jan 8, 2026",
    time: "11:00 AM",
    priority: "Physician Care",
    familyMember: "Lisa Wong",
    familyPhone: "+1 (555) 345-6789",
    email: "michael.wong@example.com",
    phoneNumber: "+880 3456-789012",
    status: "inactive",
    workStatus: "On Duty",
    age: 65,
    gender: "Male",
    blood: "AB+",
    lastVisit: "",
    avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    familyMemberCount: undefined,
    name: "",
    role: "",
    specialization: ""
  },
];