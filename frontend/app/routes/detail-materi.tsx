import DetailMateriPage from "~/components/Dashboard/detail-materi";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wicara | Detail Materi" },
    { name: "description", content: "Welcome to Wicara!" },
  ];
}

export default function DashboardRoute() {
  return <DetailMateriPage />;
}