import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Type,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Hand,
  Sparkles,
  Copy,
  Check,
  Info,
} from "lucide-react";

interface SignCard {
  word: string;
  emoji: string;
  description: string;
  handShape: string;
  movement: string;
}

const signDictionary: Record<string, SignCard> = {
  halo: { word: "HALO", emoji: "👋", description: "Salam pembuka", handShape: "Tangan terbuka, telapak menghadap luar", movement: "Kibas tangan ke kiri-kanan" },
  selamat: { word: "SELAMAT", emoji: "🙌", description: "Ucapan selamat", handShape: "Kedua tangan terbuka", movement: "Tepuk tangan satu kali" },
  pagi: { word: "PAGI", emoji: "🌅", description: "Waktu pagi", handShape: "Tangan kanan mengepal", movement: "Angkat tangan dari bawah ke atas" },
  siang: { word: "SIANG", emoji: "☀️", description: "Waktu siang", handShape: "Tangan menunjuk ke atas", movement: "Tahan di atas kepala" },
  sore: { word: "SORE", emoji: "🌆", description: "Waktu sore", handShape: "Tangan terbuka", movement: "Turunkan tangan perlahan" },
  malam: { word: "MALAM", emoji: "🌙", description: "Waktu malam", handShape: "Kedua tangan melengkung", movement: "Satukan di atas kepala membentuk bulan" },
  terima: { word: "TERIMA", emoji: "🤲", description: "Menerima sesuatu", handShape: "Kedua telapak tangan menghadap atas", movement: "Tarik ke arah tubuh" },
  kasih: { word: "KASIH", emoji: "❤️", description: "Rasa sayang", handShape: "Tangan silang di dada", movement: "Tekan lembut ke dada" },
  tolong: { word: "TOLONG", emoji: "🙏", description: "Minta bantuan", handShape: "Kedua tangan menengadah", movement: "Angkat ke atas dengan sedikit goyangan" },
  maaf: { word: "MAAF", emoji: "😊", description: "Meminta maaf", handShape: "Tangan kanan mengepal", movement: "Gosokkan ke dada melingkar" },
  ya: { word: "YA", emoji: "👍", description: "Persetujuan", handShape: "Tangan mengepal, jempol ke atas", movement: "Angguk tangan sekali" },
  tidak: { word: "TIDAK", emoji: "👎", description: "Penolakan", handShape: "Jari telunjuk menunjuk", movement: "Kibas ke kiri kanan" },
  makan: { word: "MAKAN", emoji: "🍽️", description: "Aktivitas makan", handShape: "Jari-jari berkumpul membentuk mulut", movement: "Gerakan berulang ke mulut" },
  minum: { word: "MINUM", emoji: "🥤", description: "Aktivitas minum", handShape: "Tangan seperti memegang gelas", movement: "Gerakan minum ke mulut" },
  pergi: { word: "PERGI", emoji: "🚶", description: "Berpindah tempat", handShape: "Jari telunjuk menunjuk ke depan", movement: "Geser ke arah depan" },
  datang: { word: "DATANG", emoji: "👈", description: "Tiba di tempat", handShape: "Jari telunjuk menunjuk ke badan", movement: "Tarik ke arah tubuh" },
  duduk: { word: "DUDUK", emoji: "🪑", description: "Posisi duduk", handShape: "Dua jari menekuk di atas jari lainnya", movement: "Turunkan ke bawah" },
  berdiri: { word: "BERDIRI", emoji: "🧍", description: "Posisi berdiri", handShape: "Dua jari berdiri di telapak tangan", movement: "Tegakkan ke atas" },
  saya: { word: "SAYA", emoji: "👆", description: "Merujuk diri sendiri", handShape: "Jari telunjuk menunjuk", movement: "Arahkan ke dada sendiri" },
  kamu: { word: "KAMU", emoji: "👉", description: "Merujuk orang lain", handShape: "Jari telunjuk menunjuk", movement: "Arahkan ke lawan bicara" },
  guru: { word: "GURU", emoji: "👩‍🏫", description: "Pendidik/pengajar", handShape: "Kedua tangan terbuka di sisi kepala", movement: "Gerakkan keluar dari kepala" },
  sekolah: { word: "SEKOLAH", emoji: "🏫", description: "Tempat belajar", handShape: "Tepuk tangan", movement: "Tepuk dua kali" },
  belajar: { word: "BELAJAR", emoji: "📚", description: "Proses belajar", handShape: "Tangan terbuka di depan wajah", movement: "Dekatkan ke kepala" },
  membaca: { word: "MEMBACA", emoji: "📖", description: "Aktivitas membaca", handShape: "Dua jari menunjuk", movement: "Gerakkan melintasi telapak tangan lain" },
  menulis: { word: "MENULIS", emoji: "✍️", description: "Aktivitas menulis", handShape: "Jari-jari seperti memegang pena", movement: "Gerakan menulis di udara" },
};

