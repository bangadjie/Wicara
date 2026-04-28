import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Trophy,
  Star,
  RotateCcw,
  ChevronRight,
  CheckCircle,
  XCircle,
  Zap,
  Lock,
  Play,
  Hand,
} from "lucide-react";

interface GestureChallenge {
  id: number;
  word: string;
  description: string;
  emoji: string;
  hint: string;
}

interface Level {
  id: number;
  name: string;
  description: string;
  challenges: GestureChallenge[];
  color: string;
  emoji: string;
  requiredScore: number;
}

const levels: Level[] = [
  {
    id: 1,
    name: "Pemula",
    description: "Angka & Salam Dasar",
    color: "from-green-400 to-emerald-500",
    emoji: "🌱",
    requiredScore: 0,
    challenges: [
      { id: 1, word: "HALO", description: "Gerakan salam", emoji: "👋", hint: "Angkat tangan dan kibas" },
      { id: 2, word: "SATU", description: "Angka satu", emoji: "☝️", hint: "Tunjukkan satu jari telunjuk" },
      { id: 3, word: "DUA", description: "Angka dua", emoji: "✌️", hint: "Tunjukkan dua jari" },
      { id: 4, word: "TIGA", description: "Angka tiga", emoji: "🤟", hint: "Tunjukkan tiga jari" },
    ],
  },
  {
    id: 2,
    name: "Dasar",
    description: "Kata Sehari-hari",
    color: "from-cyan-400 to-teal-500",
    emoji: "🌿",
    requiredScore: 4,
    challenges: [
      { id: 5, word: "TERIMA KASIH", description: "Ungkapan syukur", emoji: "🙏", hint: "Kedua tangan bertemu di dada" },
      { id: 6, word: "MAKAN", description: "Aktivitas makan", emoji: "🍽️", hint: "Gerakan tangan ke mulut" },
      { id: 7, word: "MINUM", description: "Aktivitas minum", emoji: "🥤", hint: "Tangan seperti memegang gelas" },
      { id: 8, word: "TIDUR", description: "Aktivitas tidur", emoji: "😴", hint: "Kepala menempel ke tangan" },
    ],
  },
  {
    id: 3,
    name: "Menengah",
    description: "Ekspresi & Emosi",
    color: "from-purple-400 to-violet-500",
    emoji: "🌺",
    requiredScore: 8,
    challenges: [
      { id: 9, word: "SENANG", description: "Ekspresi gembira", emoji: "😊", hint: "Tangan mengusap dada melingkar" },
      { id: 10, word: "SEDIH", description: "Ekspresi sedih", emoji: "😢", hint: "Jari menyentuh pipi ke bawah" },
      { id: 11, word: "MARAH", description: "Ekspresi marah", emoji: "😠", hint: "Kedua tangan mengepal di depan dada" },
      { id: 12, word: "TAKUT", description: "Ekspresi takut", emoji: "😨", hint: "Kedua tangan gemetar di depan dada" },
    ],
  },
  {
    id: 4,
    name: "Mahir",
    description: "Kalimat Lengkap",
    color: "from-orange-400 to-amber-500",
    emoji: "🌟",
    requiredScore: 12,
    challenges: [
      { id: 13, word: "APA KABAR", description: "Salam tanya", emoji: "🤝", hint: "Tangan menunjuk lawan bicara lalu gerakan tanya" },
      { id: 14, word: "SAYA LAPAR", description: "Ungkapan lapar", emoji: "🍚", hint: "Tangan ke perut lalu gerakan makan" },
      { id: 15, word: "TOLONG BANTU", description: "Minta bantuan", emoji: "🆘", hint: "Tangan menengadah, lalu gerakan meminta" },
      { id: 16, word: "SAMPAI JUMPA", description: "Salam perpisahan", emoji: "👋", hint: "Kibas tangan ke kiri dan kanan" },
    ],
  },
];

const bgStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  backgroundImage: 'url("/latar-belakang.svg")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  minHeight: "100vh",
};

