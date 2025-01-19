import { ProductFullProps } from "@/lib/data/dataProductFull";
import { Accordion } from "../components/accordion";
import { levels } from "../page";

export function AccordionInfo({ product }: { product: ProductFullProps }) {
  return (
    <div className="w-full px-[5%] md:px-[86px]">
      <Accordion
        className="border-t mt-1"
        items={[
          {
            value: "1",
            trigger: "Detalhes",
            content: (
              <div className="flex flex-col gap-4">
                <p className="font-medium">
                  Nível {product.level} - {levels[product.level - 1]}
                </p>
                <div className="flex gap-2">
                  <p className="text-subtitle font-medium">Nome Comercial:</p>
                  <p className="text-subtitle">{product.name}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-subtitle font-medium">Linhas:</p>
                  <p className="text-subtitle">{product.category}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-subtitle font-medium">
                    Cod. Produto (referências/SKU):
                  </p>
                  <p className="text-subtitle">{product.code}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-subtitle font-medium">
                    Família de Produtos:
                  </p>
                  <p className="text-subtitle">{product.family}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-subtitle font-medium">
                    Modelos do produto(esquerda/direita–bilateral):
                  </p>
                  <p className="text-subtitle">{product.model}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-subtitle font-medium">Composição:</p>
                  <p className="text-subtitle">{product.composition}</p>
                </div>

                <p className="text-subtitle font-medium">PRODUTO TÉRMICO</p>
              </div>
            )
          },
          {
            value: "2",
            trigger: "Especificações técnicas",
            content: (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <p className="text-subtitle font-medium">Tamanhos:</p>
                  <p className="text-subtitle">{product.sizes.join(", ")}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-subtitle font-medium">Cores:</p>
                  <p className="text-subtitle">
                    {product.colors.map((color) => color.label).join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-subtitle font-medium">Nível:</p>
                  <p className="text-subtitle">{product.level}</p>
                </div>
              </div>
            )
          },
          {
            value: "3",
            trigger: "Indicações e Instrução de uso",
            content: ""
          },
          {
            value: "4",
            trigger: "Garantia",
            content: ""
          }
        ]}
      />
    </div>
  );
}
