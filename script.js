document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', storedTheme);
    themeToggle.textContent = storedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // 2. Projets (Chemins relatifs pour ta structure de dossiers)
    const grid = document.getElementById('portfolio-grid');
    const myProjects = [
        { 
            title: "Boucherie du Terroir", 
            category: "ecommerce", 
            desc: "Plateforme de vente en ligne avec Click & Collect.",
            url: "projects/projet-1/index.html" 
        },
        { 
            title: "Cabinet Médical", 
            category: "vitrine", 
            desc: "Interface de présentation et prise de contact.",
            url: "projects/projet-2/index.html" 
        },
        { 
            title: "Portfolio Artiste", 
            category: "vitrine", 
            desc: "Galerie immersive haute résolution.",
            url: "projects/projet-3/index.html"
        },
        { 
            title: "SaaS Analytics", 
            category: "ecommerce", 
            desc: "Tableau de bord de gestion de données métier.",
            url: "projects/projet-4/index.html"
        }
    ];

    // 3. Skeleton Loading
    function showSkeletons() {
        grid.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const s = document.createElement('div');
            s.className = 'project-card';
            s.innerHTML = `
                <div class="skel skel-tag"></div>
                <div class="skel skel-title"></div>
                <div class="skel skel-text"></div>
                <div class="skel skel-text"></div>
            `;
            grid.appendChild(s);
        }
    }

    function renderProjects(filter = 'all') {
        showSkeletons();
        setTimeout(() => {
            grid.innerHTML = '';
            const filtered = filter === 'all' ? myProjects : myProjects.filter(p => p.category === filter);
            filtered.forEach(p => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <div>
                        <span class="project-category" style="color:var(--accent-color); font-size:0.7rem; font-weight:800; text-transform:uppercase;">${p.category}</span>
                        <h3 style="margin: 0.5rem 0;">${p.title}</h3>
                        <p style="font-size:0.9rem; color:var(--text-light);">${p.desc}</p>
                    </div>
                    <a href="${p.url}" target="_blank" class="accent" style="text-decoration:none; font-weight:700; margin-top:1.5rem; display:block; font-size:0.9rem;">Explorer le projet →</a>
                `;
                grid.appendChild(card);
            });
        }, 600); // Temps du skeleton
    }

    // 4. Filtres
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.getAttribute('data-filter'));
        });
    });

    // 5. Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Init
    renderProjects();
});

function closeModal() {
    document.getElementById('thanks-modal').style.display = 'none';
}
