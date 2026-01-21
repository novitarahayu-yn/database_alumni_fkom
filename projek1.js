/* =========================================
   1. DATA STATIS (PRODI, DOSEN, & BERITA)
   ========================================= */
   const dataProdi = {
    'TEKNIK INFORMATIKA': {
        logo: 'logo-ti.png',
        visi: "Menjadi Program Studi unggulan dalam rekayasa perangkat lunak dan kecerdasan buatan nasional.",
        misi: ["Menyelenggarakan pendidikan IT berbasis industri.", "Mengembangkan riset AI yang bermanfaat bagi masyarakat.", "Meningkatkan sertifikasi kompetensi mahasiswa."]
    },
    'SISTEM INFORMASI': {
        logo: 'logo-si.png',
        visi: "Menjadi pusat unggulan tata kelola IT dan wirausaha digital pada tahun 2032.",
        misi: ["Mencetak lulusan yang mahir manajemen data.", "Mengembangkan sistem informasi bisnis kreatif.", "Menumbuhkan jiwa technopreneurship."]
    },
    'DESAIN KOMUNIKASI VISUAL': {
        logo: 'logo-dkv.png',
        visi: "Mewujudkan lulusan kreatif visual berbasis kearifan lokal yang mendunia.",
        misi: ["Eksplorasi desain digital modern.", "Pelestarian budaya lewat karya visual.", "Kolaborasi dengan industri kreatif nasional."]
    },
    'TEKNIK SIPIL': {
        logo: 'logo-ts.png',
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
let currentUserRole = ""; // untuk "mahasiswa", "alumni", atau "staff"
let isAlumniAuthenticated = false;
let isStaffAuthenticated = false;

let databaseAlumni = [
    { id: 1, nama: "Budi Santoso", prodi: "SISTEM INFORMASI", tahun: "2024", hp: "08123456789", email: "budi@uniku.ac.id", prestasi: "Lulusan Terbaik", posisi: "Bekerja (Data Analyst)" },
    { id: 2, nama: "Siti Aminah", prodi: "TEKNIK INFORMATIKA", tahun: "2023", hp: "08987654321", email: "siti@uniku.ac.id", prestasi: "Juara Hackathon", posisi: "Wirausaha (Tech Startup)" }
];


// LOWONGAN KERJA (LOKER) - DATABASE UTAMA
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

// KODE AKSES KHUSUS PAS LOGIN
const KODE_RAHASIA = {
    STAFF: "FKOMADMIN2025",
    ALUMNI: "ALUMNIFKOM",
    MHS: "MHSFKOM"
};

/* =========================================
   3. NAVIGASI HALAMAN
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

// DASHBOARD SETELAH PILIH PRODI
function goToDashboard() {
    const namaProdiTerpilih = currentProdi; 

    $('#main-title-header').text(namaProdiTerpilih); 
    $('#sub-title-header').text("PROGRAM STUDI");    
    $('#nav-prodi-label').text(namaProdiTerpilih);  

    let gambarLogo = "logo fkom outline.png"; 
    
    if (namaProdiTerpilih === "TEKNIK INFORMATIKA") {
        gambarLogo = "LOGO TI.png"; 
    } else if (namaProdiTerpilih === "SISTEM INFORMASI") {
        gambarLogo = "LOGO SI.png";
    } else if (namaProdiTerpilih === "DESAIN KOMUNIKASI VISUAL") {
        gambarLogo = "LOGO DKV.png";
    } else if (namaProdiTerpilih === "TEKNIK SIPIL") {
        gambarLogo = "LOGO TS.png";
    }

    $('#logo-prodi-header').attr('src', gambarLogo);

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

    updatePublicAlumniTable();
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
    const email = $('#staffEmail').val().trim();
    const pass = $('#staffPassword').val();
    const kode = $('#authCode').val().trim();

    const isAdminEmail = (email === "admin@uniku.ac.id");
    const isAdminPass = (pass === "admin123");
    const isAdminKode = (kode === "FKOMADMIN");

    if (isAdminEmail && isAdminPass && isAdminKode) {
        currentUserRole = "staff";
        isStaffAuthenticated = true;
        
        alert("Login Berhasil! Selamat Datang Admin.");
        
        // Tutup login
        const modalElement = document.getElementById('passwordModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();

        // untuk memunculkan pilihan: Kelola Berita / Lowongan / Alumni
        onLoginSuccess(); 
        // ------------------------

    } else {
        alert("DATA ATAU KODE OTORITAS SALAH!"); 
        $('#authError').text("Kredensial tidak valid. Silahkan hubungi IT Center.").fadeIn();
    }
}

function verifyAlumniAccess() {
    const identitas = $('#staffEmail').val().trim(); 
    const pass = $('#staffPassword').val().trim(); 
    const kode = $('#authCode').val().trim(); 

    // Syarat: Email diisi DAN Password TIDAK BOLEH KOSONG (pass !== "") DAN Kode Benar
    if (identitas !== "" && pass !== "" && kode === KODE_RAHASIA.ALUMNI) {
        currentUserRole = "alumni";
        isAlumniAuthenticated = true;
        
        alert("SELAMAT DATANG ALUMNI FIKOM UNIKU!\nLogin Berhasil menggunakan Email: " + identitas);
        
        bootstrap.Modal.getInstance(document.getElementById('passwordModal')).hide();
        $('#welcome-page, #prodi-page, #visi-misi-prodi').hide();
        $('#main-dashboard').removeClass('hidden-section').hide().fadeIn(800);
        
        executeSwitchTab('form');
        applyRolePermissions();
        renderLoker();
    } else {
        // Jika password kosong atau kode salah
        if (pass === "") {
            alert("LOGIN GAGAL!\nPassword Gmail Anda wajib diisi.");
        } else {
            alert("LOGIN GAGAL!\nPastikan Email dan Kode Otoritas Alumni sudah benar.");
        }
    }
}

function verifyMahasiswaAccess() {
    const nim = $('#staffEmail').val().trim(); 
    const pass = $('#staffPassword').val().trim(); 
    const kode = $('#authCode').val().trim();

    // Syarat: NIM/Email diisi DAN Password TIDAK BOLEH KOSONG DAN Kode Benar
    if (nim !== "" && pass !== "" && kode === KODE_RAHASIA.MHS) {
        currentUserRole = "mahasiswa";
        
        alert("SELAMAT DATANG MAHASISWA FIKOM UNIKU!\nLogin Berhasil.");

        bootstrap.Modal.getInstance(document.getElementById('passwordModal')).hide();
        $('#welcome-page, #prodi-page, #visi-misi-prodi').hide();
        $('#main-dashboard').removeClass('hidden-section').hide().fadeIn(800);
        
        ambilDataDariSheets(); // Tarik data dari Google Sheets
        updatePublicAlumniTable(); // Render ke tabel

        executeSwitchTab('home');
        applyRolePermissions();
        renderLoker();
    } else {
        if (pass === "") {
            alert("LOGIN GAGAL!\nPassword Gmail/Akun Anda wajib diisi.");
        } else {
            alert("LOGIN GAGAL!\nPastikan NIM dan Kode Otoritas Mahasiswa sudah benar.");
        }
    }
}

// fungsi izin edit berdasarkan peran user
function applyRolePermissions() {
    // Reset semua elemen agar tidak bisa diedit dulu
    $('[contenteditable]').attr('contenteditable', 'false').css({
        'border': 'none',
        'padding': '0'
    });

    if (currentUserRole === 'staff') {
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
    if (!tableBody.length) return;
    tableBody.empty();
    
    databaseAlumni.forEach((data, index) => {
        let kolomAksi = "";
        if (currentUserRole === "staff") {
            kolomAksi = `<td><button class="btn btn-sm btn-danger" onclick="hapusDataAlumni(${data.id})"><i class="fas fa-trash"></i></button></td>`;
        } else {
            // Jika bukan staff, berikan kolom kosong agar tabel tidak geser
            kolomAksi = `<td>-</td>`; 
        }

        tableBody.append(`
            <tr>
                <td>${index + 1}</td>
                <td class="fw-bold">${data.nama}</td>
                <td>${data.nim}</td>
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
    
    // untuk menentukan Apakah user ini Staf?
    const isStaff = statusLogin.includes("staf") || statusLogin.includes("admin");

    container.innerHTML = ""; // Bersihkan tampilan lama

    dataLoker.forEach((loker) => {
        // Tombol ini hanya berjalan jika isStaff bernilai TRUE
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
/* ============================================================
   6. SISTEM MANAJEMEN LOKER (LOGIKA STAFF & ALUMNI)
   ============================================================ */

// SATU-SATUNYA fungsi untuk menggambar kartu loker
function renderLoker() {
    const container = $('#loker-container');
    if (!container.length) return;
    container.empty();
    
    daftarLoker.forEach(loker => {
        // Tombol kelola hanya muncul jika user adalah Staff
        let btnEdit = "";
        if (currentUserRole === 'staff') {
            btnEdit = `
                <button class="btn btn-dark btn-sm w-100 mt-2" onclick="event.stopPropagation(); showLokerDetail(${loker.id})">
                    <i class="fas fa-edit me-1"></i> Kelola & Edit Link (Staff)
                </button>`;
        }
        
        container.append(`
            <div class="col-md-6 mb-3">
                <div class="card h-100 border-0 shadow-sm" onclick="showLokerDetail(${loker.id})" style="cursor:pointer">
                    <div class="card-body">
                        <h6 class="fw-bold">${loker.posisi}</h6>
                        <p class="text-primary small mb-1">${loker.perusahaan}</p>
                        <small class="text-muted"><i class="fas fa-map-marker-alt"></i> ${loker.lokasi || 'Lokasi'}</small>
                        <hr>
                        <button class="btn btn-outline-primary btn-sm w-100 mb-1">Lihat Detail</button>
                        ${btnEdit}
                    </div>
                </div>
            </div>`);
    });
}

//edit loker berdasarkan id
function showLokerDetail(id) {
    const loker = daftarLoker.find(item => item.id === id);
    if (!loker) return;

    idLokerTerpilih = id;

    $('#modalLokerPosisi').text(loker.posisi);
    $('#modalLokerPerusahaan').text(loker.perusahaan);

    if (currentUserRole === 'staff') {
        // MODE STAFF: muncul tampilan form input untuk Edit Link & Deskripsi
        $('#modalLokerDeskripsi').html(`
            <div class="alert alert-info py-2 small mb-3"><i class="fas fa-user-shield me-2"></i>Mode Edit Staff Aktif</div>
            <div class="mb-3">
                <label class="fw-bold small mb-1">Deskripsi Pekerjaan:</label>
                <textarea id="editDeskripsiAdmin" class="form-control" rows="4">${loker.deskripsi}</textarea>
            </div>
            <div class="mb-2">
                <label class="fw-bold small mb-1">Link Pendaftaran (Hanya Admin):</label>
                <input type="text" id="editLinkAdmin" class="form-control" value="${loker.linkLamar || ''}" placeholder="https://...">
            </div>
        `);
        
        $('#btnLamarSekarang').text("SIMPAN PERUBAHAN DATA")
            .attr('onclick', `prosesSimpanLokerAdmin(${id})`)
            .attr('href', 'javascript:void(0)')
            .removeClass('btn-primary').addClass('btn-success');
    } else {

        // MODE ALUMNI: Tampilkan teks deskripsi dan tombol lamar asli
        $('#modalLokerDeskripsi').text(loker.deskripsi);
        
        $('#btnLamarSekarang').text("Lamar Sekarang")
            .attr('href', loker.linkLamar || "#")
            .attr('target', '_blank')
            .removeAttr('onclick')
            .removeClass('btn-success').addClass('btn-primary');
    }

    let lokerModal = new bootstrap.Modal(document.getElementById('lokerDetailModal'));
    lokerModal.show();
}

//edit dan simpan loker oleh admin
function prosesSimpanLokerAdmin(id) {
    if (currentUserRole !== 'staff') {
        alert("Akses Ditolak!");
        return;
    }

    const index = daftarLoker.findIndex(l => l.id === id);
    if (index !== -1) {
        // 1. Ambil data dari input modal
        daftarLoker[index].deskripsi = $('#editDeskripsiAdmin').val();
        daftarLoker[index].linkLamar = $('#editLinkAdmin').val();

        alert("DATA BERHASIL DISIMPAN!");
        
        // 2. Tutup modal 
        const modalElement = document.getElementById('lokerDetailModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();

        // 3. BALIK KE PUSAT KENDALI ADMIN
        // Dashboard tetap muncul
        $('#main-dashboard').removeClass('hidden-section').show();
        
        // Sembunyikan bagian konten (Halaman Berita/Loker)
        $('#subpage-home').addClass('hidden-section').hide();
        
        // Tampilan kembali Panel Menu Admin (Pusat Kendali)
        $('#admin-control-panel').removeClass('hidden-section').fadeIn(500);

        // 4. Update tampilan data di background
        renderLoker();
        window.scrollTo(0, 0);
    }
}

/* =========================================
   7. FORM PENDAFTARAN ALUMNI
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
   8. BAGIAN INISIASI KE SPREADSHEET
   ========================================= */
$(document).ready(function() {
    startNewsTicker();
    renderLoker();

    // URL WEB APP GOOGLE SCRIPT 
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwpUji6h4vDHn4e9xxDV6OJ3Is1QXLsnoa5USyK7Rh9lXH3OzoYkv6oSGi3hLTslMc/exec'; 

    function ambilDataDariSheets() {
        console.log("Sedang mengambil data terbaru...");
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

    // Panggil fungsi ambil data di appscript saat halaman siap
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

        // Ambil nilai status dan detail
        const statusVal = $('#inputPosisi').val(); 
        const detailVal = $('#inputDetail1').val();
        
        // gabungan status (Bekerja/Wirausaha/Pendidikan) dengan detailnya
        const posisiLengkap = detailVal ? `${statusVal} (${detailVal})` : statusVal;

        // Susunan data (Nama key sesuai dengan params di Apps Script)
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

        // Kirim data ke Google Sheets via Apps Script
        fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors', // untuk menghindari masalah CORS saat submit di browser
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            alert('DATA BERHASIL TERKIRIM KE GOOGLE SHEETS!');

            // Tambah data ke database lokal untuk update tabel langsung
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

// Fungsi filter alumni berdasarkan input user di tabel publik
function filterAlumni() {
    let inputNama = document.getElementById("searchAlumni").value.toLowerCase();
    let selectTahun = document.getElementById("filterTahunAlumni").value;
    let selectProdi = document.getElementById("filterProdiAlumni").value.toUpperCase();
    let table = document.getElementById("alumni-public-table");
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        let tdNama = tr[i].getElementsByTagName("td")[1];
        let tdProdi = tr[i].getElementsByTagName("td")[2];
        let tdTahun = tr[i].getElementsByTagName("td")[3];

        if (tdNama && tdProdi && tdTahun) {
            let txtNama = tdNama.textContent || tdNama.innerText;
            let txtProdi = tdProdi.textContent || tdProdi.innerText;
            let txtTahun = tdTahun.textContent || tdTahun.innerText;

            // Cek kecocokan untuk setiap filter
            let matchNama = txtNama.toLowerCase().indexOf(inputNama) > -1;
            let matchProdi = (selectProdi === "" || txtProdi.toUpperCase().includes(selectProdi));
            let matchTahun = (selectTahun === "" || txtTahun.trim() === selectTahun);

            // Tampilkan atau sembunyikan baris berdasarkan kecocokan
            if (matchNama && matchProdi && matchTahun) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
    // untuk menambahkan fitur under construction pada kartu pendidikan
    const educationCards = document.querySelectorAll('.education-info-card');
    educationCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = this.querySelector('h5').innerText;
            alert("MAAF!\n\nFitur '" + title + "' masih dalam tahap pembangunan (Under Construction).\nSilakan cek kembali nanti!");
        });
    })

/* ============================================================
   9. SISTEM PENCARIAN FITUR CEPAT DASHBOARD
   ============================================================ */
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
                switchMainTab(item.target); // Memanggil fungsi navigasi 
                tutupPanelCari();
            };
            box.appendChild(div);
        });
    }
}

