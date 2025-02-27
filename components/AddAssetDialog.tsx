"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useUserContext } from "@/app/contexts/AppContext";

interface Asset {
  name: string;
  value: number;
  quantity: number;
  purchasePrice: number;
  purchaseDate: Date;
  type: "stock" | "gold";
}

interface AddAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAsset: (asset: Asset) => void;
  assetType: "stock" | "gold";
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().positive("Quantity must be positive"),
  purchasePrice: z.number().positive("Purchase price must be positive"),
  purchaseDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export default function AddAssetDialog({
  open,
  onOpenChange,
  onAddAsset,
  assetType,
}: AddAssetDialogProps) {
  const { user } = useUserContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: assetType === "gold" ? "Gold" : "",
      quantity: 0,
      purchasePrice: 0,
      purchaseDate: new Date().toISOString().split("T")[0],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newAsset: Asset = {
      name: assetType === "gold" ? "Gold" : values.name,
      quantity: values.quantity,
      purchasePrice: values.purchasePrice,
      purchaseDate: new Date(values.purchaseDate),
      value: values.quantity * values.purchasePrice,
      type: assetType,
    };

    try {
      const response = await axios.post("/api/asset", {
        newAsset,
        userId: user?.id,
      });

      if (response.status === 201) {
        console.log("Asset added successfully");
        onAddAsset(newAsset);
        onOpenChange(false);
        form.reset();
      }
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
        <DialogHeader>
          <DialogTitle className='text-black text-2xl font-black'>
            Add {assetType === "stock" ? "Stock" : "Gold"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {assetType === "stock" && (
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-black font-bold'>
                      Stock Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='border-2 border-black focus:border-[#CBFF00] focus:ring-[#CBFF00] rounded-xl font-bold'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black font-bold'>
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                      className='border-2 border-black focus:border-[#CBFF00] focus:ring-[#CBFF00] rounded-xl font-bold'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='purchasePrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black font-bold'>
                    Purchase Price (₹)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                      className='border-2 border-black focus:border-[#CBFF00] focus:ring-[#CBFF00] rounded-xl font-bold'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='purchaseDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black font-bold'>
                    Purchase Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='date'
                      className='border-2 border-black focus:border-[#CBFF00] focus:ring-[#CBFF00] rounded-xl font-bold'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='submit'
                className='bg-[#CBFF00] text-black hover:bg-[#CBFF00] border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl'
              >
                Add {assetType === "stock" ? "Stock" : "Gold"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
