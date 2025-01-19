"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  images: string[];
  className?: string;
}

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0
  }),
  active: {
    x: 0,
    scale: 1,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2
  })
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04]
};

export function VisualGallery({ images, className }: Props) {
  const [[currentIndex, direction], setCurrentIndex] = useState<
    [number, number]
  >([0, 0]);
  const thumbnailsRef = useRef<(HTMLImageElement | null)[]>([]);
  const thumbnailsContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSwipe = (swipeDirection: number) => {
    const newIndex = currentIndex + swipeDirection;
    if (newIndex < 0 || newIndex >= images.length) return;
    setCurrentIndex([newIndex, swipeDirection]);
  };

  const handleDragEnd = (dragInfo: { offset: { x: number } }) => {
    const swipeThreshold = 50;
    if (dragInfo.offset.x > swipeThreshold && currentIndex > 0) {
      handleSwipe(-1);
    } else if (
      dragInfo.offset.x < -swipeThreshold &&
      currentIndex < images.length - 1
    ) {
      handleSwipe(1);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex([index, index > currentIndex ? 1 : -1]);
  };

  const scrollToActiveThumbnail = () => {
    const container = thumbnailsContainerRef.current;
    const activeThumbnail = thumbnailsRef.current[currentIndex];

    if (!container || !activeThumbnail) return;

    // Obter dimensões e posições
    const containerRect = container.getBoundingClientRect();
    const thumbnailRect = activeThumbnail.getBoundingClientRect();

    // Calcular a posição ideal para centralizar a thumbnail
    const thumbnailCenter = thumbnailRect.left + thumbnailRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const scrollOffset =
      container.scrollLeft + (thumbnailCenter - containerCenter);

    // Aplicar o scroll com animação suave
    container.scrollTo({
      left: scrollOffset,
      behavior: "smooth"
    });
  };

  // Atualizar scroll quando o índice mudar
  useEffect(() => {
    scrollToActiveThumbnail();
  }, [currentIndex]);

  // Adicionar listener para redimensionamento da janela
  useEffect(() => {
    const handleResize = () => {
      scrollToActiveThumbnail();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  return (
    <div className={cn("w-full", className)}>
      {/* Main image with animation */}
      <div className="relative w-full overflow-hidden rounded-lg border border-gray-300 aspect-[16/12]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            custom={direction}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, dragInfo) => handleDragEnd(dragInfo)}
          >
            <Image
              src={images[currentIndex]}
              alt="Product image"
              width={1920}
              height={1080}
              className="object-cover w-full"
            />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 text-white bg-black/20 bg-opacity-50 px-2 py-1 backdrop-blur-[2px] rounded-md transform -translate-x-1/2">
            {currentIndex + 1}/{images.length}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <Button
          onClick={() => handleSwipe(-1)}
          variant={"ghost"}
          className="size-12 rounded-full"
          disabled={currentIndex === 0}
        >
          <AiOutlineLeft />
        </Button>

        <div
          ref={thumbnailsContainerRef}
          className="flex justify-start gap-2 mt-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-md flex-shrink-0 w-[22%] h-full aspect-[6/4] flex items-center snap-center"
            >
              <motion.img
                ref={(el) => {
                  thumbnailsRef.current[index] = el;
                }}
                src={img}
                alt={`Thumbnail ${index}`}
                className={cn(`cursor-pointer object-cover bg-white`, {
                  "opacity-50 hover:opacity-100": index !== currentIndex,
                  "blur-[0.6px]":
                    index - currentIndex === 1 || index - currentIndex === -1,
                  "blur-[1px]":
                    index - currentIndex === 2 || index - currentIndex === -2,
                  "blur-[2.5px]":
                    index - currentIndex > 2 || index - currentIndex < -2
                })}
                onClick={() => handleThumbnailClick(index)}
              />
              {index === currentIndex && (
                <div className="absolute inset-0 flex items-end">
                  <div className="bg-secondary h-1.5 w-full" />
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={() => handleSwipe(1)}
          variant={"ghost"}
          className="size-12 rounded-full"
          disabled={currentIndex === images.length - 1}
        >
          <AiOutlineRight />
        </Button>
      </div>
    </div>
  );
}
