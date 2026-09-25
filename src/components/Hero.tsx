"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Scene } from "@/components/Scene";
import { site } from "@/lib/site";

/** Fundo: a mesma imagem ampliada e desfocada, só para preencher as laterais. */
const backdropClass =
  "absolute inset-0 h-full w-full scale-125 object-cover blur-2xl brightness-50";
/** Frente: a imagem inteira, sem corte e sem ampliar além da altura da tela. */
const frontClass = "absolute inset-0 h-full w-full object-contain";

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="topo"
      aria-label="Fachada da pousada"
      className="on-dark relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 overflow-hidden">
        {site.hasVideo && reduce ? (
          // Movimento reduzido: só o quadro do vídeo, sem reprodução.
          <>
            <Image
              src={site.videoPoster}
              alt=""
              fill
              sizes="100vw"
              className={backdropClass}
              aria-hidden
            />
            <Image
              src={site.videoPoster}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={90}
              className={frontClass}
            />
          </>
        ) : site.hasVideo ? (
          <>
            <video
              className={backdropClass}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={site.videoPoster}
              aria-hidden
              tabIndex={-1}
            >
              <source src={site.videoSrc} type="video/mp4" />
            </video>
            <video
              className={frontClass}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={site.videoPoster}
              aria-hidden
              tabIndex={-1}
            >
              <source src={site.videoSrc} type="video/mp4" />
            </video>
          </>
        ) : (
          <Scene
            variant="fachada"
            label="Fachada da pousada, ilustração"
            animated
            className="anim-kenburns h-full w-full"
          />
        )}
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
