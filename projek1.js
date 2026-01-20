/* =========================================
   1. DATA STATIS (PRODI, DOSEN, & BERITA)
   ========================================= */
   const dataProdi = {
    'TEKNIK INFORMATIKA': {
        visi: "Menjadi Program Studi unggulan dalam rekayasa perangkat lunak dan kecerdasan buatan nasional.",
        misi: ["Menyelenggarakan pendidikan IT berbasis industri.", "Mengembangkan riset AI yang bermanfaat bagi masyarakat.", "Meningkatkan sertifikasi kompetensi mahasiswa."]
    },
    'SISTEM INFORMASI': {
        visi: "Menjadi pusat unggulan tata kelola IT dan wirausaha digital pada tahun 2032.",
        misi: ["Mencetak lulusan yang mahir manajemen data.", "Mengembangkan sistem informasi bisnis kreatif.", "Menumbuhkan jiwa technopreneurship."]
    },
    'DESAIN KOMUNIKASI VISUAL': {
        visi: "Mewujudkan lulusan kreatif visual berbasis kearifan lokal yang mendunia.",
        misi: ["Eksplorasi desain digital modern.", "Pelestarian budaya lewat karya visual.", "Kolaborasi dengan industri kreatif nasional."]
    },
    'TEKNIK SIPIL': {
        visi: "Menjadi pelopor pembangunan infrastruktur berkelanjutan yang inovatif.",
        misi: ["Pendidikan teknik konstruksi ramah lingkungan.", "Riset material bangunan modern.", "Pengabdian infrastruktur daerah."]
    }
};

const beritaFkom = [
    "🔥 Pendaftaran Mahasiswa Baru FKOM UNIKU 2026 Telah Dibuka!",
    "⭐ Prodi Sistem Informasi Raih Akreditasi UNGGUL.",
    "🚀 FKOM Jalin Kerjasama Teknologi dengan Google Cloud.",
    "📢 Pendaftaran Tracer Study bagi lulusan 2025 dibuka."
];

/* =========================================
   2. STATE & DATABASE GLOBAL
   ========================================= */
let currentProdi = "";
let currentUserRole = ""; // "mahasiswa", "alumni", atau "staff"
let isAlumniAuthenticated = false;
let isStaffAuthenticated = false;

let databaseAlumni = [
    { id: 1, nama: "Budi Santoso", prodi: "SISTEM INFORMASI", tahun: "2024", hp: "08123456789", email: "budi@uniku.ac.id", prestasi: "Lulusan Terbaik", posisi: "Bekerja (Data Analyst)" },
    { id: 2, nama: "Siti Aminah", prodi: "TEKNIK INFORMATIKA", tahun: "2023", hp: "08987654321", email: "siti@uniku.ac.id", prestasi: "Juara Hackathon", posisi: "Wirausaha (Tech Startup)" }
];

const daftarLoker = [
    {
        id: 1,
        posisi: "Fullstack Developer",
        perusahaan: "PT. Global Tech",
        lokasi: "Jakarta (Remote)",
        tipe: "Full-time",
        deadline: "20 Februari 2026",
        deskripsi: "Kami mencari Fullstack Developer yang berpengalaman dengan Stack MERN atau Laravel/Vue untuk membangun platform edukasi terbaru.",
        kualifikasi: ["Lulusan S1 Teknik Informatika/Sistem Informasi", "Menguasai JavaScript (Node.js & React/Vue)", "Memahami RESTful API dan Database SQL/NoSQL"],
        linkLamar: "https://uniku.ac.id"
    },
    {
        id: 2,
        posisi: "Data Analyst",
        perusahaan: "Bank Mandiri",
        lokasi: "Jakarta",
        tipe: "Full-time",
        deadline: "10 Maret 2026",
        deskripsi: "Mengolah dataset besar untuk memberikan insight bisnis bagi departemen perbankan digital.",
        kualifikasi: ["Mahir SQL dan Python/R", "Memahami visualisasi data (Tableau/PowerBI)", "Teliti dan memiliki kemampuan analisis kuat"],
        linkLamar: "https://uniku.ac.id"
    },
    {
        id: 3,
        posisi: "UI/UX Designer",
        perusahaan: "Startup Maju",
        lokasi: "Bandung (Hybrid)",
        tipe: "Remote",
        deadline: "15 Maret 2026",
        deskripsi: "Merancang pengalaman pengguna yang mulus untuk aplikasi mobile e-commerce.",
        kualifikasi: ["Mahir menggunakan Figma", "Memiliki portofolio desain UI/UX yang kuat", "Memahami konsep Design Thinking"],
        linkLamar: "https://uniku.ac.id"
    }
];

