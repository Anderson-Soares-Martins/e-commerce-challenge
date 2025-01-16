import Brazil from "./Brazil.svg";
import Spain from "./Spain.svg";
import USA from "./USA.svg";

export const countriesFlags = {
  us: {
    src: USA.src,
    alt: "United States of America",
    label: "United States",
    lang: "en",
  },
  br: {
    src: Brazil.src,
    alt: "Brasil",
    label: "Brasil",
    lang: "pt",
  },
  es: {
    src: Spain.src,
    alt: "España",
    label: "España",
    lang: "es",
  },
} 

export const countriesFlagsArray = Object.values(countriesFlags);