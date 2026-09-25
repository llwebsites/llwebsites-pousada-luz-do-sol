"use client";

import { useEffect, useId, useState } from "react";
import { Building2, CalendarCheck, Mail, MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import {
  buildCorporate,
  buildIndividual,
  dispatch,
  type Built,
  type Channel,
} from "@/lib/booking";
import { site } from "@/lib/site";

type Tab = "reserva" | "corporativo";

function ChannelPicker({
  value,
  onChange,
}: {
  value: Channel;
  onChange: (c: Channel) => void;
}) {
  const options: { id: Channel; label: string; icon: typeof Mail }[] = [
    { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  ];
  if (site.email) options.push({ id: "email", label: "E-mail", icon: Mail });

  return (
    <fieldset>
      <legend className="label">Como prefere enviar</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.id}
            className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-deep ${
              value === o.id
                ? "border-ink bg-ink text-gold"
                : "border-line bg-white text-ink hover:border-ink"
            }`}
          >
            <input
              type="radio"
              name="canal"
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              className="sr-only"
            />
            <o.icon size={16} aria-hidden /> {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Status({ error, sent }: { error: string | null; sent: boolean }) {
  return (
    <div aria-live="polite" className="min-h-[1.5rem] text-sm">
      {error ? <span className="font-medium text-red-700">{error}</span> : null}
      {sent && !error ? (
        <span className="font-medium text-gold-deep">
          Pedido preparado. Confirme o envio na janela que abriu.
        </span>
      ) : null}
    </div>
  );
}

function IndividualForm() {
  const uid = useId();
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const built: Built = buildIndividual(new FormData(e.currentTarget));
    if (!built.ok) {
      setSent(false);
      setError(built.error);
      return;
    }
    setError(null);
    setSent(true);
    dispatch(channel, built);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-nome`} className="label">Nome</label>
          <input id={`${uid}-nome`} name="nome" type="text" autoComplete="name" maxLength={80} required className="field" />
        </div>
        <div>
          <label htmlFor={`${uid}-entrada`} className="label">Entrada</label>
          <input id={`${uid}-entrada`} name="entrada" type="date" min={today} required className="field" />
        </div>
        <div>
          <label htmlFor={`${uid}-saida`} className="label">Saída</label>
          <input id={`${uid}-saida`} name="saida" type="date" min={today} required className="field" />
        </div>
        <div>
          <label htmlFor={`${uid}-hospedes`} className="label">Hóspedes</label>
          <select id={`${uid}-hospedes`} name="hospedes" defaultValue="2" className="field">
            {["1", "2", "3", "4", "5", "6"].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-acom`} className="label">Acomodação</label>
          <select id={`${uid}-acom`} name="acomodacao" defaultValue="" className="field">
            <option value="">A definir</option>
            <option value="Quarto amplo">Quarto amplo</option>
            <option value="Quarto confortável">Quarto confortável</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-obs`} className="label">Observações</label>
          <textarea id={`${uid}-obs`} name="obs" rows={3} maxLength={400} className="field py-3" />
        </div>
      </div>
      <ChannelPicker value={channel} onChange={setChannel} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary">Enviar pedido</button>
        <span className="text-xs text-slate2">Sua solicitação será confirmada pela pousada.</span>
      </div>
      <Status error={error} sent={sent} />
    </form>
  );
}

function CorporateForm() {
  const uid = useId();
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const built: Built = buildCorporate(new FormData(e.currentTarget));
    if (!built.ok) {
      setSent(false);
      setError(built.error);
      return;
    }
    setError(null);
    setSent(true);
    dispatch(channel, built);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-empresa`} className="label">Empresa</label>
          <input id={`${uid}-empresa`} name="empresa" type="text" autoComplete="organization" maxLength={80} required className="field" />
        </div>
        <div>
          <label htmlFor={`${uid}-resp`} className="label">Responsável</label>
          <input id={`${uid}-resp`} name="responsavel" type="text" autoComplete="name" maxLength={80} required className="field" />
        </div>
        <div>
          <label htmlFor={`${uid}-contato`} className="label">Contato</label>
          <input id={`${uid}-contato`} name="contato" type="text" autoComplete="tel" maxLength={80} required className="field" />
        </div>
        <div>
          <label htmlFor={`${uid}-periodo`} className="label">Período</label>
          <input id={`${uid}-periodo`} name="periodo" type="text" maxLength={80} className="field" />
        </div>
        <div>
          <label htmlFor={`${uid}-qtd`} className="label">Quantidade de hóspedes</label>
          <input id={`${uid}-qtd`} name="quantidade" type="number" inputMode="numeric" min={1} max={500} className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-nec`} className="label">Necessidades</label>
          <textarea id={`${uid}-nec`} name="necessidades" rows={3} maxLength={500} className="field py-3" />
        </div>
      </div>
      <ChannelPicker value={channel} onChange={setChannel} />
      <div>
        <button type="submit" className="btn-primary">Solicitar orçamento</button>
      </div>
      <Status error={error} sent={sent} />
    </form>
  );
}

export function Reservations() {
  const [tab, setTab] = useState<Tab>("reserva");
  const reduce = useReducedMotion();

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#corporativo") {
        setTab("corporativo");
        document.getElementById("reservas")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      } else if (window.location.hash === "#reservas") {
        setTab("reserva");
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [reduce]);

  const tabs: { id: Tab; label: string; icon: typeof Building2 }[] = [
    { id: "reserva", label: "Reserva", icon: CalendarCheck },
    { id: "corporativo", label: "Corporativo", icon: Building2 },
  ];

  return (
    <section id="reservas" aria-labelledby="t-reservas" className="section-y bg-white">
      <span id="corporativo" className="block" aria-hidden />
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <SectionTitle
            id="t-reservas"
            title={tab === "reserva" ? "Peça sua reserva" : "Reservas para empresas"}
            support={
              tab === "reserva"
                ? "Escolha como prefere falar com a pousada."
                : "Hospedagem para equipes e eventos em Carrancas."
            }
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8">
            <div role="tablist" aria-label="Tipo de reserva" className="mb-8 flex gap-2 rounded-full bg-mist p-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  id={`tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`painel-${t.id}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      setTab(tab === "reserva" ? "corporativo" : "reserva");
                    }
                  }}
                  className={`relative flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
                    tab === t.id ? "text-gold" : "text-slate2 hover:text-ink"
                  }`}
                >
                  {tab === t.id ? (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <t.icon size={16} aria-hidden /> {t.label}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                role="tabpanel"
                id={`painel-${tab}`}
                aria-labelledby={`tab-${tab}`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {tab === "reserva" ? <IndividualForm /> : <CorporateForm />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
