'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
} from '@/redux/api/services.api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Service } from '@/types/service.type';
import { Textarea } from '@/components/ui/textarea';

interface ServiceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  service?: Service | null;
}

export default function ServiceModal({ open, setOpen, service }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: 'SERVICE',
    basePrice: '',
    description: '',
    durationMinutes: '',
    isActive: 'true',
  });

  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const isLoading = isAdding || isUpdating;

  useEffect(() => {
    if (service && open) {
      setFormData({
        name: service.name || '',
        type: service.type || '',
        category: service.category || 'SERVICE',
        basePrice: service.basePrice ? String(service.basePrice) : '',
        description: service.description || '',
        durationMinutes: service.durationMinutes ? String(service.durationMinutes) : '',
        isActive: service.isActive ? 'true' : 'false',
      });
    } else if (open) {
      setFormData({
        name: '',
        type: '',
        category: 'SERVICE',
        basePrice: '',
        description: '',
        durationMinutes: '',
        isActive: 'true',
      });
    }
  }, [service, open]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.type.trim() || !formData.basePrice) {
      toast.error('Please fill in all required fields (Name, Type, Base Price).');
      return;
    }

    const payloadData = {
      ...formData,
      basePrice: Number(formData.basePrice),
      durationMinutes: formData.durationMinutes ? Number(formData.durationMinutes) : null,
      isActive: formData.isActive === 'true',
    };

    try {
      if (service) {
        await updateService({ id: service.id, data: payloadData }).unwrap();
        toast.success(`Service "${formData.name}" updated successfully.`);
      } else {
        await addService(payloadData).unwrap();
        toast.success(`Service "${formData.name}" added successfully.`);
      }
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Action failed. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-center">
            {service ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">Service Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. ELDERLY CARE"
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleChange('type', value)}
            >
              <SelectTrigger className="h-10 w-full cursor-pointer">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HOME_GENERAL_CHECKUP">HOME GENERAL CHECKUP</SelectItem>
                <SelectItem value="HOME_VITAL_CHECK">HOME VITAL CHECK</SelectItem>
                <SelectItem value="PHYSIOTHERAPY_SESSION">PHYSIOTHERAPY SESSION</SelectItem>
                <SelectItem value="BLOOD_PRESSURE_CHECK">BLOOD PRESSURE CHECK</SelectItem>
                <SelectItem value="BLOOD_SUGAR_CHECK">BLOOD SUGAR CHECK</SelectItem>
                <SelectItem value="INJECTION">INJECTION</SelectItem>
                <SelectItem value="WOUND_DRESSING">WOUND DRESSING</SelectItem>
                <SelectItem value="ELDERLY_CARE">ELDERLY CARE</SelectItem>
                <SelectItem value="POST_HOSPITAL_CARE">POST HOSPITAL CARE</SelectItem>
                <SelectItem value="OTHER">OTHER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger className="h-10 w-full cursor-pointer">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SERVICE">SERVICE</SelectItem>
                  <SelectItem value="PACKAGE">PACKAGE</SelectItem>
                </SelectContent>
              </Select>
            </div>



            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Status</Label>
              <Select
                value={formData.isActive}
                onValueChange={(value) => handleChange('isActive', value)}
              >
                <SelectTrigger className="h-10 w-full cursor-pointer">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>



          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="durationMinutes" className="text-sm font-medium">Duration (Mins)</Label>
              <Input
                id="durationMinutes"
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => handleChange('durationMinutes', e.target.value)}
                placeholder="e.g: 60"
                className="h-10"
                required
              />
            </div>


            <div className="space-y-1.5">
              <Label htmlFor="basePrice" className="text-sm font-medium">Base Price *</Label>
              <Input
                id="basePrice"
                type="number"
                value={formData.basePrice}
                onChange={(e) => handleChange('basePrice', e.target.value)}
                placeholder="Service price"
                className="h-10 w-full"
              />
            </div>

          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description"
              className="h-20"
              rows={5}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
            className="min-w-24">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="min-w-32 bg-secondary text-background hover:bg-secondary/90">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {service ? 'Update' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
