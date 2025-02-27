"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUserContext } from "@/app/contexts/AppContext";

const formSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required"),
  occupation: z.string().min(1, "Occupation is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  monthlyIncome: z.string().min(1, "Monthly income is required"),
  monthlyExpenses: z.string().min(1, "Monthly expenses required"),
  existingSavings: z.string(),
  monthlyInvestmentCapacity: z.string(),
  primaryGoal: z.string().min(1, "Primary goal is required"),
  riskTolerance: z.string().min(1, "Risk tolerance is required"),
});

export function UserSetupForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      occupation: "",
      email: "",
      phone: "",
      monthlyIncome: "",
      monthlyExpenses: "",
      existingSavings: "",
      monthlyInvestmentCapacity: "",
      primaryGoal: "",
      riskTolerance: "",
    },
  });

  const { setUser } = useUserContext();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/users/setup", data);

      if (response.status === 200) {
        setUser(response.data);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Optionally add error handling UI here
    }
  };

  return (
    <div className='p-6'>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='col-span-2'>
            <label className='text-sm font-medium'>Full Name</label>
            <Input
              {...form.register("fullName")}
              className='h-12 bg-white border-2 mt-2 focus-visible:ring-0 focus-visible:border-[#151616] transition-colors hover:border-[#151616]'
              placeholder='Enter your full name'
            />
            {form.formState.errors.fullName && (
              <p className='text-sm text-red-500 mt-1'>
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className='text-sm font-medium'>Email</label>
            <Input
              {...form.register("email")}
              className='h-12 bg-white border-2 mt-2'
              type='email'
              placeholder='your@email.com'
            />
            {form.formState.errors.email && (
              <p className='text-sm text-red-500 mt-1'>
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className='text-sm font-medium'>Phone Number</label>
            <Input
              {...form.register("phone")}
              className='h-12 bg-white border-2 mt-2'
              placeholder='Your phone number'
            />
            {form.formState.errors.phone && (
              <p className='text-sm text-red-500 mt-1'>
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className='text-sm font-medium'>Age</label>
            <Input
              {...form.register("age")}
              className='h-12 bg-white border-2 mt-2'
              type='number'
              placeholder='Your age'
            />
            {form.formState.errors.age && (
              <p className='text-sm text-red-500 mt-1'>
                {form.formState.errors.age.message}
              </p>
            )}
          </div>

          <div>
            <label className='text-sm font-medium'>Occupation</label>
            <Input
              {...form.register("occupation")}
              className='h-12 bg-white border-2 mt-2'
              placeholder='Your occupation'
            />
            {form.formState.errors.occupation && (
              <p className='text-sm text-red-500 mt-1'>
                {form.formState.errors.occupation.message}
              </p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='text-sm font-medium'>Monthly Income</label>
            <div className='relative mt-2'>
              <span className='absolute left-3 top-3 text-muted-foreground'>
                ₹
              </span>
              <Input
                {...form.register("monthlyIncome")}
                className='pl-7 h-12 bg-white border-2'
                placeholder='e.g., 75,000'
              />
            </div>
            {form.formState.errors.monthlyIncome && (
              <p className='text-sm text-red-500 mt-1'>
                {form.formState.errors.monthlyIncome.message}
              </p>
            )}
          </div>

          <div>
            <label className='text-sm font-medium'>Monthly Expenses</label>
            <div className='relative mt-2'>
              <span className='absolute left-3 top-3 text-muted-foreground'>
                ₹
              </span>
              <Input
                {...form.register("monthlyExpenses")}
                className='pl-7 h-12 bg-white border-2'
                placeholder='e.g., 40,000'
              />
            </div>
            {form.formState.errors.monthlyExpenses && (
              <p className='text-sm text-red-500 mt-1'>
                {form.formState.errors.monthlyExpenses.message}
              </p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='text-sm font-medium'>Existing Savings</label>
            <div className='relative mt-2'>
              <span className='absolute left-3 top-3 text-muted-foreground'>
                ₹
              </span>
              <Input
                {...form.register("existingSavings")}
                className='pl-7 h-12 bg-white border-2'
                placeholder='Total savings'
              />
            </div>
          </div>

          <div>
            <label className='text-sm font-medium'>
              Monthly Investment Capacity
            </label>
            <div className='relative mt-2'>
              <span className='absolute left-3 top-3 text-muted-foreground'>
                ₹
              </span>
              <Input
                {...form.register("monthlyInvestmentCapacity")}
                className='pl-7 h-12 bg-white border-2'
                placeholder='Amount you can invest monthly'
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='text-sm font-medium'>
              Primary Investment Goal
            </label>
            <Select
              onValueChange={(value) => form.setValue("primaryGoal", value)}
            >
              <SelectTrigger className='h-12 bg-white border-2 mt-2'>
                <SelectValue placeholder='Select your primary goal' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='retirement'>Retirement Planning</SelectItem>
                <SelectItem value='wealth'>Wealth Building</SelectItem>
                <SelectItem value='education'>
                  Children&apos;s Education
                </SelectItem>
                <SelectItem value='house'>House Purchase</SelectItem>
                <SelectItem value='emergency'>Emergency Fund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className='text-sm font-medium'>Risk Tolerance</label>
            <Select
              onValueChange={(value) => form.setValue("riskTolerance", value)}
            >
              <SelectTrigger className='h-12 bg-white border-2 mt-2'>
                <SelectValue placeholder='Select risk tolerance' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='conservative'>Conservative</SelectItem>
                <SelectItem value='moderate'>Moderate</SelectItem>
                <SelectItem value='aggressive'>Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type='submit'
          className='w-full h-12 bg-[#D6F32F] text-black hover:bg-[#E7F76F] border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] transition-all hover:translate-y-[-2px] group'
        >
          Complete Profile
          <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
        </Button>

        <p className='text-center text-sm text-muted-foreground'>
          By completing your profile, you agree to our{" "}
          <a
            href='#'
            className='underline hover:text-[#151616] transition-colors'
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href='#'
            className='underline hover:text-[#151616] transition-colors'
          >
            Privacy Policy
          </a>
        </p>
      </form>
    </div>
  );
}
