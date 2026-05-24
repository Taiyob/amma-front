// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/register/staff/page.tsx
// 'use client';

// app/register/staff/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/register/staff/page.tsx
'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Eye, EyeOff} from 'lucide-react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import Logo from '@/shared/Logo/Logo';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import {useStaffRegistrationMutation} from '@/redux/features/auth/auth.api';

const formSchema = z
  .object({
    name: z.string().min(2).max(50),

    phone: z
      .string()
      .min(9, 'Phone number is too short')
      .max(15, 'Phone number is too long')
      .regex(/^\+?\d+$/, 'Invalid phone number format'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64)
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

export default function StaffRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [staffRegistration, {isLoading}] = useStaffRegistrationMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing invitation token.');
      router.replace('/login');
    }
  }, [token, router]);

  const onSubmit = async (values: FormValues) => {
    if (!token) return;

    try {
      const payload = {
        token,
        name: values.name.trim(),
        phone: values.phone,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      await staffRegistration(payload).unwrap();

      toast.success('Staff account created successfully!');
      router.push('/login');
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.data?.error?.message ||
        'Registration failed. Please check the invitation link or try again.';

      toast.error(message);
    }
  };

  if (!token) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-md">
        <div className="flex flex-col items-start mb-6">
          <Logo />
          <h1 className="text-2xl font-bold mt-4">Staff Registration</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete your account setup via invitation
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Enter full name..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative w-full h-10">
                      <PhoneInput
                        country={'gh'}
                        value={field.value}
                        onChange={(phone) => field.onChange(`+${phone}`)}
                        inputClass="!w-[85%] !absolute !top-0 !right-0 !h-10 !text-sm !rounded-md !border !border-input !bg-background !shadow-sm !px-3"
                        buttonClass="!border !border-input !rounded-md !bg-transparent !px-2 !h-10"
                        dropdownClass="!text-sm"
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter Password..."
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        disabled={isLoading}
                      />

                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword((prev) => !prev);
                        }}>
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  {/* Password Rules */}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Confirm Password"
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        disabled={isLoading}
                      />

                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowConfirmPassword((prev) => !prev);
                        }}>
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 hover:bg-secondary/80 bg-secondary text-background"
              disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Staff Account'}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-foreground hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

// import {zodResolver} from '@hookform/resolvers/zod';
// import {Eye, EyeOff} from 'lucide-react';
// import {useRouter, useSearchParams} from 'next/navigation';
// import {useEffect, useState} from 'react';
// import {useForm} from 'react-hook-form';
// import {toast} from 'sonner';
// import {z} from 'zod';

// import {Button} from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import {Input} from '@/components/ui/input';
// import Logo from '@/shared/Logo/Logo';

// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// import {useStaffRegistrationMutation} from '@/redux/features/auth/auth.api';

// const formSchema = z
//   .object({
//     firstName: z.string().min(2).max(50),
//     lastName: z.string().min(2).max(50),
//     phone: z
//       .string()
//       .min(9, 'Phone number is too short')
//       .max(15, 'Phone number is too long')
//       .regex(/^\+?\d+$/, 'Invalid phone number format'),
//     password: z.string().min(8).max(64),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: 'Passwords do not match',
//     path: ['confirmPassword'],
//   });

// type FormValues = z.infer<typeof formSchema>;

// export default function StaffRegistrationPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');

//   const [staffRegistration, {isLoading}] = useStaffRegistrationMutation();

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       phone: '',
//       password: '',
//       confirmPassword: '',
//     },
//   });

//   useEffect(() => {
//     if (!token) {
//       toast.error('Invalid or missing invitation token.');
//       router.replace('/login');
//     }
//   }, [token, router]);

//   const onSubmit = async (values: FormValues) => {
//     if (!token) return;

//     try {
//       const payload = {
//         token,
//         firstName: values.firstName.trim(),
//         lastName: values.lastName.trim(),
//         phone: values.phone,
//         password: values.password,
//         confirmPassword: values.confirmPassword,
//       };

//       await staffRegistration(payload).unwrap();

//       toast.success('Staff account created successfully!');
//       router.push('/login');
//     } catch (err: any) {
//       const message =
//         err?.data?.message ||
//         err?.data?.error?.message ||
//         'Registration failed. Please check the invitation link or try again.';

//       toast.error(message);
//     }
//   };

//   if (!token) return null;

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background p-4">
//       <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-md">
//         <div className="flex flex-col items-start mb-6">
//           <Logo />
//           <h1 className="text-2xl font-bold mt-4">Staff Registration</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Complete your account setup via invitation
//           </p>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//             {/* Names */}
//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="firstName"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>First Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} disabled={isLoading} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="lastName"
//                 render={({field}) => (
//                   <FormItem>
//                     <FormLabel>Last Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} disabled={isLoading} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Phone */}
//             <FormField
//               control={form.control}
//               name="phone"
//               render={({field}) => (
//                 <FormItem>
//                   <FormLabel>Phone Number</FormLabel>
//                   <FormControl>
//                     <div className="relative w-full h-10">
//                       <PhoneInput
//                         country={'gh'}
//                         value={field.value}
//                         onChange={(phone) => field.onChange(phone)}
//                         inputClass="!w-[85%] !absolute !top-0 !right-0 !h-10 !text-sm !rounded-md !border !border-input !bg-background !shadow-sm !px-3"
//                         buttonClass="!border !border-input !rounded-md !bg-transparent !px-2 !h-10"
//                         dropdownClass="!text-sm"
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Password */}
//             <FormField
//               control={form.control}
//               name="password"
//               render={({field}) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Input
//                         placeholder="Enter Password..."
//                         {...field}
//                         type={showPassword ? 'text' : 'password'}
//                         autoComplete="new-password"
//                         disabled={isLoading}
//                       />

//                       <button
//                         type="button"
//                         className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setShowPassword((prev) => !prev);
//                         }}>
//                         {showPassword ? (
//                           <EyeOff size={18} />
//                         ) : (
//                           <Eye size={18} />
//                         )}
//                       </button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Confirm Password */}
//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({field}) => (
//                 <FormItem>
//                   <FormLabel>Confirm Password</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Input
//                         placeholder="Confirm Password"
//                         {...field}
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         autoComplete="new-password"
//                         disabled={isLoading}
//                       />

//                       <button
//                         type="button"
//                         className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setShowConfirmPassword((prev) => !prev);
//                         }}>
//                         {showConfirmPassword ? (
//                           <EyeOff size={18} />
//                         ) : (
//                           <Eye size={18} />
//                         )}
//                       </button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Submit */}
//             <Button
//               type="submit"
//               className="w-full h-11 bg-secondary text-background"
//               disabled={isLoading || !form.formState.isValid}>
//               {isLoading ? 'Creating account...' : 'Create Staff Account'}
//             </Button>
//           </form>
//         </Form>

//         <p className="mt-6 text-center text-sm text-muted-foreground">
//           Already have an account?{' '}
//           <a
//             href="/login"
//             className="text-foreground hover:underline font-medium">
//             Sign in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
