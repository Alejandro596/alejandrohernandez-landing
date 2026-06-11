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

// En móvil el orden cambia (clases order-*): copy -> video -> avión, con los
// divisores luminosos intercalados (Nav 1, Hero 2, VSL 3, D 4, Avión 5, D 6,
// Problema 7, D 8, Solución 9, D 10, Cómo-funciona 11, D 12, Comparación 13,
// D 14, CTA final 15, D 16, Footer 17).
// En desktop (md:order-none en todo) manda el orden del DOM: avión primero.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Effects />
      <Nav />
      <PlaneLoop />
      <div className="divider-glow order-4 md:order-none" aria-hidden />
      <Hero />
      {/* El video como sección propia, solo en teléfono, justo después del copy */}
      <section className="order-3 px-4 pb-16 md:hidden" aria-label="Video: mira cómo funciona">
        <div data-reveal className="mx-auto max-w-xl">
          <VslCard />
        </div>
      </section>
      <div className="divider-glow order-6 md:order-none" aria-hidden />
      <Problem />
      <div className="divider-glow order-8 md:order-none" aria-hidden />
      <Solution />
      <div className="divider-glow order-10 md:order-none" aria-hidden />
      <HowItWorks />
      <div className="divider-glow order-12 md:order-none" aria-hidden />
      <Comparison />
      <div className="divider-glow order-[14] md:order-none" aria-hidden />
      <FinalCta />
      <div className="divider-glow order-[16] md:order-none" aria-hidden />
      <Footer />
      <MobileWhatsApp />
    </main>
  );
}
