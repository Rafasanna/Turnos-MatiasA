import AboutSection from "../src/components/AboutSection";
import AudienceSection from "../src/components/AudienceSection";
import ContactSection from "../src/components/ContactSection";
import CrossfySection from "../src/components/CrossfySection";
import FAQSection from "../src/components/FAQSection";
import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import KStretchSection from "../src/components/KStretchSection";
import ServicesSection from "../src/components/ServicesSection";
import SplashScreen from "../src/components/SplashScreen";
import TestimonialsSection from "../src/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <CrossfySection />
        <KStretchSection />
        <AudienceSection />
        <FAQSection />
        <TestimonialsSection />
      </main>
      <ContactSection />
    </>
  );
}
