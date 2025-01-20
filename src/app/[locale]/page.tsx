import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button asChild>
        <Link href="/products">{t("products")}</Link>
      </Button>
    </div>
  );
}
