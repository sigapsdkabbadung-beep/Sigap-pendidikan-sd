// ============================================
// SIGURU-SD BADUNG - APP HELPER
// ============================================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth < 992) {
        if (!sidebar.contains(e.target) && !e.target.closest('[onclick*="toggleSidebar"]')) {
            sidebar.classList.remove('show');
        }
    }
});

// Tutup sidebar saat resize ke desktop
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth >= 992) {
        sidebar.classList.remove('show');
    }
});