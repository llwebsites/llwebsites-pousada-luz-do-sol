"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="topo"
      aria-label="Cachoeira e logo da Pousada Luz do Sol"
      className="on-dark relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-ink"
    >
      {/* A imagem cobre a tela em qualquer proporção (celular, tablet, computador) */}
      <div className="anim-kenburns absolute inset-0">
        <Image
          src={site.heroImage}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[50%_58%]"
        />
      </div>

      {/* Escurecimento chapado para dar contraste ao logo */}
      <div className="absolute inset-0 bg-ink/50" aria-hidden />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/brand/logo.png"
            alt="Pousada Luz do Sol, Carrancas MG"
            width={1066}
            height={559}
            priority
            sizes="(max-width: 768px) 88vw, 640px"
            className="h-auto w-[88vw] max-w-[640px] drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)]"
          />
        </motion.div>
      </div>

      <a
        href="#acomodacoes"
        aria-label="Ir para as acomodações"
        className="anim-bob absolute bottom-8 left-1/2 z-10 inline-flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-gold/60 text-gold transition hover:bg-white/10"
      >
        <ChevronDown size={22} aria-hidden />
      </a>
    </section>
  );
}
