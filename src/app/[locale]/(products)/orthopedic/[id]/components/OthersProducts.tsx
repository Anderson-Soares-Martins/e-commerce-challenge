"use client";

import { useRef, useState, useEffect } from "react";
import { ProductCardProps, ProductsCard } from "../../components/product-card";
import { Button } from "@/components/ui/button";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { cn } from "@/lib/utils";

export default function OthersProducts({
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
      const cardWidth = 256; // width of each card (w-64)
      const gap = 16; // gap-4 in pixels
      const scrollAmount = cardWidth + gap;

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
      setIsAtStart(container.scrollLeft <= 0);
      setIsAtEnd(
        Math.ceil(container.scrollLeft + container.clientWidth) >=
          container.scrollWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollButtons();
      container.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);

      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, []);

  return (
    <div className="mt-10 flex flex-col gap-6 relative">
      <div className="flex gap-2 items-center justify-between px-[5%] md:px-[86px]">
        <div>
          <h1 className="text-[32px] font-medium leading-10">Conheça também</h1>
          <h1 className="text-[32px] font-medium leading-10">
            nossos outros produtos
          </h1>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => handleScroll("left")}
            className="h-10 w-10 [&_svg]:size-7 rounded-full shadow-md"
            disabled={isAtStart}
          >
            <AiOutlineLeft />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScroll("right")}
            className="h-10 w-10 [&_svg]:size-7 rounded-full shadow-md"
            disabled={isAtEnd}
          >
            <AiOutlineRight />
          </Button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden pl-[5%] md:pl-[86px]">
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex items-center gap-4 overflow-x-auto scroll-smooth transition-all px-[5%] md:px-[86px]",
            "no-scrollbar snap-x snap-mandatory"
          )}
        >
          {allProducts.map((product, index) => (
            <ProductsCard
              key={index}
              product={{ ...product, href: "/0" }}
              className="w-64 flex-shrink-0 snap-start"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
