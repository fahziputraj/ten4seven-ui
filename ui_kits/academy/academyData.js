window.AcademyData = {
  levels: [
    { number: 1, name: "Foundation", description: "Peta sistem dan operasi layer farm." },
    { number: 2, name: "Brooding & Rearing", description: "Membangun flock yang seragam sejak awal." },
    { number: 3, name: "Layer Management", description: "Mengawal transisi dan produksi." },
    { number: 4, name: "Nutrition", description: "Menghubungkan pakan dengan output." },
    { number: 5, name: "Water Management", description: "Menjaga akses dan kualitas air." },
    { number: 6, name: "Environment & Closed House", description: "Mengatur mikroklimat dan ventilasi." },
    { number: 7, name: "Health & Veterinary", description: "Mendeteksi dan mengeskalasi risiko kesehatan." },
    { number: 8, name: "Biosecurity", description: "Membangun lapisan pencegahan penyakit." },
    { number: 9, name: "Egg Management", description: "Menjaga kualitas dari nest sampai grading." },
    { number: 10, name: "Farm Data & KPI", description: "Membaca performa dengan data yang konsisten." },
    { number: 11, name: "Farm Economics", description: "Mengelola margin, biaya, dan cashflow." },
    { number: 12, name: "Farm Management", description: "Menerjemahkan SOP menjadi ritme kerja." },
    { number: 13, name: "Advanced Management", description: "Memecahkan gap dengan root cause analysis." },
    { number: 14, name: "Expert Level", description: "Mengambil keputusan dan memimpin perbaikan." },
  ],
  tracks: [
    { key: "foundation", kicker: "Bab 01", title: "Fondasi flock", description: "Bangun cara berpikir sistem sebelum masuk ke keputusan produksi.", levels: [1, 2, 3], icon: "modules", accent: "green" },
    { key: "production", kicker: "Bab 02", title: "Sistem produksi", description: "Hubungkan pakan, air, dan lingkungan menjadi ritme operasional.", levels: [4, 5, 6], icon: "settings", accent: "orange" },
    { key: "control", kicker: "Bab 03", title: "Kontrol mutu & data", description: "Jaga kesehatan, biosecurity, kualitas telur, dan sinyal KPI.", levels: [7, 8, 9, 10], icon: "analytics", accent: "blue" },
    { key: "leadership", kicker: "Bab 04", title: "Keputusan & kepemimpinan", description: "Naik dari membaca angka menjadi memimpin perbaikan farm.", levels: [11, 12, 13, 14], icon: "cup", accent: "violet" },
  ],
  modules: [
    { n: 1,  level: 1,  title: "Mengenal sistem layer farm", category: "Foundation", icon: "farm", tone: "green", state: "completed", score: "18/20" },
    { n: 2,  level: 1,  title: "Peran dan ritme kerja harian", category: "Foundation", icon: "users", tone: "green", state: "completed", score: "19/20" },
    { n: 3,  level: 2,  title: "Brooding: 14 hari pertama", category: "Brooding & Rearing", icon: "flock", tone: "green", state: "completed", score: "17/20" },
    { n: 4,  level: 2,  title: "Keseragaman bobot dan grading", category: "Brooding & Rearing", icon: "weight", tone: "green", state: "completed", score: "20/20" },
    { n: 5,  level: 3,  title: "Transisi rearing ke layer", category: "Layer Management", icon: "progress", tone: "orange", state: "current" },
    { n: 6,  level: 3,  title: "Puncak produksi dan persistensi", category: "Layer Management", icon: "egg", tone: "orange", state: "available" },
    { n: 7,  level: 4,  title: "Formulasi pakan layer", category: "Nutrition", icon: "feed", tone: "orange", state: "available" },
    { n: 8,  level: 4,  title: "Konsumsi pakan vs output telur", category: "Nutrition", icon: "chart", tone: "orange", state: "available" },
    { n: 9,  level: 5,  title: "Kualitas dan debit air", category: "Water Management", icon: "medicine", tone: "blue", state: "locked" },
    { n: 10, level: 6,  title: "Ventilasi closed house", category: "Environment & Closed House", icon: "production", tone: "blue", state: "locked" },
    { n: 11, level: 6,  title: "Mengatur suhu dan kelembapan", category: "Environment & Closed House", icon: "settings", tone: "blue", state: "locked" },
    { n: 12, level: 7,  title: "Deteksi dini penyakit", category: "Health & Veterinary", icon: "vaccine", tone: "blue", state: "locked" },
    { n: 13, level: 7,  title: "Program vaksinasi dan pengobatan", category: "Health & Veterinary", icon: "medicine", tone: "blue", state: "locked" },
    { n: 14, level: 8,  title: "Lapisan biosecurity", category: "Biosecurity", icon: "shield", tone: "blue", state: "locked" },
    { n: 15, level: 9,  title: "Penanganan telur dari nest ke grading", category: "Egg Management", icon: "egg", tone: "orange", state: "locked" },
    { n: 16, level: 9,  title: "Mutu kerabang dan penyusutan", category: "Egg Management", icon: "opname", tone: "orange", state: "locked" },
    { n: 17, level: 10, title: "Membaca KPI farm secara konsisten", category: "Farm Data & KPI", icon: "kpi", tone: "blue", state: "locked" },
    { n: 18, level: 11, title: "Margin, biaya pokok, dan cashflow", category: "Farm Economics", icon: "finance", tone: "violet", state: "locked" },
    { n: 19, level: 12, title: "Menerjemahkan SOP menjadi ritme kerja", category: "Farm Management", icon: "course", tone: "violet", state: "locked" },
    { n: 20, level: 12, title: "Mengelola tim kandang", category: "Farm Management", icon: "users", tone: "violet", state: "locked" },
    { n: 21, level: 13, title: "Root cause analysis gap produksi", category: "Advanced Management", icon: "analytics", tone: "violet", state: "locked" },
    { n: 22, level: 14, title: "Mengambil keputusan dan memimpin perbaikan", category: "Expert Level", icon: "award", tone: "violet", state: "locked" },
  ],
  lessons: [
    { title: "Mengapa transisi menentukan puncak produksi", done: true },
    { title: "Indikator kesiapan flock", done: true },
    { title: "Perubahan pakan dan pencahayaan", done: false, current: true },
    { title: "Memantau minggu pertama bertelur", done: false },
    { title: "Ringkasan dan keputusan operasional", done: false },
  ],
  learners: [
    { name: "Rahmat Hidayat", avatar: "07", farm: "Kandang 3 · Blitar", role: "Operator", progress: 82, level: 11, status: "approved", last: "24 Agu 2026" },
    { name: "Siti Aminah", avatar: "12", farm: "Kandang 1 · Blitar", role: "Supervisor", progress: 64, level: 8, status: "in-review", last: "24 Agu 2026" },
    { name: "Budi Santoso", avatar: "03", farm: "Kandang 5 · Kediri", role: "Operator", progress: 41, level: 5, status: "submitted", last: "23 Agu 2026" },
    { name: "Dewi Lestari", avatar: "19", farm: "Kandang 2 · Blitar", role: "Manager", progress: 100, level: 14, status: "completed", last: "22 Agu 2026" },
    { name: "Agus Prasetyo", avatar: "21", farm: "Kandang 4 · Kediri", role: "Operator", progress: 12, level: 2, status: "draft", last: "19 Agu 2026" },
  ],
  insights: [
    "Di balik hasil yang konsisten, ada keputusan kecil yang diamati, dicatat, dan dijalankan dengan disiplin.",
    "Performa farm yang sehat dimulai dari kemampuan membaca sinyal\u2014pakan, air, telur, dan perilaku ayam.",
    "Belajar di AAPM berarti mengubah pengalaman kandang menjadi keputusan yang lebih presisi dan berdampak.",
  ],
};

// The one source of truth for every progress number in this kit.
window.AcademyData.modulesInTrack = (track) => window.AcademyData.modules.filter((m) => track.levels.includes(m.level));
window.AcademyData.trackStats = (track) => {
  const mods = window.AcademyData.modulesInTrack(track);
  const done = mods.filter((m) => m.state === "completed").length;
  return { mods, done, total: mods.length, percent: mods.length ? Math.round((done / mods.length) * 100) : 0 };
};
window.AcademyData.stats = () => {
  const all = window.AcademyData.modules;
  const done = all.filter((m) => m.state === "completed").length;
  return { done, total: all.length, percent: Math.round((done / all.length) * 100), current: all.find((m) => m.state === "current") || null };
};
