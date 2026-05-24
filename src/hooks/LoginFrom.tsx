/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
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
import {Eye, EyeOff, LoaderIcon} from 'lucide-react'; // ← optional: for password toggle
import {useState} from 'react';
import {useLoginMutation} from '@/redux/features/auth/auth.api';
import {useAppDispatch} from '@/redux/hooks';
import {toast} from 'sonner';
import {verifyToken} from '@/utils/verifyToken';
import {setUser, TUser} from '@/redux/features/auth/authSlice';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Logo from '@/shared/Logo/Logo';

export const title = 'User login';

const formSchema = z.object({
  email: z
    .string()
    .min(1, {message: 'Email is required.'})
    .email({message: 'Please enter a valid email address.'}),
  password: z
    .string()
    .min(8, {message: 'Password must be at least 8 characters.'}),
});

// Logo SVG (Mojocares style)
export const MojocaresLogo = () => (
  <div className="flex items-center gap-2 mb-4">
    <Logo />
  </div>
);

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const toastId = toast.loading('Logging in... Please wait a moment.');

    try {
      const result = await login(values).unwrap();
      const user = verifyToken(result.data.token) as TUser;
      console.log('from login', user, result);

      if (result?.success) {
        dispatch(setUser({user, token: result.data.token}));

        const user_role = user.role.toLowerCase();
        toast.success('Login successful', {id: toastId});
        router.push(`/${user_role}/dashboard`);
      }
    } catch (error: unknown) {
      const err = error as any;

      console.log(err);
      toast.error('Login failed', {
        id: toastId,
        description:
          err?.data?.message ||
          err?.data?.error?.message ||
          'Something went wrong!',
      });
    }
  }

  return (
    <div className="relative flex min-h-screen w-full lg:bg-background overflow-hidden">
      {/* Mobile Background Image (Hidden on Desktop) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
        style={{
          backgroundImage: "url('/image/auth/login-ammazingrose.jpeg')",
        }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Left Side: Login Form (Full width on mobile, 50% on desktop) */}
      <div className="relative flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md bg-card/90 lg:bg-transparent p-8 lg:p-0 rounded-3xl shadow-2xl lg:shadow-none backdrop-blur-xl lg:backdrop-blur-none border border-white/20 lg:border-none">
          <div className="mb-10 text-center lg:text-left">
            <MojocaresLogo />
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground">
              User login
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome back! Please enter your details to access your account.
            </p>
          </div>

          <div className="mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-foreground/70">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 border-muted-foreground/20 focus-visible:ring-secondary"
                          placeholder="john.doe@example.com"
                          type="email"
                          {...field}
                        />
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
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-foreground/70">
                          Password
                        </FormLabel>
                        <a
                          href="/forgot-password"
                          className="text-sm font-medium text-secondary hover:text-secondary/80 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-12 border-muted-foreground/20 focus-visible:ring-secondary"
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
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
                  disabled={isLoading}
                  type="submit"
                  className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-semibold text-base shadow-md transition-all active:scale-[0.98]">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoaderIcon className="w-5 h-5 animate-spin" />{' '}
                      Logging in...
                    </span>
                  ) : (
                    <span>Log in</span>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 pt-8 border-t border-muted-foreground/10">
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="font-semibold text-secondary hover:underline">
                  Join now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Image (50%) */}
      <div className="relative hidden lg:block lg:w-1/2">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/image/auth/login-ammazingrose.jpeg')",
          }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h2 className="text-4xl font-bold">Mojacares</h2>
            <p className="mt-4 text-xl text-gray-200">
              Your gateway to premium care and professional management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
