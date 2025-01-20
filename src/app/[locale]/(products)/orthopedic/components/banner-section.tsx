import Image from "next/image";
import { FaCircle } from "react-icons/fa6";
import banner1 from "@/assets/banners/banner1.png";
import logo from "@/assets/images/logo.svg";
import { useTranslations } from "next-intl";

export function BannerSection() {
  const t = useTranslations("orthopedic");

  return (
    <div className="relative w-full">
      <div className="flex flex-col items-start absolute top-1/2 transform -translate-y-1/2 w-full px-[10%] md:px-[86px]">
        <h2 className="text-lg md:text-2xl font-medium tracking-[0.7rem] text-subtitle uppercase">
          {t("line")}
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
            {t("description")}
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
  );
}
