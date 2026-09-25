"use client";

import { useId, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import {
  buildIndividual,
  dispatch,
  type Built,
  type Channel,
} from "@/lib/booking";
import { site } from "@/lib/site";

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
            <option value="Quarto casal">Quarto casal</option>
            <option value="Quarto duplo/triplo">Quarto duplo/triplo</option>
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

export function Reservations() {
  return (
    <section id="reservas" aria-labelledby="t-reservas" className="section-y bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <SectionTitle
            id="t-reservas"
            title="Peça sua reserva"
            support="Escolha como prefere falar com a pousada."
          />
        </div>

        <Reveal>
          <div className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8">
            <IndividualForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
