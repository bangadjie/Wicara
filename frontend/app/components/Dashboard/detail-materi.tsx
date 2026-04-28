import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Clock,
  Check,
  Play,
  ChevronDown,
  ChevronUp,
  Award,
  FileText,
  Video,
  X,
  CheckCircle,
  Star,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

interface MateriData {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  subtopics: string[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

const materiList: MateriData[] = [
  {
    id: 1,
    title: "Pengenalan Perkalian",
    duration: "3:45",
    videoUrl: "/NIZAM.mp4",
    subtopics: ["Apa itu perkalian?", "Simbol kali (x)", "Contoh sederhana"],
  },
  {
    id: 2,
    title: "Perkalian 1–5",
    duration: "5:12",
    videoUrl: "/NIZAM.mp4",
    subtopics: ["Tabel perkalian 1", "Tabel perkalian 2–5", "Latihan bersama"],
  },
  {
    id: 3,
    title: "Perkalian 6–10",
    duration: "6:30",
    videoUrl: "/NIZAM.mp4",
    subtopics: ["Tabel perkalian 6–7", "Tabel perkalian 8–10", "Trik mudah"],
  },
  {
    id: 4,
    title: "Perkalian Dua Angka",
    duration: "8:00",
    videoUrl: "/NIZAM.mp4",
    subtopics: ["Metode penjumlahan berulang", "Cara cepat", "Contoh soal"],
  },
];

const quizQuestions: QuizQuestion[] = [
  { question: "3 × 4 = ?", options: ["10", "12", "14", "7"], answer: 1 },
  { question: "5 × 5 = ?", options: ["20", "30", "25", "15"], answer: 2 },
  { question: "2 × 8 = ?", options: ["16", "18", "14", "10"], answer: 0 },
  { question: "6 × 3 = ?", options: ["15", "21", "18", "24"], answer: 2 },
  { question: "7 × 4 = ?", options: ["28", "24", "21", "32"], answer: 0 },
];

const bgStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  backgroundImage: 'url("/latar-belakang.svg")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
};

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  materiTitle: string;
}

