import DetailMateriPage from "~/components/Dashboard/arenaPintar";
import type { Route } from "./+types/arena-pintar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wicara | Arena Pintar" },
    { name: "description", content: "Welcome to Wicara!" },
  ];
}

export default function DashboardRoute() {
  return <DetailMateriPage />;
}