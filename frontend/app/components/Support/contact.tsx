import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone } from "lucide-react";

export default function SupportContact() {
  return (
    <section className="py-24 relative overflow-hidden">

      {/* Container */}
      <div className="relative max-w-360 mx-auto px-8 md:px-16 lg:px-24 xl:px-32 z-10">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Hubungi <span className="text-cyan-500">Wicara</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda kapan saja.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: MessageCircle, title: "WhatsApp", value: "+62 813-3050-6652", desc: "Chat untuk respon cepat" },
                { icon: Mail, title: "Email", value: "wicara@gmail.com", desc: "Untuk pertanyaan lebih detail" },
                { icon: Phone, title: "Telepon", value: "(021) 1234-5678", desc: "09.00 – 17.00 WIB" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start shadow-sm gap-6 p-6 rounded-4xl bg-white border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-teal-50 text-cyan-500 flex items-center justify-center transition-colors group-hover:bg-cyan-500 group-hover:text-white">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-cyan-600 font-semibold text-lg">{item.value}</p>
                    <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decor blob inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <h3 className="text-2xl font-bold mb-8 text-gray-900 relative z-10">Kirim Pesan</h3>

            <form className="space-y-6 relative z-10">
              <div>
                <label className="block text-gray-700 font-medium mb-2 pl-2">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 pl-2">Email</label>
                <input
                  type="email"
                  placeholder="nama@email.com"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 pl-2">Pesan</label>
                <textarea
                  placeholder="Tuliskan pesan Anda..."
                  rows={4}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-cyan-400 to-teal-500 text-white font-bold rounded-2xl  hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Kirim Pesan
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}