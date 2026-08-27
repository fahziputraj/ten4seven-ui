/* AAPM domain content pack — Indonesian labels and realistic layer-farm sample data.
   Loaded as a global so any @dsCard, template or prototype can share one dataset:
     <script src="../domain/aapm-domain-data.js"></script>  →  window.AAPMDomain
   Numbers are raw; format them through AAPMDomain.fmt so Indonesian formatting stays
   a system contract (comma decimal, period thousands, tabular figures in tables). */
(function () {
  const id = (n, d = 0) => n.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });
  const fmt = {
    num: id,
    rp: (n) => "Rp " + id(n),
    rpShort: (n) => n >= 1e9 ? "Rp " + id(n / 1e9, 1) + " M" : n >= 1e6 ? "Rp " + id(n / 1e6, 1) + " jt" : "Rp " + id(n),
    pct: (n, d = 1) => id(n, d) + "%",
    kg: (n, d = 0) => id(n, d) + " kg",
    gram: (n, d = 0) => id(n, d) + " g",
    date: (s) => s,
    butir: (n) => id(n) + " butir",
  };

  /* Lifecycle vocabularies — which StatusChip states each domain object may hold. */
  const lifecycles = {
    production: ["draft", "submitted", "verified", "revised", "closed"],
    mortality: ["draft", "submitted", "in-review", "approved", "rejected"],
    vaccination: ["draft", "submitted", "completed", "overdue", "blocked"],
    stock: ["draft", "submitted", "verified", "approved", "archived"],
    sales: ["draft", "submitted", "in-review", "approved", "completed", "overdue"],
    shipment: ["draft", "submitted", "in-review", "completed", "blocked"],
    journal: ["draft", "submitted", "verified", "approved", "closed"],
  };

  /* Ten dashboard KPIs — the set the operations meeting actually reads. */
  const kpi = [
    { key: "hd", icon: "egg", label: "Hen-day production", value: fmt.pct(91.8), delta: "+2,4%", direction: "up", caption: "Target 90,0% · minggu 42", progress: 92, tone: "green" },
    { key: "fcr", icon: "feed", label: "FCR", value: id(2.08, 2), delta: "-0,04", direction: "up", caption: "Standar strain 2,15", tone: "green" },
    { key: "depl", icon: "mortality", label: "Mortalitas mingguan", value: fmt.pct(0.08, 2), delta: "-0,01%", direction: "up", caption: "Ambang 0,10%", tone: "orange", accent: "orange" },
    { key: "eggmass", icon: "grading", label: "Egg mass", value: fmt.gram(58.1, 1), delta: "+0,6 g", direction: "up", caption: "Berat telur rata-rata 63,3 g", tone: "green" },
    { key: "feed", icon: "feed", label: "Konsumsi pakan", value: fmt.gram(112), delta: "+1 g", direction: "down", caption: "Per ekor per hari · air 224 ml", tone: "slate", accent: "none" },
    { key: "bw", icon: "bodyWeight", label: "Body weight", value: id(1.86, 2) + " kg", delta: "+0,02", direction: "up", caption: "Uniformity 88% · CV 7,4%", tone: "green" },
    { key: "rev", icon: "revenue", label: "Pendapatan per kg", value: fmt.rp(27500), delta: "+1,8%", direction: "up", caption: "Rp 41.250 per tray (30 butir)", tone: "green" },
    { key: "hpp", icon: "cogs", label: "HPP per kg telur", value: fmt.rp(22400), delta: "+2,1%", direction: "down", caption: "Pakan 71% dari HPP", tone: "orange", accent: "orange" },
    { key: "margin", icon: "cashflow", label: "Margin operasi", value: fmt.pct(18.5), delta: "-0,7%", direction: "down", caption: "Cashflow bersih Rp 1,24 M", tone: "blue", accent: "blue" },
    { key: "age", icon: "flockAge", label: "Umur flock", value: "42", unit: "minggu", caption: "6 kandang aktif · 1 afkir", tone: "slate", accent: "none" },
  ];

  /* Performa flock per kandang. hd = hen-day %, depl = deplesi kumulatif %. */
  const flocks = [
    { id: "K1", house: "Kandang 1", strain: "Isa Brown", age: 42, pop: 24800, hd: 92.4, fcr: 2.05, depl: 3.1, eggWeight: 63.4, feed: 111, status: "verified" },
    { id: "K2", house: "Kandang 2", strain: "Isa Brown", age: 42, pop: 24350, hd: 91.6, fcr: 2.09, depl: 3.6, eggWeight: 63.1, feed: 112, status: "verified" },
    { id: "K3", house: "Kandang 3", strain: "Lohmann Brown", age: 58, pop: 23110, hd: 87.2, fcr: 2.21, depl: 5.4, eggWeight: 65.8, feed: 115, status: "submitted" },
    { id: "K4", house: "Kandang 4", strain: "Lohmann Brown", age: 31, pop: 25600, hd: 94.1, fcr: 1.98, depl: 1.9, eggWeight: 60.2, feed: 108, status: "verified" },
    { id: "K5", house: "Kandang 5", strain: "Isa Brown", age: 24, pop: 26050, hd: 89.7, fcr: 2.02, depl: 1.2, eggWeight: 57.4, feed: 105, status: "revised" },
    { id: "K6", house: "Kandang 6", strain: "Hy-Line Brown", age: 76, pop: 21480, hd: 78.3, fcr: 2.42, depl: 8.7, eggWeight: 67.1, feed: 118, status: "draft" },
  ];

  /* Register grading telur harian, dalam butir. */
  const grading = [
    { id: "GR-2026-0824-1", date: "24/08/2026", house: "Kandang 1", jumbo: 1840, besar: 12460, sedang: 7120, kecil: 980, retak: 214, kotor: 132, status: "verified" },
    { id: "GR-2026-0824-2", date: "24/08/2026", house: "Kandang 2", jumbo: 1620, besar: 11980, sedang: 7340, kecil: 1120, retak: 268, kotor: 154, status: "verified" },
    { id: "GR-2026-0824-3", date: "24/08/2026", house: "Kandang 3", jumbo: 2410, besar: 11240, sedang: 5860, kecil: 640, retak: 402, kotor: 188, status: "submitted" },
    { id: "GR-2026-0824-4", date: "24/08/2026", house: "Kandang 4", jumbo: 980, besar: 12840, sedang: 8460, kecil: 1640, retak: 196, kotor: 118, status: "verified" },
    { id: "GR-2026-0824-5", date: "24/08/2026", house: "Kandang 5", jumbo: 640, besar: 10480, sedang: 9120, kecil: 2180, retak: 178, kotor: 96, status: "draft" },
  ];

  /* Kartu stok — pakan, obat, dan kemasan. */
  const stock = [
    { id: "SL-00912", date: "24/08/2026", item: "Pakan layer fase 2", uom: "kg", in: 24000, out: 0, balance: 61400, warehouse: "Gudang pakan A", ref: "GRN-2026-00418", status: "approved" },
    { id: "SL-00913", date: "24/08/2026", item: "Pakan layer fase 2", uom: "kg", in: 0, out: 18600, balance: 42800, warehouse: "Gudang pakan A", ref: "SPB-2026-01204", status: "approved" },
    { id: "SL-00914", date: "24/08/2026", item: "Jagung pipil", uom: "kg", in: 12000, out: 0, balance: 28400, warehouse: "Gudang pakan B", ref: "GRN-2026-00419", status: "verified" },
    { id: "SL-00915", date: "24/08/2026", item: "Konsentrat protein", uom: "kg", in: 0, out: 3400, balance: 8600, warehouse: "Gudang pakan B", ref: "SPB-2026-01205", status: "verified" },
    { id: "SL-00916", date: "23/08/2026", item: "Vaksin ND-IB", uom: "dosis", in: 50000, out: 24800, balance: 74200, warehouse: "Gudang obat", ref: "VAK-2026-00087", status: "approved" },
    { id: "SL-00917", date: "23/08/2026", item: "Egg tray 30 butir", uom: "pcs", in: 0, out: 14200, balance: 36800, warehouse: "Gudang kemasan", ref: "SJ-2026-02318", status: "submitted" },
  ];

  /* Aging piutang pelanggan (AR). bucket dalam hari. */
  const ar = [
    { id: "AR-1042", customer: "Pasar Induk Kramat Jati", channel: "Grosir", d0: 184500000, d30: 62400000, d60: 0, d90: 0, status: "approved" },
    { id: "AR-1043", customer: "Toko Telur Berkah", channel: "Retail", d0: 24800000, d30: 12600000, d60: 4200000, d90: 0, status: "in-review" },
    { id: "AR-1044", customer: "CV Mitra Boga Nusantara", channel: "HORECA", d0: 96200000, d30: 38400000, d60: 18600000, d90: 6400000, status: "overdue" },
    { id: "AR-1045", customer: "PT Roti Sari Rasa", channel: "Industri", d0: 142800000, d30: 0, d60: 0, d90: 0, status: "approved" },
    { id: "AR-1046", customer: "Agen Telur Cibitung", channel: "Grosir", d0: 38600000, d30: 21400000, d60: 9800000, d90: 2400000, status: "overdue" },
  ];

  /* Hutang supplier (AP). */
  const ap = [
    { id: "AP-2201", supplier: "CV Sumber Pakan Jaya", category: "Pakan", due: "02/09/2026", amount: 482650000, paid: 0, status: "in-review" },
    { id: "AP-2202", supplier: "PT Agro Nusantara", category: "Jagung", due: "28/08/2026", amount: 128400000, paid: 64200000, status: "approved" },
    { id: "AP-2203", supplier: "UD Karya Mandiri", category: "Kemasan", due: "21/08/2026", amount: 64250000, paid: 0, status: "overdue" },
    { id: "AP-2204", supplier: "PT Vet Medika Indonesia", category: "Obat & vaksin", due: "09/09/2026", amount: 96800000, paid: 0, status: "submitted" },
  ];

  /* Buku besar — potongan jurnal periode Agustus 2026. */
  const gl = [
    { id: "JU-08-0412", date: "24/08/2026", account: "5-1100 · Beban pakan", ref: "SPB-2026-01204", debit: 418500000, credit: 0, status: "approved" },
    { id: "JU-08-0413", date: "24/08/2026", account: "1-1300 · Persediaan pakan", ref: "SPB-2026-01204", debit: 0, credit: 418500000, status: "approved" },
    { id: "JU-08-0414", date: "24/08/2026", account: "1-1200 · Piutang usaha", ref: "SO-2026-03118", debit: 246800000, credit: 0, status: "verified" },
    { id: "JU-08-0415", date: "24/08/2026", account: "4-1000 · Penjualan telur", ref: "SO-2026-03118", debit: 0, credit: 246800000, status: "verified" },
    { id: "JU-08-0416", date: "23/08/2026", account: "5-1400 · Beban obat & vaksin", ref: "VAK-2026-00087", debit: 42600000, credit: 0, status: "submitted" },
  ];

  /* Pengiriman dan status kendaraan. */
  const shipments = [
    { id: "SJ-2026-02318", plate: "B 9241 KXA", driver: "Rahmat Hidayat", route: "Kramat Jati", tray: 4200, load: 92, eta: "07:40", status: "completed" },
    { id: "SJ-2026-02319", plate: "B 9038 TYR", driver: "Budi Santoso", route: "Cibitung – Bekasi", tray: 3600, load: 78, eta: "09:15", status: "in-review" },
    { id: "SJ-2026-02320", plate: "B 9455 UCD", driver: "Slamet Riyadi", route: "Karawang", tray: 2800, load: 61, eta: "11:30", status: "submitted" },
    { id: "SJ-2026-02321", plate: "B 9112 PQE", driver: "Dedi Kurniawan", route: "Bandung", tray: 5100, load: 100, eta: "14:05", status: "blocked" },
  ];

  /* Riwayat pengobatan dan vaksinasi. */
  const treatments = [
    { id: "VAK-00087", date: "23/08/2026", house: "Kandang 3", program: "ND-IB Live", route: "Air minum", dose: "1 dosis/ekor", vet: "drh. Anisa Putri", status: "completed" },
    { id: "VAK-00088", date: "26/08/2026", house: "Kandang 5", program: "AI H9N2", route: "Injeksi IM", dose: "0,5 ml/ekor", vet: "drh. Anisa Putri", status: "submitted" },
    { id: "OBT-00219", date: "22/08/2026", house: "Kandang 6", program: "Antibiotik Enrofloxacin", route: "Air minum", dose: "10 mg/kg BB", vet: "drh. Yoga Pratama", status: "completed" },
    { id: "VAK-00089", date: "19/08/2026", house: "Kandang 2", program: "Coryza", route: "Injeksi SC", dose: "0,5 ml/ekor", vet: "drh. Yoga Pratama", status: "overdue" },
  ];

  /* HR & payroll — periode Agustus 2026. */
  const payroll = [
    { id: "EMP-0142", name: "Rahmat Hidayat", role: "Operator kandang", unit: "Kandang 1–2", days: 26, base: 3800000, allow: 640000, deduct: 152000, status: "approved" },
    { id: "EMP-0155", name: "Siti Aminah", role: "Petugas grading", unit: "Grading & packing", days: 25, base: 3650000, allow: 520000, deduct: 146000, status: "approved" },
    { id: "EMP-0163", name: "Slamet Riyadi", role: "Driver", unit: "Logistik", days: 24, base: 4100000, allow: 980000, deduct: 164000, status: "in-review" },
    { id: "EMP-0171", name: "Dewi Lestari", role: "Admin gudang", unit: "Gudang pakan", days: 26, base: 4250000, allow: 480000, deduct: 170000, status: "submitted" },
  ];

  /* Field labels reused across forms so one wording change lands everywhere. */
  const labels = {
    farm: { house: "Kandang", strain: "Strain", age: "Umur (minggu)", pop: "Populasi awal", date: "Tanggal pencatatan", shift: "Shift", operator: "Operator" },
    production: { eggTotal: "Telur terkumpul (butir)", eggWeight: "Berat telur rata-rata (g)", cracked: "Telur retak", dirty: "Telur kotor", feed: "Pakan terpakai (kg)", water: "Air minum (liter)", dead: "Ayam mati (ekor)", culled: "Ayam afkir (ekor)" },
    vet: { program: "Program", route: "Rute pemberian", dose: "Dosis", vet: "Dokter hewan", batch: "Nomor batch", withdrawal: "Masa henti obat" },
    stock: { item: "Item", uom: "Satuan", qty: "Jumlah", warehouse: "Gudang", ref: "Referensi dokumen", expiry: "Kedaluwarsa", batch: "Nomor batch" },
    sales: { customer: "Pelanggan", channel: "Kanal", grade: "Grade telur", tray: "Jumlah tray", price: "Harga per kg", term: "Termin pembayaran" },
    logistics: { plate: "Nomor polisi", driver: "Driver", route: "Rute", load: "Muatan", eta: "Estimasi tiba" },
    accounting: { account: "Akun", debit: "Debit", credit: "Kredit", period: "Periode", memo: "Keterangan" },
  };

  window.AAPMDomain = { fmt, lifecycles, kpi, flocks, grading, stock, ar, ap, gl, shipments, treatments, payroll, labels };
})();
