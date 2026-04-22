import type { Route } from "./+types/about-us";
import Footer from "~/common/footer";
import Navbar from "~/common/navbar";
import AboutUs from "~/components/AboutUs/about-us";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wicara | About-Us" },
    { name: "About-Us", content: "Welcome to Wicara!" },
  ];
}

export default function Home() {
  return (
    <>
    <Navbar />
    <AboutUs />
    <Footer />
    </>
  );
}