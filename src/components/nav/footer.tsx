import Link from "next/link";
import { Button } from "../ui/button";
import { FaFacebook, FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { PiInstagramLogoFill, PiYoutubeLogoFill } from "react-icons/pi";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="w-full bg-subtitle py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo Section */}
          <div className="col-span-full lg:col-span-1">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl md:text-3xl font-medium text-white">
                LOGO
              </h1>
            </Link>
          </div>

          {/* Navigation Categories */}
          <NavCategory category={navCategories.Institutional} />
          <NavCategory category={navCategories.catalogue} />
          <NavCategory category={navCategories.products} />

          {/* Contact and Social Section */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <NavCategory category={navCategories.contact} />
              <NavCategory category={navCategories.social} row />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const navCategories = {
  Institutional: {
    title: "Institucional",
    options: [
      { href: "/about", label: "Sobre nós" },
      { href: "/workWithUs", label: "Trabalhe conosco" }
    ]
  },
  catalogue: {
    title: "Downloads de Catálogos",
    options: [
      { href: "/products/general-catalogue", label: "Catálogo geral" },
      { href: "/services/orthopedic", label: "Linha Orthopedic" },
      { href: "/services/sports", label: "Linha Sports" },
      { href: "/services/special-cares", label: "Linha Special Cares" },
      { href: "/services/foot-care", label: "Catálogo Foot Care" },
      { href: "/services/accessibility", label: "Catálogo Acessibilidade" }
    ]
  },
  products: {
    title: "Linhas de produtos",
    options: [
      { href: "/products/orthopedic", label: "Orthopedic" },
      { href: "/products/sports", label: "Sports" },
      { href: "/products/special-cares", label: "Special Cares" }
    ]
  },
  contact: {
    title: "Entre em contato e tire suas dúvidas",
    options: [
      {
        href: "/contact",
        label: (
          <div className="flex items-center gap-2">
            <div className="border border-secondary text-secondary rounded-full p-1.5 [&_svg]:size-4 md:[&_svg]:size-5">
              <FaPhone />
            </div>
            <span className="text-sm md:text-base">+55 48 3333 3333</span>
          </div>
        )
      },
      {
        href: undefined,
        label: (
          <div className="flex items-center gap-2">
            <div className="border border-secondary text-secondary rounded-full p-1 [&_svg]:size-5 md:[&_svg]:size-6">
              <IoMail />
            </div>
            <div className="flex flex-col text-sm md:text-base">
              <Link href={"/"}>sac@loremipsum.com.br</Link>
              <Link href={"/"}>rp@loremipsum.com.br</Link>
            </div>
          </div>
        )
      }
    ]
  },
  social: {
    title: "Nos acompanhe também nas redes sociais",
    options: [
      {
        href: "/",
        label: (
          <div className="border border-secondary text-secondary rounded-full p-1 [&_svg]:size-5 md:[&_svg]:size-6 hover:bg-secondary hover:text-white transition-colors">
            <PiInstagramLogoFill />
          </div>
        )
      },
      {
        href: "/",
        label: (
          <div className="border border-secondary text-secondary rounded-full p-1 [&_svg]:size-5 md:[&_svg]:size-6 hover:bg-secondary hover:text-white transition-colors">
            <PiYoutubeLogoFill />
          </div>
        )
      },
      {
        href: "/",
        label: (
          <div className="border border-secondary text-secondary rounded-full p-1 [&_svg]:size-5 md:[&_svg]:size-6 hover:bg-secondary hover:text-white transition-colors">
            <FaFacebook />
          </div>
        )
      }
    ]
  }
};

interface NavCategoryProps {
  category: {
    title: React.ReactNode;
    options: {
      href?: string;
      label: React.ReactNode;
    }[];
  };
  row?: boolean;
}

function NavCategory({ category, row }: NavCategoryProps) {
  return (
    <div className="space-y-4 text-center sm:text-start">
      <h2 className="font-medium text-white text-lg">{category.title}</h2>
      <div
        className={cn(
          "flex flex-col gap-3 items-center sm:items-start",
          row && "flex-row gap-4"
        )}
      >
        {category.options.map((option, index) => (
          <Button
            variant="link"
            asChild
            key={index}
            className="p-0 h-auto text-white/80 hover:text-white transition-colors"
          >
            {option.href ? (
              <Link href={option.href}>{option.label}</Link>
            ) : (
              option.label
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
