"use client";

import { UserSetupForm } from "@/components/user-setup-form";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function SetupPage() {
  return (
    <div className='relative min-h-screen bg-gradient-to-br from-[#FFFFF4] via-[#F5F5E9] to-[#FFFFF4] overflow-hidden'>
      {/* Decorative Dots */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-10 left-10 w-4 h-4 rounded-full bg-[#D6F32F] opacity-40' />
        <div className='absolute top-1/4 right-20 w-6 h-6 rounded-full bg-[#9A9B77] opacity-20' />
        <div className='absolute bottom-40 left-1/4 w-8 h-8 rounded-full bg-[#D6F32F] opacity-30' />
        <div className='absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-[#9A9B77] opacity-25' />
        <div className='absolute bottom-20 right-20 w-5 h-5 rounded-full bg-[#D6F32F] opacity-35' />
        <div className='absolute top-1/2 left-20 w-4 h-4 rounded-full bg-[#9A9B77] opacity-20' />
      </div>

      <div className='max-w-5xl mx-auto p-6'>
        <Card className='relative border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] bg-white/95 backdrop-blur-sm'>
          {/* Decorative Corner Dots */}
          <div className='absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#D6F32F] border-2 border-[#151616]' />
          <div className='absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-[#9A9B77] border-2 border-[#151616]' />

          <div className='p-6 border-b-2 border-[#151616]'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-bold'>Complete Your Profile</h2>
                <p className='text-sm text-muted-foreground mt-1'>
                  Help us understand your investment needs better
                </p>
              </div>
              <div className='flex items-center gap-2 bg-[#D6F32F]/20 px-4 py-2 rounded-full'>
                <CheckCircle2 className='h-5 w-5 text-[#9A9B77]' />
                <span className='text-sm font-medium'>Secure & Encrypted</span>
              </div>
            </div>
          </div>

          {/* Progress Steps */}

          <UserSetupForm />
        </Card>
      </div>
    </div>
  );
}
