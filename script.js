document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Thème Sombre/Clair
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

    // 2. Base de données projets
    const grid = document.getElementById('portfolio-grid');
    const myProjects = [
        { 
            title: "Boucherie du Terroir", 
            category: "ecommerce", 
            desc: "Plateforme de vente en ligne optimisée pour le Click & Collect.",
            url: "projects/projet-1/index.html" 
        },
        { 
            title: "Cabinet Médical", 
            category: "vitrine", 
            desc: "Site vitrine professionnel avec prise de contact sécurisée.",
            url: "projects/projet-2/index.html" 
        },
        { 
            title: "Portfolio Artiste", 
            category: "vitrine", 
            desc: "Galerie immersive avec chargement d'images progressif.",
            url: "projects/projet-3/index.html"
        },
        { 
            title: "SaaS Analytics", 
            category: "ecommerce", 
            desc: "Dashboard complexe pour la gestion de données en temps réel.",
            url: "projects/projet-4/index.html"
        }
    ];

    // 3. Rendu des projets avec Skeleton Loading
    function showSkeletons() {
        grid.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const s = document.createElement('div');
            s.className = 'project-card';
            s.innerHTML = `
                <div class="skel skel-tag"></div>
                <div class="skel skel-title"></div>
                <div class="skel skel-text"></div>
                <div class="skel skel-text" style="width:80%"></div>
            `;
            grid.appendChild(s);
        }
    }

    function renderProjects(filter = 'all') {
        showSkeletons();
        
        // Simulation légère pour laisser le skeleton apparaître
        setTimeout(() => {
            grid.innerHTML = '';
            const filtered = filter === 'all' ? myProjects : myProjects.filter(p => p.category === filter);
            
            filtered.forEach(p => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <div>
                        <span class="project-category" style="color:var(--accent-color); font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:1px;">${p.category}</span>
                        <h3 style="margin: 0.6rem 0; font-size: 1.25rem;">${p.title}</h3>
                        <p style="font-size:0.95rem; color:var(--text-light); line-height:1.5;">${p.desc}</p>
                    </div>
                    <a href="${p.url}" target="_blank" class="accent" 
                       aria-label="Explorer le projet ${p.title}"
                       style="text-decoration:none; margin-top:1.5rem; display:block; font-size:0.9rem;">
                       Explorer le projet →
                    </a>
                `;
                grid.appendChild(card);
            });
        }, 500);
    }

    // 4. Système de filtres
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.getAttribute('data-filter'));
        });
    });

    // 5. Gestion du formulaire
    const form = document.getElementById('main-contact-form');
    const modal = document.getElementById('thanks-modal');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            form.reset();
        });
    }

    // 6. Animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Initialisation
    renderProjects();
});

// Fermeture de la modal
function closeModal() {
    const modal = document.getElementById('thanks-modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}
