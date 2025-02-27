"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bot, SendHorizontal, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const socialApps = ["Instagram", "Twitter", "Facebook", "LinkedIn", "TikTok"];
const postTypes = ["Photos", "Videos", "Stories", "Reels", "Tweets", "Posts"];

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatInterfaceProps {
  selectedApp: string;
  selectedPostType: string;
  onSelectApp: (app: string) => void;
  onSelectPostType: (type: string) => void;
}

export function ChatInterface({
  selectedApp,
  selectedPostType,
  onSelectApp,
  onSelectPostType,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedApp && selectedPostType) {
      const welcomeMessage = {
        id: Date.now().toString(),
        content: `Great! You've selected ${selectedPostType} on ${selectedApp}. How can I assist you with your research?`,
        role: "assistant" as const,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedApp, selectedPostType]);

  const generateResponse = async (
    userInput: string,
    app: string,
    postType: string
  ): Promise<string> => {
    if (!app || !postType) {
      return "Please select a social media app and post type to begin your research.";
    }

    const responses = [
      `Based on your query about ${postType} on ${app}, here are some insights:`,
      `Analyzing ${postType} performance on ${app} for your topic reveals:`,
      `For your ${app} ${postType} research, consider the following:`,
      `Recent data on ${app} ${postType} related to your query suggests:`,
      `To improve your ${postType} strategy on ${app}, try these tips:`,
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse}\n\n1. Engage with trending hashtags related to your topic\n2. Post during peak hours for maximum visibility\n3. Use high-quality visuals that resonate with your audience\n4. Interact with your audience through comments and messages\n5. Analyze your competitors' content for inspiration`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user" as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await generateResponse(
        input,
        selectedApp,
        selectedPostType
      );
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant" as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I encountered an error while processing your request.",
        role: "assistant" as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className='flex flex-col h-[calc(100vh-64px)]'>
      <div className='bg-gray-900 p-4 border-b border-gray-800'>
        <div className='flex flex-wrap gap-2 mb-2'>
          {socialApps.map((app) => (
            <Button
              key={app}
              variant={selectedApp === app ? "default" : "outline"}
              onClick={() => onSelectApp(app)}
              className='text-xs'
            >
              {app}
            </Button>
          ))}
        </div>
        <div className='flex flex-wrap gap-2'>
          {postTypes.map((type) => (
            <Button
              key={type}
              variant={selectedPostType === type ? "default" : "outline"}
              onClick={() => onSelectPostType(type)}
              className='text-xs'
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "flex items-start gap-3 rounded-lg p-3",
                message.role === "assistant"
                  ? "bg-gray-800/50"
                  : "bg-yellow-500/10"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  message.role === "assistant" ? "bg-gray-700" : "bg-yellow-500"
                )}
              >
                {message.role === "assistant" ? (
                  <Bot className='h-4 w-4 text-gray-300' />
                ) : (
                  <User className='h-4 w-4 text-white' />
                )}
              </div>
              <div className='text-sm text-gray-200 whitespace-pre-wrap'>
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex items-center gap-2 text-sm text-gray-400'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-700'>
              <Bot className='h-4 w-4 text-gray-300' />
            </div>
            <div className='flex gap-1'>
              <span className='animate-bounce'>●</span>
              <span
                className='animate-bounce'
                style={{ animationDelay: "0.2s" }}
              >
                ●
              </span>
              <span
                className='animate-bounce'
                style={{ animationDelay: "0.4s" }}
              >
                ●
              </span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className='border-t border-gray-800 p-4'>
        <form onSubmit={handleSubmit}>
          <div className='relative'>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${selectedPostType} on ${selectedApp}...`}
              className='min-h-[44px] w-full resize-none bg-gray-800/50 pr-12 text-sm focus:ring-yellow-500 border-gray-700'
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type='submit'
              size='icon'
              className='absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 bg-yellow-500 hover:bg-yellow-600 text-black'
              disabled={!input.trim()}
            >
              <SendHorizontal className='h-4 w-4' />
              <span className='sr-only'>Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
