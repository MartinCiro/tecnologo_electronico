// ==========================================
// UTILIDADES DE RUTA
// ==========================================
const getBasePath = () => {
    const path = window.location.pathname;
    if (window.location.hostname.includes('github.io')) {
        const parts = path.split('/').filter(Boolean);
        return parts.length > 0 ? `/${parts[0]}/` : '/';
    }
    return '/';
};
const ROOT = getBasePath();
window.ROOT = ROOT;

// ==========================================
// CARGA DE COMPONENTES (Navbar / Footer)
// ==========================================
async function loadComponent(containerId, url) {
    try {
        const response = await fetch(`${ROOT}${url}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    } catch (error) {
        console.error(`Error cargando ${url}:`, error);
    }
}

// ==========================================
// INICIALIZACIÓN AL CARGAR EL DOM
// ==========================================
// 👉 1. AGREGAR 'async' AQUÍ
document.addEventListener('DOMContentLoaded', async () => {
    
    // 👉 2. USAR 'await' PARA ESPERAR A QUE EL HTML SE INYECTE
    await loadComponent('navbar-container', './components/layouts/navbar.html');
    await loadComponent('footer-container', './components/layouts/footer.html');

    // 👉 3. AHORA SÍ, el botón existe en el DOM y se puede seleccionar
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const html = document.documentElement;
            const isDark = html.classList.contains('dark');
            
            if (isDark) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    // 4. Lógica dinámica para páginas de evidencia
    if (window.EVIDENCIA_CODIGO) {
        const infoEl = document.getElementById('footer-evidencia-info');
        if (infoEl) {
            infoEl.classList.remove('hidden');
            const codigoEl = document.getElementById('footer-codigo-dinamico');
            if (codigoEl) codigoEl.textContent = window.EVIDENCIA_CODIGO;
        }
    }

    if (window.EVIDENCIA_TITULO) {
        document.title = `${window.EVIDENCIA_TITULO} (${window.EVIDENCIA_CODIGO || 'Evidencia'}) | Mr. Ciro`;
        const titleEl = document.getElementById('dynamic-title');
        if (titleEl) titleEl.textContent = window.EVIDENCIA_TITULO;
    }
});