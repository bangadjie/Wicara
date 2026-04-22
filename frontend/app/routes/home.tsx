import IndexHero from "~/components/LandingPage/introduction";
import type { Route } from "./+types/home";
import IndexFeatures from "~/components/LandingPage/description";
import IndexIntroduction from "~/components/LandingPage/tipstouse";
import Footer from "~/common/footer";
import Navbar from "~/common/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wicara | Home" },
    { name: "Home", content: "Welcome to Wicara!" },
  ];
}

export default function Home() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/latar-belakang.svg')" }}
    >
      <Navbar />
      <IndexHero />
      <IndexFeatures />
      <IndexIntroduction />
      <Footer />
    </div>
  );
}