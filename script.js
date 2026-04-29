document.addEventListener('DOMContentLoaded', () => {
    // 1. Thème Sombre
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const body = document.documentElement;
        const isDark = body.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        body.setAttribute('data-theme', nextTheme);
        themeBtn.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
    });

    // 2. Projets Portfolio
    const grid = document.getElementById('portfolio-grid');
    const projects = [
        { title: "Boucherie du Terroir", cat: "Ecommerce", desc: "Plateforme de vente en ligne avec Click & Collect." },
        { title: "Cabinet Médical", cat: "Vitrine", desc: "Site professionnel optimisé pour le référencement local." },
        { title: "SaaS Analytics", cat: "Application", desc: "Outil de gestion de données clients en temps réel." }
    ];

    grid.innerHTML = projects.map(p => `
        <div class="project-card">
            <span class="accent" style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px;">${p.cat}</span>
            <h3 style="margin:0.8rem 0 1.2rem; font-size:1.4rem;">${p.title}</h3>
            <p style="color:var(--text-light); font-size:0.95rem; margin-bottom:1.5rem;">${p.desc}</p>
            <a href="#" style="text-decoration:none; font-weight:700; color:var(--accent-color);">Explorer →</a>
        </div>
    `).join('');

    // 3. Animation au Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
