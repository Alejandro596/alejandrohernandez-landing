import Effects from "@/components/Effects";
import PlaneLoop from "@/components/intro/PlaneLoop";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import VslCard from "@/components/VslCard";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MobileWhatsApp from "@/components/MobileWhatsApp";

// En móvil el orden cambia (clases order-*): copy -> D -> video -> D -> avión
// -> D -> resto, con divisores luminosos en cada costura (Nav 1, Hero 2, D 3
// solo móvil, VSL 4, D 5, Avión 6, D 7, Problema 8, D 9, Solución 10, D 11,
// Cómo-funciona 12, D 13, Comparación 14, D 15, CTA final 16, D 17, Footer 18).
// En desktop (md:order-none en todo) manda el orden del DOM: avión primero.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Effects />
      <Nav />
      <PlaneLoop />
      <div className="divider-glow order-5 md:order-none" aria-hidden />
      <Hero />
      {/* Divisor copy->video: solo existe en teléfono, como el video */}
      <div className="divider-glow order-3 md:hidden" aria-hidden />
      {/* El video como sección propia, solo en teléfono, justo después del copy */}
      <section className="order-4 px-4 py-14 md:hidden" aria-label="Video: mira cómo funciona">
        <div data-reveal className="mx-auto max-w-xl">
          <VslCard />
        </div>
      </section>
      <div className="divider-glow order-7 md:order-none" aria-hidden />
      <Problem />
      <div className="divider-glow order-9 md:order-none" aria-hidden />
      <Solution />
      <div className="divider-glow order-11 md:order-none" aria-hidden />
      <HowItWorks />
      <div className="divider-glow order-[13] md:order-none" aria-hidden />
      <Comparison />
      <div className="divider-glow order-[15] md:order-none" aria-hidden />
      <FinalCta />
      <div className="divider-glow order-[17] md:order-none" aria-hidden />
      <Footer />
      <MobileWhatsApp />
    </main>
  );
}
