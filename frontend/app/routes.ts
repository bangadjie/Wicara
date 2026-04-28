import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about-us", "routes/about-us.tsx"),
    route("support", "routes/support.tsx"),
    route("sign-in", "routes/sign-in.tsx"),
    route("dashboard-siswa", "routes/dashboard.tsx"),
    route("detail-materi", "routes/detail-materi.tsx"),
    route("arena-pintar", "routes/arena-pintar.tsx"),
    route("gesture-match", "routes/gesture-match.tsx"),
    route("sign-translate", "routes/sign-translate.tsx"),
] satisfies RouteConfig;