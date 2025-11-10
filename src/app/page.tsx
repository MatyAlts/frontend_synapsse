import Footer from "@/components/footer/Footer";
import Benefits from "@/components/home/Benefits";
import Cupon from "@/components/home/Cupon";
import MainHero from "@/components/home/MainHero";
import Testimonials from "@/components/home/Testimonials";


export default function Home() {
  return (
    <div>
      <MainHero />
      <Benefits />
      <Testimonials />
      <Cupon />
      <Footer />
    </div>
  );
}
