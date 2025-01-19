"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ProductCardProps {
  name: string;
  image?: string;
  family?: string;
  options?: string[];
  href: string;
  isNew: boolean;
  code: string;
}

export function ProductsCard({
  product,
  className
}: {
  product: ProductCardProps;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/${product.href}`}
      className={cn(
        "group relative flex flex-col gap-2 cursor-pointer",
        className
      )}
    >
      {product.isNew && (
        <Badge className="absolute top-2 left-2 opacity-80 group-hover:opacity-100">
          Lançamento
        </Badge>
      )}
      <div className="rounded-lg overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={268}
            height={338}
          />
        ) : (
          <div className="w-[268px] h-[338px] bg-gray-300" />
        )}
      </div>
      <div>
        <h1 className="font-medium text-title">{product.name}</h1>
        <div className="flex items-center text-subtitle gap-2">
          <p className="font-bold">Cód. Produto</p>
          <p className="text-sm">{product.code}</p>
        </div>
      </div>
    </Link>
  );
}
