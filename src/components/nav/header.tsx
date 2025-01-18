"use client";

import React from "react";
import Link from "next/link";
import { navRoutes } from "@/routes";
import { Button } from "../ui/button";
import SelectLanguage from "./select-language";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");
  return (
    <header className="top-0 w-full bg-background/60 backdrop-blur-sm z-50 h-[85px] flex items-center justify-between">
      <div className="flex items-center justify-between w-full ">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            {/* <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            /> */}
            {/* Logo will be added later */}
            <h1 className="text-3xl font-medium ml-12">LOGO</h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          {navRoutes.map((route) => (
            <Button
              variant="ghost"
              asChild
              className="w-full md:w-auto"
              key={route.href}
            >
              <Link href={route.href}>{t(route.key)}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant={"secondary"}>Fale Conosco</Button>
          <SelectLanguage />
        </div>
      </div>
    </header>
  );
}