/* ============================================================
   10. KONTROL PANEL ADMIN & STAFF
   ============================================================ */

function onLoginSuccess() {
    // menyembunyikan dashboard utama tempat konten berada
    document.getElementById('subpage-home').classList.add('hidden-section');
    document.getElementById('admin-control-panel').classList.remove('hidden-section');
    // tombol "Edit (Staf Only)" di seluruh web
    const adminButtons = document.querySelectorAll('.admin-only');
    adminButtons.forEach(btn => {
        btn.style.setProperty('display', 'block', 'important');
    });
}

// fungsi untuk menampilkan section edit berdasarkan tipe oleh staf
function showEditSection(type) {
    document.getElementById('admin-control-panel').classList.add('hidden-section');
    document.getElementById('subpage-home').classList.remove('hidden-section');
    
    // IZIN EDIT 
    applyRolePermissions(); 

    if(type === 'news') {
        const newsElement = document.getElementById('news-ticker');
        if(newsElement) newsElement.scrollIntoView({ behavior: 'smooth' });
        alert('MODE EDIT BERITA AKTIF: Silahkan klik langsung pada teks yang ingin diubah.');
    } 
    else if(type === 'career') {
        renderLoker(); 
        const careerElement = document.getElementById('loker-container');
        if(careerElement) careerElement.scrollIntoView({ behavior: 'smooth' });
        alert('MODE EDIT LOWONGAN AKTIF: Gunakan tombol "Kelola & Edit" pada kartu lowongan.');
    }
    else if(type === 'alumni') {
        executeSwitchTab('data');
        updatePublicAlumniTable();
        alert('MODE MANAJEMEN DATA ALUMNI AKTIF.');
    }
}

