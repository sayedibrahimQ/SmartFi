"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  currentStep: number;
  steps: {
    title: string;
    description: string;
  }[];
}

export function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <div className='w-full max-w-4xl mx-auto mb-12'>
      <div className='relative flex justify-between'>
        {steps.map((step, index) => (
          <div key={step.title} className='flex flex-col items-center relative'>
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-500",
                "border-2 shadow-lg",
                currentStep > index
                  ? "bg-primary text-primary-foreground border-primary"
                  : currentStep === index
                  ? "bg-background text-foreground border-primary"
                  : "bg-background text-muted-foreground border-muted"
              )}
            >
              {currentStep > index ? (
                <Check className='w-6 h-6 animate-fade-in' />
              ) : (
                <span className='text-sm font-semibold'>{index + 1}</span>
              )}
            </div>
            <div className='mt-4 text-center'>
              <div
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  currentStep >= index
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </div>
              <div className='text-xs text-muted-foreground mt-1'>
                {step.description}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className='absolute top-6 left-full w-full h-[2px] -translate-y-1/2'>
                <div className='relative w-full h-full'>
                  <div className='absolute inset-0 bg-muted' />
                  <div
                    className={cn(
                      "absolute inset-0 bg-primary transition-transform duration-500 ease-in-out",
                      currentStep > index ? "scale-x-100" : "scale-x-0"
                    )}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
