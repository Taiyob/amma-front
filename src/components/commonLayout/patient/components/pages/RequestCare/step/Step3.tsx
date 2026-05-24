/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useRequestCare} from '@/context/RequestCareContext';
import {useGetAddressQuery} from '@/redux/api/booking.api';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useState, useEffect} from 'react';
import {PlusCircle, MapPin} from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {useGetSinglePatientProfilesQuery} from '@/redux/api/patient.api';

export const Step3 = () => {
  const {
    mobile,
    selectedPatient,
    addressId,
    newAddress,
    symptoms,
    instructions,
    setMobile,
    setAddressId,
    setNewAddress,
    setSymptoms,
    setInstructions,
  } = useRequestCare();

  const [showNewAddressForm, setShowNewAddressForm] = useState(!addressId);

  const {data: addressData, isLoading: isAddressLoading} = useGetAddressQuery(
    selectedPatient,
    {skip: !selectedPatient},
  );

  const {data: patientProfile} = useGetSinglePatientProfilesQuery(
    selectedPatient,
    {skip: !selectedPatient},
  );

  useEffect(() => {
    if (patientProfile?.data?.mobileNumber && !mobile) {
      setMobile(patientProfile.data.mobileNumber);
    }
  }, [patientProfile, mobile, setMobile]);

  const handleAddressSelect = (id: string) => {
    if (id === 'new') {
      setShowNewAddressForm(true);
      setAddressId(null);
    } else {
      setShowNewAddressForm(false);
      setAddressId(id);
      setNewAddress(null);
    }
  };

  const updateNewAddress = (field: string, value: string) => {
    setNewAddress({
      ...(newAddress || {street: '', city: '', area: '', postalCode: ''}),
      [field]: value,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto border shadow-sm">
      <CardContent className="pt-6 space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <div className="relative w-full h-10">
            <PhoneInput
              country={'gh'}
              value={mobile}
              onChange={(value) => setMobile(`+${value}`)}
              inputClass="!md:w-[85%] !w-[80%] !absolute !top-0 !right-0 !h-10 !text-sm !rounded-md !border !border-input !bg-background !shadow-sm !px-3"
              buttonClass="!border !border-input !rounded-md !bg-transparent !px-2 !h-10"
              dropdownClass="!text-sm"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Care Location / Address</Label>
          <Select
            onValueChange={handleAddressSelect}
            value={addressId || (showNewAddressForm ? 'new' : '')}>
            <SelectTrigger className="w-full focus:border-secondary">
              <SelectValue
                placeholder={
                  isAddressLoading
                    ? 'Loading addresses...'
                    : 'Select an address'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {addressData?.data?.map((addr: any) => (
                <SelectItem key={addr.id} value={addr.id}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {addr.street}, {addr.area}, {addr.city}
                    </span>
                  </div>
                </SelectItem>
              ))}
              <SelectItem value="new">
                <div className="flex items-center gap-2 text-secondary font-medium">
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Address</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {showNewAddressForm && (
            <div className="grid gap-4 p-4 border rounded-lg bg-slate-50/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Street Address</Label>
                  <Input
                    placeholder="123 Main St"
                    value={newAddress?.street || ''}
                    onChange={(e) => updateNewAddress('street', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Area</Label>
                  <Input
                    placeholder="Your area"
                    value={newAddress?.area || ''}
                    onChange={(e) => updateNewAddress('area', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    placeholder="Your city"
                    value={newAddress?.city || ''}
                    onChange={(e) => updateNewAddress('city', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="symptoms">Current Symptoms / Concerns</Label>
          <Textarea
            id="symptoms"
            placeholder="Describe symptoms, duration, severity..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
            className="focus:border-secondary resize-y min-h-25"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructions">
            Special Instructions / Requirements
          </Label>
          <Textarea
            id="instructions"
            placeholder="Allergies, mobility needs, preferred doctor, etc."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={4}
            className="focus:border-secondary resize-y min-h-25"
          />
        </div>
      </CardContent>
    </Card>
  );
};
