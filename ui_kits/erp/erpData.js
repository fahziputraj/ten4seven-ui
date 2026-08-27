window.ErpData = {
  modules: [
    { label: "Operasional", items: [
      { id: "dashboard", icon: "dashboard", label: "Dashboard" },
      { id: "farm", icon: "farm", label: "Farm Monitoring" },
      { id: "production", icon: "production", label: "Produksi Telur" } ] },
    { label: "Transaksi", items: [
      { id: "list", icon: "invoice", label: "Purchase Invoice", badge: 24 },
      { id: "transaction", icon: "transfer", label: "Warehouse Transfer" },
      { id: "sales", icon: "receipt", label: "Sales Order" } ] },
    { label: "Persetujuan", items: [
      { id: "approval", icon: "approve", label: "Approval Queue", dot: true },
      { id: "verify", icon: "verify", label: "Verification Queue" } ] },
    { label: "Master data", items: [
      { id: "items", icon: "item", label: "Item & Pakan" },
      { id: "partners", icon: "users", label: "Supplier & Customer" },
      { id: "coa", icon: "journal", label: "Chart of Accounts" } ] },
  ],
  invoices: [
    { id: "PI-2026-00841", supplier: "CV Sumber Pakan Jaya", date: "24 Agu 2026", due: "23 Sep 2026", status: "in-review", total: "Rp 482.650.000", po: "PO-2026-00612", owner: "Dewi Lestari", av: "19" },
    { id: "PI-2026-00840", supplier: "PT Agro Nusantara", date: "24 Agu 2026", due: "08 Okt 2026", status: "approved", total: "Rp 128.400.000", po: "PO-2026-00609", owner: "Dewi Lestari", av: "19" },
    { id: "PI-2026-00839", supplier: "UD Karya Mandiri", date: "22 Agu 2026", due: "21 Agu 2026", status: "overdue", total: "Rp 64.250.000", po: "PO-2026-00604", owner: "Rahmat Hidayat", av: "07" },
    { id: "PI-2026-00838", supplier: "CV Vaksin Sejahtera", date: "21 Agu 2026", due: "20 Sep 2026", status: "submitted", total: "Rp 24.900.000", po: "PO-2026-00601", owner: "Siti Aminah", av: "12" },
    { id: "PI-2026-00837", supplier: "PT Kemasan Prima", date: "20 Agu 2026", due: "19 Sep 2026", status: "draft", total: "Rp 18.750.000", po: "—", owner: "Budi Santoso", av: "03" },
    { id: "PI-2026-00836", supplier: "CV Sumber Pakan Jaya", date: "19 Agu 2026", due: "18 Sep 2026", status: "rejected", total: "Rp 312.000.000", po: "PO-2026-00594", owner: "Dewi Lestari", av: "19" },
    { id: "PI-2026-00835", supplier: "PT Agro Nusantara", date: "18 Agu 2026", due: "17 Sep 2026", status: "completed", total: "Rp 96.120.000", po: "PO-2026-00588", owner: "Siti Aminah", av: "12" },
  ],
  lines: [
    { item: "Pakan layer LP-2 (karung 50 kg)", qty: "1.240", unit: "karung", price: "Rp 312.500", total: "Rp 387.500.000", tax: "PPN 11%" },
    { item: "Pakan pre-layer PL-1 (karung 50 kg)", qty: "240", unit: "karung", price: "Rp 298.000", total: "Rp 71.520.000", tax: "PPN 11%" },
    { item: "Premix mineral layer", qty: "48", unit: "sak", price: "Rp 485.000", total: "Rp 23.280.000", tax: "PPN 11%" },
    { item: "Biaya angkut Blitar–Kediri", qty: "1", unit: "lot", price: "Rp 350.000", total: "Rp 350.000", tax: "—" },
  ],
  queue: [
    { id: "PI-2026-00841", type: "Purchase Invoice", entity: "CV Sumber Pakan Jaya", amount: "Rp 482.650.000", age: "2 hari", risk: "high", stage: "Finance", owner: "Dewi Lestari", av: "19" },
    { id: "WT-2026-00318", type: "Warehouse Transfer", entity: "Gudang Blitar → Kandang 3", amount: "1.240 karung", age: "1 hari", risk: "normal", stage: "Warehouse", owner: "Rahmat Hidayat", av: "07" },
    { id: "SO-2026-01274", type: "Sales Order", entity: "PT Retail Telur Sejahtera", amount: "Rp 1.284.000.000", age: "4 jam", risk: "normal", stage: "Sales Manager", owner: "Siti Aminah", av: "12" },
    { id: "SA-2026-00219", type: "Stock Adjustment", entity: "Gudang Kediri", amount: "-86 karung", age: "3 hari", risk: "high", stage: "Inventory", owner: "Budi Santoso", av: "03" },
    { id: "JV-2026-00902", type: "Journal Voucher", entity: "Penyesuaian penyusutan Q3", amount: "Rp 42.180.000", age: "6 jam", risk: "normal", stage: "Accounting", owner: "Dewi Lestari", av: "19" },
  ],
  exceptions: [
    { icon: "mortality", tone: "orange", title: "Mortalitas Kandang 5 di atas ambang", detail: "0,14% hari ini · ambang 0,10%", action: "Buka monitoring" },
    { icon: "invoice", tone: "orange", title: "3 invoice melewati jatuh tempo", detail: "Total Rp 186.400.000", action: "Buka daftar" },
    { icon: "stock", tone: "blue", title: "Stok pakan Kandang 3 di bawah 4 hari", detail: "Sisa 168 karung · rata-rata 44/hari", action: "Buat purchase request" },
    { icon: "feed", tone: "slate", title: "2 kandang belum mengirim laporan harian", detail: "Kandang 4 dan Kandang 7", action: "Kirim pengingat" },
  ],
  production: [
    { house: "Kandang 1", flock: "LF-24-01", population: "24.800", hd: "93,2", feed: "112", mortality: "0,04", status: "approved" },
    { house: "Kandang 2", flock: "LF-24-02", population: "24.150", hd: "91,8", feed: "114", mortality: "0,06", status: "approved" },
    { house: "Kandang 3", flock: "LF-23-07", population: "22.940", hd: "88,4", feed: "118", mortality: "0,09", status: "in-review" },
    { house: "Kandang 5", flock: "LF-23-09", population: "21.380", hd: "84,1", feed: "121", mortality: "0,14", status: "blocked" },
  ],
};
