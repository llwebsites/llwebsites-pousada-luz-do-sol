export const site = {
  name: "Pousada Luz do Sol",
  city: "Carrancas",
  state: "MG",
  address: "Av. Cel. Rozendo, 535, Centro, Carrancas/MG, CEP 37245-000",
  phoneDisplay: "(35) 99722-1350",
  whatsapp: "5535997221350",
  /** Preencha quando a pousada informar um e-mail. Enquanto for null, o formulário oferece só WhatsApp. */
  email: null as string | null,
  instagram: "https://www.instagram.com/pousadaluzdosol/",
  instagramHandle: "@pousadaluzdosol",
  lat: -21.4839229,
  lng: -44.6439878,
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://llwebsites-pousada-luz-do-sol.vercel.app",
  /** Vídeo da fachada enviado pela pousada em public/media/fachada.mp4 */
  hasVideo: true,
  videoSrc: "/media/fachada.mp4",
  videoPoster: "/media/fachada-poster.jpg",
  /** Mude para true no lançamento oficial para liberar indexação. */
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
};

export const nav = [
  { label: "Acomodações", href: "#acomodacoes" },
  { label: "Galeria", href: "#galeria" },
  { label: "Reservas", href: "#reservas" },
  { label: "Corporativo", href: "#corporativo" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Localização", href: "#localizacao" },
];

export const amenities = [
  "Piscina",
  "Café da manhã mineiro",
  "Wi-Fi gratuito",
  "Estacionamento",
  "Ar-condicionado",
  "Área gourmet",
  "Aceita animais",
];

export const faq = [
  { q: "Qual o horário de check-in?", a: "A partir das 13h." },
  { q: "Qual o horário de check-out?", a: "Até as 12h." },
  { q: "O café da manhã está incluído?", a: "Sim, café da manhã mineiro." },
  { q: "Tem estacionamento?", a: "Sim." },
  { q: "Tem Wi-Fi?", a: "Sim, gratuito." },
  { q: "Tem piscina?", a: "Sim." },
  { q: "Aceita animais?", a: "Consulte as condições pelo WhatsApp." },
  { q: "Como reservar?", a: "Pelo formulário, por WhatsApp ou por e-mail." },
  { q: "Onde fica?", a: "No centro de Carrancas." },
  { q: "As cachoeiras ficam longe?", a: "A cerca de 3 km." },
];

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const mapLinks = {
  open: `https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`,
  route: `https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`,
  embed: `https://www.openstreetmap.org/export/embed.html?bbox=${site.lng - 0.01}%2C${site.lat - 0.006}%2C${site.lng + 0.01}%2C${site.lat + 0.006}&layer=mapnik&marker=${site.lat}%2C${site.lng}`,
};