// fungsi logout staf dan reload halaman
function logoutStaff() {
    location.reload(); 
}

function matikanModeEdit() {
    currentUserRole = "";
    isStaffAuthenticated = false;

    // menghilangkan semua mode edit setelah staf logout
    $('[contenteditable]').attr('contenteditable', 'false').css({
        'border': 'none',
        'padding': '0',
        'cursor': 'default'
    });
    $('.admin-only').hide();
    $('#admin-control-panel').addClass('hidden-section');
    alert("Mode Admin dinonaktifkan. Anda sekarang dalam mode pengunjung.");
    location.reload(); 
}

function kembaliKePanelAdmin() {
    $('[id^="subpage-"]').addClass('hidden-section').hide();
    $('#admin-control-panel').removeClass('hidden-section').fadeIn(400);
    $('#main-dashboard').removeClass('hidden-section').show();
    $('[contenteditable]').css('border', 'none');
    
    window.scrollTo(0, 0);
}

/* ============================================================
   11. HUBUNGKAN & SIMPAN PERUBAHAN KE GITHUB
   ============================================================ */
async function simpanKeGithub() {
    const GITHUB_TOKEN = "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";
    const OWNER = "novitarahayu-yn";
    const REPO = "database_alumni_fkom";
    const PATH = "projek1.js"; 

    try {
        // 1. Ambil kode yang sedang berjalan sekarang di browser
        // Kita butuh mengambil seluruh isi file agar fungsi lain tidak hilang
        const responseFetch = await fetch(`https://raw.githubusercontent.com/${OWNER}/${REPO}/main/${PATH}`);
        const textLama = await responseFetch.text();

        // 2. Ambil SHA (ID unik file untuk keperluan update)
        const resData = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
            headers: { "Authorization": `token ${GITHUB_TOKEN}` }
        });
        const jsonRes = await resData.json();
        const sha = jsonRes.sha;

        // 3. Update bagian data berita dan loker saja di dalam teks kode
        let teksBaru = textLama
            .replace(/const beritaFkom = \[[\s\S]*?\];/, `const beritaFkom = ${JSON.stringify(beritaFkom, null, 4)};`)
            .replace(/const daftarLoker = \[[\s\S]*?\];/, `const daftarLoker = ${JSON.stringify(daftarLoker, null, 4)};`);

        // 4. Kirim balik ke GitHub
        const finalRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
            method: "PUT",
            headers: {
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Update data via Admin Portal",
                content: btoa(unescape(encodeURIComponent(teksBaru))), // Encode aman
                sha: sha
            })
        });

        if (finalRes.ok) {
            alert("✅ UPDATE BERHASIL! Cek GitHub kamu sekarang.");
            location.reload();
        } else {
            alert("❌ GAGAL! Pastikan Token kamu benar dan punya izin 'repo'.");
        }
    } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan koneksi.");
    }
}