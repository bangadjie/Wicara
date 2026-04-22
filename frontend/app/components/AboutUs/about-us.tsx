import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const sponsors = [
  { id: 1, name: "KemenPPPA", logo: "/logitech.svg" },
  { id: 2, name: "BPS", logo: "/otsukah.svg" },
  { id: 3, name: "UNICEF", logo: "/logitech.svg" },
  { id: 4, name: "Kemenkes", logo: "/otsukah.svg" },
];

export default function AboutUs() {
  const [index, setIndex] = useState(0);
  const items = [...sponsors, ...sponsors];
  const partnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const safeIndex = index % sponsors.length;

  useEffect(() => {
    const container = partnerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 200, behavior: "smooth" });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/latar-belakang.svg')" }}
    >
      {/* MOBILE VIEW */}
      <div className="lg:hidden px-6 pt-32 pb-20 space-y-20 relative z-10">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-bold">
            Tentang <span className="text-cyan-500">Wicara</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Solusi cerdas berbasis AI untuk mendampingi sahabat tunarungu dalam
            memaksimalkan pembelajaran mereka.
          </p>
        </motion.div>

        {/* Visi */}
        <div className="space-y-6">
          <motion.img
            src="/Tangan.png"
            alt="Visi Wicara"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full rounded-3xl shadow-xl bg-white"
          />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            Visi <span className="text-cyan-500">Wicara</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed"
          >
            Menjadi platform pembelajaran digital inklusif terdepan di Indonesia
            yang menghadirkan pengalaman belajar adil, menyenangkan, dan mudah
            diakses bagi penyandang tunarungu.
          </motion.p>
        </div>

        {/* Misi */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center"
          >
            Misi <span className="text-cyan-500">Wicara</span>
          </motion.h2>

          {[
            "Menyediakan platform pembelajaran digital yang ramah tunarungu melalui pendekatan visual, teks terjemahan, dan dukungan bahasa isyarat yang mudah dipahami.",
            "Menghadirkan pengalaman belajar yang menyenangkan dan interaktif agar siswa tunarungu dapat belajar dengan nyaman, percaya diri, dan penuh semangat.",
            "Memanfaatkan teknologi AI untuk menghadirkan pembelajaran yang adaptif, personal, dan sesuai dengan kebutuhan unik setiap siswa tunarungu.",
            "Memperluas akses pendidikan yang setara dengan memanfaatkan teknologi digital sehingga materi pembelajaran dapat diakses kapan saja dan di mana saja.",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md"
            >
              <h4 className="font-bold text-lg mb-2">Misi {i + 1}</h4>
              <p className="text-gray-600 leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>

        {/* Media Partner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold">Media Partner</h2>

          <div
            ref={partnerRef}
            className="flex gap-8 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          >
            {[...sponsors, ...sponsors].map((s, i) => (
              <img
                key={i}
                src={s.logo}
                alt={s.name}
                className="h-14 object-contain shrink-0 opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:block relative z-10">
        <div className="relative max-w-360 mx-auto px-8 md:px-16 lg:px-24 xl:px-32 z-10 pb-24">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pt-48 pb-20 text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
              <span className="text-gray-900">Tentang</span>
              <span className="text-cyan-500">Wicara</span>
            </h1>
            <p className="text-gray-600 text-lg lg:text-2xl leading-relaxed font-light">
              Solusi cerdas berbasis AI untuk mendampingi sahabat tunarungu
              dalam memaksimalkan pembelajaran mereka.
            </p>
          </motion.div>

          {/* Visi Section */}
          <div className="py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group order-2 lg:order-1"
              >
                <div className="absolute inset-0 bg-cyan-200 rounded-[2.5rem] transform -rotate-3 transition-transform duration-500 group-hover:rotate-2 group-hover:scale-[1.02]" />
                <img
                  src="/Tangan.png"
                  alt="Visi Wicara"
                  className="relative w-full h-100 object-cover rounded-[2.5rem] shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01] bg-white"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Visi <span className="text-cyan-500">Wicara</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed text-justify lg:text-left">
                  Menjadi platform pembelajaran digital inklusif terdepan di
                  Indonesia yang menghadirkan pengalaman belajar yang adil,
                  menyenangkan, dan mudah diakses bagi penyandang tunarungu,
                  guna mendukung terwujudnya pendidikan berkualitas untuk semua.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Misi Section */}
          <div className="py-12 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                  Misi <span className="text-cyan-500">Wicara</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  "Menyediakan platform pembelajaran digital yang ramah tunarungu melalui pendekatan visual, teks terjemahan, dan dukungan bahasa isyarat yang mudah dipahami.",
                  "Menghadirkan pengalaman belajar yang menyenangkan dan interaktif agar siswa tunarungu dapat belajar dengan nyaman, percaya diri, dan penuh semangat.",
                  "Memanfaatkan teknologi AI untuk menghadirkan pembelajaran yang adaptif, personal, dan sesuai dengan kebutuhan unik setiap siswa tunarungu.",
                  "Memperluas akses pendidikan yang setara dengan memanfaatkan teknologi digital sehingga materi pembelajaran dapat diakses kapan saja dan di mana saja.",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-cyan-200 transition-all duration-300 group h-full"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-cyan-100 to-teal-50 text-cyan-600 flex items-center justify-center font-bold text-xl group-hover:from-cyan-500 group-hover:to-teal-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold mb-2 text-lg group-hover:text-cyan-600 transition-colors">
                        Misi {index + 1}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-base">
                        {item}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Partner Section */}
          <section className="text-left py-12 border-t border-gray-100/50 mt-12 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
              >
                <h2>Media Partner</h2>
              </motion.div>

              <div className="mt-3 sm:mt-4 mb-10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-1 bg-cyan-500"
                />
              </div>

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out items-center"
                  style={{
                    transform: `translateX(-${safeIndex * (100 / sponsors.length)}%)`,
                  }}
                >
                  {items.map((sponsor, i) => (
                    <div
                      key={i}
                      className="shrink-0 w-1/4 flex justify-center px-4 sm:px-8"
                    >
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="h-12 sm:h-16 md:h-20 w-auto object-contain hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}