import type { Route } from "./+types/sign-in";
import LoginPage from "~/components/Auth/sign-in";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wicara | Sign-in" },
    { name: "Sign-in", content: "Welcome to Wicara!" },
  ];
}

export default function Signin() {
  return (
    <>
    <LoginPage />
    </>
  );
}