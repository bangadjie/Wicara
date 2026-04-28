import DetailMateriPage from "~/components/Dashboard/gestureMatch";
import type { Route } from "./+types/gesture-match";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wicara | Gesture Match" },
    { name: "description", content: "Welcome to Wicara!" },
  ];
}

export default function DashboardRoute() {
  return <DetailMateriPage />;
}