import Image from "next/image";
import banner1 from "@/assets/banners/banner1.png";
import { Badge } from "@/components/ui/badge";
import { PiTrademarkRegisteredLight } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { SidebarFilter } from "./components/sidebar-filter";
import { ProductsCard } from "./components/product-card";
import { products } from "../../../../lib/data/dataProducts";
import { Button } from "@/components/ui/button";
import { RxDownload } from "react-icons/rx";
import { PaginationWithLinks } from "@/components/others/pagination";
import { fetchProducs } from "@/lib/api";

interface OrthopedicPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const TOTAL_PAGE = 9;

export default async function Orthopedic({
  searchParams
}: OrthopedicPageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt((page as string) || "1");
  const { allProducts, totalProducts } = await fetchProducs(
    currentPage,
    TOTAL_PAGE
  );

  return (
    <div className="w-full">
      <Image
        src={banner1.src}
        alt="Products"
        width={1366}
        height={617}
        className="object-contain w-full"
      />
      <div className="flex flex-col space-y-10 px-[7%] py-10">
        <div>
          <h1 className="text-3xl font-mediun">
            Conheça as <span className="font-bold">famílias exclusivas</span>
          </h1>
          <h1 className="text-3xl font-mediun">da linha Orthopedic</h1>
        </div>
        <div>
          <Badge>
            Hidrolight Neo
            <PiTrademarkRegisteredLight className="h-6 pb-2.5 ml-0" />
          </Badge>
        </div>

        <p className="w-1/2">
          Família voltada para extrair os benefícios do Neoprene. Propriedades
          térmicas, compressivas e elásticas: são essas três propriedades que
          fazem do Neoprene uma ferramenta eficaz no tratamento e prevenção de
          lesões no tratamento ortopédico.
        </p>
        <Separator />
        <div className="flex min-h-[500px] gap-6">
          <SidebarFilter />
          <div className="flex flex-1 flex-wrap gap-6">
            <div className="w-full flex items-center justify-between">
              <Badge variant="gray" className="font-bold">
                {products.length} produtos
              </Badge>

              <Button variant="secondary">
                Baixar Catálago <RxDownload />
              </Button>
            </div>
            {allProducts.map((product, index) => (
              <ProductsCard key={index} product={{ ...product, href: "/0" }} />
            ))}
            <div className="w-full flex justify-center">
              <PaginationWithLinks
                page={currentPage}
                pageSize={TOTAL_PAGE}
                totalCount={totalProducts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
