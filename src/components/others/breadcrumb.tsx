"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { breadcrumbRoutes } from "@/routes";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  dynamicRouter?: {
    name: string;
  };
}

const Breadcrumb = ({ dynamicRouter }: BreadcrumbProps) => {
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split("/").filter((segment) => segment);
    let routesToBreadcrumb = breadcrumbRoutes;
    if (dynamicRouter) {
      routesToBreadcrumb = [
        ...routesToBreadcrumb,
        {
          name: dynamicRouter.name,
          href: pathname
        }
      ];
    }

    let currentPath = "";
    return pathSegments
      .map((segment) => {
        currentPath += `/${segment}`;
        return routesToBreadcrumb.find((route) => route.href === currentPath);
      })
      .filter(Boolean);
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <BaseBreadcrumb className="py-3">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbLink
              href={item?.href}
              className={cn(
                index === breadcrumbItems.length - 1 && "font-medium text-title"
              )}
            >
              {item?.name}
            </BreadcrumbLink>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BaseBreadcrumb>
  );
};

export default Breadcrumb;
