"use client";

import { useState } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Scene } from "@/components/Scene";
import { SectionTitle } from "@/components/SectionTitle";
import { mapLinks, site } from "@/lib/site";

export function Location() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="localizacao" aria-labelledby="t-localizacao" className="section-y bg-white">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
        <div>
          <SectionTitle
            id="t-localizacao"
            title="No centro de Carrancas"
            support="Cachoeiras a 3 km."
          />
          <Reveal delay={0.1} className="mt-8">
            <address className="flex items-start gap-3 not-italic text-ink">
              <MapPin className="mt-0.5 shrink-0 text-gold-deep" size={20} aria-hidden />
              <span>{site.address}</span>
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mapLinks.open} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink size={16} aria-hidden /> Abrir no mapa
              </a>
              <a href={mapLinks.route} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Navigation size={16} aria-hidden /> Como chegar
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-mist shadow-card">
            {loaded ? (
              <iframe
                title="Mapa da localização da pousada"
                src={mapLinks.embed}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full border-0"
              />
            ) : (
              <>
                <Scene
                  variant="cachoeira"
                  label="Serra de Carrancas, ilustração"
                  animated
                  className="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/35">
                  <button type="button" onClick={() => setLoaded(true)} className="btn bg-white text-ink hover:bg-white/90">
                    <MapPin size={16} aria-hidden /> Carregar mapa
                  </button>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
