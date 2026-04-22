import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Siapa saja yang dapat menggunakan Wicara?",
    a: "Wicara ditujukan untuk siswa tunarungu dengan pendampingan orang tua dan guru agar proses belajar berjalan lebih optimal.",
  },
  {
    q: "Apa keunggulan Wicara dibandingkan platform belajar lainnya?",
    a: "Wicara menghadirkan video pembelajaran dengan bahasa isyarat, teks penjelasan, materi visual interaktif, serta navigasi yang ramah bagi siswa tunarungu.",
  },
  {
    q: "Bagaimana peran AI dalam proses pembelajaran di Wicara?",
    a: "AI pada Wicara membantu mengidentifikasi apakah siswa memahami materi melalui pola interaksi, progres belajar, dan hasil latihan, sehingga orang tua dan guru dapat memperoleh gambaran awal perkembangan belajar siswa.",
  },
  {
    q: "Bagaimana Wicara berkontribusi terhadap pendidikan inklusif?",
    a: "Wicara mendukung tercapainya SDGs tujuan ke-4 dengan membuka akses pendidikan yang lebih adil, setara, dan ramah bagi siswa tunarungu melalui pemanfaatan teknologi digital dan kecerdasan buatan.",
  },
];

export default function SupportFAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden">

      {/* MOBILE VIEW */}
      <div className="lg:hidden pt-32 pb-20 px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Frequently Asked{" "}
            <span className="text-cyan-500">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Pertanyaan yang sering ditanyakan pengguna.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = active === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className={`rounded-2xl border bg-white overflow-hidden
                  ${isOpen ? "border-cyan-400" : "border-gray-100"}
                `}
              >
                {/* Header */}
                <button
                  onClick={() => setActive(isOpen ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span
                    className={`font-semibold text-base transition-colors
                      ${isOpen ? "text-cyan-600" : "text-gray-800"}
                    `}
                  >
                    {faq.q}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${isOpen ? "bg-cyan-100 text-cyan-600" : "bg-gray-50 text-gray-400"}
                    `}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                {/* Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed text-base border-t border-dashed border-gray-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <section className="pt-48 pb-20 relative overflow-hidden">
          <div className="relative max-w-360 mx-auto px-8 md:px-16 lg:px-24 xl:px-32 z-10">

            {/* TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked{" "}
                <span className="text-cyan-500">Questions</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Jawaban untuk pertanyaan yang paling sering diajukan oleh pengguna kami.
              </p>
            </motion.div>

            {/* FAQ LIST */}
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, i) => {
                const isOpen = active === i;

                return (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`rounded-3xl border bg-white shadow-sm overflow-hidden transition-all duration-300
                      ${isOpen
                        ? "border-cyan-400"
                        : "border-gray-100 shadow-sm hover:border-cyan-200"}
                    `}
                  >
                    {/* HEADER */}
                    <button
                      onClick={() => setActive(isOpen ? null : i)}
                      className="w-full flex justify-between items-center px-8 py-6 text-left"
                    >
                      <span
                        className={`font-bold text-lg md:text-xl transition-colors duration-300
                          ${isOpen ? "text-cyan-600" : "text-gray-800"}
                        `}
                      >
                        {faq.q}
                      </span>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ml-4 transition-all duration-300
                          ${isOpen
                            ? "bg-cyan-100 text-cyan-600"
                            : "bg-gray-50 text-gray-400"}
                        `}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>

                    {/* CONTENT */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-8 pb-8 pt-0 text-gray-600 leading-relaxed text-lg border-t border-dashed border-gray-100 mt-2">
                            <br />
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}