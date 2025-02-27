import ChatWindow from "@/app/components/ChatWindow";
import { DashboardShell } from "@/components/dashboard-shell";
import Portfolio from "@/components/Portfolio";

export default function Dashboard() {
  return (
    <DashboardShell>
    <div className="min-h-screen bg-[#FAFAFA]">
      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-xl bg-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-black">
            <span className="h-3 w-3 rounded-full bg-[#CBFF00] mr-2"></span>
            <span className="text-white text-sm font-bold">AI-Powered Financial Advisor</span>
          </span>
         
        </div>
        <Portfolio />
      </main>
    </div>
<ChatWindow/>
    </DashboardShell>
  );
}
