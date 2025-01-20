import { fetchProducs, fetchProductById } from "@/lib/api";
import { VideoPlayer } from "./components/video-player";
import OthersProducts from "./components/others-products";
import Breadcrumb from "@/components/others/breadcrumb";
import { AccordionInfo } from "./sections/accordion-info";
import { ImageDetailsSection } from "./components/image-details-section";
import { InfosProduct } from "./components/infos-product";
import { VisualGallery } from "./components/visual-gallery";

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;
  const product = await fetchProductById(id);
  const { allProducts } = await fetchProducs({ currentPage: 1, perPage: 16 });

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <>
      <div className="px-[5%] md:px-[86px] flex items-center">
        <Breadcrumb
          dynamicRouter={{
            name: product.family
          }}
        />
      </div>
      <div className="overflow-hidden pb-20">
        <div className="flex flex-col xl:flex-row py-10 pt-5 pl-[5%] pr-[3%] md:pl-[86px] md:pr-[43px] gap-10">
          <VisualGallery
            images={product.images}
            className="w-full xl:w-[55%] pt-5"
          />
          <InfosProduct product={product} />
        </div>

        <div className="flex flex-col gap-4 px-[5%] md:px-[86px]">
          <VideoPlayer
            thumbnailSrc={product.thumbnailVideo}
            videoSrc={product.video}
          />
          <div>
            <h1 className="text-[32px] font-medium leading-10">
              Fabricação{" "}
              <span className="text-secondary font-bold">própria</span> e
              nacional.
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

          <ImageDetailsSection product={product} />
        </div>

        <AccordionInfo product={product} />
        <OthersProducts allProducts={allProducts} />
      </div>
    </>
  );
}
