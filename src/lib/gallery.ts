export type SceneVariant =
  | "fachada"
  | "quarto"
  | "piscina"
  | "cafe"
  | "gourmet"
  | "cachoeira";

export type GalleryCategory =
  | "Fachada"
  | "Quartos"
  | "Piscina"
  | "Café da manhã"
  | "Área gourmet"
  | "Carrancas";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  variant: SceneVariant;
  seed: number;
  alt: string;
  /** Quando o hotel enviar fotos autorizadas, informe o caminho em public/gallery/ e a ilustração é substituída. */
  src?: string;
};

export const categories: GalleryCategory[] = [
  "Fachada",
  "Quartos",
  "Piscina",
  "Café da manhã",
  "Área gourmet",
  "Carrancas",
];

export const gallery: GalleryItem[] = [
  { id: "f1", category: "Fachada", variant: "fachada", seed: 0, alt: "Fachada da pousada, ilustração" },
  { id: "f2", category: "Fachada", variant: "fachada", seed: 1, alt: "Entrada da pousada, ilustração" },
  { id: "q1", category: "Quartos", variant: "quarto", seed: 0, alt: "Quarto amplo, ilustração" },
  { id: "q2", category: "Quartos", variant: "quarto", seed: 2, alt: "Quarto confortável, ilustração" },
  { id: "p1", category: "Piscina", variant: "piscina", seed: 0, alt: "Piscina da pousada, ilustração" },
  { id: "p2", category: "Piscina", variant: "piscina", seed: 1, alt: "Área da piscina, ilustração" },
  { id: "c1", category: "Café da manhã", variant: "cafe", seed: 0, alt: "Café da manhã mineiro, ilustração" },
  { id: "c2", category: "Café da manhã", variant: "cafe", seed: 2, alt: "Mesa de café da manhã, ilustração" },
  { id: "g1", category: "Área gourmet", variant: "gourmet", seed: 0, alt: "Área gourmet, ilustração" },
  { id: "g2", category: "Área gourmet", variant: "gourmet", seed: 1, alt: "Espaço para churrasco, ilustração" },
  { id: "k1", category: "Carrancas", variant: "cachoeira", seed: 0, alt: "Cachoeira em Carrancas, ilustração" },
  { id: "k2", category: "Carrancas", variant: "cachoeira", seed: 2, alt: "Serra de Carrancas, ilustração" },
];
