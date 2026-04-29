document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gestion du Thème (Dark Mode)
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

    // 2. Liste des Projets (Relie tes dossiers ici)
    const grid = document.getElementById('portfolio-grid');
    const myProjects = [
        { 
            title: "Boucherie du Terroir", 
            category: "ecommerce", 
            desc: "Un site moderne avec gestion de panier fluide.",
            url: "projects/projet-1/index.html" 
        },
        { 
            title: "Boucherie du Terroir", 
            category: "vitrine", 
            desc: "Site professionnel avec formulaire de rendez-vous.",
            url: "projects/projet-2/index.html" 
        },
        { 
            title: "Portfolio Artiste", 
            category: "vitrine", 
            desc: "Mise en avant visuelle avec galerie interactive.",
            url: "projects/projet-3/index.html"
        },
        { 
            title: "Dashboard SaaS", 
            category: "ecommerce", 
            desc: "Interface de gestion de données et statistiques.",
            url: "projects/projet-4/index.html"
        }
    ];

    function renderProjects(filter = 'all') {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? myProjects : myProjects.filter(p => p.category === filter);

        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div>
                    <span class="project-category">${p.category}</span>
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                </div>
                <a href="${p.url}" target="_blank" class="accent" style="text-decoration:none; font-weight:700; margin-top:1.5rem; display:block;">Découvrir le projet →</a>
            `;
            grid.appendChild(card);
        });
    }

    // 3. Système de Filtres
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.getAttribute('data-filter'));
        });
    });

    // 4. Formulaire & Success Modal
    const form = document.getElementById('main-contact-form');
    const modal = document.getElementById('thanks-modal');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            form.reset();
        });
    }

    // 5. Animations d'apparition (Scroll)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Initialisation
    renderProjects();
});

// Fonction pour fermer la modal
function closeModal() {
    document.getElementById('thanks-modal').style.display = 'none';
}
