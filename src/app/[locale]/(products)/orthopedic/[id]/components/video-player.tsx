"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { GrPlayFill } from "react-icons/gr";

interface VideoPlayerProps {
  videoSrc: string;
  thumbnailSrc: string;
}

export function VideoPlayer({ videoSrc, thumbnailSrc }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <>
      {isPlaying ? (
        <iframe
          src={videoSrc}
          allowFullScreen
          className="w-full aspect-[16/9]"
        />
      ) : (
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={thumbnailSrc}
            alt="Thumbnail"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-65 transition-opacity ">
            <Button
              onClick={handlePlay}
              className="rounded-full aspect-square bg-white hover:bg-gray-100 text-secondary [&_svg]:size-12 h-20 w-20 "
            >
              <GrPlayFill className="ml-1.5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
