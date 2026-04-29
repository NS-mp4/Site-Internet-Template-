document.addEventListener('DOMContentLoaded', () => {
    
    // Thème
    const btn = document.getElementById('theme-toggle');
    btn.addEventListener('click', () => {
        const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', t);
        btn.textContent = t === 'dark' ? '☀️' : '🌙';
    });

    // Projets
    const grid = document.getElementById('portfolio-grid');
    const projects = [
        { title: "Boucherie Terroir", cat: "ecommerce", desc: "Vente en ligne avec Click & Collect." },
        { title: "Cabinet Médical", cat: "vitrine", desc: "Présentation et prise de contact." },
        { title: "SaaS Analytics", cat: "ecommerce", desc: "Gestion de données en temps réel." }
    ];

    function render(filter = 'all') {
        grid.innerHTML = '<div class="skel skel-tag"></div><div class="skel skel-title"></div>'; // Skeleton simplifié
        setTimeout(() => {
            grid.innerHTML = '';
            projects.filter(p => filter === 'all' || p.cat === filter).forEach(p => {
                grid.innerHTML += `
                    <div class="project-card">
                        <div>
                            <span style="color:var(--accent-color); font-size:0.7rem; font-weight:800;">${p.cat.toUpperCase()}</span>
                            <h3>${p.title}</h3>
                            <p style="color:var(--text-light); font-size:0.9rem;">${p.desc}</p>
                        </div>
                        <a href="#" class="accent" style="text-decoration:none; margin-top:1rem; font-weight:700;">Explorer →</a>
                    </div>
                `;
            });
        }, 400);
    }

    document.querySelectorAll('.filter-btn').forEach(b => {
        b.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
            e.target.classList.add('active');
            render(e.target.dataset.filter);
        });
    });

    // Fade-in
    const obs = new IntersectionObserver(entries => {
        entries.forEach(en => { if(en.isIntersecting) en.target.classList.add('visible') });
    });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

    render();
});
