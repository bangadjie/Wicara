import { useState, useEffect, useRef } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserCircle,
  ChevronDown,
} from "lucide-react";

type Role = "siswa" | "guru";

export default function AuthPages() {
  const [currentPage, setCurrentPage] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Wicara";
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerRole, setRegisterRole] = useState<Role>("siswa");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const slides = [
    { src: "/register1.jpg", alt: "Foto 1" },
    { src: "/register2.jpg", alt: "Foto 2" },
    { src: "/register3.jpg", alt: "Foto 3" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<number | null>(null);
  const AUTO_PLAY_MS = 3500;

  useEffect(() => {
    let idx = 0;
    const t = setInterval(() => {
      if (idx <= fullText.length) {
        setDisplayText(fullText.slice(0, idx));
        idx++;
      } else {
        clearInterval(t);
        setTimeout(() => setIsAnimating(false), 400);
      }
    }, 120);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-role-dropdown]")) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, AUTO_PLAY_MS);
  };
  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };
  const goTo = (i: number) => {
    stopAutoPlay();
    setActiveIndex(i);
    setTimeout(() => startAutoPlay(), 2500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    try {
      const form = (e.currentTarget as HTMLInputElement).form;
      let btn: HTMLButtonElement | null = null;
      if (form) {
        btn = form.querySelector(
          'button[type="submit"], button[data-role="auth-submit"]',
        ) as HTMLButtonElement | null;
      }
      if (!btn) {
        let el: HTMLElement | null = e.currentTarget as HTMLElement;
        for (let i = 0; i < 6 && el; i++) {
          if (el.querySelector) {
            const maybe = el.querySelector(
              'button[data-role="auth-submit"], button[type="submit"]',
            ) as HTMLButtonElement | null;
            if (maybe) {
              btn = maybe;
              break;
            }
          }
          el = el.parentElement;
        }
      }
      if (btn) {
        if (currentPage === "login") (btn as HTMLButtonElement).click();
        else (btn as HTMLButtonElement).click();
      }
    } catch (err) {}
  };

  const isEmailValid = (email: string) => /^\S+@\S+\.\S+$/.test(email.trim());

  const canLogin = loginEmail.trim() !== "" && loginPassword !== "";
  const canRegister =
    registerName.trim() !== "" &&
    registerEmail.trim() !== "" &&
    registerPassword !== "" &&
    registerConfirmPassword !== "";

  const handleLoginSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | any,
  ) => {
    try {
      e?.preventDefault?.();
    } catch {}
    if (loginEmail.trim() === "" || loginPassword === "") {
      alert("Email dan password wajib diisi.");
      return;
    }
    if (!isEmailValid(loginEmail)) {
      alert("Format email tidak valid.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Email atau password salah");
        setIsLoading(false);
        return;
      }
      const token = data.access_token ?? data.token ?? null;
      const user = data.data ?? data.user ?? { name: "", role: "" };
      if (typeof window !== "undefined" && token) {
        localStorage.setItem("access_token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role ?? "");
      }
      if (user.role === "guru") window.location.href = "/dashboard-guru";
      else if (user.role === "siswa") window.location.href = "/dashboard-siswa";
      else window.location.href = "/dashboard";
    } catch (err) {
      alert("Gagal terhubung ke server!");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | any,
  ) => {
    try {
      e?.preventDefault?.();
    } catch {}
    if (registerName.trim() === "" || registerEmail.trim() === "") {
      alert("Nama dan email wajib diisi.");
      return;
    }
    if (!isEmailValid(registerEmail)) {
      alert("Format email tidak valid.");
      return;
    }
    if (registerPassword === "" || registerConfirmPassword === "") {
      alert("Password dan konfirmasi password wajib diisi.");
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: registerName,
          email: registerEmail.trim(),
          role: registerRole,
          password: registerPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Registrasi gagal");
        setIsLoading(false);
        return;
      }
      const token = data.access_token ?? data.token ?? null;
      const user = data.data ??
        data.user ?? { name: registerName, role: registerRole };
      if (typeof window !== "undefined" && token) {
        localStorage.setItem("access_token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role ?? registerRole);
      }
      alert("Registrasi berhasil!");
      if (user.role === "guru") window.location.href = "/dashboard-guru";
      else window.location.href = "/dashboard-siswa";
    } catch (err) {
      console.error(err);
      alert("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/latar-belakang.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor-blink { animation: blink 1s infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)}}
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* Typewriter */}
      {isAnimating && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-center">
            <span className="bg-teal-400 bg-clip-text text-transparent">
              {displayText}
            </span>
            <span className="cursor-blink ml-1 text-teal-500">|</span>
          </h1>
        </div>
      )}

      {/* Main form */}
      <div
        className={`w-full max-w-6xl transition-all duration-700 ${isAnimating ? "opacity-0" : "opacity-100"}`}
      >
        <div className="bg-white/95 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="grid md:grid-cols-2 gap-0">
            {/* LEFT */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center gap-2 text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg mb-6 w-fit transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Kembali
              </button>

              {/* Greetings */}
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="bg-teal-500 bg-clip-text text-transparent">
                    Wicara
                  </span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  Hai biar ga asing, langsung masuk aja ya king. <br /> Selamat
                  datang di Wicara! 👋
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setCurrentPage("login")}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${currentPage === "login" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage("register")}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${currentPage === "register" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  Register
                </button>
              </div>

              {/* FORM AREA */}
              <div className="w-full max-w-xl">
                {/* LOGIN */}
                {currentPage === "login" && (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                        placeholder="Masukkan email anda"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                        placeholder="Masukkan sandi anda"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-teal-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-teal-500" />
                        )}
                      </button>
                    </div>

                    <button
                      data-role="auth-submit"
                      onClick={handleLoginSubmit}
                      disabled={isLoading || !canLogin}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "Masuk"
                      )}
                    </button>
                  </div>
                )}

                {/* REGISTER */}
                {currentPage === "register" && (
                  <div className="space-y-4">
                    {/* name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                        placeholder="Masukkan nama anda"
                      />
                    </div>

                    {/* email */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                        placeholder="Masukkan email anda"
                      />
                    </div>

                    {/* role */}
                    <div className="relative" data-role-dropdown>
                      <button
                        type="button"
                        onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                        className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <UserCircle className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-700 font-medium">
                            {registerRole === "siswa" ? "Siswa" : "Guru"}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${roleDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {roleDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-30 overflow-hidden">
                          {(["siswa", "guru"] as Role[]).map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => {
                                setRegisterRole(role);
                                setRoleDropdownOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-50 ${registerRole === role ? "bg-teal-50" : ""}`}
                            >
                              <UserCircle className="h-5 w-5 text-gray-400" />
                              <div className="text-left">
                                <p className="text-sm font-semibold text-gray-800 capitalize">
                                  {role}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {role === "siswa"
                                    ? "Akun untuk pelajar"
                                    : "Akun untuk pengajar"}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* password */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                        placeholder="Masukkan sandi anda"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-teal-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-teal-500" />
                        )}
                      </button>
                    </div>

                    {/* confirm password */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={registerConfirmPassword}
                        onChange={(e) =>
                          setRegisterConfirmPassword(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                        placeholder="Konfirmasi sandi anda"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-teal-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-teal-500" />
                        )}
                      </button>
                    </div>

                    {/* submit */}
                    <button
                      data-role="auth-submit"
                      onClick={handleRegisterSubmit}
                      disabled={isLoading || !canRegister}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "Daftar"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT - Image Carousel */}
            <div className="hidden md:flex items-center justify-center p-8 bg-transparent relative">
              <div className="relative w-[420px] h-[360px]">
                {slides.map((s, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={s.src}
                      className={`absolute inset-0 rounded-2xl overflow-hidden shadow-xl transition-all duration-700 transform ${
                        isActive
                          ? "opacity-100 translate-y-0 scale-100 z-20"
                          : "opacity-0 translate-y-6 scale-95 z-0 pointer-events-none"
                      }`}
                    >
                      <img
                        src={s.src}
                        alt={s.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}

                {/* Dots */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-5 flex items-center gap-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "bg-teal-500 shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-110"
                          : "bg-gray-400 hover:bg-gray-500 scale-95"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}