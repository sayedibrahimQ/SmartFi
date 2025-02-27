"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { X, Send, Bot, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserContext } from "../contexts/AppContext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();
  const { user } = useUserContext();

  const handleToggle = () => setIsOpen(!isOpen);
  const handleMinimize = () => setIsMinimized(!isMinimized);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user" as const,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const contextualInput = {
      user_context: {
        name: user?.fullName || "",
        email: user?.email || "",
        occupation: user?.occupation || "",
        monthlyIncome: user?.monthlyIncome || "",
        riskTolerance: user?.riskTolerance || "",
      },
    };

    try {
      const response = await fetch("/api/langflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: `/lf/7c06bd77-309d-4023-bd5d-13a0871a791c/api/v1/run/EngageMaster-1`,
          body: {
            input_value: input,
            input_type: "chat",
            output_type: "chat",
            tweaks: {},
            user_context: contextualInput,
          },
        }),
      });

      const result = await response.json();

      if (result.outputs && result.outputs[0].outputs[0].artifacts.message) {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          content: result.outputs[0].outputs[0].artifacts.message,
          role: "assistant" as const,
        };
        console.log(assistantMessage);
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant" as const,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={handleToggle}
        className='fixed bottom-6 right-6 bg-[#CBFF00] text-black hover:bg-[#CBFF00] border-3 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-full p-4 z-50'
      >
        <Bot size={24} />
      </Button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-[420px] ${
        isMinimized ? "h-[60px]" : "h-[560px]"
      } bg-white border-4 border-black rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col transition-all duration-300 ease-in-out z-50`}
    >
      <div className='flex justify-between items-center p-5 border-b-4 border-black'>
        <div className='flex items-center'>
          <Bot
            size={32}
            className='text-[#CBFF00] bg-black rounded-full p-1 mr-3'
          />
          <h2 className='text-xl font-bold'>Financial Assistant</h2>
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            onClick={handleMinimize}
            variant='ghost'
            className='hover:bg-gray-200 rounded-full p-2'
          >
            {isMinimized ? <Maximize2 size={24} /> : <Minimize2 size={24} />}
          </Button>
          <Button
            onClick={handleToggle}
            variant='ghost'
            className='hover:bg-gray-200 rounded-full p-2'
          >
            <X size={28} />
          </Button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <ScrollArea className='flex-grow p-6'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-3 rounded-xl text-base ${
                    message.role === "user"
                      ? "bg-[#CBFF00] text-black"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </Markdown>
                </span>
              </div>
            ))}
          </ScrollArea>
          <form
            onSubmit={handleFormSubmit}
            className='p-5 border-t-4 border-black'
          >
            <div className='flex space-x-3'>
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder='Ask about your finances...'
                className='flex-grow text-base border-3 border-black focus:border-[#CBFF00] focus:ring-[#CBFF00] rounded-xl py-2 px-3'
              />
              <Button
                type='submit'
                className='bg-[#CBFF00] text-black hover:bg-[#CBFF00] border-3 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl p-2'
              >
                <Send size={24} />
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
