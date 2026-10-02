import CartDrawer from "@/components/CartDrawer";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import StickyCTA from "@/components/StickyCTA";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import TrustMarquee from "@/components/sections/TrustMarquee";
import WaveDivider from "@/components/sections/WaveDivider";
import Promise from "@/components/sections/Promise";
import PressStrip from "@/components/sections/PressStrip";
import ProductSwapShowcase from "@/components/sections/ProductSwapShowcase";
import CategoryBento from "@/components/sections/CategoryBento";
import Bestsellers from "@/components/sections/Bestsellers";
import ComboRail from "@/components/sections/ComboRail";
import StatsBand from "@/components/sections/StatsBand";
import ThePour from "@/components/sections/ThePour";
import FarmJourney from "@/components/sections/FarmJourney";
import BilonaGhee from "@/components/sections/BilonaGhee";
import SubscriptionBuilder from "@/components/sections/SubscriptionBuilder";
import Gifting from "@/components/sections/Gifting";
import WhyGlass from "@/components/sections/WhyGlass";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import KanthaRule from "@/components/patterns/KanthaRule";
import ScrollProgressRail from "@/components/motion/ScrollProgressRail";
import SideRail from "@/components/sections/SideRail";

export default function Home() {
  return (
    <>
      <ScrollProgressRail />
      <SideRail />
      <Nav />
      <main>
        <Hero />
        <TrustMarquee />
        <WaveDivider flip />
        <PressStrip />
        <KanthaRule className="py-4" />
        <ProductSwapShowcase />
        <KanthaRule className="py-4" />
        <Promise />
        <CategoryBento />
        <Bestsellers />
        <ComboRail />
        <ThePour />
        <FarmJourney />
        <BilonaGhee />
        <KanthaRule className="py-4" />
        <SubscriptionBuilder />
        <Gifting />
        <WhyGlass />
        <Testimonials />
        <StatsBand />
        <Faq />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyCTA />
      <CartDrawer />
    </>
  );
}
