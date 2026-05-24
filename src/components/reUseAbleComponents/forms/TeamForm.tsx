/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAddTeamMutation, useUpdateTeamMutation } from '@/redux/api/team.api';
import { ITeamMember } from '@/types/team.type';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const teamFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  designation: z.string().min(1, 'Designation is required'),
  contact: z.string().min(1, 'Contact is required'),
  description: z.string().min(1, 'Description is required'),
});

type TeamFormValues = z.infer<typeof teamFormSchema>;

interface TeamFormProps {
  team?: ITeamMember;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TeamForm({ team, onSuccess, onCancel }: TeamFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(team?.image || null);
  
  const [addTeam, { isLoading: isAdding }] = useAddTeamMutation();
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();
  
  const isLoading = isAdding || isUpdating;

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: team?.name || '',
      email: team?.email || '',
      designation: team?.designation || '',
      contact: team?.contact || '',
      description: team?.description || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: TeamFormValues) => {
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append('image', imageFile);
      }
      formData.append('data', JSON.stringify(values));

      if (team) {
        await updateTeam({ id: team.id, data: formData }).unwrap();
        toast.success('Team member updated successfully');
      } else {
        if (!imageFile) {
          toast.error('Please upload an image');
          return;
        }
        await addTeam(formData).unwrap();
        toast.success('Team member created successfully');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={handleImageChange}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {team ? 'Change photo' : 'Upload photo'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Md Oli Ullah" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="oli@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <div className="relative w-full h-10">
                    <PhoneInput
                      country={'gh'}
                      value={field.value}
                      onChange={(phone) => field.onChange(`+${phone}`)}
                      inputClass="!md:w-[85%] !w-[80%] !absolute !top-0 !right-0 !h-10 !text-sm !rounded-md !border !border-input !bg-background !shadow-sm !px-3"
                      buttonClass="!border !border-input !rounded-md !bg-transparent !px-2 !h-10"
                      dropdownClass="!text-sm"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Expert in Node.js and AI integration" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-[#3f2a1d] hover:bg-[#2f1f15] text-white">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {team ? 'Update Member' : 'Add Member'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
