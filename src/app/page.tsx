import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Accommodations } from "@/components/Accommodations";
import { Gallery } from "@/components/Gallery";
import { Reservations } from "@/components/Reservations";
import { Faq } from "@/components/Faq";
import { Location } from "@/components/Location";
import { Footer } from "@/components/Footer";
import { amenities, faq, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: site.name,
  telephone: "+55 35 99722-1350",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Cel. Rozendo, 535, Centro",
    addressLocality: site.city,
    addressRegion: site.state,
    postalCode: "37245-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.lat,
    longitude: site.lng,
  },
  checkinTime: "13:00",
  checkoutTime: "12:00",
  amenityFeature: amenities.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  sameAs: [site.instagram],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Accommodations />
        <Gallery />
        <Reservations />
        <Faq />
        <Location />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
