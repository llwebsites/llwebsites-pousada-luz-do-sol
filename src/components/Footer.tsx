import Link from "next/link";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { nav, site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1.4fr]">
        <div>
          <Logo />
        </div>

        <nav aria-label="Rodapé">
          <ul className="grid gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-flex min-h-[40px] items-center text-sm text-white/80 transition hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="grid content-start gap-3 text-sm text-white/85">
          <li>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-2 hover:text-white"
            >
              <MessageCircle size={18} aria-hidden /> WhatsApp {site.phoneDisplay}
            </a>
          </li>
          <li className="flex items-start gap-2">
            <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden />
            <span>{site.address}</span>
          </li>
          <li>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-2 hover:text-white"
            >
              <Instagram size={18} aria-hidden /> {site.instagramHandle}
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-white/15">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/privacidade" className="hover:text-white">
            Política de privacidade
          </Link>
          <span>Proposta independente da LL Websites. Não é o site oficial da pousada.</span>
        </div>
      </div>
    </footer>
  );
}