// KODE AKSES KHUSUS
const KODE_RAHASIA = {
    STAFF: "FKOMADMIN2025",
    ALUMNI: "ALUMNIFKOM",
    MHS: "MHSFKOM"
};

/* =========================================
   3. FUNGSI NAVIGASI HALAMAN
   ========================================= */
function goToProdi() {
    $('#welcome-page').fadeOut(500, function() {
        $('#prodi-page').removeClass('hidden-section').hide().fadeIn(500);
    });
}

function goToDetailProdi(prodi) {
    currentProdi = prodi;
    $('#title-prodi-detail').text(prodi);
    $('#visi-text').text(dataProdi[prodi].visi);
    
    let misiHtml = "";
    dataProdi[prodi].misi.forEach(m => {
        misiHtml += `<li class="mb-2"><i class="fas fa-check-circle text-primary me-2"></i>${m}</li>`;
    });
    $('#misi-list').html(misiHtml);

    $('#prodi-page').fadeOut(500, function() {
        $('#visi-misi-prodi').removeClass('hidden-section').hide().fadeIn(500);
    });
}

function goToDashboard() {
    $('#nav-prodi-label').text(currentProdi);
    $('#visi-misi-prodi').fadeOut(500, function() {
        $('#main-dashboard').removeClass('hidden-section').hide().fadeIn(800);
        switchMainTab('home');
        window.scrollTo(0, 0);
    });
}

function backToProdiSelection() {
    $('#main-dashboard, #visi-misi-prodi').fadeOut(500, function() {
        $('#prodi-page').fadeIn();
        window.scrollTo(0, 0);
    });
}

function backToHome() {
    if(confirm("Apakah Anda ingin kembali ke halaman utama?")) {
        location.reload();
    }
}

function switchMainTab(tabName) {
    if (tabName === 'form' && currentUserRole === 'mahasiswa') {
        alert("Mohon maaf, menu 'Isi Data Alumni' hanya tersedia untuk Alumni.");
        return;
    }
    if (tabName === 'form' && !isAlumniAuthenticated && !isStaffAuthenticated) {
        $('#passwordModal').modal('show');
        return;
    }
    executeSwitchTab(tabName);
}

function executeSwitchTab(tabName) {
    $('.nav-role.main-nav').removeClass('active text-dark fw-bold').addClass('text-muted');
    $(`#tab-${tabName}`).addClass('active text-dark fw-bold').removeClass('text-muted');

    $('[id^="subpage-"]').addClass('hidden-section').hide();
    $(`#subpage-${tabName}`).removeClass('hidden-section').stop().fadeIn(400);

    if(tabName === 'data') updatePublicAlumniTable();
}

/* =========================================
   4. LOGIKA LOGIN & OTORITAS (AUTH)
   ========================================= */
