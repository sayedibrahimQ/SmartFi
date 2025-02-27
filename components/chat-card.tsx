import React from "react";
import { Card } from "@/components/ui/card";
import { ChatInterface } from "./chat-interface";

interface ChatCardProps {
  selectedApp: string;
  selectedPostType: string;
  onSelectApp: (app: string) => void;
  onSelectPostType: (type: string) => void;
}

export function ChatCard({
  selectedApp,
  selectedPostType,
  onSelectApp,
  onSelectPostType,
}: ChatCardProps) {
  return (
    <Card className='bg-gray-900/80 backdrop-blur-md border-gray-800 rounded-none border-b-0 flex-grow'>
      <ChatInterface
        selectedApp={selectedApp}
        selectedPostType={selectedPostType}
        onSelectApp={onSelectApp}
        onSelectPostType={onSelectPostType}
      />
    </Card>
  );
}
