'use client';

import React, {createContext, useContext, useState, ReactNode} from 'react';
import {carePackages} from '@/types/data';

interface RequestCareState {
  currentStep: number;
  selectedPackage: string | null;
  packageId: string | null;
  packagePrice: number;
  selectedExtras: Array<{id: string; name: string; price: number}>;
  serviceIds: string[];
  selectedPatient: string | null;
  mobile: string;
  address: string;
  addressId: string | null;
  newAddress: {
    street: string;
    city: string;
    area: string;
    postalCode: string;
  } | null;
  symptoms: string;
  instructions: string;
  careDate: string;
  timeSlot: string;
  paymentMethod: string;
}

interface RequestCareContextType extends RequestCareState {
  next: () => void;
  prev: () => void;
  toggleExtra: (id: string, name: string, price: number) => void;
  setSelectedPackage: (
    id: string | null,
    name: string | null,
    price?: number,
  ) => void;
  setSelectedPatient: (patient: string | null) => void;
  setMobile: (mobile: string) => void;
  setAddress: (address: string) => void;
  setAddressId: (id: string | null) => void;
  setNewAddress: (
    address: {
      street: string;
      city: string;
      area: string;
      postalCode: string;
    } | null,
  ) => void;
  setSymptoms: (symptoms: string) => void;
  setInstructions: (instructions: string) => void;
  setCareDate: (date: string) => void;
  setTimeSlot: (timeSlot: string) => void;
  setPaymentMethod: (method: string) => void;
  getTotalPrice: () => number;
  isUrgent: boolean;
}

const RequestCareContext = createContext<RequestCareContextType | undefined>(
  undefined,
);

export function RequestCareProvider({children}: {children: ReactNode}) {
  const [state, setState] = useState<RequestCareState>({
    currentStep: 1,
    selectedPackage: null,
    packageId: null,
    packagePrice: 0,
    selectedExtras: [],
    serviceIds: [],
    selectedPatient: null,
    mobile: '',
    address: '',
    addressId: null,
    newAddress: null,
    symptoms: '',
    instructions: '',
    careDate: '',
    timeSlot: '',
    paymentMethod: 'card',
  });

  const next = () =>
    setState((s) => ({...s, currentStep: Math.min(s.currentStep + 1, 5)}));
  const prev = () =>
    setState((s) => ({...s, currentStep: Math.max(s.currentStep - 1, 1)}));

  const toggleExtra = (id: string, name: string, price: number) =>
    setState((s) => {
      const isSelected = s.selectedExtras.some((e) => e.id === id);
      return {
        ...s,
        selectedExtras: isSelected
          ? s.selectedExtras.filter((e) => e.id !== id)
          : [...s.selectedExtras, {id, name, price}],
        serviceIds: isSelected
          ? s.serviceIds.filter((i) => i !== id)
          : [...s.serviceIds, id],
      };
    });

  const setSelectedPackage = (
    id: string | null,
    name: string | null,
    price: number = 0,
  ) => {
    setState((s) => ({
      ...s,
      packageId: id,
      selectedPackage: name,
      packagePrice: price,
    }));
  };

  const getTotalPrice = () => {
    const extrasTotal = state.selectedExtras.reduce(
      (sum, item) => sum + item.price,
      0,
    );
    return state.packagePrice + extrasTotal;
  };

  const isUrgent = state.selectedPackage === 'Urgent Care';

  const updateField =
    <K extends keyof RequestCareState>(field: K) =>
    (value: RequestCareState[K]) =>
      setState((s) => ({...s, [field]: value}));

  return (
    <RequestCareContext.Provider
      value={{
        ...state,
        next,
        prev,
        toggleExtra,
        setSelectedPackage,
        setSelectedPatient: updateField('selectedPatient'),
        setMobile: updateField('mobile'),
        setAddress: updateField('address'),
        setAddressId: updateField('addressId'),
        setNewAddress: updateField('newAddress'),
        setSymptoms: updateField('symptoms'),
        setInstructions: updateField('instructions'),
        setCareDate: updateField('careDate'),
        setTimeSlot: updateField('timeSlot'),
        setPaymentMethod: updateField('paymentMethod'),
        getTotalPrice,
        isUrgent,
      }}>
      {children}
    </RequestCareContext.Provider>
  );
}

export function useRequestCare() {
  const context = useContext(RequestCareContext);
  if (!context) {
    throw new Error('useRequestCare must be used within RequestCareProvider');
  }
  return context;
}
