import AboutSection from "../src/components/AboutSection";
import ContactSection from "../src/components/ContactSection";
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
        <FAQSection />
        <ServicesSection />
        <KStretchSection />
        <TestimonialsSection />
      </main>
      <ContactSection />
    </>
  );
}
