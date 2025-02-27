import { DashboardShell } from "@/components/dashboard-shell"
import { MainContent } from "@/components/main-content"
import ChatWindow from "../components/ChatWindow"

export default function Dashboard() {
  return (
    <DashboardShell>
      <MainContent />
      <ChatWindow/>
          </DashboardShell>
  )
}

