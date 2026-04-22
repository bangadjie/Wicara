export default function IndexFeatures() {
  return (
    <section className="relative overflow-hidden">

      {/* MOBILE VIEW */}
      <div className="lg:hidden py-20 px-6 space-y-16">

        {/* Header */}
        <div className="space-y-6 text-center">
          <h2 className="text-sm font-bold tracking-widest text-cyan-600 uppercase">
            Tentang Platform
          </h2>

          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Belajar Pakai Caramu,
            <br />
            <span className="text-cyan-500">
              Wicara Siap Temenin Kamu
            </span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed italic">
            Wicara adalah platform pembelajaran digital inklusif yang dirancang
            khusus untuk mendukung siswa tunarungu melalui pendekatan visual,
            bahasa isyarat, dan teknologi AI.
          </p>
        </div>

        {/* Image */}
        <div className="relative flex justify-center">
          <img
            src="favicon.ico"
            alt="Wicara Platform"
            className="w-full max-w-sm rounded-3xl shadow-lg bg-white"
          />
        </div>

        {/* Feature List */}
        <div className="space-y-6">
          {[
            {
              id: 1,
              title: "Pembelajaran Visual Interaktif",
              desc: "Materi disajikan dengan visual, teks, dan bahasa isyarat agar mudah dipahami.",
            },
            {
              id: 2,
              title: "Akses Gratis untuk Sahabat Tunarungu",
              desc: "Materi belajar visual dan bahasa isyarat bisa diakses tanpa biaya.",
            },
            {
              id: 3,
              title: "Pendampingan Belajar Berbasis AI",
              desc: "AI membantu siswa untuk mendeteksi tingkat pemahaman mereka dan memberi feedback secara real-time.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>

              <span className="absolute top-4 right-4 text-5xl font-black text-gray-100">
                {item.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden lg:block py-32">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 max-w-360">

          {/* Header Section */}
          <div className="flex items-end justify-between gap-10 mb-32">
            <div className="w-2/3">
              <h2 className="text-sm font-bold tracking-widest text-cyan-600 uppercase mb-4">
                Tentang Platform
              </h2>
              <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                Belajar Pakai Caramu,
                <br />
                <span className="text-cyan-500">
                  Wicara Siap Temenin Kamu
                </span>
              </h1>
            </div>

            <div className="w-1/3 pb-2">
              <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-cyan-200 pl-6">
                Wicara adalah platform pembelajaran digital inklusif yang
                dirancang khusus untuk mendukung siswa tunarungu melalui
                pendekatan visual, bahasa isyarat, dan teknologi AI.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-24 items-center">

            {/* Image Side */}
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-200 rounded-3xl rotate-3 scale-[1.02]" />
              <div className="absolute inset-0 bg-teal-100 rounded-3xl -rotate-2 scale-[1.02]" />

              <img
                src="favicon.ico"
                alt="Wicara Platform"
                className="relative w-full h-125 object-cover rounded-3xl shadow-xl bg-white transition-transform duration-500 group-hover:-translate-y-2"
              />

              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-100 rounded-full blur-2xl opacity-60" />
            </div>

            {/* Text Side */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Mengapa harus pilih{" "}
                  <span className="text-cyan-500">Wicara</span>?
                </h2>
                <p className="text-lg text-gray-600">
                  Solusi lengkap untuk mendukung sahabat tunarungu dalam belajar.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    title: "Pembelajaran Visual Interaktif",
                    desc: "Materi disajikan dengan visual, teks, dan bahasa isyarat agar mudah dipahami.",
                  },
                  {
                    id: 2,
                    title: "Akses Gratis untuk Sahabat Tunarungu",
                    desc: "Materi belajar visual dan bahasa isyarat bisa diakses tanpa biaya.",
                  },
                  {
                    id: 3,
                    title: "Pendampingan Belajar Berbasis AI",
                    desc: "AI membantu siswa untuk mendeteksi tingkat pemahaman mereka dan memberi feedback secara real-time.",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="relative flex items-start gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-cyan-200 hover:shadow-xl transition"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <span className="absolute top-4 right-6 text-6xl font-black text-gray-50 opacity-40">
                      {item.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}