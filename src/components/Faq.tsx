"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { faq } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="duvidas" aria-labelledby="t-duvidas" className="section-y bg-mist">
      <div className="container-x max-w-3xl">
        <SectionTitle id="t-duvidas" title="Perguntas frequentes" />
        <ul className="mt-10 grid gap-3">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <Reveal delay={Math.min(i, 5) * 0.04} y={14}>
                  <div className="overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-card">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-${i}`}
                        id={`faq-btn-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink"
                      >
                        {item.q}
                        <ChevronDown
                          size={20}
                          aria-hidden
                          className={`shrink-0 text-pine transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`faq-${i}`}
                          role="region"
                          aria-labelledby={`faq-btn-${i}`}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <span className="block px-5 pb-5 text-slate2">{item.a}</span>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
