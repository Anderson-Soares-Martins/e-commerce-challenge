import Image from "next/image";
import banner1 from "@/assets/banners/banner1.png";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarFilter } from "./components/sidebar-filter";
import { ProductsCard } from "./components/product-card";
import { Button } from "@/components/ui/button";
import { RxDownload } from "react-icons/rx";
import { PaginationWithLinks } from "@/components/others/pagination";
import { fetchProducs } from "@/lib/api";
import Breadcrumb from "@/components/others/breadcrumb";
import logo from "@/assets/images/logo.svg";
import { FaCircle } from "react-icons/fa6";
import BadgeSelector from "./components/badge-selector";
import AnimatedSearch from "@/components/others/animated-search";

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
      <div className="relative w-full">
        <div className="flex flex-col items-start absolute top-1/2 transform -translate-y-1/2 w-full px-[10%] md:px-[86px]">
          <h2 className="text-lg md:text-2xl font-medium tracking-[0.7rem] text-subtitle">
            LINHA
          </h2>
          <div className="relative">
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
              className="absolute right-[-3%] top-[-30%] w-[25%]"
            />
            <h1 className="text-2xl md:text-5xl font-bold tracking-[0.9rem] text-primary">
              ORTHOPEDIC
            </h1>
          </div>
          <div className="flex gap-2 px-2 md:px-4 mt-9">
            <FaCircle className="size-1 mt-3" />
            <p className="text-xl md:text-2xl font-medium w-[90%] md:w-1/2">
              Produtos desenvolvidos para auxiliar na prevenção e retorno das
              atividades, no tratamento e recuperação de pacientes com lesões
              ortopédicas.
            </p>
          </div>
        </div>
        <div className="w-full h-[617px] flex items-center">
          <Image
            src={banner1.src}
            alt="Products"
            width={1366}
            height={617}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
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
