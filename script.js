document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DARK MODE
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

    // 2. PROJETS (SANS IMAGES)
    const grid = document.getElementById('portfolio-grid');
    const myProjects = [
        { title: "E-Commerce Luxe", category: "ecommerce", desc: "Une boutique minimaliste pour une marque de montres." },
        { title: "Cabinet d'Avocats", category: "vitrine", desc: "Site institutionnel avec gestion de prise de RDV." },
        { title: "Portfolio Créatif", category: "vitrine", desc: "Site pour un photographe avec animations fluides." },
        { title: "Marketplace Art", category: "ecommerce", desc: "Vente d'œuvres numériques avec système d'enchères." }
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
                <a href="#" class="project-link">Découvrir le projet →</a>
            `;
            grid.appendChild(card);
        });
    }

    // 3. FILTRES
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.getAttribute('data-filter'));
        });
    });

    // 4. MODAL & FORMULAIRE
    const form = document.getElementById('main-contact-form');
    const modal = document.getElementById('thanks-modal');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            form.reset();
        });
    }
    window.closeModal = () => { modal.style.display = 'none'; };

    // 5. ANIMATIONS AU SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Lancement initial
    renderProjects();
});
