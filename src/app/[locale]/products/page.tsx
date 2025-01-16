import Image from "next/image";
import banner1 from "@/assets/banners/banner1.png";
import { Badge } from "@/components/ui/badge";

export default function Products() {
  return (
    <div className="w-full">
      <Image
        src={banner1.src}
        alt="Products"
        width={1366}
        height={617}
        className="object-contain w-full"
      />
      <div>
        <h1 className="text-3xl font-mediun">
          Conheça as <span className="font-bold">famílias exclusivas</span>
        </h1>
        <h1 className="text-3xl font-mediun">da linha Orthopedic</h1>
      </div>
      <div>
        <Badge>Novidade</Badge>
      </div>
    </div>
  );
}
