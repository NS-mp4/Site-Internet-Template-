document.addEventListener('DOMContentLoaded', () => {
    // Gestion du Thème Sombre
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const body = document.documentElement;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // Données des Projets
    const grid = document.getElementById('portfolio-grid');
    const projects = [
        { title: "Boucherie du Terroir", cat: "Ecommerce", desc: "Vente en ligne avec système de Click & Collect optimisé." },
        { title: "Cabinet Médical", cat: "Vitrine", desc: "Site professionnel avec prise de rendez-vous et SEO local." },
        { title: "SaaS Analytics", cat: "Web App", desc: "Dashboard complexe de gestion de données en temps réel." }
    ];

    // Injection des projets
    grid.innerHTML = projects.map(p => `
        <div class="project-card">
            <div>
                <span class="accent" style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px;">${p.cat}</span>
                <h3 style="margin:0.5rem 0 1rem;">${p.title}</h3>
                <p style="color:var(--text-light); font-size:0.95rem;">${p.desc}</p>
            </div>
            <a href="#" style="text-decoration:none; font-weight:700; color:var(--accent-color); margin-top:2rem; display:inline-block;">Explorer le projet →</a>
        </div>
    `).join('');

    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
