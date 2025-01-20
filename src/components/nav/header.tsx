"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navRoutes } from "@/routes";
import { Button } from "../ui/button";
import SelectLanguage from "./select-language";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import AnimatedSearch from "../others/animated-search";

export default function Header() {
  const t = useTranslations("Header");
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <header className="top-0 w-full bg-background/60 backdrop-blur-sm z-50 h-[85px] flex items-center justify-between px-[5%] lg:px-[99px] border-b-[1px] border-b-primary/10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            {/* <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            /> */}
            <h1 className="text-3xl font-medium ml-12">LOGO</h1>
          </Link>
          {/* Menu Button (visible only on smaller screens) */}
        </div>

        {/* Navigation for larger screens */}
        <nav className="hidden lg:flex items-center gap-0 xl:gap-4">
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
          <AnimatedSearch openTo="left" moveToDown />
        </nav>

        {/* Right side actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button variant={"secondary"}>Fale Conosco</Button>
          <SelectLanguage />
        </div>
      </div>

      <div className="flex items-center lg:hidden">
        <AnimatedSearch openTo="left" />

        <button
          className="lg:hidden ml-auto"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          {navbarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`${
          navbarOpen ? "flex" : "hidden"
        } lg:hidden flex-col items-center w-full bg-background absolute top-[85px] left-0 py-4 border-t-[1px] border-t-primary/10`}
      >
        <div className="flex flex-col items-center space-y-4">
          {navRoutes.map((route) => (
            <Button variant="ghost" asChild className="w-full" key={route.href}>
              <Link href={route.href}>{t(route.key)}</Link>
            </Button>
          ))}
          <Button variant={"secondary"}>Fale Conosco</Button>
          <SelectLanguage />
        </div>
      </nav>
    </header>
  );
}
