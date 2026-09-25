"use client";

import {
  Car,
  Coffee,
  Dog,
  Flame,
  MessageCircle,
  Snowflake,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Scene } from "@/components/Scene";
import { SectionTitle } from "@/components/SectionTitle";
import { amenities, site, whatsappUrl } from "@/lib/site";

const rooms: {
  title: string;
  seed: number;
  perks: { icon: LucideIcon; label: string }[];
}[] = [
  {
    title: "Quarto amplo",
    seed: 0,
    perks: [
      { icon: Snowflake, label: "Ar-condicionado" },
      { icon: Wifi, label: "Wi-Fi" },
    ],
  },
  {
    title: "Quarto confortável",
    seed: 2,
    perks: [
      { icon: Coffee, label: "Café da manhã incluído" },
      { icon: Car, label: "Estacionamento" },
    ],
  },
];

const chipIcons: Record<string, LucideIcon> = {
  Piscina: Waves,
  "Café da manhã mineiro": Coffee,
  "Wi-Fi gratuito": Wifi,
  Estacionamento: Car,
  "Ar-condicionado": Snowflake,
  "Área gourmet": Flame,
  "Aceita animais": Dog,
};

export function Accommodations() {
  const reduce = useReducedMotion();
  return (
    <section id="acomodacoes" aria-labelledby="t-acomodacoes" className="section-y bg-white">
      <div className="container-x">
        <SectionTitle
          id="t-acomodacoes"
          title="Onde você vai ficar"
          support="Conforto no centro de Carrancas."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {rooms.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <motion.article
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full overflow-hidden rounded-3xl border border-line bg-white shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Scene
                    variant="quarto"
                    seed={r.seed}
                    label={`${r.title}, ilustração`}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-medium text-white">
                    Imagem ilustrativa
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{r.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {r.perks.map((p) => (
                      <li
                        key={p.label}
                        className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-sm text-slate2"
                      >
                        <p.icon size={16} aria-hidden /> {p.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </Reveal>
          ))}

          <Reveal delay={0.16}>
            <article className="flex h-full flex-col justify-between rounded-3xl bg-ink p-8 text-white shadow-card">
              <div>
                <MessageCircle size={32} className="text-gold" aria-hidden />
                <h3 className="mt-5 text-2xl font-semibold">Reserva</h3>
                <span className="mt-2 block text-white/85">
                  Fale direto com a pousada.
                </span>
              </div>
              <a
                href={whatsappUrl(`Olá! Gostaria de consultar disponibilidade na ${site.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8"
              >
                Consultar disponibilidade
              </a>
            </article>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <ul aria-label="Comodidades" className="flex flex-wrap gap-3">
            {amenities.map((a) => {
              const Icon = chipIcons[a] ?? Waves;
              return (
                <li
                  key={a}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-gold-deep hover:text-gold-deep"
                >
                  <Icon size={16} aria-hidden /> {a}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
