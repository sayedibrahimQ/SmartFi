"use client";

import React, { useState, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ChatCard } from "@/components/chat-card";

export default function ResearchPage() {
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedPostType, setSelectedPostType] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset output
    setOutput("");
    setIsStreaming(false);

    try {
      const flowIdOrName = "EngageMaster";
      const langflowId = "7c06bd77-309d-4023-bd5d-13a0871a791c";

      const response = await fetch("/api/langflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: `/lf/${langflowId}/api/v1/run/${flowIdOrName}`,
          body: {
            input_value: input,
            input_type: "chat",
            output_type: "chat",
            tweaks: {},
          },
        }),
      });

      const result = await response.json();
      console.log("Result:", result);

      if (result.outputs && result.outputs[0].outputs[0].artifacts.stream_url) {
        // Handle streaming
        const streamUrl = result.outputs[0].outputs[0].artifacts.stream_url;
        handleStreaming(streamUrl);
      } else {
        // Handle standard response
        setOutput(result.outputs[0].outputs[0].artifacts.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput("An error occurred.");
    }
  };

  const handleStreaming = (streamUrl: string) => {
    setIsStreaming(true);
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOutput((prev) => `${prev}${data.chunk}`);
    };

    eventSource.onerror = (error) => {
      console.error("Streaming error:", error);
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      eventSource.close();
      setIsStreaming(false);
    });
  };

  return (
    <div className='flex w-screen h-screen overflow-y-scroll'>
      <main className='flex-1 overflow-y-scroll relative bg-gradient-to-br from-black via-gray-900 to-orange-950'>
        <div className='h-full flex flex-col p-6'>
          <ChatCard
            selectedApp={selectedApp}
            selectedPostType={selectedPostType}
            onSelectApp={setSelectedApp}
            onSelectPostType={setSelectedPostType}
          />

          {/* Langflow Integration Form */}
          <Card className='mt-6 p-6 backdrop-blur-md bg-white/10 border-none shadow-lg'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter your input...'
                rows={4}
                className='w-full bg-transparent border-white/20 text-white placeholder-white/50'
              />
              <Button type='submit' className='w-full'>
                Run Flow
              </Button>
            </form>

            {isStreaming && <p className='mt-4 text-white/70'>Streaming...</p>}
            {output && (
              <div className='mt-4'>
                <strong className='text-white'>Output:</strong>
                <p className='mt-2 text-white/90 whitespace-pre-wrap'>
                  {output}
                </p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
