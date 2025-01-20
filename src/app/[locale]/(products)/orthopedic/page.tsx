import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarFilter } from "./components/sidebar-filter";
import { ProductsCard } from "./components/product-card";
import { Button } from "@/components/ui/button";
import { RxDownload } from "react-icons/rx";
import { PaginationWithLinks } from "@/components/others/pagination";
import { fetchProducs } from "@/lib/api";
import Breadcrumb from "@/components/others/breadcrumb";
import BadgeSelector from "./components/badge-selector";
import AnimatedSearch from "@/components/others/animated-search";
import { BannerSection } from "./components/banner-section";

interface OrthopedicPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const TOTAL_PAGE = 9;

export default async function Orthopedic({
  searchParams
}: OrthopedicPageProps) {
  const filters = await searchParams;

  const getFilterValues = (key: string) => {
    const filterValue = filters[key];
    return Array.isArray(filterValue)
      ? filterValue.map((value) =>
          decodeURIComponent(value)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
        )
      : filterValue
      ? [
          decodeURIComponent(filterValue)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
        ]
      : [];
  };

  const technology = getFilterValues("falimias/tecnologias");
  const productsOptions = getFilterValues("produtos");

  // Outros filtros podem ser extraídos aqui
  const appliedFilters = {
    news:
      filters.lancamentos === "true" || filters.lancamentos === "false"
        ? filters.lancamentos === "true"
        : undefined,
    technology: technology.length ? technology : undefined,
    productsOptions: productsOptions.length ? productsOptions : undefined
  };

  const { page } = await searchParams;
  const currentPage = parseInt((page as string) || "1");
  const { allProducts, totalProducts } = await fetchProducs({
    currentPage,
    perPage: TOTAL_PAGE,
    ...appliedFilters
  });

  return (
    <div className="w-full">
      <div className="absolute z-10 py-2 px-[10%] md:px-[86px] w-full">
        <Breadcrumb />
      </div>
      <BannerSection />
      <div className="flex flex-col space-y-10 px-[5%] py-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-mediun">
            Conheça as <span className="font-bold">famílias exclusivas</span>
          </h1>
          <h1 className="text-2xl md:text-3xl font-mediun">
            da linha Orthopedic
          </h1>
        </div>
        <BadgeSelector />

        <Separator />
        <div className="flex flex-col lg:flex-row min-h-[500px] gap-6">
          <SidebarFilter />
          <div className="flex flex-1 flex-wrap gap-6 justify-center lg:justify-start items-start">
            <div className="w-full flex flex-col-reverse gap-4 sm:flex-row items-center justify-between ">
              <div className="flex flex-row-reverse w-full justify-between sm:justify-start sm:flex-row gap-2">
                <Badge variant="gray" className="font-bold">
                  {totalProducts} produtos
                </Badge>
                <AnimatedSearch />
              </div>

              <Button variant="secondary" className="w-full sm:w-fit">
                Baixar Catálago <RxDownload />
              </Button>
            </div>
            {allProducts.map((product, index) => (
              <ProductsCard key={index} product={{ ...product, href: "/0" }} />
            ))}

            {totalProducts > 0 && (
              <div className="w-full flex justify-center">
                <PaginationWithLinks
                  page={currentPage}
                  pageSize={TOTAL_PAGE}
                  totalCount={totalProducts}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