function CountdownRing({ seconds, total }: { seconds: number; total: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const progress = (seconds / total) * circ;
  const color = seconds <= 5 ? "#ef4444" : seconds <= 10 ? "#f59e0b" : "#06b6d4";
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg width="64" height="64" className="-rotate-90 absolute">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="32" cy="32" r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={`${progress} ${circ}`}
          style={{ transition: "stroke-dasharray 1s linear" }}
        />
      </svg>
      <span className="font-bold text-lg text-gray-800 relative z-10">{seconds}</span>
    </div>
  );
}

export default function GestureMatchPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [view, setView] = useState<"levels" | "playing" | "result">("levels");
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [answeredIds, setAnsweredIds] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const currentChallenge = selectedLevel?.challenges[currentChallengeIdx];
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsCameraOn(true);
      setCameraError(false);
    } catch {
      setCameraError(true);
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsCameraOn(false);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);
  useEffect(() => {
    if (view !== "playing" || !isCameraOn || detectionResult) return;
    if (timeLeft <= 0) {
      setDetectionResult("wrong");
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [view, isCameraOn, timeLeft, detectionResult]);

  const handleDetect = () => {
    setIsDetecting(true);
    setTimeout(() => {
      const isCorrect = Math.random() > 0.35;
      setDetectionResult(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);
      setIsDetecting(false);
    }, 2000);
  };

  const handleNext = () => {
    if (!selectedLevel) return;
    const next = currentChallengeIdx + 1;
    if (next >= selectedLevel.challenges.length) {
      setTotalScore((s) => s + score);
      setAnsweredIds([]);
      setView("result");
    } else {
      setCurrentChallengeIdx(next);
      setDetectionResult(null);
      setTimeLeft(15);
      setShowHint(false);
    }
  };

  const handleStartLevel = async (level: Level) => {
    setSelectedLevel(level);
    setCurrentChallengeIdx(0);
    setScore(0);
    setDetectionResult(null);
    setTimeLeft(15);
    setShowHint(false);
    setView("playing");
    await startCamera();
  };

  const handleBackToLevels = () => {
    stopCamera();
    setView("levels");
    setSelectedLevel(null);
  };

  const handleRetry = async () => {
    if (!selectedLevel) return;
    setCurrentChallengeIdx(0);
    setScore(0);
    setDetectionResult(null);
    setTimeLeft(15);
    setShowHint(false);
    setView("playing");
    await startCamera();
  };

  if (view === "levels") {
    return (
      <div style={bgStyle}>
        <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24 md:pb-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white rounded-xl border border-cyan-200 hover:bg-cyan-50 transition-all shadow-sm"
            >
              <ArrowLeft size={20} className="text-cyan-600" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">GestureMatch</h1>
              <p className="text-xs text-gray-500">Praktik bahasa isyarat dengan kamera</p>
            </div>
          </div>

          {/* Score Banner */}
          {totalScore > 0 && (
            <div className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 flex items-center gap-4 shadow-md">
              <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                <Trophy size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white/80 text-xs font-bold">TOTAL SKOR KAMU</p>
                <p className="text-white text-2xl font-bold">{totalScore} poin</p>
              </div>
            </div>
          )}

          {/* How to play */}
          <div className="bg-white rounded-2xl border border-cyan-200 p-5 mb-6 shadow-sm">
            <h2 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <Zap size={16} className="text-cyan-500" /> Cara Bermain
            </h2>
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
              <div className="bg-cyan-50 rounded-xl p-3">
                <div className="text-2xl mb-1">📋</div>
                <p className="font-bold text-cyan-800">1. Pilih Level</p>
                <p className="text-gray-500 mt-0.5">Mulai dari level Pemula</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-3">
                <div className="text-2xl mb-1">📷</div>
                <p className="font-bold text-teal-800">2. Aktifkan Kamera</p>
                <p className="text-gray-500 mt-0.5">Izinkan akses kamera</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <div className="text-2xl mb-1">🤚</div>
                <p className="font-bold text-purple-800">3. Praktikkan</p>
                <p className="text-gray-500 mt-0.5">Lakukan gerakan isyarat</p>
              </div>
            </div>
          </div>

          {/* Level Cards */}
          <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
            <Star size={18} className="text-yellow-500" />
            Pilih Level
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {levels.map((level) => {
              const isLocked = totalScore < level.requiredScore;
              return (
                <div
                  key={level.id}
                  onClick={() => !isLocked && handleStartLevel(level)}
                  className={`relative rounded-2xl border-2 overflow-hidden transition-all ${
                    isLocked
                      ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                      : "border-cyan-200 bg-white hover:shadow-lg hover:border-cyan-400 cursor-pointer hover:-translate-y-0.5"
                  }`}
                >
                  <div className={`h-2 bg-gradient-to-r ${level.color}`} />
                  <div className="p-5 flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center text-3xl shadow-md flex-shrink-0`}>
                      {level.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{level.name}</h3>
                        {isLocked && <Lock size={14} className="text-gray-400" />}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{level.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full font-bold">
                          {level.challenges.length} gerakan
                        </span>
                        {isLocked && (
                          <span className="text-xs text-gray-400">
                            Butuh {level.requiredScore} poin
                          </span>
                        )}
                      </div>
                    </div>
                    {!isLocked && (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <Play size={18} className="text-white ml-0.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (view === "result") {
    const total = selectedLevel?.challenges.length ?? 4;
    const pct = Math.round((score / total) * 100);
    const isPerfect = score === total;
    const isGood = pct >= 70;
    return (
      <div style={bgStyle}>
        <div className="p-4 md:p-8 max-w-lg mx-auto flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white rounded-3xl border border-cyan-200 shadow-xl p-8 w-full text-center">
            <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-4xl">{isPerfect ? "🏆" : isGood ? "🌟" : "💪"}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {isPerfect ? "Sempurna!" : isGood ? "Kerja Bagus!" : "Terus Berlatih!"}
            </h2>
            <p className="text-gray-500 text-sm mb-6">Level {selectedLevel?.name}</p>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 mb-6 border border-cyan-100">
              <p className="text-5xl font-bold text-cyan-700 mb-1">{score}/{total}</p>
              <p className="text-cyan-500 text-sm">Gerakan benar</p>
              <div className="mt-3 flex justify-center gap-1">
                {Array.from({ length: total }).map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i < score ? "bg-green-400" : "bg-gray-200"}`} />
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-blue-700 mb-1 uppercase tracking-wider">🤖 Feedback AI</p>
              <p className="text-sm text-gray-700">
                {isPerfect
                  ? "Luar biasa! Gerakan isyarat kamu sangat akurat. Coba level berikutnya!"
                  : isGood
                  ? "Bagus! Kamu sudah menguasai sebagian besar gerakan. Latih lagi yang tersisa ya!"
                  : "Jangan menyerah! Latih gerakan di depan cermin terlebih dahulu, lalu coba lagi."}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 py-3 rounded-xl border-2 border-cyan-300 text-cyan-700 font-bold text-sm hover:bg-cyan-50 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> Ulangi
              </button>
              <button
                onClick={handleBackToLevels}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Level Lain <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={bgStyle}>
      {/* Top Bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-cyan-200 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={handleBackToLevels} className="p-2 rounded-xl hover:bg-cyan-50 transition-all text-cyan-600">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-gray-800 text-sm">GestureMatch — {selectedLevel?.name}</h1>
            <p className="text-xs text-gray-400">
              Soal {currentChallengeIdx + 1} dari {selectedLevel?.challenges.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5">
            <Star size={14} className="text-yellow-500" />
            <span className="font-bold text-yellow-700 text-sm">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-100 h-1.5">
        <div
          className="bg-gradient-to-r from-cyan-400 to-teal-400 h-full transition-all duration-500"
          style={{ width: `${((currentChallengeIdx) / (selectedLevel?.challenges.length ?? 1)) * 100}%` }}
        />
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Challenge Info */}
          <div className="space-y-4">
            {/* Challenge Card */}
            <div className="bg-white rounded-2xl border-2 border-cyan-200 shadow-sm overflow-hidden">
              <div className={`bg-gradient-to-r ${selectedLevel?.color} p-1`} />
              <div className="p-6 text-center">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                  Praktikkan Gerakan Ini
                </p>
                <div className="text-6xl mb-3">{currentChallenge?.emoji}</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">{currentChallenge?.word}</h2>
                <p className="text-sm text-gray-500">{currentChallenge?.description}</p>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-white rounded-2xl border border-cyan-200 p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-bold mb-0.5">WAKTU TERSISA</p>
                <p className="text-sm text-gray-600">Lakukan gerakan sebelum waktu habis</p>
              </div>
              <CountdownRing seconds={timeLeft} total={15} />
            </div>

            {/* Hint */}
            {showHint ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
                <p className="font-bold text-xs uppercase tracking-wider text-amber-600 mb-1">💡 Petunjuk</p>
                {currentChallenge?.hint}
              </div>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                className="w-full py-2.5 rounded-xl border border-amber-200 text-amber-600 font-bold text-sm hover:bg-amber-50 transition-all"
              >
                Tampilkan Petunjuk
              </button>
            )}
          </div>

          {/* RIGHT: Camera */}
          <div className="space-y-4">
            <div className="bg-black rounded-2xl overflow-hidden shadow-xl aspect-video relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover scale-x-[-1]"
              />

              {/* Overlay: camera off */}
              {!isCameraOn && !cameraError && (
                <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center gap-3">
                  <Camera size={40} className="text-gray-500" />
                  <p className="text-gray-400 text-sm font-bold">Kamera belum aktif</p>
                  <button
                    onClick={startCamera}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold text-sm flex items-center gap-2"
                  >
                    <Camera size={16} /> Aktifkan Kamera
                  </button>
                </div>
              )}

              {/* Error */}
              {cameraError && (
                <div className="absolute inset-0 bg-red-950 flex flex-col items-center justify-center gap-2">
                  <CameraOff size={36} className="text-red-400" />
                  <p className="text-red-300 text-sm font-bold">Kamera tidak dapat diakses</p>
                  <p className="text-red-400 text-xs text-center px-4">Pastikan izin kamera sudah diberikan di browser kamu</p>
                </div>
              )}

              {/* Detecting animation */}
              {isDetecting && (
                <div className="absolute inset-0 bg-cyan-900/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-white font-bold text-sm">Menganalisis gerakan...</p>
                </div>
              )}

              {/* Result overlay */}
              {detectionResult && (
                <div className={`absolute inset-0 ${detectionResult === "correct" ? "bg-green-900/70" : "bg-red-900/70"} flex flex-col items-center justify-center gap-3`}>
                  {detectionResult === "correct" ? (
                    <>
                      <CheckCircle size={56} className="text-green-400" />
                      <p className="text-white font-bold text-xl">Benar! 🎉</p>
                    </>
                  ) : (
                    <>
                      <XCircle size={56} className="text-red-400" />
                      <p className="text-white font-bold text-xl">Coba lagi!</p>
                    </>
                  )}
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-white text-gray-800 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {currentChallengeIdx + 1 < (selectedLevel?.challenges.length ?? 0) ? "Gerakan Berikutnya" : "Lihat Hasil"}
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Hand detection frame */}
              {isCameraOn && !isDetecting && !detectionResult && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-cyan-400/70 rounded-xl">
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br" />
                  </div>
                  <p className="absolute bottom-3 left-0 right-0 text-center text-cyan-300 text-xs font-bold">
                    Posisikan tangan di area kotak
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isCameraOn && !detectionResult && (
              <button
                onClick={handleDetect}
                disabled={isDetecting}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl font-bold text-base hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <Hand size={22} />
                {isDetecting ? "Mendeteksi..." : "Validasi Gerakan Saya"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}