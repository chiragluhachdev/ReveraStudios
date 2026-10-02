import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import Showreel from "@/components/Showreel"; // temporarily hidden
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhoWeAre from "@/components/WhoWeAre";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
// import Team from "@/components/Team"; // "Behind the Studio" hidden for now
import InstagramGallery from "@/components/InstagramGallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import ScrollProgress from "@/components/ui/ScrollProgress";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        {/* Showreel temporarily hidden — restore when films are ready. */}
        {/* <Showreel /> */}
        <div className="overflow-hidden bg-canvas pb-2 pt-6">
          <Ticker
            items={["Websites", "Mobile Apps", "Branding", "AI Automation", "Films", "Strategy"]}
            tilt={-1.5}
          />
        </div>
        <Services />
        <Process />
        <div className="overflow-hidden bg-canvas py-6 sm:py-10">
          <Ticker
            items={["Built to rank", "No templates", "No hand-offs", "Built to last"]}
            reverse
            tilt={1.5}
          />
        </div>
        <WhoWeAre />
        <ClientLogos />
        <Testimonials />
        {/* <Team /> — "Behind the Studio" hidden for now */}
        <InstagramGallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
