const STORAGE_KEY = 'pengeluaran_anda_transactions_v2';
const THEME_KEY = 'pengeluaran_anda_theme_v2';
const TITLE_KEY = 'pengeluaran_bulanan_custom_title_v3';
const LANG_KEY = 'pengeluaran_anda_lang_v2';

// Registrasi Service Worker agar aplikasi berjalan 100% Offline tanpa internet
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

const I18N = {
  id: {
    locale: 'id-ID',
    todayPrefix: 'Hari ini',
    offlineBadge: '⚡ 100% Offline',
    settingsTitle: 'Pengaturan',
    viewModeLabel: 'Mode Tampilan / View Mode',
    langLabel: 'Bahasa / Language',
    renameLabel: 'Ubah Nama Judul',
    saveBtn: 'Simpan',
    firstDayPrefix: 'Pemasukan Bulan Ini',
    openManual: '📖 Panduan & Kelebihan (Buku Manual)',
    resetBtn: '🔄 Reset Pengeluaran Bulan Ini',
    confirmText: 'Apakah Anda yakin untuk mereset saldo & pengeluaran bulan ini?',
    confirmYes: 'Ya, Reset',
    confirmNo: 'Batal',
    balanceLabel: 'Sisa Saldo',
    incomeLabel: 'Pemasukan',
    expenseLabel: 'Pengeluaran',
    tabExpense: '💸 Keluar',
    tabIncome: '💰 Masuk',
    descPlaceholder: 'Keterangan pengeluaran / pemasukan...',
    amountPlaceholder: 'Nominal (15.000)',
    addBtn: '+ Catat',
    historyHeading: 'Riwayat',
    emptyState: 'Belum ada catatan transaksi (Rp 0).',
    budgetRemain: (r, u) => `Sisa Budget ${r}% (Terpakai ${u}%)`,
    budgetZero: 'Sisa Budget: 0% (Klik untuk isi pemasukan)',
    budgetNoIncome: 'Pengeluaran tercatat (Klik untuk isi pemasukan)',
    themeDark: 'Hitam',
    themeLight: 'Putih',
    manualTitle: '📖 Buku Panduan & Keunggulan Aplikasi',
    manualSubtitle:
      'Selamat datang di <strong>Pengeluaran Bulanan</strong> — aplikasi pencatat keuangan pribadi yang ringan, cepat, dan aman.',
    manualItems: `
      <li>
        <strong>🔒 100% Offline & Tanpa Internet (Privasi Aman):</strong>
        <span>Aplikasi ini berjalan <strong>100% tanpa kuota internet</strong>. Semua data keuangan tersimpan langsung di memori perangkatmu sendiri tanpa dikirim ke server luar.</span>
      </li>
      <li>
        <strong>📊 Apa itu Sisa Budget (%)?</strong>
        <span>Persentase sisa uangmu bulan ini. Saat kamu mengisi <em>Pemasukan</em> (misal Rp 1.000.000), Budget langsung naik ke <strong>100%</strong> dan berkurang otomatis setiap mencatat <em>Pengeluaran</em>.</span>
      </li>
      <li>
        <strong>💸 Tombol Keluar/Masuk & Format Titik Otomatis:</strong>
        <span>Tanggal tercatat otomatis setiap hari. Ketik angka nominal (<code>15000</code>) dan otomatis rapi memakai titik (<code>15.000</code>).</span>
      </li>
      <li>
        <strong>⚙️ Pengaturan, Bahasa (ID/EN), & Tampilan (Portrait/Landscape):</strong>
        <span>Di menu ⚙️ (bisa di-scroll ke bawah), terdapat status <strong>100% Offline</strong>, pilihan <strong>Portrait / Landscape</strong>, <strong>Bahasa Indonesia/Inggris</strong>, <em>Pemasukan Tanggal 1</em>, serta tombol <em>Reset</em> dengan konfirmasi aman.</span>
      </li>
    `,
    manualCloseBtn: 'Mengerti & Mulai Catat',
    toastSavedIncome: '✨ Pemasukan tercatat!',
    toastSavedExpense: '✨ Pengeluaran tercatat!',
    toastRenamed: '✏️ Nama aplikasi diperbarui!',
    toastReset: '🔄 Saldo & pengeluaran bulan ini direset ke Rp 0!',
  },
  en: {
    locale: 'en-US',
    todayPrefix: 'Today',
    offlineBadge: '⚡ 100% Offline',
    settingsTitle: 'Settings',
    viewModeLabel: 'View Mode / Tampilan',
    langLabel: 'Language / Bahasa',
    renameLabel: 'Rename App Title',
    saveBtn: 'Save',
    firstDayPrefix: 'This Month Income',
    openManual: '📖 User Guide & Benefits (Manual)',
    resetBtn: '🔄 Reset This Month Data',
    confirmText: 'Are you sure you want to reset your balance & expenses for this month?',
    confirmYes: 'Yes, Reset',
    confirmNo: 'Cancel',
    balanceLabel: 'Remaining Balance',
    incomeLabel: 'Income',
    expenseLabel: 'Expenses',
    tabExpense: '💸 Expense',
    tabIncome: '💰 Income',
    descPlaceholder: 'Expense / income description...',
    amountPlaceholder: 'Amount (15.000)',
    addBtn: '+ Record',
    historyHeading: 'History',
    emptyState: 'No transactions recorded yet (Rp 0).',
    budgetRemain: (r, u) => `Remaining Budget ${r}% (Used ${u}%)`,
    budgetZero: 'Remaining Budget: 0% (Click to set income)',
    budgetNoIncome: 'Expense recorded (Click to set initial income)',
    themeDark: 'Dark',
    themeLight: 'Light',
    manualTitle: '📖 User Manual & App Highlights',
    manualSubtitle:
      'Welcome to <strong>Pengeluaran Bulanan</strong> — a fast, clean, and private personal finance tracker.',
    manualItems: `
      <li>
        <strong>🔒 100% Offline & No Internet Needed (Private):</strong>
        <span>Works <strong>100% offline without internet data</strong>. All financial records are stored locally on your own device and never uploaded to external servers.</span>
      </li>
      <li>
        <strong>📊 What is Remaining Budget (%)?</strong>
        <span>Shows the percentage of your monthly income left. Adding <em>Income</em> (e.g. Rp 1.000.000) sets your Budget to <strong>100%</strong>, which automatically decreases as you log <em>Expenses</em>.</span>
      </li>
      <li>
        <strong>💸 Auto-Date & Auto Thousand-Dots:</strong>
        <span>Dates roll over automatically every day. Type numbers like <code>15000</code> and they automatically format with dots (<code>15.000</code>).</span>
      </li>
      <li>
        <strong>⚙️ Settings, Bilingual (ID/EN), & Portrait/Landscape:</strong>
        <span>Inside the scrollable ⚙️ menu, check the <strong>100% Offline</strong> status, switch between <strong>Portrait & Landscape</strong>, toggle <strong>Indonesian & English</strong>, set <em>1st of Month Income</em>, or safely <em>Reset</em> monthly records.</span>
      </li>
    `,
    manualCloseBtn: 'Got It & Start Tracking',
    toastSavedIncome: '✨ Income recorded!',
    toastSavedExpense: '✨ Expense recorded!',
    toastRenamed: '✏️ App title updated!',
    toastReset: '🔄 Balance & expenses reset to Rp 0!',
  },
};

