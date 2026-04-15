"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import { Menu, X, ChevronRight, Factory, Activity, Layers, Target, CheckCircle, ShieldAlert, AlertTriangle, Workflow } from "lucide-react";

const chapters = [
  { id: "hero", title: "Cover" },
  { id: "bab-1", title: "BAB I: Gambaran Perusahaan" },
  { id: "bab-2", title: "BAB II: Pendahuluan" },
  { id: "bab-3", title: "BAB III: Tinjauan Pustaka" },
  { id: "bab-4", title: "BAB IV: Metodologi Penelitian" },
];

export default function SeminarPresentation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Global Scroll for Parallax Background
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = chapters.map((c) => document.getElementById(c.id));
      const scrollPosition = window.scrollY + 150;

      const current = sections.find((section) => {
        if (!section) return false;
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        return scrollPosition >= top && scrollPosition < bottom;
      });

      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-zinc-700 selection:text-white pb-32 overflow-hidden">
      
      {/* Global Decorative Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none"
      >
        <img 
          src="/industrial_background_sample.jpg" 
          alt="Industrial Texture" 
          className="w-full h-[150vh] object-center object-cover grayscale"
        />
      </motion.div>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 z-50 p-4 justify-between items-center px-8 transition-all">
        <div className="flex items-center gap-3 font-bold text-white tracking-widest uppercase text-sm">
          <Factory size={20} className="text-zinc-400" />
          <span>IE.REPORT <span className="text-zinc-600">// KP-2026</span></span>
        </div>
        <ul className="flex gap-6 text-xs font-medium tracking-wide uppercase">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <button
                onClick={() => scrollToSection(chapter.id)}
                className={`transition-all duration-300 hover:text-white relative py-2 ${
                  activeSection === chapter.id ? "text-white" : "text-zinc-600"
                }`}
              >
                {chapter.title}
                {activeSection === chapter.id && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 z-50 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-white tracking-widest uppercase text-xs">
          <Factory size={16} />
          <span>Seminar 1 KP</span>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="text-zinc-300 hover:text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-zinc-950 border-l border-zinc-800 z-50 p-6 md:hidden flex flex-col overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-4">
                <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Navigasi BAB</span>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X size={24} className="text-zinc-400 hover:text-white transition-colors" />
                </button>
              </div>
              <ul className="flex flex-col gap-6 text-sm font-medium">
                {chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <button
                      onClick={() => scrollToSection(chapter.id)}
                      className={`flex items-center gap-3 w-full text-left transition-colors p-2 rounded-md ${
                        activeSection === chapter.id ? "bg-zinc-900 text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {activeSection === chapter.id ? <ChevronRight size={16} className="text-white" /> : <div className="w-4" />}
                      {chapter.title}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-24 md:pt-32 px-6 md:px-24 max-w-6xl mx-auto flex flex-col gap-40">
        
        {/* HERO / COVER */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center relative">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] bg-zinc-600"
              />
              <p className="text-zinc-400 uppercase tracking-[0.3em] text-xs font-bold">Laporan Penelitian Kerja Praktik</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-8">
              Implementasi Six Sigma Dalam Peningkatan Kualitas Produksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-600">Bracket</span>
              <span className="block text-2xl md:text-4xl mt-4 text-zinc-500 font-medium tracking-tight">di Lini Plating PT Mitra Metal Perkasa.</span>
            </h1>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-zinc-800 pt-8"
            >
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Disusun Oleh</p>
                <p className="text-white font-medium text-lg">Farhan Dwiki Ardhani</p>
                <p className="text-zinc-400 text-sm">NPM: 5230611118</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Program Studi</p>
                <p className="text-white font-medium text-lg">Teknik Industri</p>
                <p className="text-zinc-400 text-sm">Universitas Teknologi Yogyakarta</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* BAB I */}
        <section id="bab-1" className="scroll-mt-32 relative">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-12 border-b border-zinc-800 pb-6">BAB I: Gambaran Singkat Perusahaan</h2>
            
            <div className="space-y-16 text-zinc-400 leading-relaxed text-justify">
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold text-white mb-4">1.1 Profil dan Sejarah Singkat</h3>
                  <p>PT Mitra Metal Perkasa didirikan pada Juli 1997, bergerak di industri komponen otomotif (automotive parts) dan pengecoran logam (casting) di Kawasan Industri Mitrakarawang. Perusahaan ini memproduksi sistem pengereman, komponen stamping, dan aluminum casting. Sebagai pemasok OEM, perusahaan menyuplai merek ternama seperti Honda, Suzuki, Kawasaki, Mitsubishi, dan Hino, serta melakukan diversifikasi ke sektor cookware dan komponen kendaraan listrik (BLDC Motor).</p>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold text-white mb-4">1.2 Organisasi & Manajemen</h3>
                  <p>Struktur organisasi dibagi menjadi divisi produksi utama: Casting, Stamping, Machining, Lining Bonding, Plating, dan Painting. Operasional didukung oleh sistem manajemen mutu ISO 9001:2008 dan lingkungan ISO 14001:2004, berjalan dalam 3 shift kerja dengan durasi 7 jam per shift.</p>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-lg relative overflow-hidden">
                {/* Decorative Image Inside Card */}
                <img src="https://images.unsplash.com/photo-1504917595217-d4f3e533c5e0?q=80&w=1000&auto=format&fit=crop" alt="Factory layout" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-white mb-6">1.3 Proses Produksi & Pengendalian Mutu</h3>
                  <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 text-sm">
                    <motion.div variants={fadeInUp} className="bg-zinc-950 p-6 rounded border border-zinc-800 hover:border-zinc-500 transition-colors">
                      <Factory className="text-zinc-500 mb-4" size={24} />
                      <h4 className="text-white font-bold mb-2">Lini Plating</h4>
                      <p>Mengoperasikan mesin Automatic Zinc Barrel/Rack. Menghasilkan Trivalent Black, Coloured, dan Glossy dengan kapasitas total 1.150.000 unit/bulan.</p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="bg-zinc-950 p-6 rounded border border-zinc-800 hover:border-zinc-500 transition-colors">
                      <ShieldAlert className="text-zinc-500 mb-4" size={24} />
                      <h4 className="text-white font-bold mb-2">Pengendalian Mutu</h4>
                      <p>Sertifikasi ISO 9001:2008. Didukung fasilitas inspeksi presisi seperti Coordinate Measuring Machine (CMM), Spectrometer, dan Salt Spray Test.</p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="bg-zinc-950 p-6 rounded border border-zinc-800 hover:border-zinc-500 transition-colors">
                      <Activity className="text-zinc-500 mb-4" size={24} />
                      <h4 className="text-white font-bold mb-2">Divisi Lainnya</h4>
                      <p>Casting (Brake Shoe), Stamping (Bracket: 360k/bulan), Machining, Lining Bonding, dan Painting (630k/bulan).</p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-semibold text-white mb-4">1.4 Sanitasi dan Penanganan Limbah</h3>
                <p>Menerapkan kebijakan pencegahan pencemaran dengan sistem Wastewater Treatment Plant (WWTP) untuk limbah cair, dan manajemen limbah padat B3 & non-B3 melalui lokalisasi penampungan yang ketat.</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* BAB II */}
        <section id="bab-2" className="scroll-mt-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-12 border-b border-zinc-800 pb-6">BAB II: Pendahuluan</h2>
            
            <div className="space-y-16 text-zinc-400 leading-relaxed text-justify">
              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-semibold text-white mb-4">2.1 Latar Belakang</h3>
                <p className="mb-4">Pengendalian kualitas krusial untuk bersaing dan menjamin keamanan komponen otomotif. Lini Plating di PT Mitrametal Perkasa memproses 1.150.000 unit per bulan. Namun, tantangan operasional masih ditemukan, khususnya pada produk bracket.</p>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-zinc-900 border-l-4 border-white p-6 my-6 text-zinc-300 shadow-lg shadow-black/50"
                >
                  <p>Berdasarkan pengamatan di area final check, jenis cacat dominan adalah <strong>dent (penyok)</strong> dengan persentase cacat mencapai <strong>5,57%</strong>. Angka ini jauh dari target Six Sigma yaitu <strong>3,4 DPMO (0,00034%)</strong>, yang memicu tingginya <em>Cost of Poor Quality</em> (rework & scrap).</p>
                </motion.div>
                <p>Metode Six Sigma (DMAIC) hadir sebagai solusi perbaikan berkelanjutan untuk mengidentifikasi akar permasalahan secara akurat dan meningkatkan kinerja sistem produksi.</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2"><Target size={20} /> 2.2 Rumusan Masalah</h3>
                  <ul className="list-decimal pl-5 space-y-3">
                    <li>Berapa nilai Defects Per Million Opportunities (DPMO) dan level sigma pada produksi bracket di lini Plating?</li>
                    <li>Apa saja jenis cacat dominan yang terjadi dan faktor apa yang menjadi akar penyebabnya?</li>
                    <li>Bagaimana rekomendasi usulan perbaikan yang tepat untuk meminimalkan cacat?</li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2"><CheckCircle size={20} /> 2.3 Tujuan Penelitian</h3>
                  <ul className="list-decimal pl-5 space-y-3">
                    <li>Mengetahui nilai DPMO dan level sigma saat ini sebagai indikator kinerja kualitas.</li>
                    <li>Mengidentifikasi cacat dominan (Pareto) dan menganalisis akar penyebab (Fishbone).</li>
                    <li>Menyusun rekomendasi perbaikan terstruktur dengan metode 5W+1H.</li>
                  </ul>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2"><AlertTriangle size={20} /> 2.4 Batasan Penelitian</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Objek terbatas pada produk <strong>bracket</strong> di lini Plating.</li>
                    <li>Menggunakan kerangka kerja <strong>DMAIC</strong>.</li>
                    <li>Tahap <em>Improve</em> dibatasi pada usulan rekomendasi, <strong>tanpa implementasi dan pengukuran ulang</strong> karena keterbatasan waktu.</li>
                  </ul>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2"><Layers size={20} /> 2.5 Manfaat Penelitian</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Penerapan ilmu pengetahuan Teknik Industri.</li>
                    <li>Pengembangan keahlian analitis statistik kualitas.</li>
                    <li>Pengalaman profesional di industri manufaktur skala besar.</li>
                    <li>Pemenuhan syarat akademik program studi.</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* BAB III */}
        <section id="bab-3" className="scroll-mt-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-12 border-b border-zinc-800 pb-6">BAB III: Tinjauan Pustaka</h2>
            
            <div className="space-y-12 text-zinc-400 leading-relaxed text-justify">
              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-semibold text-white mb-4">3.1 Penelitian Terdahulu</h3>
                <p>Tinjauan terhadap 25 jurnal dan literatur penelitian terdahulu menunjukkan bahwa penerapan Six Sigma DMAIC terbukti efektif di berbagai sektor industri untuk mereduksi <em>defect</em>, mengurangi variabilitas proses, dan menekan <em>Cost of Poor Quality</em>.</p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-semibold text-white mb-6">3.2 Dasar Teori & Pengetahuan Objek</h3>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-zinc-900 p-6 border border-zinc-800 rounded hover:bg-zinc-800/80 transition-colors">
                    <h4 className="text-white font-bold mb-2">Pengendalian Kualitas & Six Sigma</h4>
                    <p className="text-sm">Fokus pada pemenuhan syarat produk sesuai kriteria pelanggan. Six Sigma adalah metode peningkatan berkelanjutan dengan target 3,4 kegagalan per sejuta kesempatan (DPMO) melalui pendekatan statistik berbasis data.</p>
                  </div>
                  <div className="bg-zinc-900 p-6 border border-zinc-800 rounded hover:bg-zinc-800/80 transition-colors">
                    <h4 className="text-white font-bold mb-2">Siklus DMAIC</h4>
                    <p className="text-sm"><strong>Define:</strong> Identifikasi CTQ & SIPOC.<br/><strong>Measure:</strong> Hitung DPMO, Level Sigma, u-chart.<br/><strong>Analyze:</strong> Pareto & Fishbone diagram.<br/><strong>Improve:</strong> FMEA & usulan SOP 5W+1H.<br/><strong>Control:</strong> Pengawasan berkala.</p>
                  </div>
                </div>

                <h4 className="text-white font-bold mb-4 text-xl mt-12">Klasifikasi Cacat (Defect) Bracket Lini Plating</h4>
                <p className="mb-6">Pelapisan seng (Zinc electroplating) bertujuan memberikan perlindungan korosi (varian Trivalent Black, Coloured, Glossy). Inspeksi visual dan kuantitatif (Coating Thickness Gauge) sering mengidentifikasi beberapa jenis kegagalan:</p>
                
                {/* Defect Cards with Images & Stagger Animation */}
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Belang", type: "Visual/Kimia", desc: "Variasi warna akibat arus/kimia tidak stabil. Re-plating.", img: "/cacat/belang.jpeg" },
                    { title: "Jamur", type: "Visual/Kimia", desc: "Oksidasi putih akibat kelembapan. Pasivasi ulang.", img: "/cacat/jamur.jpeg" },
                    { title: "Karat", type: "Visual/Kimia", desc: "Oksidasi material karena lapisan tipis. Stripping & re-plating.", img: "/cacat/karat.jpeg" },
                    { title: "Tidak Terplating", type: "Visual/Kimia", desc: "Kontaminasi minyak/debu. Cleaning & pelapisan ulang.", img: "https://placehold.co/600x400?text=Dokumentasi+Tidak_Tersedia" },
                    { title: "Dent / Penyok", type: "Fisik (Material)", desc: "Benturan fisik. Reject/Scrap (tidak bisa diperbaiki).", img: "/cacat/dent.jpeg" },
                    { title: "Tidak Ada Ulir", type: "Fisik (Material)", desc: "Kegagalan proses tapping. Reject/Scrap.", img: "/cacat/noUlir.jpeg" },
                  ].map((defect, i) => (
                    <motion.div key={i} variants={fadeInUp} className="group border border-zinc-800 bg-zinc-950 rounded-md overflow-hidden hover:border-zinc-500 transition-all duration-300">
                      <div className="h-40 overflow-hidden relative">
                        {/* Placeholder Image - Replace SRC later */}
                        <img 
                          src={defect.img} 
                          alt={`Cacat ${defect.title}`} 
                          className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                        />
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-zinc-500 to-transparent" /> */}
                      </div>
                      <div className="p-4 relative z-10 -mt-2">
                        <h5 className="text-white font-bold text-lg">{defect.title}</h5>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">{defect.type}</span>
                        <p className="text-sm text-zinc-400">{defect.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* BAB IV */}
        <section id="bab-4" className="scroll-mt-32">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-12 border-b border-zinc-800 pb-6">BAB IV: Metodologi Penelitian</h2>
            
            <div className="space-y-12 text-zinc-400 leading-relaxed text-justify">
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold text-white mb-4">4.1 Objek dan Subjek</h3>
                  <p>Subjek penelitian adalah <strong>Lini Plating</strong> PT Mitrametal Perkasa, dengan objek spesifik berupa produk <strong>Bracket Sub Assy Front Caliper</strong>. Produk ini krusial untuk mengintegrasikan kaliper rem dengan sistem pengereman motor, menuntut pengawasan kualitas tinggi bebas karat dan cacat fisik.</p>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h3 className="text-2xl font-semibold text-white mb-4">4.2 Pengumpulan Data</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Data Primer:</strong> Observasi lapangan & wawancara. Mengumpulkan data kapasitas harian dan defect rate bracket selama dua bulan.</li>
                    <li><strong>Data Sekunder:</strong> Profil perusahaan, spesifikasi teknis, dan SOP Final Check Lini Plating.</li>
                  </ul>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-semibold text-white mb-4">4.3 & 4.4 Alur Pengolahan Data (DMAIC)</h3>
                <p className="mb-8">Pengolahan data sistematis memetakan perjalanan dari identifikasi masalah hingga usulan SOP baru:</p>
                
                <div className="relative border-l border-zinc-800 ml-4 md:ml-8 space-y-8 pb-8">
                  {[
                    { step: "Define", desc: "Pembuatan SIPOC Diagram dan identifikasi kriteria Critical to Quality (CTQ)." },
                    { step: "Measure", desc: "Perhitungan nilai DPMO, Sigma Level, dan pembuatan u-Chart untuk baseline performa." },
                    { step: "Analyze", desc: "Pembuatan Pareto Chart (menentukan prioritas cacat) dan Fishbone Diagram (akar penyebab)." },
                    { step: "Improve", desc: "Analisis risiko dengan FMEA dan perumusan usulan Standard Operating Procedure (SOP) baru." },
                    { step: "Control", desc: "Rencana tahap implementasi pengawasan dari SOP baru (rekomendasi)." },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="relative pl-8 group"
                    >
                      <div className="absolute -left-[17px] top-1 bg-zinc-950 border-2 border-zinc-600 rounded-full p-1 group-hover:border-white group-hover:bg-zinc-800 transition-colors">
                        <Workflow size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="text-white font-bold text-lg uppercase tracking-wider">{item.step}</h4>
                      <p className="text-zinc-400">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}