function openLoginForm(kategori) {
    const modalTitle = document.querySelector('#passwordModal .modal-title');
    const modalDesc = document.querySelector('#passwordModal .text-muted');
    const emailLabel = document.querySelector('#passwordModal label:nth-of-type(1)');
    const emailInput = document.getElementById('staffEmail');
    const loginBtn = document.querySelector('#passwordModal .btn-warning');

    // Reset error message if any
    $('#authError').hide();

    if (kategori === 'Staff') {
        modalTitle.innerHTML = '<i class="fas fa-user-lock me-2"></i>Verifikasi Akses Staff';
        modalDesc.innerText = "Login khusus Staff/Dosen untuk manajemen data penuh.";
        emailLabel.innerText = "EMAIL STAFF";
        emailInput.placeholder = "admin@uniku.ac.id";
        loginBtn.innerHTML = 'MASUK SEBAGAI ADMIN <i class="fas fa-sign-in-alt ms-1"></i>';
    } 
    else if (kategori === 'Mahasiswa') {
        modalTitle.innerHTML = '<i class="fas fa-user-graduate me-2"></i>Login Mahasiswa';
        modalDesc.innerText = "Gunakan NIM Anda untuk mengakses layanan akademik.";
        emailLabel.innerText = "NIM MAHASISWA";
        emailInput.placeholder = "Masukkan NIM Anda";
        loginBtn.innerHTML = 'MASUK SEBAGAI MAHASISWA <i class="fas fa-sign-in-alt ms-1"></i>';
    } 
    else if (kategori === 'Alumni') {
        modalTitle.innerHTML = '<i class="fas fa-user-tag me-2"></i>Portal Alumni';
        modalDesc.innerText = "Silahkan login untuk memperbarui data Tracer Study.";
        emailLabel.innerText = "NIM / EMAIL ALUMNI";
        emailInput.placeholder = "Masukkan NIM atau Email";
        loginBtn.innerHTML = 'MASUK SEBAGAI ALUMNI <i class="fas fa-sign-in-alt ms-1"></i>';
    }
    
    let loginModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('passwordModal'));
    loginModal.show();
}

