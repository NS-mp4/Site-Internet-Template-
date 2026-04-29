document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTION DU DARK MODE
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

    // 2. PARALLAXE LÉGÈRE SUR LA PHOTO
    const parallaxImg = document.getElementById('parallax-img');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 30;
        const y = (window.innerHeight / 2 - e.pageY) / 30;
        if(parallaxImg) parallaxImg.style.transform = `translate(${x}px, ${y}px)`;
    });

    // 3. FORMULAIRE & MODAL
    const form = document.getElementById('main-contact-form');
    const modal = document.getElementById('thanks-modal');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        form.reset();
    });

    window.closeModal = () => {
        modal.style.display = 'none';
    };

    // 4. ANIMATIONS AU SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 5. CHARGEMENT DES PROJETS (Simulation ou Fetch)
    const grid = document.getElementById('portfolio-grid');
    // Note: Remplace ce tableau par ton fetch() réel si tu as un fichier JSON
    const demoProjects = [
        { title: "Eco-Shop", category: "ecommerce", desc: "Boutique en ligne minimaliste." },
        { title: "Horizon", category: "vitrine", desc: "Site vitrine pour agence de voyage." }
    ];

    function render(projects) {
        grid.innerHTML = projects.map(p => `
            <div class="project-card" data-category="${p.category}">
                <div style="height:200px; background:#ddd;"></div>
                <div class="project-info">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                </div>
            </div>
        `).join('');
    }
    render(demoProjects);
});
