"use client";

import { BedDouble, CalendarCheck, Globe, Search, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LogoMarquee, type Platform } from "@/components/ui/logo-marquee";

/** Páginas da pousada encontradas nas plataformas. Confirmar com a pousada quais estão ativas. */
const platforms: Platform[] = [
  {
    name: "Booking.com",
    href: "https://www.booking.com/hotel/br/pousada-luz-do-sol-carrancas.html",
    icon: BedDouble,
  },
  {
    name: "Agoda",
    href: "https://www.agoda.com/pt-br/pousada-luz-do-sol/hotel/carrancas-br.html",
    icon: Globe,
  },
  {
    name: "Kayak",
    href: "https://www.kayak.com.br/Hoteis-Pousada-Luz-do-Sol-Carrancas.2866751.ksp",
    icon: Search,
  },
  {
    name: "Tripadvisor",
    href: "https://www.tripadvisor.com/Hotel_Review-g2441389-d8763045-Reviews-Pousada_Luz_do_Sol-Carrancas_State_of_Minas_Gerais.html",
    icon: Star,
  },
  {
    name: "EHospede",
    href: "https://www.ehospede.com.br/brasil-carrancas-pousada-luz-do-sol-33223.html",
    icon: CalendarCheck,
  },
];

export function Platforms() {
  return (
    <div aria-labelledby="t-plataformas" role="region" className="mt-16">
      <Reveal className="text-center">
        <h3 id="t-plataformas" className="text-xl font-semibold text-ink sm:text-2xl">
          Reserve também por
        </h3>
        <span className="mt-2 block text-slate2">
          A pousada também está nestas plataformas.
        </span>
      </Reveal>
      <Reveal delay={0.1} className="mt-8">
        <LogoMarquee logos={platforms} />
      </Reveal>
    </div>
  );
}
