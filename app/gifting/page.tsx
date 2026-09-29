import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import GiftingSection from "@/components/sections/Gifting";
import Testimonials from "@/components/sections/Testimonials";

export default function GiftingPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <GiftingSection />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
