"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "@/components/ui/charts";
import { useUserContext } from "@/app/contexts/AppContext";
import { useEffect } from "react";

const portfolioData = [
  { name: "Stocks", value: 45, color: "bg-blue-500" },
  { name: "Bonds", value: 30, color: "bg-green-500" },
  { name: "Real Estate", value: 15, color: "bg-yellow-500" },
  { name: "Cash", value: 10, color: "bg-red-500" },
];

const formatCurrency = (value: number | undefined) => {
  if (!value || isNaN(value)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export function MainContent() {
  const { user } = useUserContext();

  // Helper function to parse numbers with commas
  const parseAmount = (value: string | undefined) => {
    if (!value) return 0;
    return parseInt(value.replace(/,/g, ""));
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  // Calculate net worth
  const netWorth = user ? parseAmount(user.existingSavings) : 0;

  // Calculate investments (80% of savings for this example)
  const investments = netWorth * 0.8;

  // Calculate cash (20% of savings for this example)
  const cash = netWorth * 0.2;

  // Get monthly income
  const monthlyIncome = user ? parseAmount(user.monthlyIncome) : 0;

  // Generate performance data based on monthly investment capacity
  const monthlyInvestment = user
    ? parseAmount(user.monthlyInvestmentCapacity)
    : 0;
  const performanceData = Array.from({ length: 12 }, (_, i) => {
    const baseAmount = netWorth + monthlyInvestment * i;
    const growth = baseAmount * (1 + 0.05 * (i / 12)); // Simulated 5% annual growth
    return {
      name: new Date(2024, i).toLocaleString("default", { month: "short" }),
      value: Math.round(growth),
    };
  });

  return (
    <div className='space-y-6 bg-[#FFFFF4] relative overflow-hidden p-8'>
      {/* Background Pattern */}
      <div className='absolute inset-0 pointer-events-none'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(#151616 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            opacity: "0.1",
          }}
        />
      </div>

      {/* Stats Cards */}
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>
          Welcome back{user?.fullName ? `, ${user.fullName}` : ""}
        </h2>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(netWorth)}</div>
            <p className='text-xs text-muted-foreground'>Total Assets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatCurrency(investments)}
            </div>
            <p className='text-xs text-muted-foreground'>
              Stocks, Bonds, Real Estate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Cash</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(cash)}</div>
            <p className='text-xs text-muted-foreground'>Available Savings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatCurrency(monthlyIncome)}
            </div>
            <p className='text-xs text-muted-foreground'>Regular Income</p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio and Performance Section */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#151616] transition-all duration-200'>
          <CardHeader>
            <CardTitle>Portfolio Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col space-y-4'>
              {portfolioData.map((item) => (
                <div key={item.name} className='flex items-center'>
                  <div className='w-full flex-1'>
                    <div className='flex items-center justify-between'>
                      <span className='font-bold text-[#151616]'>
                        {item.name}
                      </span>
                      <span className='text-[#151616]/70'>{item.value}%</span>
                    </div>
                    <Progress
                      value={item.value}
                      className={`mt-2 ${item.color} shadow-[2px_2px_0px_0px_#151616]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className='col-span-3 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#151616] transition-all duration-200'>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={performanceData} />
          </CardContent>
        </Card>
      </div>

      {/* Goals and Recommendations Section */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#151616] transition-all duration-200'>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent className='space-y-8'>
            <div>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-bold text-[#151616]'>
                  Retirement
                </span>
                <span className='text-sm text-[#151616]/70'>60%</span>
              </div>
              <Progress
                value={60}
                className='bg-blue-200 shadow-[2px_2px_0px_0px_#151616]'
              >
                <div
                  className='bg-[#D6F32F] h-full w-full'
                  style={{ transform: "translateX(-40%)" }}
                ></div>
              </Progress>
            </div>
            <div>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-bold text-[#151616]'>
                  Home Purchase
                </span>
                <span className='text-sm text-[#151616]/70'>45%</span>
              </div>
              <Progress
                value={45}
                className='bg-green-200 shadow-[2px_2px_0px_0px_#151616]'
              >
                <div
                  className='bg-[#D6F32F] h-full w-full'
                  style={{ transform: "translateX(-55%)" }}
                ></div>
              </Progress>
            </div>
            <div>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-bold text-[#151616]'>
                  Emergency Fund
                </span>
                <span className='text-sm text-[#151616]/70'>80%</span>
              </div>
              <Progress
                value={80}
                className='bg-yellow-200 shadow-[2px_2px_0px_0px_#151616]'
              >
                <div
                  className='bg-[#D6F32F] h-full w-full'
                  style={{ transform: "translateX(-20%)" }}
                ></div>
              </Progress>
            </div>
          </CardContent>
        </Card>
        <Card className='col-span-3 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#151616] transition-all duration-200'>
          <CardHeader>
            <CardTitle>
              <a
                href='/Recommendations'
                className='text-[#151616] hover:underline'
              >
                Recommendations
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-4'>
              <li className='flex items-center'>
                <div className='mr-2 h-2 w-2 rounded-full bg-[#D6F32F]'></div>
                <span className='text-[#151616]/70'>
                  Diversify your portfolio with international stocks
                </span>
              </li>
              <li className='flex items-center'>
                <div className='mr-2 h-2 w-2 rounded-full bg-[#D6F32F]'></div>
                <span className='text-[#151616]/70'>
                  Increase your retirement contributions by 2%
                </span>
              </li>
              <li className='flex items-center'>
                <div className='mr-2 h-2 w-2 rounded-full bg-[#D6F32F]'></div>
                <span className='text-[#151616]/70'>
                  Review your insurance coverage
                </span>
              </li>
              <li className='flex items-center'>
                <div className='mr-2 h-2 w-2 rounded-full bg-[#D6F32F]'></div>
                <span className='text-[#151616]/70'>
                  Consider refinancing your home loan
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
