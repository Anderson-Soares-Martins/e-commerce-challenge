import Image from "next/image";
import { PiTrademarkRegisteredLight } from "react-icons/pi";
import imageAnvisa from "@/assets/images/anvisa-image.png";
import { ProductFullProps } from "@/lib/data/dataProductFull";

export function ImageDetailsSection({
  product
}: {
  product: ProductFullProps;
}) {
  return (
    <div>
      <div className="h-[590px] w-full flex justify-center items-end mt-16">
        <div className="relative ml-[24%] md:ml-[55%] lg:ml-[20%] xl:ml-[12%] ">
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
          <div className="absolute bg-secondary h-[1px] w-[100px] md:w-[243px] bottom-[35%] md:bottom-[32%] lg:bottom-[60.5%] left-[59%] md:left-[3%] lg:left-[86.3%] transform -translate-x-1/2 rotate-[60deg] md:rotate-[-30deg] lg:rotate-[-40deg]"></div>

          <div className="absolute border border-dashed border-secondary bg-white rounded-lg w-[100%] md:w-[150%] h-fit top-[-20%] md:top-[-5%] right-[30%] md:right-[90%] lg:right-[105%] px-[15px] py-[14px]">
            <div className="flex text-primary">
              <p className="font-medium">{product.family}</p>
              <PiTrademarkRegisteredLight className="h-6 pb-2.5 pt-0.5 ml-0" />
            </div>
            <p>{product.detailsText}</p>
          </div>
          <div className="absolute border border-dashed border-secondary bg-white rounded-lg w-[77%] h-fit bottom-[4%] md:bottom-[8%] lg:bottom-[76%] right-0 md:right-[110%] lg:right-[-92%] px-[14px] py-[15px] ">
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
    </div>
  );
}
