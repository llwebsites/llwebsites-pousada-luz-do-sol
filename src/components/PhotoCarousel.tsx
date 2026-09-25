"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export type Photo = { src: string; alt: string };

type Props = {
  photos: Photo[];
  label: string;
  className?: string;
};

export function PhotoCarousel({ photos, label, className }: Props) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const total = photos.length;

  const goTo = useCallback(
    (index: number) => {
      const el = track.current;
      if (!el) return;
      const target = (index + total) % total;
      el.scrollTo({
        left: target * el.clientWidth,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [reduce, total],
  );

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActive(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goTo(active + 1);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goTo(active - 1);
        }
      }}
      className={`on-dark group relative overflow-hidden ${className ?? ""}`}
    >
      <ul
        ref={track}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p, i) => (
          <li
            key={p.src}
            aria-roledescription="slide"
            aria-label={`Foto ${i + 1}`}
            className="relative h-full w-full shrink-0 snap-center"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 768px) 92vw, 380px"
              className="object-cover"
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label="Foto anterior"
        onClick={() => goTo(active - 1)}
        className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-gold transition hover:bg-ink active:scale-95"
      >
        <ChevronLeft size={22} aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Próxima foto"
        onClick={() => goTo(active + 1)}
        className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-gold transition hover:bg-ink active:scale-95"
      >
        <ChevronRight size={22} aria-hidden />
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2" role="group" aria-label="Escolher foto">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            aria-label={`Ir para a foto ${i + 1}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className="inline-flex h-6 items-center px-0.5"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-gold" : "w-2 bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
