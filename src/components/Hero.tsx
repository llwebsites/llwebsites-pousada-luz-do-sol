"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Scene } from "@/components/Scene";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="topo"
      aria-label="Fachada da pousada"
      className="on-dark relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink"
    >
      <div className="absolute inset-0">
        {site.hasVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            tabIndex={-1}
          >
            <source src={site.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Scene
            variant="fachada"
            label="Fachada da pousada, ilustração"
            animated
            className="anim-kenburns h-full w-full"
          />
        )}
      </div>

      {/* Camada de contraste, cor chapada */}
      <div className="absolute inset-0 bg-ink/40" aria-hidden />

      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo tone="light" size="lg" />
        </motion.div>
      </div>

      <a
        href="#acomodacoes"
        aria-label="Ir para as acomodações"
        className="anim-bob absolute bottom-8 left-1/2 z-10 inline-flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/50 text-white transition hover:bg-white/15"
      >
        <ChevronDown size={22} aria-hidden />
      </a>

      {!site.hasVideo ? (
        <span className="absolute bottom-3 right-4 z-10 rounded-full bg-ink/60 px-3 py-1 text-[11px] font-medium text-white">
          Imagem ilustrativa
        </span>
      ) : null}
    </section>
  );
}
