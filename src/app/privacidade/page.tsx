import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Política de privacidade | ${site.name}`,
  alternates: { canonical: "/privacidade" },
};

const blocks = [
  {
    title: "Quem trata os dados",
    items: [
      `${site.name}, ${site.address}.`,
      `Contato: WhatsApp ${site.phoneDisplay}.`,
    ],
  },
  {
    title: "Dados que você informa",
    items: [
      "Nome, datas, quantidade de hóspedes e observações nos formulários de reserva.",
    ],
  },
  {
    title: "Como os dados são usados",
    items: [
      "Só para montar a mensagem de reserva que você envia por WhatsApp ou e-mail.",
      "Este site não armazena o que você digita nos formulários.",
      "O envio só acontece quando você clica no botão.",
    ],
  },
  {
    title: "Cookies e rastreadores",
    items: [
      "Este site não usa cookies de publicidade nem ferramentas de análise.",
      "O mapa só é carregado quando você pede, e vem do OpenStreetMap.",
    ],
  },
  {
    title: "Seus direitos (LGPD)",
    items: [
      "Confirmar o tratamento, acessar, corrigir ou pedir a eliminação dos seus dados.",
      "Para exercer seus direitos, fale com a pousada pelo WhatsApp.",
    ],
  },
  {
    title: "Sobre este site",
    items: [
      "Proposta independente da LL Websites, não é o site oficial da pousada.",
      "Os dados do controlador devem ser confirmados com a pousada antes da publicação oficial.",
    ],
  },
];

export default function Privacidade() {
  return (
    <main id="conteudo" className="min-h-screen bg-mist">
      <div className="on-dark bg-ink">
        <div className="container-x flex max-w-3xl items-center justify-between py-6">
          <Logo />
          <Link href="/" className="btn-primary">
            <ArrowLeft size={16} aria-hidden /> Voltar
          </Link>
        </div>
      </div>
      <div className="container-x max-w-3xl py-12">
        <h1 className="text-3xl font-semibold tracking-tight">
          Política de privacidade
        </h1>
        <div className="mt-8 grid gap-4">
          {blocks.map((b) => (
            <section
              key={b.title}
              className="rounded-2xl border border-line bg-white p-6 shadow-card"
            >
              <h2 className="text-lg font-semibold">{b.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate2">
                {b.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
