import { fetchProducs, fetchProductById } from "@/lib/api";
import { VisualGallery } from "./components/VisualGallery";
import { VideoPlayer } from "./components/VideoPlayer";
import { PiTrademarkRegisteredLight } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { FaCircle } from "react-icons/fa6";
import { TfiArrowsCorner } from "react-icons/tfi";
import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import imageAnvisa from "@/assets/images/anvisa-image.png";
import { Accordion } from "./components/accordion";
import OthersProducts from "./components/OthersProducts";

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
  const { allProducts } = await fetchProducs(1, 16);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="overflow-hidden pt-7 pb-20">
      <div className="flex flex-col md:flex-row py-10 pl-[5%] pr-[3%] md:pl-[86px] md:pr-[43px] gap-10">
        <VisualGallery images={product.images} className="w-full md:w-[55%]" />
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex">
              <p className="font-medium">{product.family}</p>
              <PiTrademarkRegisteredLight className="h-6 pb-2.5 pt-0.5 ml-0" />
            </div>
            <h1 className="text-5xl font-bold bg-primary text-white w-fit p-2 rounded-md">
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
                  <div
                    key={index}
                    className="bg-gray-300 rounded-md p-0.5 px-2"
                  >
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
      </div>

      <div className="flex flex-col gap-4 px-[5%] md:px-[86px]">
        <VideoPlayer
          thumbnailSrc={product.thumbnailVideo}
          videoSrc={product.video}
        />
        <div>
          <h1 className="text-[32px] font-medium leading-10">
            Fabricação <span className="text-secondary font-bold">própria</span>{" "}
            e nacional.
          </h1>
          <h1 className="text-[32px] font-medium leading-10">
            <span className="text-secondary font-bold">Qualidade</span>{" "}
            garantida!
          </h1>
        </div>

        <div>
          <p className="text-subtitle leading-6">
            Antes de utilizar o produto, leia atentamente as
            <br /> precauções e Instruções de uso.
          </p>
        </div>

        <div>
          <div className="h-[590px] w-full flex justify-center items-end mt-16">
            <div className="relative">
              <Image
                src={product.detailsImage}
                alt="Detalhes"
                width={250}
                height={590}
                className="object-cover h-auto"
              />
              <div className="absolute w-full h-[20%] bottom-0 bg-gradient-to-t from-white to-transparent" />
              <div className="absolute bg-secondary rounded-full w-4 h-4 bottom-[44%] left-[25%] transform -translate-x-1/2"></div>
              <div className="absolute bg-secondary rounded-full w-4 h-4 bottom-[43%] left-[47%] transform -translate-x-1/2"></div>

              <div className="absolute bg-secondary h-[1px] w-[153px] bottom-[58%] left-[10%] transform -translate-x-1/2 rotate-[60deg]"></div>
              <div className="absolute bg-secondary h-[1px] w-[243px] bottom-[60.5%] left-[86.3%] transform -translate-x-1/2 rotate-[-40deg]"></div>

              <div className="absolute border border-dashed border-secondary rounded-lg w-[150%] h-fit top-[-5%] right-[105%] px-[15px] py-[14px]">
                <div className="flex text-primary">
                  <p className="font-medium">{product.family}</p>
                  <PiTrademarkRegisteredLight className="h-6 pb-2.5 pt-0.5 ml-0" />
                </div>
                <p>{product.detailsText}</p>
              </div>
              <div className="absolute border border-dashed border-secondary rounded-lg w-[77%] h-fit bottom-[76%] right-[-92%] px-[14px] py-[15px]">
                <Image
                  src={imageAnvisa}
                  alt="Anvisa"
                  width={100}
                  height={39}
                  className="w-full object-cover"
                />
                <p className="text-subtitle text-sm font-bold">
                  Autorização e Cadastro de produtos para saúde na ANVISA
                </p>
              </div>
            </div>
          </div>

          <div>
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
                        <p className="text-subtitle font-medium">
                          Nome Comercial:
                        </p>
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

                      <p className="text-subtitle font-medium">
                        PRODUTO TÉRMICO
                      </p>
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
                        <p className="text-subtitle">
                          {product.sizes.join(", ")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-subtitle font-medium">Cores:</p>
                        <p className="text-subtitle">
                          {product.colors
                            .map((color) => color.label)
                            .join(", ")}
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
        </div>
      </div>

      <OthersProducts allProducts={allProducts} />
    </div>
  );
}
