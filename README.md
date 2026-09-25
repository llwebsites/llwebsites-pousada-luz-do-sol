# Pousada Luz do Sol

Site de hospedagem em Carrancas/MG. Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion e Lucide.

## Rodar

```
npm install
npm run dev
```

## Estrutura

- `src/app`: páginas, metadados, robots e sitemap
- `src/components`: seções do site
- `src/lib`: dados da pousada, galeria e regras do formulário
- `public`: favicon e mídias

## Como trocar o conteúdo

- **Vídeo da fachada:** coloque `public/media/fachada.mp4` e mude `hasVideo` para `true` em `src/lib/site.ts`.
- **Fotos:** coloque os arquivos em `public/gallery/` e informe `src` em `src/lib/gallery.ts`.
- **E-mail:** preencha `email` em `src/lib/site.ts` para liberar o envio por e-mail nos formulários.
- **Indexação:** defina a variável `NEXT_PUBLIC_INDEXABLE=true` no lançamento oficial.
- **Endereço do site:** defina `NEXT_PUBLIC_SITE_URL`.