function QuizModal({ isOpen, onClose, materiTitle }: QuizModalProps) {
  const [current, setCurrent] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<string>("");

 useEffect(() => {
    if (showResult) {
      const percentage = (answers.filter((a, i) => a === quizQuestions[i]?.answer).length / quizQuestions.length) * 100;

      if (percentage === 100) {
        setAiFeedback("Luar biasa! Kamu menguasai konsep perkalian dengan sangat baik!");
      } else if (percentage >= 70) {
        setAiFeedback("Bagus sekali! Kamu sudah memahami sebagian besar materi.");
      } else {
        setAiFeedback("Tetap semangat! Coba ulangi lagi ya!");
      }
    }
  }, [showResult, answers]);

  const reset = (): void => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
  };

  const handleClose = (): void => {
    reset();
    onClose();
  };

  const handleAnswer = (idx: number): void => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = (): void => {
    const newAnswers = [...answers, selected];
    if (current + 1 < quizQuestions.length) {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setAnswers(newAnswers);
      setShowResult(true);
    }
  };

  const correctCount: number = showResult
    ? answers.filter((a, i) => {
        const question = quizQuestions[i];
        return question && a === question.answer;
      }).length
    : 0;

  if (!isOpen) return null;

  const q = quizQuestions[current];
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 p-5 flex items-center justify-between">
          <div>
            <p className="text-cyan-200 text-xs font-bold uppercase tracking-wider">
              Kuis — {materiTitle}
            </p>
            {!showResult && (
              <p className="text-white font-bold text-sm mt-0.5">
                Soal {current + 1} dari {quizQuestions.length}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Progress bar */}
        {!showResult && (
          <div className="w-full bg-cyan-100 h-1.5">
            <div
              className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-full transition-all duration-500"
              style={{ width: `${(current / quizQuestions.length) * 100}%` }}
            />
          </div>
        )}

        <div className="p-6">
          {!showResult ? (
            <>
              {/* Question */}
              <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-5 mb-5 text-center">
                <p className="text-3xl font-bold text-cyan-800">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {q.options.map((opt, idx) => {
                  let style =
                    "bg-white border-2 border-gray-200 text-gray-700 hover:border-cyan-400 hover:bg-cyan-50";
                  if (selected !== null) {
                    if (idx === q.answer)
                      style =
                        "bg-green-100 border-2 border-green-500 text-green-800";
                    else if (idx === selected && selected !== q.answer)
                      style = "bg-red-100 border-2 border-red-400 text-red-700";
                    else
                      style =
                        "bg-white border-2 border-gray-200 text-gray-400 opacity-60";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`rounded-xl p-3 font-bold text-sm transition-all flex items-center gap-2 ${style}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          selected !== null && idx === q.answer
                            ? "bg-green-500 text-white"
                            : selected !== null &&
                                idx === selected &&
                                selected !== q.answer
                              ? "bg-red-400 text-white"
                              : "bg-cyan-100 text-cyan-700"
                        }`}
                      >
                        {optionLabels[idx]}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={selected === null}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  selected !== null
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-700 text-white hover:shadow-lg"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {current + 1 === quizQuestions.length
                  ? "Lihat Hasil"
                  : "Soal Berikutnya"}
                <ChevronRight size={16} />
              </button>
            </>
          ) : (
            /* Result */
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Star size={44} className="text-white" fill="white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {correctCount >= 4
                  ? "Luar Biasa! 🎉"
                  : correctCount >= 3
                    ? "Bagus! 👍"
                    : "Terus Berlatih! 💪"}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Kamu menjawab dengan benar
              </p>
              <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-4 mb-6">
                <p className="text-5xl font-bold text-cyan-700 mb-1">
                  {correctCount}/{quizQuestions.length}
                </p>
                <p className="text-cyan-500 text-sm font-medium">
                  Jawaban benar
                </p>
              </div>
              {/* AI Feedback */}
              <div className="mt-6 mb-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-cyan-200 rounded-xl p-4">
                <p className="text-xs font-bold text-cyan-700 mb-2 uppercase tracking-wider">
                  🤖 Feedback Arsi
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {aiFeedback}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex-1 py-3 rounded-xl border-2 border-cyan-300 text-cyan-700 font-bold text-sm hover:bg-cyan-50 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> Ulangi
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Check size={16} /> Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface MateriItemProps {
  m: MateriData;
  isActive: boolean;
  isWatched: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: () => void;
  isMobile: boolean;
}

function MateriItem({
  m,
  isActive,
  isWatched,
  isExpanded,
  onToggle,
  onSelect,
  isMobile,
}: MateriItemProps) {
  return (
    <div
      className={`rounded-xl border-2 overflow-hidden transition-all ${
        isActive
          ? "border-cyan-400 bg-cyan-50 shadow-sm"
          : isWatched
            ? "border-green-200 bg-green-50"
            : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <button
        className={`w-full flex items-center gap-3 text-left ${isMobile ? "p-3" : "p-4"}`}
        onClick={onToggle}
      >
        <div
          className={`rounded-lg flex items-center justify-center flex-shrink-0 ${
            isMobile ? "w-8 h-8" : "w-10 h-10"
          } ${isWatched ? "bg-green-500" : isActive ? "bg-cyan-500" : "bg-gray-100"}`}
        >
          {isWatched ? (
            <CheckCircle size={isMobile ? 16 : 20} className="text-white" />
          ) : (
            <Play
              size={isMobile ? 13 : 16}
              className={isActive ? "text-white" : "text-gray-500"}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`font-bold leading-tight ${isMobile ? "text-xs" : "text-sm"} ${
              isActive
                ? "text-cyan-800"
                : isWatched
                  ? "text-green-800"
                  : "text-gray-700"
            }`}
          >
            {m.title}
          </p>
          <p
            className={`text-gray-400 mt-0.5 flex items-center gap-1 ${
              isMobile ? "text-[10px]" : "text-xs"
            }`}
          >
            <Clock size={isMobile ? 10 : 11} />
            {m.duration}
          </p>
        </div>

        {isExpanded ? (
          <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className={isMobile ? "px-3 pb-3" : "px-4 pb-4"}>
          <ul className="space-y-1.5 mb-3">
            {m.subtopics.map((s, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-xs text-gray-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
          <button
            onClick={onSelect}
            className={`w-full bg-gradient-to-r from-cyan-500 to-cyan-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-md transition-all ${
              isMobile ? "py-2 text-xs" : "py-2.5 text-sm"
            }`}
          >
            <Play size={isMobile ? 13 : 14} />
            Tonton Video
          </button>
        </div>
      )}
    </div>
  );
}

function BadgeCta({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      className={`mt-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl flex items-center gap-3 ${
        isMobile ? "p-3" : "p-4"
      }`}
    >
      <div
        className={`bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isMobile ? "w-10 h-10" : "w-12 h-12"
        }`}
      >
        <Award size={isMobile ? 20 : 24} className="text-white" />
      </div>
      <div>
        <p
          className={`font-bold text-gray-800 ${isMobile ? "text-xs" : "text-sm"}`}
        >
          Lanjutkan belajar!
        </p>
        <p
          className={`text-gray-500 mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"}`}
        >
          Selesaikan semua untuk dapat lencana
        </p>
      </div>
    </div>
  );
}

interface LayoutProps {
  onBack: () => void;
}

function MobileDetailMateri({ onBack }: LayoutProps) {
  const [activeMateri, setActiveMateri] = useState<MateriData>(materiList[0]);
  const [expanded, setExpanded] = useState<number | null>(1);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const [watchedIds, setWatchedIds] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const completedCount = watchedIds.length;
  const progress = (completedCount / materiList.length) * 100;

  const handleVideoEnd = (): void => {
    setVideoEnded(true);
    setWatchedIds((prev) =>
      prev.includes(activeMateri.id) ? prev : [...prev, activeMateri.id],
    );
  };

  const handleSelectMateri = (m: MateriData): void => {
    setActiveMateri(m);
    setExpanded(m.id);
    setVideoEnded(false);
    if (videoRef.current) videoRef.current.load();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={bgStyle}>
      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        materiTitle={activeMateri.title}
      />

      {/* Top bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-cyan-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-cyan-50 transition-all text-cyan-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-gray-800 text-sm leading-tight">
              Matematika — Operasi Perkalian
            </h1>
            <p className="text-gray-400 text-xs">Kelas 5</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1">
          <Clock size={13} className="text-blue-500" />
          <span className="text-blue-600 font-bold text-xs">5:03</span>
        </div>
      </div>

      {/* Video Player */}
      <div className="bg-black aspect-video w-full relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          onEnded={handleVideoEnd}
          key={activeMateri.id}
        >
          <source src={activeMateri.videoUrl} type="video/mp4" />
          Browser Anda tidak mendukung video.
        </video>

        {videoEnded && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center px-4">
              <CheckCircle size={48} className="text-green-400 mx-auto mb-3" />
              <p className="text-white font-bold text-lg mb-1">
                Video Selesai! 🎉
              </p>
              <p className="text-gray-300 text-xs mb-4">Yuk uji pemahamanmu!</p>
              <button
                onClick={() => setShowQuiz(true)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
              >
                <FileText size={16} />
                Mulai Kuis
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Title card */}
      <div className="mx-4 mt-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-cyan-200 shadow-sm">
        <h2 className="font-bold text-gray-800 text-base">
          {activeMateri.title}
        </h2>
        <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
          <Video size={12} className="text-cyan-500" />
          Video Pembelajaran&nbsp;•&nbsp;
          <Clock size={12} />
          {activeMateri.duration}
        </p>
        <ul className="mt-3 space-y-1.5">
          {activeMateri.subtopics.map((s, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-xs text-gray-600"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Quiz Button — visible ONLY after video ends */}
      {videoEnded && (
        <div className="mx-4 mt-3">
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <FileText size={16} />
            Kerjakan Kuis Sekarang
          </button>
        </div>
      )}

      {/* Daftar Materi */}
      <div className="mx-4 mt-4 mb-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-cyan-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800 text-sm">Daftar Materi</h3>
            <span className="text-xs text-gray-500">
              {completedCount}/{materiList.length} selesai
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="space-y-2">
            {materiList.map((m) => (
              <MateriItem
                key={m.id}
                m={m}
                isActive={activeMateri.id === m.id}
                isWatched={watchedIds.includes(m.id)}
                isExpanded={expanded === m.id}
                onToggle={() => {
                  setExpanded(expanded === m.id ? null : m.id);
                  handleSelectMateri(m);
                }}
                onSelect={() => handleSelectMateri(m)}
                isMobile={true}
              />
            ))}
          </div>

          <BadgeCta isMobile={true} />
        </div>
      </div>
    </div>
  );
}

function DesktopDetailMateri({ onBack }: LayoutProps) {
  const [activeMateri, setActiveMateri] = useState<MateriData>(materiList[0]);
  const [expanded, setExpanded] = useState<number | null>(1);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const [watchedIds, setWatchedIds] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const completedCount = watchedIds.length;
  const progress = (completedCount / materiList.length) * 100;

  const handleVideoEnd = (): void => {
    setVideoEnded(true);
    setWatchedIds((prev) =>
      prev.includes(activeMateri.id) ? prev : [...prev, activeMateri.id],
    );
  };

  const handleSelectMateri = (m: MateriData): void => {
    setActiveMateri(m);
    setExpanded(m.id);
    setVideoEnded(false);
    if (videoRef.current) videoRef.current.load();
  };

  return (
    <div className="min-h-screen" style={bgStyle}>
      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        materiTitle={activeMateri.title}
      />

      {/* Top Bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-cyan-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-cyan-50 transition-all text-cyan-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-tight">
              Matematika — Operasi Perkalian
            </h1>
            <p className="text-gray-400 text-sm">
              Kelas 5 SD • Kurikulum Merdeka
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2">
          <Clock size={16} className="text-blue-500" />
          <span className="text-blue-600 font-bold text-sm">5:03</span>
        </div>
      </div>

      {/* Split Panel */}
      <div className="flex" style={{ height: "calc(100vh - 73px)" }}>
        {/* ── LEFT: Video + Info ── */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Video */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl aspect-video mb-6">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              onEnded={handleVideoEnd}
              key={activeMateri.id}
            >
              <source src={activeMateri.videoUrl} type="video/mp4" />
              Browser Anda tidak mendukung video.
            </video>

            {videoEnded && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center">
                  <CheckCircle
                    size={64}
                    className="text-green-400 mx-auto mb-4"
                  />
                  <p className="text-white font-bold text-2xl mb-2">
                    Video Selesai! 🎉
                  </p>
                  <p className="text-gray-300 text-sm mb-6">
                    Kamu berhasil menonton video ini. Yuk, uji pemahamanmu!
                  </p>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white rounded-xl font-bold text-base hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
                  >
                    <FileText size={20} />
                    Mulai Kuis Sekarang
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Video Info Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-cyan-200 shadow-sm mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {activeMateri.title}
                </h2>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <Video size={14} className="text-cyan-500" />
                  Video Pembelajaran
                  <span className="mx-1 text-gray-300">•</span>
                  <Clock size={14} className="text-gray-400" />
                  {activeMateri.duration} menit
                </p>
              </div>

              {/* Quiz button — ONLY after video ends */}
              {videoEnded && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <FileText size={16} />
                  Kerjakan Kuis
                </button>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-bold text-gray-600 mb-3">
                Yang akan dipelajari:
              </p>
              <ul className="space-y-2">
                {activeMateri.subtopics.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quiz CTA Banner — ONLY after video ends */}
          {videoEnded && (
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-2xl p-6 flex items-center justify-between shadow-lg">
              <div>
                <p className="text-white font-bold text-lg mb-1">
                  Siap untuk kuis? 🎯
                </p>
                <p className="text-cyan-200 text-sm">
                  Uji pemahamanmu tentang {activeMateri.title}
                </p>
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="px-6 py-3 bg-white text-cyan-700 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2 flex-shrink-0"
              >
                <FileText size={16} />
                Mulai Kuis
              </button>
            </div>
          )}
        </div>

        {/* ── RIGHT: Daftar Materi Sidebar ── */}
        <div className="w-96 border-l border-cyan-200 bg-white/95 backdrop-blur-sm overflow-y-auto flex-shrink-0">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-1">
              Daftar Materi
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              {materiList.length} video pembelajaran&nbsp;•&nbsp;
              {completedCount} dari {materiList.length} selesai
            </p>

            <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
              <div
                className="bg-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-3">
              {materiList.map((m) => (
                <MateriItem
                  key={m.id}
                  m={m}
                  isActive={activeMateri.id === m.id}
                  isWatched={watchedIds.includes(m.id)}
                  isExpanded={expanded === m.id}
                  onToggle={() => {
                    setExpanded(
                      expanded === m.id && activeMateri.id === m.id
                        ? null
                        : m.id,
                    );
                    handleSelectMateri(m);
                  }}
                  onSelect={() => handleSelectMateri(m)}
                  isMobile={false}
                />
              ))}
            </div>

            <BadgeCta isMobile={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DetailMateriPage(): React.JSX.Element {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const check = (): void => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleBack = async (): Promise<void> => {
    await navigate(-1);
  };

  return isMobile ? (
    <MobileDetailMateri onBack={handleBack} />
  ) : (
    <DesktopDetailMateri onBack={handleBack} />
  );
}