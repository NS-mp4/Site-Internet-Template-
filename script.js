document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dark Mode ---
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

    // --- 2. Portfolio : Données et Rendu ---
    const grid = document.getElementById('portfolio-grid');
    
    // Ajoute tes projets ici
    const myProjects = [
        { 
            title: "Plateforme E-commerce", 
            category: "ecommerce", 
            desc: "Une boutique en ligne complète avec paiement sécurisé et gestion de stock.",
            link: "#" 
        },
        { 
            title: "Cabinet Médical", 
            category: "vitrine", 
            desc: "Site vitrine moderne avec prise de rendez-vous en ligne.",
            link: "#" 
        },
        { 
            title: "Portfolio Artiste", 
            category: "vitrine", 
            desc: "Design épuré mettant en avant des travaux visuels avec animations fluides.",
            link: "#" 
        },
        { 
            title: "SaaS Dashboard", 
            category: "ecommerce", 
            desc: "Interface d'administration complexe pour la gestion de données clients.",
            link: "#" 
        }
    ];

    function renderProjects(filter = 'all') {
        grid.innerHTML = ''; // Nettoyer la grille
        
        const filtered = filter === 'all' 
            ? myProjects 
            : myProjects.filter(p => p.category === filter);

        filtered.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card fade-in visible'; // visible pour éviter les bugs d'opacité
            
            card.innerHTML = `
                <div>
                    <span class="project-category">${project.category}</span>
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                </div>
                <a href="${project.link}" class="project-link">Découvrir le projet →</a>
            `;
            grid.appendChild(card);
        });
    }

    // --- 3. Filtrage ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.getAttribute('data-filter'));
        });
    });

    // --- 4. Formulaire & Modal ---
    const form = document.getElementById('main-contact-form');
    const modal = document.getElementById('thanks-modal');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            form.reset();
        });
    }

    window.closeModal = () => {
        modal.style.display = 'none';
    };

    // Initialisation
    renderProjects();
});