function SignAnimationFrame({ card, isPlaying }: { card: SignCard; isPlaying: boolean }) {
  const [frame, setFrame] = useState(0);
  const frames = ["🤚", "✋", "🖐️", "👋", card.emoji];

  useEffect(() => {
    if (!isPlaying) { setFrame(0); return; }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setFrame(i % frames.length);
      if (i >= frames.length * 2) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying, card]);

  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
      <div className={`w-full h-full rounded-3xl bg-gradient-to-br from-cyan-100 to-teal-100 border-2 ${isPlaying ? "border-cyan-400" : "border-cyan-200"} flex items-center justify-center transition-all`}>
        <span className="text-7xl" style={{ transition: "transform 0.2s", transform: isPlaying ? "scale(1.1)" : "scale(1)" }}>
          {frames[frame]}
        </span>
      </div>
      {isPlaying && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const bgStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  backgroundImage: 'url("/latar-belakang.svg")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  minHeight: "100vh",
};

export default function SignLanguageTranslatePage() {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [inputText, setInputText] = useState("");
  const [translatedWords, setTranslatedWords] = useState<SignCard[]>([]);
  const [unknownWords, setUnknownWords] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const activeCard = translatedWords[activeIdx] ?? null;
  useEffect(() => {
    if (!isPlaying) return;
    if (activeIdx >= translatedWords.length - 1) {
      setTimeout(() => setIsPlaying(false), 1200);
      return;
    }
    const timer = setTimeout(() => setActiveIdx((i) => i + 1), 2000);
    return () => clearTimeout(timer);
  }, [isPlaying, activeIdx, translatedWords.length]);

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setIsPlaying(false);
    setActiveIdx(0);

    setTimeout(() => {
      const words = inputText
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

      const found: SignCard[] = [];
      const notFound: string[] = [];

      words.forEach((w) => {
        if (signDictionary[w]) {
          found.push(signDictionary[w]);
        } else {
          notFound.push(w.toUpperCase());
        }
      });

      setTranslatedWords(found);
      setUnknownWords(notFound);
      setIsTranslated(true);
      setIsLoading(false);
    }, 800);
  };

  const handlePlayAll = () => {
    setActiveIdx(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setInputText("");
    setTranslatedWords([]);
    setUnknownWords([]);
    setIsTranslated(false);
    setIsPlaying(false);
    setActiveIdx(0);
    textareaRef.current?.focus();
  };

  const handleCopy = () => {
    const text = translatedWords.map((c) => c.word).join(" ");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const quickPhrases = [
    "Selamat pagi guru",
    "Saya mau makan",
    "Tolong bantu saya",
    "Terima kasih ya",
    "Ayo belajar bersama",
  ];

  return (
    <div style={bgStyle}>
      {/* Top Bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-cyan-200 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-cyan-50 transition-all text-cyan-600">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-gray-800 text-sm md:text-base">Sign Language Translate</h1>
            <p className="text-xs text-gray-400">Teks ke isyarat SIBI</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-3 py-1.5">
          <Sparkles size={14} className="text-purple-500" />
          <span className="text-purple-700 font-bold text-xs">AI Powered</span>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-5xl mx-auto pb-24 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── LEFT: Input ── */}
          <div className="space-y-4">
            {/* Input Card */}
            <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type size={16} className="text-cyan-600" />
                  <span className="font-bold text-gray-700 text-sm">Teks Input</span>
                </div>
                <span className="text-xs text-gray-400">{inputText.length}/200 karakter</span>
              </div>
              <div className="p-4">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value.slice(0, 200))}
                  placeholder="Ketik kalimat yang ingin diterjemahkan ke bahasa isyarat..."
                  className="w-full h-32 resize-none text-sm text-gray-700 placeholder-gray-400 outline-none leading-relaxed"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleTranslate();
                    }
                  }}
                />
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || isLoading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Menerjemahkan...
                    </>
                  ) : (
                    <>
                      <Hand size={18} />
                      Terjemahkan ke Isyarat
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Phrases */}
            <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm p-4">
              <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-yellow-500" />
                Frasa Cepat
              </h3>
              <div className="flex flex-wrap gap-2">
                {quickPhrases.map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => { setInputText(phrase); setIsTranslated(false); }}
                    className="text-xs px-3 py-1.5 bg-cyan-50 border border-cyan-200 text-cyan-700 rounded-full font-bold hover:bg-cyan-100 transition-all"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex gap-2">
                <Info size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-blue-700 mb-1">Tentang SIBI</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Sistem Isyarat Bahasa Indonesia (SIBI) adalah standar bahasa isyarat resmi di Indonesia untuk komunikasi dengan teman tuli.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Output ── */}
          <div className="space-y-4">
            {!isTranslated ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-cyan-200 p-8 flex flex-col items-center justify-center gap-3 min-h-64">
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center">
                  <Hand size={32} className="text-cyan-400" />
                </div>
                <p className="text-gray-400 font-bold text-sm text-center">Hasil terjemahan isyarat akan muncul di sini</p>
                <p className="text-gray-400 text-xs text-center">Ketik teks di sebelah kiri lalu tekan Terjemahkan</p>
              </div>
            ) : (
              <>
                {/* Active Sign Display */}
                {activeCard && (
                  <div className="bg-white rounded-2xl border-2 border-cyan-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-3 flex items-center justify-between">
                      <span className="text-white font-bold text-sm">
                        Isyarat: {activeIdx + 1}/{translatedWords.length}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCopy}
                          className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                        >
                          {copied ? <Check size={14} className="text-white" /> : <Copy size={14} className="text-white" />}
                        </button>
                        <button
                          onClick={handleReset}
                          className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                        >
                          <RotateCcw size={14} className="text-white" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <SignAnimationFrame card={activeCard} isPlaying={isPlaying} />

                      <div className="mt-5 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{activeCard.word}</h2>
                        <p className="text-sm text-gray-500 mb-4">{activeCard.description}</p>

                        <div className="grid grid-cols-2 gap-2 text-left text-xs">
                          <div className="bg-cyan-50 rounded-xl p-3">
                            <p className="font-bold text-cyan-700 mb-1">✋ Bentuk Tangan</p>
                            <p className="text-gray-600">{activeCard.handShape}</p>
                          </div>
                          <div className="bg-teal-50 rounded-xl p-3">
                            <p className="font-bold text-teal-700 mb-1">🔄 Gerakan</p>
                            <p className="text-gray-600">{activeCard.movement}</p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex items-center justify-between mt-5">
                        <button
                          onClick={() => { setActiveIdx((i) => Math.max(0, i - 1)); setIsPlaying(false); }}
                          disabled={activeIdx === 0}
                          className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
                        >
                          <ChevronLeft size={20} className="text-gray-600" />
                        </button>

                        <div className="flex gap-2">
                          <button
                            onClick={() => { setIsPlaying(!isPlaying); if (!isPlaying) setActiveIdx(0); }}
                            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold text-sm hover:shadow-md transition-all"
                          >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                            {isPlaying ? "Jeda" : "Putar Semua"}
                          </button>
                        </div>

                        <button
                          onClick={() => { setActiveIdx((i) => Math.min(translatedWords.length - 1, i + 1)); setIsPlaying(false); }}
                          disabled={activeIdx === translatedWords.length - 1}
                          className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
                        >
                          <ChevronRight size={20} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Word Chips */}
                <div className="bg-white rounded-2xl border border-cyan-200 shadow-sm p-4">
                  <h3 className="font-bold text-gray-700 text-xs mb-3 uppercase tracking-wider">Kata yang Diterjemahkan</h3>
                  <div className="flex flex-wrap gap-2">
                    {translatedWords.map((card, i) => (
                      <button
                        key={i}
                        onClick={() => { setActiveIdx(i); setIsPlaying(false); }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeIdx === i
                            ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md"
                            : "bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100"
                        }`}
                      >
                        {card.emoji} {card.word}
                      </button>
                    ))}
                    {unknownWords.map((w, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 border border-red-200 text-red-500 line-through">
                        {w}
                      </span>
                    ))}
                  </div>

                  {unknownWords.length > 0 && (
                    <p className="text-xs text-red-400 mt-2">
                      * {unknownWords.join(", ")} belum ada di kamus SIBI
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}