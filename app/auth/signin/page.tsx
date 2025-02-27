"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserContext } from "@/app/contexts/AppContext";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInPage() {
  const { setUser } = useUserContext();

  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      // Handle successful login
      if (response.status === 200) {
        setUser(result.user);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      // Add error handling UI here
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#FAFDE6]'>
      <div className='w-full max-w-md p-8 bg-white border-[1px] border-gray-300 rounded-lg shadow-md relative'>
        <div className='absolute inset-0 pointer-events-none grid grid-dots opacity-10'></div>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-[#151616]'>Welcome Back</h2>
          <p className='mt-2 text-gray-600'>
            Don&apos;t have an account?{" "}
            <Link
              href='/auth/signup'
              className='text-green-600 hover:underline'
            >
              Sign up here
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type='email'
                        placeholder='Enter your email'
                        className='pl-10'
                        {...field}
                      />
                      <AlertCircle className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type='password'
                        placeholder='Enter your password'
                        className='pl-10'
                        {...field}
                      />
                      <AlertCircle className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center justify-between'>
              <label className='inline-flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='h-4 w-4 border-gray-300 rounded focus:ring-2 focus:ring-green-500'
                />
                <span className='text-sm text-gray-600'>Remember me</span>
              </label>
              <Link
                href='/auth/forgot-password'
                className='text-sm text-green-600 hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
              className='w-full py-3 bg-[#D6F32F] text-[#151616] font-bold rounded-lg border border-[#151616] hover:translate-y-1 hover:shadow-[0px_4px_0px_#151616] transition-all'
            >
              Sign in
              <ArrowRight className='ml-2 inline-block' />
            </motion.button>
          </form>
        </Form>

        <p className='mt-4 text-sm text-center text-gray-600'>
          By continuing, you agree to our{" "}
          <Link href='/terms' className='underline'>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href='/privacy' className='underline'>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
