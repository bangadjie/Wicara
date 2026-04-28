import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ChevronRight, Zap, Hand, Languages, Star, Trophy, Clock } from "lucide-react";

const bgStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  backgroundImage: 'url("/latar-belakang.svg")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  minHeight: "100vh",
};

export default function ArenaPintarPage() {
  const navigate = useNavigate();

  const features = [
    {
      id: "gesture",
      name: "GestureMatch",
      subtitle: "Praktik Gerakan Isyarat",
      description: "Praktikkan gerakan bahasa isyarat SIBI dan validasi langsung menggunakan kamera AI. Tersedia 4 level dari Pemula hingga Mahir.",
      emoji: "🤚",
      color: "from-cyan-400 to-teal-500",
      bgLight: "bg-cyan-50",
      borderColor: "border-cyan-200",
      accentColor: "text-cyan-600",
      badgeColor: "bg-cyan-100 text-cyan-700",
      stats: [
        { icon: <Star size={14} />, label: "4 Level" },
        { icon: <Zap size={14} />, label: "AI Validasi" },
        { icon: <Trophy size={14} />, label: "Sistem Poin" },
      ],
      tags: ["Kamera", "Gamifikasi", "Level"],
      path: "/gesture-match",
    },
    {
      id: "translate",
      name: "Sign Language Translate",
      subtitle: "Teks ke Bahasa Isyarat",
      description: "Terjemahkan teks biasa menjadi animasi gerakan isyarat SIBI secara instan. Cocok untuk guru menyampaikan informasi ke siswa tunarungu.",
      emoji: "🤟",
      color: "from-purple-400 to-violet-500",
      bgLight: "bg-purple-50",
      borderColor: "border-purple-200",
      accentColor: "text-purple-600",
      badgeColor: "bg-purple-100 text-purple-700",
      stats: [
        { icon: <Languages size={14} />, label: "SIBI Standar" },
        { icon: <Zap size={14} />, label: "Instan" },
        { icon: <Clock size={14} />, label: "Real-time" },
      ],
      tags: ["Guru", "Komunikasi", "Terjemahan"],
      path: "/sign-language-translate",
    },
  ];

  return (
    <div style={bgStyle}>
      <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24 md:pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-xl border border-cyan-200 hover:bg-cyan-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} className="text-cyan-600" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              🎮 Arena Pintar
            </h1>
            <p className="text-xs text-gray-500">Pilih fitur interaktif untuk belajar isyarat</p>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl p-6 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-6 -translate-x-4" />
          <div className="relative">
            <p className="text-cyan-100 text-xs font-bold uppercase tracking-widest mb-1">Platform Inklusif Wicara</p>
            <h2 className="text-white text-2xl font-bold mb-2">Belajar Isyarat<br />Lebih Seru! 🌟</h2>
            <p className="text-cyan-100 text-sm leading-relaxed max-w-xs">
              Dua fitur interaktif untuk membantu siswa tunarungu belajar dan berkomunikasi lebih efektif.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-5">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => navigate(feature.path)}
              className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all cursor-pointer group overflow-hidden"
            >
              {/* Top accent */}
              <div className={`h-1.5 bg-gradient-to-r ${feature.color}`} />

              <div className="p-6">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-4xl shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {feature.emoji}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">{feature.name}</h3>
                        <p className={`text-xs font-bold ${feature.accentColor} mb-2`}>{feature.subtitle}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-50 group-hover:border-cyan-200 transition-all">
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-cyan-500 transition-colors" />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{feature.description}</p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 mb-3">
                      {feature.stats.map((stat, i) => (
                        <div key={i} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${feature.bgLight} border ${feature.borderColor}`}>
                          <span className={feature.accentColor}>{stat.icon}</span>
                          <span className={`text-xs font-bold ${feature.accentColor}`}>{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {feature.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            💡 Kedua fitur menggunakan teknologi AI untuk pengalaman belajar yang optimal
          </p>
        </div>
      </div>
    </div>
  );
}