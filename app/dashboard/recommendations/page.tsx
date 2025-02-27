import ChatWindow from "@/app/components/ChatWindow";
import { DashboardShell } from "@/components/dashboard-shell";

export default function Recommendations() {
  return (
    <DashboardShell>
      <div className='flex flex-col space-y-4'>
        {/* Embed the iframe */}
        <iframe
          src='https://ai-financial-analysis-yjajouwap8uzrry8qb36ks.streamlit.app/#stock-price-comparison'
          className='w-full h-screen'
          title='Stock Price Comparison'
          allow='clipboard-read; clipboard-write; geolocation; microphone; camera'
        ></iframe>

        {/* Chat Window */}
        <ChatWindow />
      </div>
    </DashboardShell>
  );
}