function verifyStaffAccess() {
    // .trim() digunakan agar jika ada spasi tidak sengaja terketik, tetap dianggap benar
    const email = $('#staffEmail').val().trim();
    const pass = $('#staffPassword').val();
    const kode = $('#authCode').val().trim();

    // Data login yang sah sesuai permintaan Anda
    const isAdminEmail = (email === "admin@uniku.ac.id");
    const isAdminPass = (pass === "admin123");
    const isAdminKode = (kode === "FKOMADMIN");

    if (isAdminEmail && isAdminPass && isAdminKode) {
        currentUserRole = "staff";
        isStaffAuthenticated = true;
        
        alert("Login Berhasil! Selamat Datang Admin."); // Pesan sukses saja
        
        // Tutup modal
        const modalElement = document.getElementById('passwordModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();

        // Pindah ke Dashboard
        $('#welcome-page, #prodi-page, #visi-misi-prodi').hide();
        $('#main-dashboard').removeClass('hidden-section').fadeIn();
        
        applyRolePermissions(); 
    } else {
        // HANYA tampilkan pesan umum, tidak membocorkan email/password/kode asli
        alert("DATA ATAU KODE OTORITAS SALAH!"); 
        
        // Opsional: tampilkan tulisan merah di dalam modal saja tanpa alert pop-up
        $('#authError').text("Kredensial tidak valid. Silahkan hubungi IT Center.").fadeIn();
    }
}

function verifyAlumniAccess() {
    const identitas = $('#staffEmail').val(); 
    const kode = $('#authCode').val(); 

    if (identitas !== "" && kode === KODE_RAHASIA.ALUMNI) {
        currentUserRole = "alumni";
        isAlumniAuthenticated = true;
        
        alert("SELAMAT DATANG ALUMNI FIKOM UNIKU!\nSILAHKAN LENGKAPI DATA TRACER STUDY ANDA.");
        
        bootstrap.Modal.getInstance(document.getElementById('passwordModal')).hide();
        $('#welcome-page').hide();
        $('#prodi-page').hide();
        $('#visi-misi-prodi').hide();
        $('#main-dashboard').removeClass('hidden-section').fadeIn();
        
        executeSwitchTab('form');
        applyRolePermissions();
    } else {
        alert("DATA ATAU KODE OTORITAS ALUMNI SALAH!");
    }
}

function verifyMahasiswaAccess() {
    const nim = $('#staffEmail').val(); 
    const kode = $('#authCode').val();

    if (nim !== "" && kode === KODE_RAHASIA.MHS) {
        currentUserRole = "mahasiswa";
        
        alert("SELAMAT DATANG MAHASISWA FIKOM UNIKU!");
        
        bootstrap.Modal.getInstance(document.getElementById('passwordModal')).hide();
        $('#welcome-page').hide();
        $('#prodi-page').hide();
        $('#visi-misi-prodi').hide();
        $('#main-dashboard').removeClass('hidden-section').fadeIn();
        
        executeSwitchTab('home');
        applyRolePermissions();
    } else {
        alert("NIM ATAU KODE OTORITAS MAHASISWA SALAH!");
    }
}

function applyRolePermissions() {
    // Reset semua elemen agar tidak bisa diedit dulu
    $('[contenteditable]').attr('contenteditable', 'false').css({
        'border': 'none',
        'padding': '0'
    });

    if (currentUserRole === 'staff') {
        // Daftar elemen yang boleh diedit oleh staff (termasuk area pengumuman)
        // Tambahkan class 'edit-area' pada div pengumuman di HTML Anda
        $('.edit-area, h1, h2, h3, h4, h5, p, .card-text').attr('contenteditable', 'true').css({
            'border': '1px dashed #FFC107',
            'padding': '5px',
            'cursor': 'edit'
        });
        
        $('.admin-only').fadeIn();
        console.log("Mode Edit Staff Aktif");
    } else {
        $('.admin-only').hide();
    }
}

/* =========================================
   5. FUNGSI RENDER DATA (ALUMNI & LOKER)
   ========================================= */
function updatePublicAlumniTable() {
    const tableBody = $('#alumni-public-table');
    tableBody.empty();
    
    databaseAlumni.forEach((data, index) => {
        let kolomAksi = "";
        if (currentUserRole === "staff") {
            kolomAksi = `<td><button class="btn btn-sm btn-danger" onclick="hapusDataAlumni(${data.id})"><i class="fas fa-trash"></i></button></td>`;
        }

        tableBody.append(`
            <tr>
                <td>${index + 1}</td>
                <td class="fw-bold">${data.nama}</td>
                <td>${data.prodi}</td>
                <td>${data.tahun}</td>
                <td>${data.hp}</td>
                <td>${data.prestasi}</td>
                <td><span class="badge bg-primary">${data.posisi}</span></td>
                ${kolomAksi} 
            </tr>
        `);
    });
}

function hapusDataAlumni(id) {
    if(confirm("Apakah Anda yakin ingin menghapus data alumni ini?")) {
        databaseAlumni = databaseAlumni.filter(item => item.id !== id);
        updatePublicAlumniTable();
    }
}

function renderLoker() {
    const container = document.getElementById('loker-container');
    const statusLogin = document.querySelector('.dropdown-toggle').innerText.toLowerCase();
    
    // Tentukan: Apakah user ini Staf?
    const isStaff = statusLogin.includes("staf") || statusLogin.includes("admin");

    container.innerHTML = ""; // Bersihkan tampilan lama

    dataLoker.forEach((loker) => {
        // Tombol ini hanya tercipta jika isStaff bernilai TRUE
        const tombolKhususStaff = isStaff ? 
            `<button class="btn btn-dark btn-sm w-100 mt-2" onclick="bukaEditLoker(${loker.id})">
                <i class="fas fa-edit"></i> Edit Loker
            </button>` : ""; 

        container.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm border-0">
                    <div class="card-body">
                        <h6>${loker.posisi}</h6>
                        <p class="small text-primary">${loker.pt}</p>
                        <a href="${loker.link}" class="btn btn-outline-primary btn-sm w-100">Lihat Detail</a>
                        ${tombolKhususStaff}
                    </div>
                </div>
            </div>`;
    });
}
function showLokerDetail(id) {
    const loker = daftarLoker.find(item => item.id === id);
    if (loker) {
        $('#modalLokerPosisi').text(loker.posisi);
        $('#modalLokerPerusahaan').text(loker.perusahaan);
        $('#modalLokerLokasi').text(loker.lokasi);
        $('#modalLokerTipe').text(loker.tipe);
        $('#modalLokerDeadline').text(loker.deadline);
        $('#modalLokerDeskripsi').text(loker.deskripsi);
        
        const kualifikasiList = $('#modalLokerKualifikasi');
        kualifikasiList.empty();
        loker.kualifikasi.forEach(req => {
            kualifikasiList.append(`<li>${req}</li>`);
        });

        $('#btnLamarSekarang').attr('href', loker.linkLamar);
        let lokerModal = new bootstrap.Modal(document.getElementById('lokerDetailModal'));
        lokerModal.show();
    }
}
function loginStaff() {
    // ... kode login kamu ...
    
    // Setelah berhasil login dan teks navbar berubah:
    document.querySelector('.dropdown-toggle').innerHTML = '<i class="fas fa-user me-2"></i> Staf FIKOM';
    
    // Panggil ulang fungsi loker agar tombol edit muncul
    renderLoker(); 
}
function bukaEditLoker(id) {
    if (!isUserStaff()) {
        alert("Akses Ditolak: Hanya Staf yang dapat mengubah data!");
        return;
    }
    // ... sisa kode modal edit ...
}
// Data awal loker
let dataLoker = [
    { id: 1, posisi: "Fullstack Developer", pt: "PT. Global Tech", link: "#" },
    { id: 2, posisi: "Data Analyst", pt: "Bank Mandiri", link: "#" }
];

// Fungsi untuk menampilkan kartu loker
function renderLoker() {
    const container = document.getElementById('loker-container');
    container.innerHTML = "";

    dataLoker.forEach((loker) => {
        container.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body">
                        <h6 class="fw-bold">${loker.posisi}</h6>
                        <p class="text-primary small">${loker.pt}</p>
                        <a href="${loker.link}" class="btn btn-outline-primary btn-sm w-100 mb-2">Lihat Detail</a>
                        <button class="btn btn-dark btn-sm w-100" onclick="bukaEditLoker(${loker.id})">
                            <i class="fas fa-edit me-1"></i> Edit (Staf Only)
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Fungsi mengisi form saat tombol edit diklik
let idLokerTerpilih = null;
function bukaEditLoker(id) {
    idLokerTerpilih = id;
    const loker = dataLoker.find(l => l.id === id);
    document.getElementById('editPosisi').value = loker.posisi;
    document.getElementById('editPerusahaan').value = loker.pt;
    document.getElementById('editLink').value = loker.link;
    
    new bootstrap.Modal(document.getElementById('modalEditLoker')).show();
}

// Simpan perubahan
document.getElementById('formLoker').addEventListener('submit', function(e) {
    e.preventDefault();
    const index = dataLoker.findIndex(l => l.id === idLokerTerpilih);
    
    dataLoker[index].posisi = document.getElementById('editPosisi').value;
    dataLoker[index].pt = document.getElementById('editPerusahaan').value;
    dataLoker[index].link = document.getElementById('editLink').value;

    renderLoker(); // Refresh tampilan
    bootstrap.Modal.getInstance(document.getElementById('modalEditLoker')).hide();
    alert("Data Lowongan Berhasil Diperbarui!");
});

// Jalankan saat awal load
renderLoker();
/* =========================================
   6. NEWS TICKER & FORM LOGIC
   ========================================= */
function startNewsTicker() {
    let i = 0;
    setInterval(() => {
        $('#news-ticker').fadeOut(500, function() {
            i = (i + 1) % beritaFkom.length;
            $(this).text(beritaFkom[i]).fadeIn(500);
        });
    }, 4000);
}

function toggleAlumniDetails() {
    const status = $('#inputPosisi').val();
    const detailArea = $('#detailTambahan');
    
    if (status === "Bekerja") {
        detailArea.show();
        $('#detailTitle').text("Detail Pekerjaan");
        $('#labelDetail1').text("NAMA PERUSAHAAN / INSTANSI");
        $('#labelDetail2').text("DAERAH / LOKASI KERJA");
    } 
    else if (status === "Wirausaha") {
        detailArea.show();
        $('#detailTitle').text("Detail Usaha");
        $('#labelDetail1').text("NAMA USAHA");
        $('#labelDetail2').text("BERGERAK DI BIDANG");
    } 
    else if (status === "Pendidikan") {
        detailArea.show();
        $('#detailTitle').text("Detail Studi Lanjut");
        $('#labelDetail1').text("NAMA UNIVERSITAS");
        $('#labelDetail2').text("PROGRAM STUDI / JENJANG");
    } 
    else {
        detailArea.hide();
    }
}

/* =========================================
   7. INITIALIZE & EVENT HANDLERS (UPDATED)
   ========================================= */
$(document).ready(function() {
    startNewsTicker();
    renderLoker();

    // GANTI DENGAN URL WEB APP GOOGLE SCRIPT ANDA
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx7cB8NRxIIhpiW-3q7w-FYlgBHm74u3RZliny1qQ7XbRUl6qooVy_iOYB-dSDkFAlo/exec'; 

    function ambilDataDariSheets() {
        fetch(scriptURL)
            .then(res => res.json())
            .then(data => {
                if(data && data.length > 0) {
                    databaseAlumni = data.map(item => ({
                        id: Math.random(),
                        nama: item.nama || "",
                        nim: item.nim || "",
                        prodi: item.prodi || "",
                        tahun: item.tahun || "",
                        hp: item.hp || "",
                        email: item.email || "",
                        prestasi: item.prestasi || "",
                        posisi: item.status || "" // 'item.status' diambil dari header Excel yang diproses Apps Script
                    }));
                    updatePublicAlumniTable();
                }
            })
            .catch(err => console.error("Gagal ambil data:", err));
    }

    // Jalankan fungsinya
    ambilDataDariSheets();

    startNewsTicker();
    renderLoker();

    $(document).off('click', '#mainLoginBtn').on('click', '#mainLoginBtn', function(e) {
        e.preventDefault();
        const context = $('#modalTitle').text();
        if (context.includes("Staff")) {
            verifyStaffAccess();
        } else if (context.includes("Mahasiswa")) {
            verifyMahasiswaAccess();
        } else {
            verifyAlumniAccess();
        }
    });

    // Handler Submit Form Alumni - TERKONEKSI KE SPREADSHEET
    $('#formAlumni').on('submit', function(e) {
        e.preventDefault();
        const btnSubmit = $(this).find('button[type="submit"]');
        btnSubmit.html('<i class="fas fa-spinner fa-spin"></i> Mengirim...').prop('disabled', true);

        // 1. Ambil nilai status dan detail
        const statusVal = $('#inputPosisi').val();
        const detailVal = $('#inputDetail1').val();
        
        // 2. Gabungkan status (Bekerja/Wirausaha/Pendidikan) dengan detailnya
        const posisiLengkap = detailVal ? `${statusVal} (${detailVal})` : statusVal;

        // 3. Susun data (Nama key harus sesuai dengan params di Apps Script)
        const formData = {
            nama: $('#inputNama').val(),
            nim: $('#inputNIM').val(),
            prodi: currentProdi,
            tahun: $('#inputTahun').val(),
            hp: $('#inputHP').val(),
            email: $('#inputEmail').val(),
            prestasi: $('#inputPrestasi').val(),
            status: posisiLengkap // Ini akan diterima sebagai params.status
        };

        // 4. Kirim menggunakan metode POST yang benar
        fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors', // Penting untuk Google Apps Script
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            alert('DATA BERHASIL TERKIRIM KE GOOGLE SHEETS!');
            
            // Tambahkan ke tabel lokal agar langsung muncul
            databaseAlumni.unshift({ id: Date.now(), ...formData });
            updatePublicAlumniTable();

            $('#formAlumni')[0].reset();
            $('#detailTambahan').hide(); 
            btnSubmit.text("SIMPAN DATA").prop('disabled', false);
        })
        .catch(error => {
            console.error('Error!', error);
            alert('Gagal mengirim data. Cek koneksi atau URL Script.');
            btnSubmit.text("SIMPAN DATA").prop('disabled', false);
        });
    });
});

function filterAlumni() {
    // 1. Ambil nilai dari semua input filter
    let inputNama = document.getElementById("searchAlumni").value.toLowerCase();
    let selectTahun = document.getElementById("filterTahunAlumni").value;
    let selectProdi = document.getElementById("filterProdiAlumni").value.toUpperCase();
    
    // 2. Ambil baris tabel dari ID yang ada di gambar kamu
    let table = document.getElementById("alumni-public-table");
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        // Index kolom sesuai gambar: Nama (1), Prodi (2), Tahun (3)
        let tdNama = tr[i].getElementsByTagName("td")[1];
        let tdProdi = tr[i].getElementsByTagName("td")[2];
        let tdTahun = tr[i].getElementsByTagName("td")[3];

        if (tdNama && tdProdi && tdTahun) {
            let txtNama = tdNama.textContent || tdNama.innerText;
            let txtProdi = tdProdi.textContent || tdProdi.innerText;
            let txtTahun = tdTahun.textContent || tdTahun.innerText;

            // Logika Penyaringan (Boolean)
            let matchNama = txtNama.toLowerCase().indexOf(inputNama) > -1;
            let matchProdi = (selectProdi === "" || txtProdi.toUpperCase().includes(selectProdi));
            let matchTahun = (selectTahun === "" || txtTahun.trim() === selectTahun);

            // Tampilkan baris hanya jika SEMUA kondisi terpenuhi
            if (matchNama && matchProdi && matchTahun) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
    // 1. Pilih semua elemen kartu
    const educationCards = document.querySelectorAll('.education-info-card');

    // 2. Tambahkan fungsi klik ke setiap kartu
    educationCards.forEach(card => {
        // Tambahkan pointer agar user tahu bisa diklik
        card.style.cursor = 'pointer';

        card.addEventListener('click', function() {
            // Mengambil teks judul (h5) dari dalam kartu yang diklik
            const title = this.querySelector('h5').innerText;

            // Memunculkan pesan Under Construction
            alert("MAAF!\n\nFitur '" + title + "' masih dalam tahap pembangunan (Under Construction).\nSilakan cek kembali nanti!");
        });
    })
    // Cek apakah script ini jalan dengan menambahkan alert sementara
console.log("Script Pencarian Aktif");

function bukaPanelCari() {
    const panel = document.getElementById('panelCari');
    if (panel) {
        panel.style.display = 'flex';
        document.getElementById('inputCariFitur').focus();
    } else {
        alert("Error: Elemen panelCari tidak ditemukan di HTML!");
    }
}

function tutupPanelCari() {
    document.getElementById('panelCari').style.display = 'none';
}

function mulaiMencari() {
    let keyword = document.getElementById('inputCariFitur').value.toLowerCase();
    let box = document.getElementById('boxHasil');
    box.innerHTML = "";

    // Data tools sesuai yang ada di gambar web kamu
    const daftarTools = [
        { nama: "Beranda & Info", target: "home", desc: "Halaman depan portal" },
        { nama: "Daftar Alumni", target: "form", desc: "Formulir pendaftaran alumni" },
        { nama: "Data Alumni / Database", target: "data", desc: "Tabel database alumni FIKOM" },
        { nama: "Lowongan Kerja", target: "home", desc: "Info loker dan karir" },
        { nama: "Staf & Dosen", target: "staff", desc: "Profil pengajar" }
    ];

    if (keyword.length > 0) {
        let matches = daftarTools.filter(t => t.nama.toLowerCase().includes(keyword));
        matches.forEach(item => {
            let div = document.createElement('div');
            div.className = "list-group-item list-group-item-action p-3";
            div.style.cursor = "pointer";
            div.innerHTML = `<strong>${item.nama}</strong><br><small>${item.desc}</small>`;
            div.onclick = function() {
                switchMainTab(item.target); // Memanggil fungsi navigasi kamu
                tutupPanelCari();
            };
            box.appendChild(div);
        });
    }
}