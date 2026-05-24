"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/shared/Logo/Logo";

import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await forgotPassword({ email: values.email }).unwrap();

      toast.success(
        response.message ||
        "If an account exists, a reset code has been sent to your email."
      );

      // Pass email via query param
      router.push(`/verify-otp?email=${encodeURIComponent(values.email)}`);
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to send reset code. Try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-md">
        <div className="flex justify-start mb-6">
          <Logo />
        </div>

        <h1 className="text-2xl font-bold text-start mb-2">Forgot Password</h1>
        <p className="text-start text-sm text-muted-foreground mb-8">
          We'll send a 6-digit code to reset your password.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 text-background bg-secondary hover:bg-secondary/90  "
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <a href="/login" className="text-foreground hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}