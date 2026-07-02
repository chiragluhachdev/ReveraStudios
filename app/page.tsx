import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showreel from "@/components/Showreel";
import FeaturedProjects from "@/components/FeaturedProjects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyRevera from "@/components/WhyRevera";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Team from "@/components/Team";
import InstagramGallery from "@/components/InstagramGallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <FeaturedProjects />
        <Services />
        <Process />
        <WhyRevera />
        <ClientLogos />
        <Testimonials />
        <Stats />
        <Team />
        <InstagramGallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
