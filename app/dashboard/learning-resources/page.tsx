"use client";

import { Suspense } from "react";
import NewsFeed from "@/components/NewsFeed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YouTubeVideos from "@/components/YouTubeVideos";
import { Button } from "@/components/ui/button";
import { Book, LineChart, TrendingUp } from "lucide-react";
import ChatWindow from "@/app/components/ChatWindow";

export default function Home() {
  return (
    <DashboardShell>
      <div className="min-h-screen bg-[#FAFAFA]   ">
        <div
          className=" inset-0"
          style={{
            backgroundImage: `radial-gradient(#151616 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            opacity: "0.1",
          }}
        />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
                <TabsTrigger
                  value="news"
                  className="data-[state=active]:bg-[#CCFF00] data-[state=active]:text-black"
                >
                  Market News
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="data-[state=active]:bg-[#CCFF00] data-[state=active]:text-black"
                >
                  Expert Videos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="news">
                <Suspense fallback={<LoadingCards />}>
                  <NewsFeed />
                </Suspense>
              </TabsContent>
              <TabsContent value="videos">
                <YouTubeVideos />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </DashboardShell>
  );
}

function LoadingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="animate-pulse border-none shadow-lg">
          <CardHeader>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
            </div>
          </CardContent>
        </Card>
      ))}
      <ChatWindow/>
    </div>
  );
}