let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentTheme = localStorage.getItem(THEME_KEY) || 'light';
let currentLang = localStorage.getItem(LANG_KEY) || 'id';
let appCustomTitle = localStorage.getItem(TITLE_KEY) || 'Pengeluaran Bulanan';
let lastAddedId = null;

function t() {
  return I18N[currentLang] || I18N.id;
}

function getTodayShort() {
  return new Date().toLocaleDateString(t().locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

function getFirstOfMonthLabel() {
  const m = new Date().toLocaleDateString(t().locale, { month: 'short', year: 'numeric' });
  return `1 ${m}`;
}

function getFirstDayOfMonthISO() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}-01`;
}

function formatThousandDots(value) {
  const n = Math.abs(Math.round(Number(value) || 0));
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatRupiah(num) {
  const n = Math.round(Number(num) || 0);
  const sign = n < 0 ? '- ' : '';
  return sign + 'Rp ' + formatThousandDots(n);
}

function parseCleanNumber(str) {
  const digits = String(str || '').replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 0;
}

function attachDotFormatter(inputEl) {
  inputEl.addEventListener('input', () => {
    const raw = inputEl.value.replace(/[^0-9]/g, '');
    if (!raw) {
      inputEl.value = '';
      return;
    }
    inputEl.value = formatThousandDots(raw);
  });
}

const appShell = document.getElementById('appShell');
const appTitleEl = document.getElementById('appTitle');
const offlineBadgeEl = document.getElementById('offlineBadge');
const liveDateText = document.getElementById('liveDateText');
const todayChip = document.getElementById('todayChip');
const balanceCard = document.getElementById('balanceCard');
const balanceCardLabel = document.getElementById('balanceCardLabel');
const totalBalanceEl = document.getElementById('totalBalance');
const incomeCardLabel = document.getElementById('incomeCardLabel');
const totalIncomeEl = document.getElementById('totalIncome');
const expenseCardLabel = document.getElementById('expenseCardLabel');
const totalExpenseEl = document.getElementById('totalExpense');
const budgetBarClickable = document.getElementById('budgetBarClickable');
const budgetStatusTextEl = document.getElementById('budgetStatusText');
const budgetPctNumberEl = document.getElementById('budgetPctNumber');
const budgetProgressEl = document.getElementById('budgetProgress');
const txForm = document.getElementById('txForm');
const tabExpenseLabel = document.getElementById('tabExpenseLabel');
const tabIncomeLabel = document.getElementById('tabIncomeLabel');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const submitBtn = document.getElementById('submitBtn');
const historyHeading = document.getElementById('historyHeading');
const txList = document.getElementById('txList');
const viewModeSettingLabel = document.getElementById('viewModeSettingLabel');
const portraitModeBtn = document.getElementById('portraitModeBtn');
const landscapeModeBtn = document.getElementById('landscapeModeBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const exportBtn = document.getElementById('exportBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsMenu = document.getElementById('settingsMenu');
const settingsHeaderTitle = document.getElementById('settingsHeaderTitle');
const langSettingLabel = document.getElementById('langSettingLabel');
const langIdBtn = document.getElementById('langIdBtn');
const langEnBtn = document.getElementById('langEnBtn');
const renameSettingLabel = document.getElementById('renameSettingLabel');
const settingTitleInput = document.getElementById('settingTitleInput');
const saveTitleBtn = document.getElementById('saveTitleBtn');
const firstDayLabel = document.getElementById('firstDayLabel');
const initBalanceAmount = document.getElementById('initBalanceAmount');
const saveInitBalanceBtn = document.getElementById('saveInitBalanceBtn');
const openManualBtn = document.getElementById('openManualBtn');
const openManualText = document.getElementById('openManualText');
const manualModal = document.getElementById('manualModal');
const manualTitle = document.getElementById('manualTitle');
const manualSubtitle = document.getElementById('manualSubtitle');
const manualListContent = document.getElementById('manualListContent');
const closeManualBtn = document.getElementById('closeManualBtn');
const closeManualTopBtn = document.getElementById('closeManualTopBtn');
const resetAllBtn = document.getElementById('resetAllBtn');
const resetBtnText = document.getElementById('resetBtnText');
const resetConfirmBox = document.getElementById('resetConfirmBox');
const confirmQuestionText = document.getElementById('confirmQuestionText');
const confirmResetYes = document.getElementById('confirmResetYes');
const confirmResetNo = document.getElementById('confirmResetNo');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
const toastEl = document.getElementById('toast');

attachDotFormatter(amountInput);
attachDotFormatter(initBalanceAmount);

appTitleEl.textContent = appCustomTitle;
settingTitleInput.value = appCustomTitle;

function applyLanguage(lang) {
  currentLang = lang === 'en' ? 'en' : 'id';
  localStorage.setItem(LANG_KEY, currentLang);
  const dict = t();

  offlineBadgeEl.textContent = dict.offlineBadge;
  settingsHeaderTitle.textContent = dict.settingsTitle;
  if (viewModeSettingLabel) viewModeSettingLabel.textContent = dict.viewModeLabel;
  langSettingLabel.textContent = dict.langLabel;
  renameSettingLabel.textContent = dict.renameLabel;
  saveTitleBtn.textContent = dict.saveBtn;
  saveInitBalanceBtn.textContent = dict.saveBtn;
  firstDayLabel.textContent = `${dict.firstDayPrefix} (${getFirstOfMonthLabel()})`;
  openManualText.textContent = dict.openManual;
  resetBtnText.textContent = dict.resetBtn;
  confirmQuestionText.textContent = dict.confirmText;
  confirmResetYes.textContent = dict.confirmYes;
  confirmResetNo.textContent = dict.confirmNo;
  balanceCardLabel.textContent = dict.balanceLabel;
  incomeCardLabel.textContent = dict.incomeLabel;
  expenseCardLabel.textContent = dict.expenseLabel;
  tabExpenseLabel.textContent = dict.tabExpense;
  tabIncomeLabel.textContent = dict.tabIncome;
  titleInput.placeholder = dict.descPlaceholder;
  amountInput.placeholder = dict.amountPlaceholder;
  submitBtn.textContent = dict.addBtn;
  historyHeading.textContent = dict.historyHeading;
  manualTitle.textContent = dict.manualTitle;
  manualSubtitle.innerHTML = dict.manualSubtitle;
  manualListContent.innerHTML = dict.manualItems;
  closeManualBtn.textContent = dict.manualCloseBtn;

  langIdBtn.style.borderColor = currentLang === 'id' ? 'var(--accent)' : 'var(--card-border)';
  langEnBtn.style.borderColor = currentLang === 'en' ? 'var(--accent)' : 'var(--card-border)';

  applyTheme(currentTheme);
  render();
}

langIdBtn.addEventListener('click', () => applyLanguage('id'));
langEnBtn.addEventListener('click', () => applyLanguage('en'));

budgetBarClickable.addEventListener('click', (e) => {
  e.stopPropagation();
  settingsMenu.classList.remove('hidden');
  initBalanceAmount.focus();
});

openManualBtn.addEventListener('click', () => {
  settingsMenu.classList.add('hidden');
  manualModal.classList.remove('hidden');
});

closeManualBtn.addEventListener('click', () => {
  manualModal.classList.add('hidden');
});

closeManualTopBtn.addEventListener('click', () => {
  manualModal.classList.add('hidden');
});

settingsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  settingTitleInput.value = appCustomTitle;
  const existingInit = transactions.find((tx) => tx.id === 'tx-tanggal-1');
  initBalanceAmount.value = existingInit ? formatThousandDots(existingInit.amount) : '';
  resetConfirmBox.classList.add('hidden');
  settingsMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
    settingsMenu.classList.add('hidden');
    resetConfirmBox.classList.add('hidden');
  }
});

saveTitleBtn.addEventListener('click', () => {
  const next = settingTitleInput.value.trim();
  if (!next) return;
  appCustomTitle = next;
  appTitleEl.textContent = appCustomTitle;
  document.title = `${appCustomTitle} — 100% Offline`;
  localStorage.setItem(TITLE_KEY, appCustomTitle);
  settingsMenu.classList.add('hidden');
  showToast(t().toastRenamed);
});

saveInitBalanceBtn.addEventListener('click', () => {
  const amount = parseCleanNumber(initBalanceAmount.value);
  if (amount <= 0) return;

  const firstLabel = getFirstOfMonthLabel();
  const existingIdx = transactions.findIndex((tx) => tx.id === 'tx-tanggal-1');
  const entry = {
    id: 'tx-tanggal-1',
    type: 'income',
    title: currentLang === 'en' ? `Initial Income (${firstLabel})` : `Pemasukan Awal (${firstLabel})`,
    amount,
    category: `📅 ${firstLabel}`,
    dateISO: getFirstDayOfMonthISO(),
  };

  if (existingIdx >= 0) {
    transactions[existingIdx] = entry;
  } else {
    transactions.unshift(entry);
  }

  lastAddedId = 'tx-tanggal-1';
  saveState();
  render();
  settingsMenu.classList.add('hidden');
  balanceCard.classList.remove('pulse');
  void balanceCard.offsetWidth;
  balanceCard.classList.add('pulse');
  showToast(t().toastSavedIncome);
});

resetAllBtn.addEventListener('click', () => {
  resetConfirmBox.classList.remove('hidden');
  setTimeout(() => {
    resetConfirmBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 40);
});

confirmResetNo.addEventListener('click', () => {
  resetConfirmBox.classList.add('hidden');
});

confirmResetYes.addEventListener('click', () => {
  transactions = [];
  initBalanceAmount.value = '';
  lastAddedId = null;
  saveState();
  render();
  resetConfirmBox.classList.add('hidden');
  settingsMenu.classList.add('hidden');
  balanceCard.classList.remove('pulse');
  void balanceCard.offsetWidth;
  balanceCard.classList.add('pulse');
  showToast(t().toastReset);
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  if (theme === 'dark') {
    themeIcon.textContent = '☀️';
    themeLabel.textContent = t().themeLight;
  } else {
    themeIcon.textContent = '🌙';
    themeLabel.textContent = t().themeDark;
  }
}

themeToggleBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
});

function updateLiveDate() {
  const shortDate = getTodayShort();
  liveDateText.textContent = `${t().todayPrefix} • ${shortDate}`;
  todayChip.textContent = shortDate;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 1800);
}

function render() {
  updateLiveDate();
  const dict = t();

  const income = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, tx) => acc + tx.amount, 0);
  const expense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => acc + tx.amount, 0);
  const balance = income - expense;

  totalBalanceEl.textContent = formatRupiah(balance);
  totalIncomeEl.textContent = formatRupiah(income);
  totalExpenseEl.textContent = formatRupiah(expense);

  let barPct = 0;
  if (income > 0) {
    const remainPct = Math.max(0, Math.min(100, Math.round(((income - expense) / income) * 100)));
    const usedPct = Math.min(100, Math.round((expense / income) * 100));
    barPct = remainPct;
    budgetStatusTextEl.textContent = dict.budgetRemain(remainPct, usedPct);
    budgetPctNumberEl.textContent = `${remainPct}%`;
    if (remainPct <= 15) {
      budgetProgressEl.style.backgroundColor = '#e11d48';
    } else if (remainPct <= 40) {
      budgetProgressEl.style.backgroundColor = '#d97706';
    } else {
      budgetProgressEl.style.backgroundColor = '#059669';
    }
  } else if (expense > 0) {
    barPct = 100;
    budgetStatusTextEl.textContent = dict.budgetNoIncome;
    budgetPctNumberEl.textContent = `100%`;
    budgetProgressEl.style.backgroundColor = '#e11d48';
  } else {
    barPct = 0;
    budgetStatusTextEl.textContent = dict.budgetZero;
    budgetPctNumberEl.textContent = `0%`;
    budgetProgressEl.style.backgroundColor = '#059669';
  }
  budgetProgressEl.style.width = `${barPct}%`;

  txList.innerHTML = '';
  if (transactions.length === 0) {
    txList.innerHTML = `<li class="empty-state">${dict.emptyState}</li>`;
    return;
  }

  transactions
    .slice()
    .reverse()
    .forEach((tx) => {
      const li = document.createElement('li');
      const isNew = tx.id === lastAddedId;
      li.className = `tx-item ${tx.type} ${isNew ? 'new-anim' : ''}`;
      const sign = tx.type === 'income' ? '+' : '-';
      li.innerHTML = `
        <div class="tx-info">
          <span class="tx-title">${tx.title}</span>
          <span class="tx-cat-badge">${tx.category}</span>
        </div>
        <div class="tx-right">
          <span class="tx-amount ${tx.type}">${sign} ${formatRupiah(tx.amount)}</span>
          <button class="delete-btn" data-id="${tx.id}" title="Delete">×</button>
        </div>
      `;
      txList.appendChild(li);
    });
}

txForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const type = document.querySelector('input[name="type"]:checked').value;
  const title = titleInput.value.trim();
  const amount = parseCleanNumber(amountInput.value);
  const categorySelect = document.getElementById('category');
  const category = categorySelect.options[categorySelect.selectedIndex].text;

  if (!title || amount <= 0) return;

  const newId = 'tx-' + Date.now();
  lastAddedId = newId;

  transactions.push({
    id: newId,
    type,
    title,
    amount,
    category,
    dateISO: getTodayISO(),
  });

  saveState();
  render();

  balanceCard.classList.remove('pulse');
  void balanceCard.offsetWidth;
  balanceCard.classList.add('pulse');

  showToast(type === 'income' ? t().toastSavedIncome : t().toastSavedExpense);

  titleInput.value = '';
  amountInput.value = '';
});

txList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    lastAddedId = null;
    transactions = transactions.filter((tx) => tx.id !== id);
    saveState();
    render();
  }
});

exportBtn.addEventListener('click', () => {
  if (transactions.length === 0) return showToast(t().emptyState);
  const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
  const rows = transactions.map((tx) => [
    tx.dateISO || getTodayISO(),
    tx.type === 'income' ? 'Income' : 'Expense',
    `"${tx.category}"`,
    `"${tx.title.replace(/"/g, '""')}"`,
    tx.amount,
  ]);
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Pengeluaran_${getTodayISO()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

function updateLayoutButtons() {
  if (!portraitModeBtn || !landscapeModeBtn || !appShell) return;
  const isLand = appShell.classList.contains('landscape-mode');
  portraitModeBtn.style.borderColor = !isLand ? 'var(--accent)' : 'var(--card-border)';
  landscapeModeBtn.style.borderColor = isLand ? 'var(--accent)' : 'var(--card-border)';
}

if (portraitModeBtn && landscapeModeBtn && appShell) {
  portraitModeBtn.addEventListener('click', () => {
    appShell.classList.remove('landscape-mode');
    updateLayoutButtons();
  });
  landscapeModeBtn.addEventListener('click', () => {
    appShell.classList.add('landscape-mode');
    updateLayoutButtons();
  });
  updateLayoutButtons();
}

if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      appShell.classList.add('landscape-mode');
      updateLayoutButtons();
      fullscreenBtn.textContent = '✕ Exit Fullscreen';
    } else {
      document.exitFullscreen().catch(() => {});
      fullscreenBtn.textContent = '⛶ Fullscreen (Layar Penuh)';
    }
  });
}

applyLanguage(currentLang);
setInterval(updateLiveDate, 60000);
