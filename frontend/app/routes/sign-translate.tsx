import DetailMateriPage from "~/components/Dashboard/signTranslate";
import type { Route } from "./+types/sign-translate";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wicara | Sign Translate" },
    { name: "description", content: "Welcome to Wicara!" },
  ];
}

export default function DashboardRoute() {
  return <DetailMateriPage />;
}