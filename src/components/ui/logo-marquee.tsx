"use client";

import React, { memo, useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import useMeasure from "react-use-measure";
import { Pause, Play, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Item do carrossel: nome em texto, ícone genérico e link para a página da pousada. */
export type Platform = {
  name: string;
  href: string;
  icon: LucideIcon;
};

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  paused?: boolean;
  className?: string;
};

const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  paused = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (paused) return;

    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    let controls;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prev) => prev + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
    paused,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  const flexDirection = direction === "horizontal" ? "row" : "column";

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection,
        }}
        {...hoverProps}
      >
        <div className="flex" style={{ gap: `${gap}px`, flexDirection }}>
          {children}
        </div>
        {/* Segunda cópia só para o efeito de loop: fora da leitura e do teclado */}
        <div
          className="flex"
          style={{ gap: `${gap}px`, flexDirection }}
          aria-hidden
          inert
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
});

const PlatformPill = memo(function PlatformPill({ item }: { item: Platform }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[52px] shrink-0 items-center gap-3 rounded-full border border-line bg-white px-6 text-base font-semibold text-ink transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep"
    >
      <Icon size={20} aria-hidden />
      {item.name}
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
});

export const LogoMarquee = memo(function LogoMarquee({
  logos,
  label = "Plataformas de reserva",
  className,
}: {
  logos: Platform[];
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  // Movimento reduzido: lista fixa, sem animação
  if (reduce) {
    return (
      <ul
        aria-label={label}
        className={cn("flex flex-wrap justify-center gap-3", className)}
      >
        {logos.map((logo) => (
          <li key={logo.name}>
            <PlatformPill item={logo} />
          </li>
        ))}
      </ul>
    );
  }

  const row = (hidden: boolean) => (
    <ul
      className="flex gap-4"
      aria-label={hidden ? undefined : label}
      aria-hidden={hidden || undefined}
      inert={hidden}
    >
      {logos.map((logo) => (
        <li key={logo.name}>
          <PlatformPill item={logo} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("mx-auto max-w-7xl", className)}>
      <div className="py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <InfiniteSlider
          gap={16}
          reverse
          duration={70}
          durationOnHover={160}
          paused={paused}
        >
          {row(false)}
          {row(true)}
          {row(true)}
        </InfiniteSlider>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((v) => !v)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
        >
          {paused ? (
            <Play size={16} aria-hidden />
          ) : (
            <Pause size={16} aria-hidden />
          )}
          {paused ? "Retomar" : "Pausar"}
        </button>
      </div>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";
export default LogoMarquee;
