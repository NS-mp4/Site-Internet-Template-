document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Barre de progression
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const indicator = document.getElementById('scroll-indicator');
        if(indicator) indicator.style.width = scrolled + "%";
    });

    // 2. Dark Mode
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

    // 3. Projets et Effet Magnétique (Tilt)
    const grid = document.getElementById('portfolio-grid');
    const projects = [
        { title: "Neo-Bank", desc: "Design bancaire futuriste.", cat: "FINTECH" },
        { title: "Luxury Shop", desc: "E-commerce haut de gamme.", cat: "LUXE" },
        { title: "SaaS Monitor", desc: "Tableau de bord complexe.", cat: "TECH" }
    ];

    if(grid) {
        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `<div><small style="color:var(--accent-color);font-weight:800">${p.cat}</small><h3>${p.title}</h3><p>${p.desc}</p></div>`;
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(1000px) rotateX(${y * -20}deg) rotateY(${x * 20}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });

            grid.appendChild(card);
        });
    }

    // 4. Formulaire
    const form = document.getElementById('main-contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('thanks-modal').style.display = 'flex';
            form.reset();
        });
    }

    // 5. Observer pour animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

function closeModal() {
    document.getElementById('thanks-modal').style.display = 'none';
}
