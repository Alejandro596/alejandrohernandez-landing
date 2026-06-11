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

// En móvil el orden cambia (clases order-*): copy -> video -> avión.
// En desktop (md:order-none en cada sección) manda el orden del DOM: avión primero.
// Los divisores luminosos llevan orden intermedio para caer en la costura
// correcta en ambos layouts.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Effects />
      <Nav />
      <PlaneLoop />
      <div className="divider-glow order-[35] md:order-none" aria-hidden />
      <Hero />
      {/* El video como sección propia, solo en teléfono, justo después del copy */}
      <section className="order-3 px-4 pb-16 md:hidden" aria-label="Video: mira cómo funciona">
        <div data-reveal className="mx-auto max-w-xl">
          <VslCard />
        </div>
      </section>
      <div className="divider-glow order-[45] md:order-none" aria-hidden />
      <Problem />
      <div className="divider-glow order-[55] md:order-none" aria-hidden />
      <Solution />
      <div className="divider-glow order-[65] md:order-none" aria-hidden />
      <HowItWorks />
      <div className="divider-glow order-[75] md:order-none" aria-hidden />
      <Comparison />
      <div className="divider-glow order-[85] md:order-none" aria-hidden />
      <FinalCta />
      <div className="divider-glow order-[95] md:order-none" aria-hidden />
      <Footer />
      <MobileWhatsApp />
    </main>
  );
}
