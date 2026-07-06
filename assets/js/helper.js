// SIGURU-SD BADUNG - FRONTEND API HELPER

const API_URL = 'https://script.google.com/macros/s/AKfycbxZnPqp9hxKdM5Eh2YZOJ6KmmjPWkTZ9Q3qV3RpEeInxYEmD848F4Vj8xHiC1yQcJce/exec';

console.log('🔧 SIGURU-SD Helper.js loaded');
console.log('📍 API_URL:', API_URL);

async function apiGet(action, params = {}) {
    console.log('\n📡 API GET:', action);
    console.log('Params:', params);
    
    try {
        let url = API_URL + '?action=' + encodeURIComponent(action);
        
        // HANYA tambahkan parameter yang TIDAK kosong
        Object.keys(params).forEach(key => {
            const value = params[key];
            if (value !== null && value !== undefined && value !== '' && value !== 'undefined' && value !== 'null') {
                url += '&' + key + '=' + encodeURIComponent(value);
                console.log('✅ Added param:', key, '=', value);
            } else {
                console.log('⏭️ Skipped empty param:', key);
            }
        });
        
        console.log('🔗 Final URL:', url);
        
        const response = await fetch(url, { method: 'GET', redirect: 'follow' });
        const text = await response.text();
        console.log('📥 Response:', text.substring(0, 300));
        
        const data = JSON.parse(text);
        console.log('✅ Parsed - Success:', data.success, 'Data length:', data.data?.length || 0);
        
        return data;
    } catch (error) {
        console.error('❌ Error:', error);
        return { success: false, message: 'Koneksi gagal: ' + error.message };
    }
}

async function apiPost(action, data = {}) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: action, ...data }),
            redirect: 'follow'
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: 'Koneksi gagal' };
    }
}

// API Functions
async function login(username, password, role) { return await apiGet('login', { username, password, role }); }
async function getSekolah(filters = {}) { return await apiGet('getSekolah', filters); }
async function saveSekolah(data) { return await apiPost('saveSekolah', data); }
async function getGuru(filters = {}) { return await apiGet('getGuru', filters); }
async function saveGuru(data) { return await apiPost('saveGuru', data); }
async function getKebutuhanGuru(filters = {}) { return await apiGet('getKebutuhanGuru', filters); }
async function getLaporanKekurangan(filters = {}) { return await apiGet('getLaporanKekurangan', filters); }
async function saveLaporanKekurangan(data) { return await apiPost('saveLaporanKekurangan', data); }
async function getDistribusiGuru(filters = {}) { return await apiGet('getDistribusiGuru', filters); }
async function saveDistribusiGuru(data) { return await apiPost('saveDistribusiGuru', data); }
async function updateStatusLaporan(data) { return await apiPost('updateStatusLaporan', data); }
async function updateStatusDistribusi(data) { return await apiPost('updateStatusDistribusi', data); }
async function getStats() { return await apiGet('getStats'); }
async function getAnalisisKekurangan() { return await apiGet('getAnalisisKekurangan'); }

// UI Functions
function showNotif(pesan, tipe = 'success') {
    const notif = document.createElement('div');
    notif.className = `alert alert-${tipe} alert-dismissible fade show position-fixed`;
    notif.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    notif.innerHTML = `${pesan}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

function showLoading(pesan = 'Memproses...') {
    let loader = document.getElementById('globalLoader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;';
        loader.innerHTML = `<div class="bg-white rounded-3 p-4 text-center"><div class="spinner-border text-navy mb-2"></div><p class="mb-0">${pesan}</p></div>`;
        document.body.appendChild(loader);
    }
}

function hideLoading() {
    const loader = document.getElementById('globalLoader');
    if (loader) loader.style.display = 'none';
}
