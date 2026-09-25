"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { nav } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white/95 shadow-card backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a
          href="#topo"
          aria-label="Voltar ao topo"
          className={`transition-opacity duration-300 ${solid ? "opacity-100" : "pointer-events-none opacity-0"}`}
          tabIndex={solid ? 0 : -1}
        >
          <Logo tone="dark" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    solid
                      ? "text-ink hover:bg-pine-soft hover:text-pine"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#reservas"
            className={`btn hidden sm:inline-flex ${
              solid ? "bg-pine text-white hover:bg-pine-dark" : "bg-white text-ink hover:bg-white/90"
            }`}
          >
            Reservar
          </a>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
              solid ? "text-ink hover:bg-pine-soft" : "text-white hover:bg-white/15"
            }`}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu mobile"
            className="border-t border-line bg-white lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul className="container-x grid gap-1 py-4">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center rounded-xl px-3 text-base font-medium text-ink hover:bg-pine-soft"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#reservas" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Reservar
                </a>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
