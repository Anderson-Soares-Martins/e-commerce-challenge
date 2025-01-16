import { useTranslations } from "next-intl";

export default function Contato() {
  const t = useTranslations("Contato");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
