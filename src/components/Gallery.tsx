"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Scene } from "@/components/Scene";
import { SectionTitle } from "@/components/SectionTitle";
import { categories, gallery, type GalleryCategory } from "@/lib/gallery";

type Filter = GalleryCategory | "Todas";

function Tile({
  item,
  className,
}: {
  item: (typeof gallery)[number];
  className?: string;
}) {
  return item.src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.src} alt={item.alt} loading="lazy" className={className} />
  ) : (
    <Scene variant={item.variant} seed={item.seed} label={item.alt} className={className} />
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("Todas");
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const items = filter === "Todas" ? gallery : gallery.filter((g) => g.category === filter);

  useEffect(() => {
    if (active === null) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [active, items.length]);

  const current = active !== null ? items[active] : null;

  return (
    <section id="galeria" aria-labelledby="t-galeria" className="section-y bg-mist">
      <div className="container-x">
        <SectionTitle id="t-galeria" title="Conheça a pousada" />

        <Reveal className="mt-8">
          <div role="group" aria-label="Filtrar galeria" className="flex flex-wrap gap-2">
            {(["Todas", ...categories] as Filter[]).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition active:scale-[0.97] ${
                  filter === c
                    ? "border-ink bg-ink text-gold"
                    : "border-line bg-white text-ink hover:border-gold-deep hover:text-gold-deep"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.ul
          layout={!reduce}
          className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((it, i) => (
              <motion.li
                layout={!reduce}
                key={it.id}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={i % 5 === 0 ? "col-span-2 lg:col-span-1" : ""}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ampliar: ${it.alt}`}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-line shadow-card"
                >
                  <Tile
                    item={it}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-ink/60 px-3 py-2 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {it.category}
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <span className="mt-6 block text-xs text-slate2">
          Imagens ilustrativas até o envio das fotos oficiais da pousada.
        </span>
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="on-dark fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Fechar"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={22} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Anterior"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length));
              }}
              className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft size={24} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Próxima"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? i : (i + 1) % items.length));
              }}
              className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight size={24} aria-hidden />
            </button>
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Tile item={current} className="h-full w-full object-cover" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
