"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NewsItem {
  id: number;
  company: string;
  headline: string;
  content: string;
  recommendation?: string;
}

async function fetchNews() {
  const response = await fetch("/api/fetchNews");
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsAndAnalyze() {
      try {
        const newsData = await fetchNews();

        const analyzedNews = await Promise.all(
          newsData.map(async (item) => {
            try {
              const sentimentResponse = await fetch("/api/analyzeSentiment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: item.content }),
              });
              if (!sentimentResponse.ok) {
                const errorData = await sentimentResponse.json();
                throw new Error(
                  errorData.error ||
                    `HTTP error! status: ${sentimentResponse.status}`
                );
              }
              const data = await sentimentResponse.json();
              if (data.error) {
                throw new Error(data.error);
              }
              return { ...item, recommendation: data.recommendation };
            } catch (error) {
              console.error("Error analyzing recommendation:", error);
              return {
                ...item,
                recommendation:
                  "Error: " +
                  (error instanceof Error ? error.message : String(error)),
              };
            }
          })
        );

        setNews(analyzedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    }

    fetchNewsAndAnalyze();
  }, []);

  if (error) {
    return (
      <Alert
        variant="destructive"
        className="border-8 border-black rounded-lg shadow-brutal bg-red-500 text-white m-8"
      >
        <AlertTitle className="text-4xl font-black mb-4">ERROR!</AlertTitle>
        <AlertDescription className="text-2xl font-bold">
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-5xl font-black text-center mb-14 text-black">
        <span className=" px-6 py-3 inline-block rounded-xl  ">
          BREAKING NEWS
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="col-span-3 border-2 border-[#151616] bg-white p-6 rounded-lg shadow-[4px_4px_0px_0px_#151616] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#151616] transition-all duration-200"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold px-2 py-1 bg-yellow-300 border border-[#151616] rounded-md">
                  {item.company}
                </span>
                <span
                  className={`text-sm font-bold px-2 py-1 border border-[#151616] rounded-md ${
                    item.recommendation?.startsWith("Error")
                      ? "bg-red-400 text-white"
                      : item.recommendation === "BUY"
                      ? "bg-green-400"
                      : item.recommendation === "SELL"
                      ? "bg-red-400"
                      : "bg-yellow-300"
                  }`}
                >
                  {item.recommendation}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3 line-clamp-2">
                {item.headline}
              </h2>
              <p className="text-sm line-clamp-3 flex-grow">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
