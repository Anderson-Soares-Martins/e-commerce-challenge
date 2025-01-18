import { fetchProductById } from "@/lib/api";
import { VisualGallery } from "./components/VisualGallery";
import { PiTrademarkRegisteredLight } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

const levels = [
  "Recuperação e tratamento de lesões LEVES",
  "Recuperação e tratamento de lesões MODERADAS",
  "Recuperação e tratamento de lesões GRAVES"
];

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div>
      <div className="flex py-10 pl-[86px] pr-[43px] gap-10">
        <VisualGallery images={product.images} className="flex-1" />
        <div className="flex flex-col flex-1 gap-4">
          <div>
            <div className="flex">
              <p className="font-medium">{product.family}</p>
              <PiTrademarkRegisteredLight className="h-6 pb-2.5 pt-0.5 ml-0" />
            </div>
            <h1 className="text-5xl font-bold bg-primary text-white w-fit p-2">
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

            <div className="flex flex-col gap-2">
              <p>Cores disponíveis</p>
              <p className="text-subtitle">{product.colors.join(", ")}</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
