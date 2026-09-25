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
  { id: "f1", category: "Fachada", variant: "fachada", seed: 0, alt: "Fachada amarela da pousada, com recepção e varandas", src: "/gallery/fachada.jpg" },
  { id: "f2", category: "Fachada", variant: "fachada", seed: 1, alt: "Entrada da pousada, ilustração" },
  { id: "q1", category: "Quartos", variant: "quarto", seed: 0, alt: "Quarto casal com cabeceira de madeira e abajures", src: "/rooms/casal-1.jpg" },
  { id: "q3", category: "Quartos", variant: "quarto", seed: 0, alt: "Quarto casal com almofadas e vaso de planta", src: "/rooms/casal-2.jpg" },
  { id: "q2", category: "Quartos", variant: "quarto", seed: 2, alt: "Quarto duplo e triplo com janela azul e abajures", src: "/rooms/duplo-1.jpg" },
  { id: "q5", category: "Quartos", variant: "quarto", seed: 2, alt: "Quarto duplo e triplo com televisão e mesa", src: "/rooms/duplo-2.jpg" },
  { id: "q6", category: "Quartos", variant: "quarto", seed: 2, alt: "Quarto duplo e triplo com porta para a varanda", src: "/rooms/duplo-3.jpg" },
  { id: "q4", category: "Quartos", variant: "quarto", seed: 0, alt: "Detalhe da cama com toalha enrolada", src: "/rooms/casal-3.jpg" },
  { id: "p1", category: "Piscina", variant: "piscina", seed: 0, alt: "Piscina com guarda-sol, mesa e cadeiras brancas", src: "/gallery/piscina-1.jpg" },
  { id: "p2", category: "Piscina", variant: "piscina", seed: 1, alt: "Piscina com jato de água, espreguiçadeiras e jardim", src: "/gallery/piscina-2.jpg" },
  { id: "p3", category: "Piscina", variant: "piscina", seed: 2, alt: "Mesa posta sob o guarda-sol ao lado da piscina", src: "/gallery/piscina-3.jpg" },
  { id: "c1", category: "Café da manhã", variant: "cafe", seed: 0, alt: "Mesa de café da manhã mineiro com pães, bolos e frutas", src: "/gallery/cafe-1.jpg" },
  { id: "c2", category: "Café da manhã", variant: "cafe", seed: 2, alt: "Pães de queijo, bolo e biscoitos no café da manhã", src: "/gallery/cafe-2.jpg" },
  { id: "c3", category: "Café da manhã", variant: "cafe", seed: 2, alt: "Mamão, melancia, geleias e sucos no café da manhã", src: "/gallery/cafe-3.jpg" },
  { id: "c4", category: "Café da manhã", variant: "cafe", seed: 2, alt: "Mesa comprida de madeira com o buffet do café da manhã", src: "/gallery/cafe-4.jpg" },
  { id: "g1", category: "Área gourmet", variant: "gourmet", seed: 0, alt: "Área gourmet, ilustração" },
  { id: "g2", category: "Área gourmet", variant: "gourmet", seed: 1, alt: "Espaço para churrasco, ilustração" },
  { id: "k1", category: "Carrancas", variant: "cachoeira", seed: 0, alt: "Cachoeira em Carrancas, ilustração" },
  { id: "k2", category: "Carrancas", variant: "cachoeira", seed: 2, alt: "Serra de Carrancas, ilustração" },
];
