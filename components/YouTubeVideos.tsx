"use client";

import { useEffect, useState } from "react";

const sampleVideos = [
  { id: "8zWQ9aXmeaY", title: "What is ETF?" },
  { id: "uPEnKvOU3Cs", title: "How to Start Investing in your 20s" },
  { id: "Nrn3-G8IUSQ", title: "Stock Market for Beginners" },
  { id: "R5aDUli_sAc", title: "Easy To Follow Investing Plan for 2025" },
  { id: "tHxwyWnNu0c", title: "ETF vs Index Funds vs Mutual Funds" },
  { id: "3UF0ymVdYLA", title: "ALL Investment OPTIONS Explained!" },
];

interface VideoCardProps {
  id: string;
  title: string;
}

function VideoCard({ id, title }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="text-black border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl overflow-hidden">
      <div className="aspect-video">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-b-2 border-black"
          ></iframe>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <img
              src={`https://img.youtube.com/vi/${id}/0.jpg`}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-black mb-2 line-clamp-2">{title}</h2>
        <button
          onClick={() => setIsPlaying(true)}
          className="mt-2 bg-black text-[#CBFF00] px-4 py-2 rounded-lg font-bold hover:bg-opacity-80 transition-all"
        >
          {isPlaying ? "Playing" : "Watch Now"}
        </button>
      </div>
    </div>
  );
}

export default function YouTubeVideos() {
  const [videos, setVideos] = useState<typeof sampleVideos>([]);

  useEffect(() => {
    const shuffled = sampleVideos.sort(() => 0.5 - Math.random());
    setVideos(shuffled.slice(0, Math.floor(Math.random() * 2) + 5));
  }, []);

  return (
    <div className="p-8  min-h-screen">
      <h1 className="text-5xl font-black text-center mb-10 text-black">
        <span className=" px-6 py-3 inline-block rounded-xl mb-14">
          FINANCIAL EDUCATION
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <VideoCard key={video.id} id={video.id} title={video.title} />
        ))}
      </div>
    </div>
  );
}
