import { countriesFlagsArray } from "@/assets/country-flags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useId } from "react";

const countries = countriesFlagsArray.map((country) => ({
  value: country.lang,
  label: country.label,
  flag: country.src
}));

export default function SelectLanguage() {
  const id = useId();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function handleLanguageChange(nextLocale: string) {
    const nextPath = pathname.replace(`/${params.locale}`, `/${nextLocale}`);
    router.push(nextPath);
  }

  return (
    <div className="space-y-2">
      <Select defaultValue={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger
          id={id}
          className="shadow-none border-none focus:ring-0 w-[78px]"
        >
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          {countries.map((continent) => (
            <SelectItem key={continent.value} value={continent.value}>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 border border-black h-[17px] w-[24px]" />
                <Image
                  src={continent.flag}
                  alt={continent.label}
                  width={24}
                  height={24}
                  className="shrink-0 object-cover"
                />
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
