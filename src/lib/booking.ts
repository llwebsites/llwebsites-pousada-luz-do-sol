import { site, whatsappUrl } from "@/lib/site";

export type Channel = "whatsapp" | "email";

const clean = (v: FormDataEntryValue | null, max = 300) =>
  String(v ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, max);

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
}

export type Built =
  | { ok: true; message: string; subject: string }
  | { ok: false; error: string };

export function buildIndividual(fd: FormData): Built {
  const nome = clean(fd.get("nome"), 80);
  const entrada = clean(fd.get("entrada"), 10);
  const saida = clean(fd.get("saida"), 10);
  const hospedes = clean(fd.get("hospedes"), 3);
  const acomodacao = clean(fd.get("acomodacao"), 60);
  const obs = clean(fd.get("obs"), 400);

  if (!nome) return { ok: false, error: "Informe seu nome." };
  if (!entrada || !saida) return { ok: false, error: "Informe as datas de entrada e saída." };
  if (saida < entrada) return { ok: false, error: "A saída precisa ser depois da entrada." };

  const lines = [
    `Olá! Gostaria de consultar disponibilidade na ${site.name}.`,
    `Nome: ${nome}`,
    `Entrada: ${formatDate(entrada)}`,
    `Saída: ${formatDate(saida)}`,
    `Hóspedes: ${hospedes || "1"}`,
    `Acomodação: ${acomodacao || "A definir"}`,
  ];
  if (obs) lines.push(`Observações: ${obs}`);
  return { ok: true, message: lines.join("\n"), subject: `Reserva - ${nome}` };
}

export function buildCorporate(fd: FormData): Built {
  const empresa = clean(fd.get("empresa"), 80);
  const responsavel = clean(fd.get("responsavel"), 80);
  const contato = clean(fd.get("contato"), 80);
  const periodo = clean(fd.get("periodo"), 80);
  const quantidade = clean(fd.get("quantidade"), 4);
  const necessidades = clean(fd.get("necessidades"), 500);

  if (!empresa) return { ok: false, error: "Informe o nome da empresa." };
  if (!responsavel) return { ok: false, error: "Informe o responsável." };
  if (!contato) return { ok: false, error: "Informe um contato." };

  const lines = [
    `Olá! Gostaria de um orçamento de hospedagem corporativa na ${site.name}.`,
    `Empresa: ${empresa}`,
    `Responsável: ${responsavel}`,
    `Contato: ${contato}`,
    `Período: ${periodo || "A definir"}`,
    `Hóspedes: ${quantidade || "A definir"}`,
  ];
  if (necessidades) lines.push(`Necessidades: ${necessidades}`);
  return { ok: true, message: lines.join("\n"), subject: `Orçamento corporativo - ${empresa}` };
}

export function dispatch(channel: Channel, built: { message: string; subject: string }) {
  if (channel === "email" && site.email) {
    const href = `mailto:${site.email}?subject=${encodeURIComponent(built.subject)}&body=${encodeURIComponent(built.message)}`;
    window.location.href = href;
    return;
  }
  window.open(whatsappUrl(built.message), "_blank", "noopener,noreferrer");
}
