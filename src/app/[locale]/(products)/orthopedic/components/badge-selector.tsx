"use client";

import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { PiTrademarkRegisteredLight } from "react-icons/pi";

interface BadgeItem {
  label: string;
  description: string;
}

const badges: BadgeItem[] = [
  {
    label: "Hidrolight Neo",
    description:
      "Família voltada para extrair os benefícios do Neoprene. Propriedades térmicas, compressivas e elásticas: são essas três propriedades que fazem do Neoprene uma ferramenta eficaz no tratamento e prevenção de lesões no tratamento ortopédico."
  },
  {
    label: "Comfort Air",
    description:
      "Família de produtos que utilizam a tecnologia do Airprene. O Airprene é um material que possui propriedades térmicas, compressivas e elásticas, que auxiliam no tratamento e prevenção de lesões ortopédicas."
  },
  {
    label: "Ortho Recovery",
    description:
      "Produtos desenvolvidos para auxiliar na recuperação ortopédica, proporcionando suporte e conforto durante o processo de reabilitação."
  },
  {
    label: "Air Flex",
    description:
      "Linha de produtos que oferece flexibilidade e suporte, ideal para quem busca conforto e eficiência no tratamento ortopédico."
  },
  {
    label: "Softline",
    description:
      "Produtos com design ergonômico e materiais suaves, garantindo conforto e eficácia no tratamento de lesões ortopédicas."
  },
  {
    label: "Foot Care",
    description:
      "Especialmente desenvolvida para cuidados com os pés, proporcionando alívio e suporte para diversas condições ortopédicas."
  },
  {
    label: "Lean",
    description:
      "Linha de produtos leves e eficientes, projetados para oferecer suporte sem comprometer a mobilidade durante o tratamento ortopédico."
  }
];

const BadgeSelector: React.FC = () => {
  const [selectedDescriptions, setSelectedDescriptions] = useState(0);

  const handleBadgeClick = (index: number) => {
    setSelectedDescriptions(index);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {badges.map((badge, index) => (
          <Badge
            key={badge.label}
            variant={
              selectedDescriptions === index ? "default" : "primaryReverse"
            }
            onClick={() => handleBadgeClick(index)}
            className="cursor-pointer"
          >
            <span>{badge.label}</span>
            <PiTrademarkRegisteredLight className="h-6 pb-1" />
          </Badge>
        ))}
      </div>

      <div className="mt-6">
        {selectedDescriptions !== null && (
          <p className="w-full lg:w-1/2">
            {badges[selectedDescriptions].description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BadgeSelector;
