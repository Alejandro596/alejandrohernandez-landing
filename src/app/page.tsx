import Effects from "@/components/Effects";
import PlaneLoop from "@/components/intro/PlaneLoop";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MobileWhatsApp from "@/components/MobileWhatsApp";

// En móvil el orden cambia (clases order-*): hero (copy + video + CTA) -> D ->
// avión -> D -> resto (Nav 1, Hero 2, D 7, Avión 6... los números no necesitan
// ser contiguos, solo monótonos por costura). El video vive DENTRO del Hero en
// móvil y en la columna derecha en desktop.
// En desktop (md:order-none en todo) manda el orden del DOM: avión primero.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Effects />
      <Nav />
      <PlaneLoop />
      <div className="divider-glow order-5 md:order-none" aria-hidden />
      <Hero />
      <div className="divider-glow order-7 md:order-none" aria-hidden />
      <Problem />
      <div className="divider-glow order-9 md:order-none" aria-hidden />
      <Solution />
      <div className="divider-glow order-11 md:order-none" aria-hidden />
      <HowItWorks />
      <div className="divider-glow order-[13] md:order-none" aria-hidden />
      <Comparison />
      <div className="divider-glow order-[15] md:order-none" aria-hidden />
      {/* FAQ y su divisor comparten order-[15]: a igual orden manda el DOM */}
      <Faq />
      <div className="divider-glow order-[15] md:order-none" aria-hidden />
      <FinalCta />
      <div className="divider-glow order-[17] md:order-none" aria-hidden />
      <Footer />
      <MobileWhatsApp />
    </main>
  );
}
