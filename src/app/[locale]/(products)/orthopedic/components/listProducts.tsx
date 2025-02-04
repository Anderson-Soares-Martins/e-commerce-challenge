"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { ProductCardProps, ProductsCard } from "./product-card";

export default function ProductsCarousel({
  allProducts
}: {
  allProducts: ProductCardProps[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = (direction: string) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300; // Quantidade de scroll em pixels
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setIsAtStart(container.scrollLeft === 0);
      setIsAtEnd(
        container.scrollLeft + container.clientWidth >= container.scrollWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollButtons();
      container.addEventListener("scroll", updateScrollButtons);

      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, []);

  return (
    <div className="mt-10 flex flex-col gap-6">
      {/* Setas */}
      <div className="flex gap-4 justify-end">
        <Button
          variant={"outline"}
          onClick={() => handleScroll("left")}
          className="h-10 w-10 [&_svg]:size-7 rounded-full shadow-md"
          disabled={isAtStart}
        >
          <AiOutlineLeft />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => handleScroll("right")}
          className="h-10 w-10 [&_svg]:size-7 rounded-full shadow-md"
          disabled={isAtEnd}
        >
          <AiOutlineRight />
        </Button>
      </div>

      {/* Produtos */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth transition-all"
        )}
      >
        {allProducts.map((product, index) => (
          <ProductsCard
            key={index}
            product={{ ...product, href: "/0" }}
            className="w-64 flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
