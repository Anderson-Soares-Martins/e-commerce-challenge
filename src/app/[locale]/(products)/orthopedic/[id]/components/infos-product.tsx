import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductFullProps } from "@/lib/data/dataProductFull";
import Link from "next/link";
import { FaCircle } from "react-icons/fa6";
import { PiTrademarkRegisteredLight } from "react-icons/pi";
import { TfiArrowsCorner } from "react-icons/tfi";
import { levels } from "../page";

export function InfosProduct({ product }: { product: ProductFullProps }) {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex">
          <p className="font-medium">{product.family}</p>
          <PiTrademarkRegisteredLight className="h-6 pb-2.5 pt-0.5 ml-0" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold bg-primary text-white w-fit p-2 rounded-md">
          {product.name}
        </h1>
      </div>

      <div className="flex flex-col pr-[43px] gap-6">
        <h3 className="text-subtitle text-sm">
          Código SKU {product.code} Lado direito / Código SKU {product.code}{" "}
          Lado esquerdo
        </h3>
        <div className="flex flex-col gap-2">
          <p>Descrição</p>
          <p className="text-subtitle">{product.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p>Nível {product.level}</p>
          <p className="text-subtitle">{levels[product.level - 1]}</p>
        </div>

        <Separator />

        <div className="flex gap-2 items-center">
          <p>Cores disponíveis:</p>
          <div className="text-subtitle">
            {product.colors.map((color, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <FaCircle color={color.value} />
                <span>{color.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p>Modelo:</p>
          <p className="text-subtitle">{product.model}</p>
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          <p>Tamanhos disponíveis:</p>
          <div className="text-subtitle flex items-center gap-2">
            {product.sizes.map((size, index) => (
              <div key={index} className="bg-gray-300 rounded-md p-0.5 px-2">
                <p>{size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          <div className="flex items-center text-secondary gap-2">
            <TfiArrowsCorner />
            <p>Descubra o seu tamanho ideal</p>
          </div>{" "}
          <div className="flex items-center text-subtitle gap-2">
            <Icons.Fita />
            <p>Tabela de medidas</p>
          </div>
        </div>

        <Button variant={"secondary"} className="w-fit font-medium">
          Encontrar lojas online
        </Button>

        <Link href="/" className="underline text-subtitle font-medium">
          Gostou desse produto? Seja um vendedor
        </Link>
      </div>
    </div>
  );
}
