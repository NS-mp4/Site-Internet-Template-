document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Barre de progression de lecture
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-indicator').style.width = scrolled + "%";
    });

    // 2. Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    });

    // 3. Projets Magnétiques (Effet Tilt)
    const projects = [
        { title: "Neo-Bank App", desc: "Interface bancaire futuriste.", cat: "Fintech" },
        { title: "Luxury E-shop", desc: "Boutique haute couture.", cat: "E-commerce" },
        { title: "Smart Home", desc: "Contrôle domotique web.", cat: "SaaS" }
    ];

    const grid = document.getElementById('portfolio-grid');
    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `<div><small>${p.cat}</small><h3>${p.title}</h3><p>${p.desc}</p></div>`;
        
        // Effet Magnétique (Tilt)
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });

        grid.appendChild(card);
    });

    // 4. Animations Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

function closeModal() { document.getElementById('thanks-modal').style.display = 'none'; }
