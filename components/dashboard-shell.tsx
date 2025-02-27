"use client";

import { useState } from "react";
import {
  PieChart,
  Lightbulb,
  Target,
  BookOpen,
  Menu,
  PanelLeft,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useUserContext } from "@/app/contexts/AppContext";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },

  { icon: PieChart, label: "Portfolio", href: "/dashboard/portfolio" },
  {
    icon: Lightbulb,
    label: "Recommendations",
    href: "https://ai-financial-analysis-yjajouwap8uzrry8qb36ks.streamlit.app/#stock-price-comparison",
  },
  { icon: Target, label: "Goals", href: "/dashboard/goals" },
  {
    icon: BookOpen,
    label: "Learning Resources",
    href: "/dashboard/learning-resources",
  },
];

export function DashboardShell({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(true);
  const { user } = useUserContext();
  const pathname = usePathname();

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div
        className={cn("flex h-screen overflow-hidden bg-[#FFFFF4]", className)}
        {...props}
      >
        <Sidebar className='border-r-2 border-[#151616] bg-white w-64'>
          <SidebarHeader>
            <div className='flex items-center px-4 py-4'>
              <h1 className='text-xl  text-[#151616]'>FinDash</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className='h-full'>
              <SidebarMenu className='px-5'>
                {sidebarItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href ? item.href : "#"}>
                        <Button
                          variant={
                            pathname === item.href ? "secondary" : "ghost"
                          }
                          className='w-full h-9 justify-start px-3 text-sm font-medium rounded-lg border-2 border-transparent hover:border-[#151616] hover:bg-[#D6F32F] hover:text-[#151616] hover:shadow-[3px_3px_0px_0px_#151616] active:shadow-[1px_1px_0px_0px_#151616] transition-all duration-200'
                        >
                          <item.icon className='mr-2.5 h-4 w-4' />
                          {item.label}
                        </Button>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className='p-3'>
            <Button
              variant='outline'
              className='w-full h-9 justify-start px-3 text-sm font-medium rounded-lg border-2 border-[#151616] hover:bg-[#D6F32F] hover:text-[#151616] hover:shadow-[3px_3px_0px_0px_#151616] active:shadow-[1px_1px_0px_0px_#151616] transition-all duration-200'
            >
              <Menu className='mr-2.5 h-4 w-4' />
              Toggle Sidebar
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className='w-screen overflow-y-scroll'>
          <header className='flex items-center justify-between px-4 py-3 border-b-2 border-[#151616] bg-white'>
            <SidebarTrigger className='h-8 w-8 rounded-md border-2 border-[#151616] hover:bg-[#D6F32F] hover:text-[#151616] hover:shadow-[3px_3px_0px_0px_#151616] active:shadow-[1px_1px_0px_0px_#151616] transition-all duration-200'>
              <PanelLeft className='h-4 w-4' />
              <span className='sr-only'>Toggle Sidebar</span>
            </SidebarTrigger>
            <div className='flex items-center space-x-3'>
              <Button
                variant='outline'
                size='sm'
                className='h-8 w-8 rounded-md border-2 border-[#151616] hover:bg-[#D6F32F] hover:text-[#151616] hover:shadow-[3px_3px_0px_0px_#151616] active:shadow-[1px_1px_0px_0px_#151616] transition-all duration-200'
              >
                <span className='sr-only'>Notifications</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-4 w-4'
                >
                  <path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
                  <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
                </svg>
              </Button>
              <div className='flex items-center space-x-2'>
                <div className='h-8 w-8 rounded-md border-2 border-[#151616] bg-[#D6F32F] flex items-center justify-center shadow-[3px_3px_0px_0px_#151616]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-4 w-4'
                  >
                    <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
                    <circle cx='12' cy='7' r='4' />
                  </svg>
                </div>
                <div className='flex flex-col'>
                  <span className='text-xs font-bold text-[#151616]'>
                    {user && user?.fullName}
                  </span>
                  <span className='text-[10px] text-[#151616]/70'>
                    {user?.occupation}
                  </span>
                </div>
              </div>
            </div>
          </header>
          <main className='w-full'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
