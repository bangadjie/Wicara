import type { Route } from "./+types/dashboard";
import Dashboard from "~/components/Dashboard/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wicara | Dashboard" },
    { name: "description", content: "Welcome to Wicara!" },
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}