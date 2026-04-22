import type { Route } from "./+types/support";
import Footer from "~/common/footer";
import Navbar from "~/common/navbar";
import SupportContact from "~/components/Support/contact";
import SupportFAQ from "~/components/Support/faq";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wicara | Support" },
    { name: "About-Us", content: "Welcome to Wicara!" },
  ];
}

export default function Support() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/latar-belakang.svg')" }}>
    <Navbar />
    <SupportFAQ />
    <SupportContact />
    <Footer />
    </div>
  );
}