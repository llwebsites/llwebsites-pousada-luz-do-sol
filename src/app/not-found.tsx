import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-4 text-center">
      <Logo />
      <h1 className="text-2xl font-semibold text-white">Página não encontrada</h1>
      <Link href="/" className="btn-primary">
        Voltar ao início
      </Link>
    </main>
  );
}
