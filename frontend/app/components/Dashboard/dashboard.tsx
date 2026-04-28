import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Menu,
  BookOpen,
  Gamepad2,
  Award,
  Users,
  GraduationCap,
  Home,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  X,
  ArrowLeft,
  Lock,
  Clock,
  FileText,
  Video,
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

const VideoModal = ({
  isOpen,
  onClose,
  onComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setCanSkip(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSkip = () => {
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            controls
            autoPlay
            onEnded={onComplete}
          >
            <source src="/KIFLI.mp4" type="video/mp4" />
            Browser Anda tidak mendukung video.
          </video>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          {canSkip && (
            <button
              onClick={handleSkip}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              OK
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const DaftarMateriPage = ({ onBack }: { onBack: () => void }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const materiList = [
    {
      id: 1,
      title: "Pengenalan Penjumlahan",
      duration: "15 menit",
      description:
        "Belajar konsep dasar penjumlahan dengan cara yang menyenangkan",
      completed: true,
      locked: false,
      type: "video",
    },
    {
      id: 2,
      title: "Penjumlahan 1-10",
      duration: "20 menit",
      description: "Praktik penjumlahan bilangan 1 sampai 10",
      completed: true,
      locked: false,
      type: "interactive",
    },
    {
      id: 3,
      title: "Penjumlahan 11-20",
      duration: "25 menit",
      description: "Lanjutan penjumlahan dengan bilangan yang lebih besar",
      completed: false,
      locked: false,
      type: "video",
    },
    {
      id: 4,
      title: "Soal Latihan Penjumlahan",
      duration: "30 menit",
      description: "Uji kemampuan penjumlahan dengan soal-soal latihan",
      completed: false,
      locked: false,
      type: "quiz",
    },
    {
      id: 5,
      title: "Pengenalan Pengurangan",
      duration: "15 menit",
      description: "Belajar konsep dasar pengurangan",
      completed: false,
      locked: false,
      type: "video",
    },
    {
      id: 6,
      title: "Pengurangan 1-10",
      duration: "20 menit",
      description: "Praktik pengurangan bilangan 1 sampai 10",
      completed: false,
      locked: true,
      type: "interactive",
    },
    {
      id: 7,
      title: "Pengurangan 11-20",
      duration: "25 menit",
      description: "Lanjutan pengurangan dengan bilangan yang lebih besar",
      completed: false,
      locked: true,
      type: "video",
    },
    {
      id: 8,
      title: "Soal Latihan Pengurangan",
      duration: "30 menit",
      description: "Uji kemampuan pengurangan dengan soal-soal latihan",
      completed: false,
      locked: true,
      type: "quiz",
    },
    {
      id: 9,
      title: "Penjumlahan & Pengurangan",
      duration: "35 menit",
      description: "Menggabungkan konsep penjumlahan dan pengurangan",
      completed: false,
      locked: true,
      type: "interactive",
    },
    {
      id: 10,
      title: "Ujian Akhir Bab",
      duration: "45 menit",
      description: "Ujian komprehensif untuk bab penjumlahan dan pengurangan",
      completed: false,
      locked: true,
      type: "exam",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video size={16} className="text-blue-500" />;
      case "interactive":
        return <Gamepad2 size={16} className="text-purple-500" />;
      case "quiz":
        return <FileText size={16} className="text-green-500" />;
      case "exam":
        return <Award size={16} className="text-orange-500" />;
      default:
        return <BookOpen size={16} className="text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "Video";
      case "interactive":
        return "Interaktif";
      case "quiz":
        return "Kuis";
      case "exam":
        return "Ujian";
      default:
        return "Materi";
    }
  };

  const completedCount = materiList.filter((m) => m.completed).length;
  const progress = (completedCount / materiList.length) * 100;

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundImage: 'url("/latar-belakang.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Mobile Sidebar (reuse from dashboard) */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="p-4 md:p-6 lg:p-10 pb-20 md:pb-10">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-600 hover:text-teal-600 font-bold mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </button>

          <div className="bg-white rounded-xl p-4 md:p-6 border border-cyan-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-4xl md:text-5xl shadow-lg">
                🔢
              </div>
              <div className="flex-1">
                <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">
                  Matematika
                </h1>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  Kelas 5 SD • Kurikulum Merdeka
                </p>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-600 font-medium">
                      Progress Belajar
                    </span>
                    <span className="text-purple-600 font-bold">
                      {completedCount}/{materiList.length} Materi
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {Math.round(progress)}% Selesai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Materi List */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-cyan-200 shadow-sm">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen size={20} className="text-purple-500" />
            Daftar Materi
          </h2>

          <div className="space-y-3 md:space-y-4">
            {materiList.map((materi, idx) => (
              <div
                key={materi.id}
                onClick={() => {
                  if (!materi.locked) {
                    navigate("/detail-materi");
                  }
                }}
                className={`border rounded-xl p-4 md:p-5 transition-all ${
                  materi.locked
                    ? "bg-gray-50 border-gray-200 opacity-60"
                    : materi.completed
                      ? "bg-green-50 border-green-200 hover:shadow-md cursor-pointer"
                      : "bg-white border-cyan-200 hover:shadow-md hover:border-purple-300 cursor-pointer"
                }`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Number Badge */}
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                      materi.locked
                        ? "bg-gray-200 text-gray-400"
                        : materi.completed
                          ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                          : "bg-gradient-to-br from-purple-400 to-purple-600 text-white"
                    }`}
                  >
                    {materi.locked ? (
                      <Lock size={18} />
                    ) : materi.completed ? (
                      <Check size={20} />
                    ) : (
                      idx + 1
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                      <h3
                        className={`font-bold text-sm md:text-base ${
                          materi.locked ? "text-gray-400" : "text-gray-800"
                        }`}
                      >
                        {materi.title}
                      </h3>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                            materi.locked
                              ? "bg-gray-100 text-gray-400"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {getTypeIcon(materi.type)}
                          {getTypeLabel(materi.type)}
                        </span>
                      </div>
                    </div>

                    <p
                      className={`text-xs md:text-sm mb-3 ${
                        materi.locked ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {materi.description}
                    </p>

                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center gap-1 text-xs ${
                          materi.locked ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <Clock size={14} />
                        {materi.duration}
                      </div>

                      {!materi.locked && !materi.completed && (
                        <button className="text-xs md:text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1">
                          Mulai Belajar
                          <ChevronRight size={16} />
                        </button>
                      )}

                      {materi.completed && (
                        <span className="text-xs md:text-sm font-bold text-green-600 flex items-center gap-1">
                          <Check size={14} />
                          Selesai
                        </span>
                      )}

                      {materi.locked && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Lock size={14} />
                          Terkunci
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 border-2 border-purple-200">
          <h3 className="font-bold text-sm md:text-base text-purple-900 mb-3 flex items-center gap-2">
            💡 Tips Belajar
          </h3>
          <ul className="space-y-2 text-xs md:text-sm text-purple-800">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>Tonton video dengan saksama dan catat hal-hal penting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>Kerjakan latihan soal untuk mengasah kemampuan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>
                Selesaikan semua materi secara berurutan untuk hasil terbaik
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
};

const DesktopSidebar = ({ isOpen }: { isOpen: boolean }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          window.location.href = "/login";
          return;
        }
        const data = await res.json();
        setUser({
          name: data.user.nama || "User",
          email: "",
          role: data.user.role,
          isLoggedIn: true,
        });
      } catch (err) {
        console.error(err);
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, []);

  const menuTop = [
    { name: "Beranda", icon: <Home size={18} /> },
    { name: "Layar Ilmu", icon: <BookOpen size={18} /> },
    { name: "Arena Pintar", icon: <Gamepad2 size={18} /> },
    { name: "Lencana", icon: <Award size={18} /> },
    { name: "Teman", icon: <Users size={18} /> },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-cyan-50 to-teal-50 border-r border-cyan-200 p-5 flex flex-col z-50 transition-transform duration-300 w-56 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
        <div className="overflow-hidden">
          <h3 className="font-bold text-gray-900 text-sm truncate">
            {user?.name || "Wicara User"}
          </h3>
          <p className="text-[11px] text-gray-500 truncate">
            {user?.email || "-"}
          </p>
        </div>
      </div>

      <button className="py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors mb-6 text-xs border-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-transparent shadow-md hover:shadow-lg">
        <User size={14} />
        Profil Saya
      </button>

      <nav className="flex-1 space-y-1">
        {menuTop.map((item, idx) => {
          const isActive = idx === 0;
          return (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-bold text-sm transition-all ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-cyan-100"
              }`}
            >
              <span className={isActive ? "text-white" : "text-cyan-600"}>
                {item.icon}
              </span>
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-cyan-200 space-y-1">
        <button
          onClick={async () => {
            await fetch("http://localhost:3000/auth/logout", {
              method: "POST",
              credentials: "include",
            });

            window.location.href = "/";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-bold text-sm transition-all text-red-500 hover:bg-red-50"
        >
          <LogOut size={18} /> Keluar
        </button>
      </div>
    </div>
  );
};

const MobileSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          window.location.href = "/login";
          return;
        }
        const data = await res.json();
        setUser({
          name: data.user.nama || "User",
          email: "",
          role: data.user.role,
          isLoggedIn: true,
        });
      } catch (err) {
        console.error(err);
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, []);

  const menuTop = [
    { name: "Beranda", icon: <Home size={18} /> },
    { name: "Layar Ilmu", icon: <BookOpen size={18} /> },
    { name: "Arena Pintar", icon: <Gamepad2 size={18} /> },
    { name: "Lencana", icon: <Award size={18} /> },
    { name: "Teman", icon: <Users size={18} /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-cyan-50 to-teal-50 border-r border-cyan-200 p-5 flex flex-col z-50 transition-transform duration-300 w-72 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-gray-900 text-sm truncate">
                {user?.name || "Wicara User"}
              </h3>
              <p className="text-[11px] text-gray-500 truncate">
                {user?.email || "-"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-cyan-100 rounded-lg"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <button className="py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors mb-6 text-sm border-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-transparent shadow-md hover:shadow-lg">
          <User size={16} />
          Profil Saya
        </button>

        <nav className="flex-1 space-y-1">
          {menuTop.map((item, idx) => {
            const isActive = idx === 0;
            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-bold text-sm transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-cyan-100"
                }`}
              >
                <span className={isActive ? "text-white" : "text-cyan-600"}>
                  {item.icon}
                </span>
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-cyan-200 space-y-1">
          <button
            onClick={async () => {
              await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                credentials: "include",
              });

              window.location.href = "/";
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg font-bold text-sm transition-all text-red-500 hover:bg-red-50"
          >
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </div>
    </>
  );
};

const MobileBottomNav = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Beranda", icon: <Home size={20} /> },
    { name: "Layar Ilmu", icon: <BookOpen size={20} /> },
    { name: "Arena", icon: <Gamepad2 size={20} /> },
    { name: "Lencana", icon: <Award size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-cyan-200 md:hidden z-30 shadow-lg">
      <div className="grid grid-cols-4 gap-1 p-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(idx)}
            className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-all ${
              activeTab === idx
                ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                : "text-gray-600"
            }`}
          >
            {tab.icon}
            <span className="text-[10px] font-bold">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function WicaraDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Kelas 5 SD");
  const [user, setUser] = useState<UserData | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<"dashboard" | "materi">(
    "dashboard",
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          window.location.href = "/login";
          return;
        }
        const data = await res.json();
        setUser({
          name: data.user.nama || "User",
          email: "",
          role: data.user.role,
          isLoggedIn: true,
        });
      } catch (err) {
        console.error(err);
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, []);

  const classes = ["Kelas 4 SD", "Kelas 5 SD", "Kelas 6 SD"];
  const currentIndex = classes.indexOf(selectedClass);

  const handleMaterikaClick = () => {
    setShowVideoModal(true);
  };

  const handleVideoComplete = () => {
    setShowVideoModal(false);
    setCurrentPage("materi");
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
  };

  const subjects = [
    {
      name: "Bahasa Isyarat",
      icon: "👋",
      color: "from-blue-400 to-blue-600",
      completed: 8,
      total: 12,
    },
    {
      name: "Matematika",
      icon: "🔢",
      color: "from-purple-400 to-purple-600",
      completed: 2,
      total: 10,
      onClick: handleMaterikaClick,
    },
    {
      name: "Bahasa Indonesia",
      icon: "📖",
      color: "from-pink-400 to-pink-600",
      completed: 6,
      total: 10,
    },
    {
      name: "PPKn",
      icon: "🏛️",
      color: "from-green-400 to-green-600",
      completed: 4,
      total: 8,
    },
    {
      name: "IPA",
      icon: "🔬",
      color: "from-orange-400 to-orange-600",
      completed: 3,
      total: 8,
    },
    {
      name: "IPS",
      icon: "🌍",
      color: "from-teal-400 to-teal-600",
      completed: 2,
      total: 6,
    },
  ];

  const games = [
    {
      name: "GestureMatch",
      icon: "🤚",
      color: "bg-gradient-to-br from-cyan-400 to-teal-500",
      path: "/gesture-match",
    },
    {
      name: "Sign Translate",
      icon: "🤟",
      color: "bg-gradient-to-br from-purple-400 to-violet-500",
      path: "/sign-language-translate",
    },
  ];

  const badges = [
    { name: "Task Slayer", icon: "📝", earned: true },
    { name: "Champ of Wicara", icon: "🏆", earned: true },
    { name: "Game Expert", icon: "🎮", earned: false },
  ];

  const recentLessons = [
    { subject: "Bahasa Isyarat", topic: "Angka 1-20", completed: true },
    { subject: "Matematika", topic: "Penjumlahan Sederhana", completed: true },
    { subject: "Bahasa Indonesia", topic: "Membaca Cerita", completed: false },
  ];

  if (currentPage === "materi") {
    return <DaftarMateriPage onBack={handleBackToDashboard} />;
  }

  return (
    <div
      className="flex min-h-screen"
      style={{
        fontFamily: "Inter, sans-serif",
        backgroundImage: 'url("/latar-belakang.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        onComplete={handleVideoComplete}
      />

      <div className="hidden md:block">
        <DesktopSidebar isOpen={isSidebarOpen} />
      </div>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main
        className={`flex-1 transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-10 pb-20 md:pb-10 ${isSidebarOpen ? "md:ml-56" : "md:ml-0"}`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 md:p-2.5 bg-white rounded-lg border border-cyan-200 hover:bg-cyan-50 transition-all group shadow-sm"
          >
            <Menu
              size={20}
              className="text-cyan-600 group-hover:text-teal-600"
            />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent uppercase">
              Beranda Wicara
            </h1>
            <p className="text-xs md:text-sm text-gray-600 font-medium">
              Platform Pembelajaran Inklusif
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-4 md:space-y-6">
            {/* Class Selector */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-cyan-200 shadow-sm">
              <div className="flex items-center justify-between">
                <button
                  onClick={() =>
                    setSelectedClass(classes[Math.max(0, currentIndex - 1)])
                  }
                  disabled={currentIndex === 0}
                  className={`p-2 rounded-lg ${currentIndex === 0 ? "text-gray-300" : "text-cyan-500 hover:bg-cyan-50"}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 text-base md:text-lg">
                    {selectedClass}
                  </h3>
                  <p className="text-xs text-gray-500">Kurikulum Merdeka</p>
                </div>
                <button
                  onClick={() =>
                    setSelectedClass(
                      classes[Math.min(classes.length - 1, currentIndex + 1)],
                    )
                  }
                  disabled={currentIndex === classes.length - 1}
                  className={`p-2 rounded-lg ${currentIndex === classes.length - 1 ? "text-gray-300" : "text-cyan-500 hover:bg-cyan-50"}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Profile Card - Mobile Only */}
            {user && (
              <div className="bg-white rounded-xl p-6 border border-cyan-200 text-center relative overflow-hidden shadow-sm lg:hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
                <p className="text-cyan-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                  Profil Siswa
                </p>

                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="w-full h-full rounded-full border-4 border-cyan-100 overflow-hidden bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {user.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border-2 border-cyan-200 text-cyan-500">
                    <GraduationCap size={14} strokeWidth={2.5} />
                  </div>
                </div>

                <h4 className="font-bold text-base text-gray-800 mb-1">
                  {user.name}
                </h4>
                <p className="text-gray-400 text-xs font-medium mb-4">
                  {user.role === "siswa" ? "Siswa" : "Guru"} • {selectedClass}
                </p>

                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 py-3 rounded-lg border border-cyan-100">
                  <p className="text-[9px] uppercase font-bold text-cyan-600 mb-1">
                    Streak Belajar
                  </p>
                  <p className="font-bold text-cyan-700 text-xl">7 Hari 🔥</p>
                </div>
              </div>
            )}

            {/* Subjects Grid */}
            <div className="bg-white rounded-xl p-4 md:p-8 border border-cyan-200 shadow-sm">
              <h2 className="text-gray-800 font-bold text-base md:text-lg uppercase tracking-wider mb-4 md:mb-6 flex items-center gap-2">
                <BookOpen size={18} className="text-cyan-500" />
                LAYAR ILMU
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {subjects.map((subject, idx) => (
                  <div
                    key={idx}
                    className="group cursor-pointer"
                    onClick={subject.onClick}
                  >
                    <div
                      className={`relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${subject.color} p-4 md:p-6 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                    >
                      <div className="text-3xl md:text-5xl mb-2 md:mb-3">
                        {subject.icon}
                      </div>
                      <h3 className="font-bold text-xs md:text-lg text-center leading-tight">
                        {subject.name}
                      </h3>
                      <div className="mt-3 md:mt-4 w-full bg-white/30 rounded-full h-1.5 md:h-2">
                        <div
                          className="bg-white h-full rounded-full transition-all"
                          style={{
                            width: `${(subject.completed / subject.total) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-[10px] md:text-xs mt-1 md:mt-2 text-white/90">
                        {subject.completed}/{subject.total} materi
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arena Pintar */}
            <div className="bg-white rounded-xl p-4 md:p-8 border border-cyan-200 shadow-sm">
              {/* Header + arrow button */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-gray-800 font-bold text-base md:text-lg uppercase tracking-wider flex items-center gap-2 mb-1">
                    <Gamepad2 size={18} className="text-teal-500" />
                    ARENA PINTAR
                  </h2>
                </div>
                <button
                  onClick={() => navigate("/arena-pintar")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold hover:shadow-md transition-all flex-shrink-0 group"
                >
                  Buka Arena
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* GestureMatch */}
                <div
                  onClick={() => navigate("/gesture-match")}
                  className="cursor-pointer rounded-xl border border-cyan-200 bg-white hover:border-teal-300 hover:shadow-md transition-all overflow-hidden group"
                >
                  <div className="h-1 bg-gradient-to-r from-teal-400 to-cyan-400" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-xl">
                        🤚
                      </div>
                      <div className="w-7 h-7 rounded-full border border-gray-200 group-hover:border-cyan-300 flex items-center justify-center transition-colors">
                        <ChevronRight
                          size={14}
                          className="text-gray-400 group-hover:text-cyan-500 transition-colors"
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-gray-800 mb-1">
                      GestureMatch
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                      Praktik gerakan isyarat & validasi langsung lewat kamera
                      AI
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold">
                        4 level
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-bold">
                        AI
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sign Translate */}
                <div
                  onClick={() => navigate("/sign-translate")}
                  className="cursor-pointer rounded-xl border border-purple-100 bg-white hover:border-purple-300 hover:shadow-md transition-all overflow-hidden group"
                >
                  <div className="h-1 bg-gradient-to-r from-purple-400 to-violet-400" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-xl">
                        🤟
                      </div>
                      <div className="w-7 h-7 rounded-full border border-gray-200 group-hover:border-purple-300 flex items-center justify-center transition-colors">
                        <ChevronRight
                          size={14}
                          className="text-gray-400 group-hover:text-purple-500 transition-colors"
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-gray-800 mb-1">
                      Sign Translate
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                      Teks ke animasi isyarat SIBI instan & real-time
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold">
                        SIBI
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-bold">
                        Real-time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Badges - Mobile */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 md:p-6 border-2 border-yellow-200 shadow-sm lg:hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-orange-900 uppercase tracking-wider flex items-center gap-2">
                  <Award size={16} />
                  Lencana Bulanan
                </span>
              </div>

              <div className="space-y-2 md:space-y-3">
                {badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg ${badge.earned ? "bg-white border border-yellow-200" : "bg-gray-100 border border-gray-200 opacity-50"}`}
                  >
                    <div className="text-xl md:text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-bold text-gray-800">
                        {badge.name}
                      </p>
                    </div>
                    {badge.earned && (
                      <Check size={16} className="text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Lessons - Mobile */}
            <div className="bg-white rounded-xl p-4 md:p-6 border border-cyan-200 shadow-sm lg:hidden">
              <h3 className="font-bold text-sm text-gray-800 mb-4 uppercase tracking-wider">
                Pelajaran Terakhir
              </h3>
              <div className="space-y-3">
                {recentLessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg border border-cyan-100"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${lesson.completed ? "bg-gradient-to-br from-green-400 to-green-600" : "bg-gradient-to-br from-gray-300 to-gray-400"} flex items-center justify-center text-white`}
                    >
                      {lesson.completed ? (
                        <Check size={18} />
                      ) : (
                        <Play size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-800">
                        {lesson.subject}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {lesson.topic}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content - Desktop Only */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            {/* Profile Card */}
            {user && (
              <div className="bg-white rounded-xl p-8 border border-cyan-200 text-center relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
                <p className="text-cyan-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
                  Profil Siswa
                </p>

                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="w-full h-full rounded-full border-4 border-cyan-100 overflow-hidden bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border-2 border-cyan-200 text-cyan-500">
                    <GraduationCap size={16} strokeWidth={2.5} />
                  </div>
                </div>

                <h4 className="font-bold text-lg text-gray-800 mb-1">
                  {user.name}
                </h4>
                <p className="text-gray-400 text-xs font-medium mb-6">
                  {user.role === "siswa" ? "Siswa" : "Guru"} • {selectedClass}
                </p>

                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 py-4 rounded-lg border border-cyan-100">
                  <p className="text-[9px] uppercase font-bold text-cyan-600 mb-1">
                    Streak Belajar
                  </p>
                  <p className="font-bold text-cyan-700 text-2xl">7 Hari 🔥</p>
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-orange-900 uppercase tracking-wider flex items-center gap-2">
                  <Award size={16} />
                  Lencana Bulanan
                </span>
              </div>

              <div className="space-y-3">
                {badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg ${badge.earned ? "bg-white border border-yellow-200" : "bg-gray-100 border border-gray-200 opacity-50"}`}
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">
                        {badge.name}
                      </p>
                    </div>
                    {badge.earned && (
                      <Check size={16} className="text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Lessons */}
            <div className="bg-white rounded-xl p-6 border border-cyan-200 shadow-sm">
              <h3 className="font-bold text-sm text-gray-800 mb-4 uppercase tracking-wider">
                Pelajaran Terakhir
              </h3>
              <div className="space-y-3">
                {recentLessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg border border-cyan-100"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${lesson.completed ? "bg-gradient-to-br from-green-400 to-green-600" : "bg-gradient-to-br from-gray-300 to-gray-400"} flex items-center justify-center text-white`}
                    >
                      {lesson.completed ? (
                        <Check size={18} />
                      ) : (
                        <Play size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-800">
                        {lesson.subject}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {lesson.topic}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}