/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
  Plan,
  PlanName,
  PlanInterval,
} from '@/redux/api/plans.api';
import { toast } from 'sonner';
import { Loader2, Plus, X } from 'lucide-react';
import { getPlanDisplayName } from '@/utils/planMapping';

interface PlanModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  plan?: Plan | null;
}

export default function PlanModal({ open, setOpen, plan }: PlanModalProps) {
  const [formData, setFormData] = useState({
    name: '' as PlanName | '',
    description: '',
    perMonth: '',
    interval: '' as PlanInterval | '',
  });
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  const [createPlan, { isLoading: isCreating }] = useCreatePlanMutation();
  const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (plan && open) {
      setFormData({
        name: plan.name || '',
        description: plan.description || '',
        perMonth: plan.perMonth ? String(plan.perMonth) : '',
        interval: plan.interval || '',
      });
      setFeatures(plan.features || []);
    } else if (open) {
      setFormData({
        name: '',
        description: '',
        perMonth: '',
        interval: '',
      });
      setFeatures([]);
    }
  }, [plan, open]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((prev) => [...prev, trimmed]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleSubmit = async () => {
    const isEditMode = !!plan;

    if (!formData.name || !formData.interval) {
      toast.error(
        `Please fill in all required fields (Name, Interval).`,
      );
      return;
    }

    const payload: any = {
      name: formData.name,
      description: formData.description,
      interval: formData.interval,
      features: features.length > 0 ? features : [],
    };

    try {
      if (plan) {
        await updatePlan({ id: plan.id, data: payload }).unwrap();
        toast.success(`Plan "${getPlanDisplayName(formData.name)}" updated successfully.`);
      } else {
        await createPlan(payload).unwrap();
        toast.success(`Plan "${getPlanDisplayName(formData.name)}" created successfully.`);
      }
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Action failed. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-center">
            {plan ? 'Edit Plan' : 'Create New Plan'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Plan Name */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Plan Name *</Label>
              <Select
                value={formData.name}
                onValueChange={(value) => handleChange('name', value)}>
                <SelectTrigger className="h-10 w-full cursor-pointer">
                  <SelectValue placeholder="Select Plan Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Starter">Bronze</SelectItem>
                  <SelectItem value="Business">Silver</SelectItem>
                  <SelectItem value="Enterprise">Gold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interval */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Interval *</Label>
              <Select
                value={formData.interval}
                onValueChange={(value) => handleChange('interval', value)}>
                <SelectTrigger className="h-10 w-full cursor-pointer">
                  <SelectValue placeholder="Select Interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>


          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief plan description"
              className="h-20"
              rows={3}
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Features</Label>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a feature and press Enter"
                className="h-10 flex-1"
              />
              <Button
                type="button"
                onClick={handleAddFeature}
                size="sm"
                className="h-10 px-3 bg-secondary text-background hover:bg-secondary/90">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full px-3 py-1 text-xs font-medium">
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="hover:text-red-500 transition-colors cursor-pointer">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
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
            {plan ? 'Update Plan' : 'Create Plan'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
