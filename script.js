document.addEventListener('DOMContentLoaded', () => {
    // 1. Thème Sombre/Clair avec sauvegarde
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '☀️';
    }
    
    themeBtn.addEventListener('click', () => {
        const body = document.documentElement;
        const isDark = body.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        body.setAttribute('data-theme', nextTheme);
        themeBtn.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', nextTheme);
    });
    
    // 2. Projets Portfolio
    const grid = document.getElementById('portfolio-grid');
    const projects = [
        { 
            title: "Boucherie du Terroir", 
            cat: "E-commerce", 
            desc: "Plateforme de vente en ligne complète avec système Click & Collect, gestion des stocks en temps réel et paiement sécurisé." 
        },
        { 
            title: "Cabinet Médical Dr. Laurent", 
            cat: "Site Vitrine", 
            desc: "Site professionnel optimisé pour le référencement local (SEO), système de prise de rendez-vous en ligne et conformité RGPD." 
        },
        { 
            title: "SaaS Analytics Pro", 
            cat: "Application Web", 
            desc: "Tableau de bord interactif pour la gestion et l'analyse de données clients avec visualisations en temps réel et exports automatisés." 
        }
    ];
    
    grid.innerHTML = projects.map(p => `
        <div class="project-card">
            <span class="accent" style="font-size:0.75rem; text-transform:uppercase; letter-spacing:1px;">${p.cat}</span>
            <h3 style="margin:0.8rem 0 1.2rem; font-size:1.4rem;">${p.title}</h3>
            <p style="color:var(--text-light); font-size:0.95rem; margin-bottom:1.5rem;">${p.desc}</p>
            <a href="#contact" style="text-decoration:none; font-weight:700; color:var(--accent-color);">Demander un devis →</a>
        </div>
    `).join('');
    
    // 3. Animation au Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    // 4. Gestion du formulaire de contact
    const contactForm = document.getElementById('main-contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            company: formData.get('company'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Simulation d'envoi (à remplacer par votre backend)
        console.log('Demande de devis:', data);
        
        alert('✅ Merci pour votre demande ! Notre équipe vous recontactera dans les 24 heures.');
        contactForm.reset();
    });
    
    // 5. Modales pour les compétences techniques
    const skillsData = {
        react: {
            title: "React",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            description: "Bibliothèque JavaScript pour créer des interfaces utilisateur interactives et réactives. Utilisée pour développer des applications web modernes avec des composants réutilisables, idéale pour les sites à fort trafic nécessitant des mises à jour en temps réel."
        },
        javascript: {
            title: "JavaScript",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            description: "Langage de programmation essentiel du web moderne. Permet d'ajouter de l'interactivité aux sites web : animations, formulaires dynamiques, validation en temps réel, et bien plus. C'est la base de toutes les technologies front-end."
        },
        python: {
            title: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            description: "Langage polyvalent utilisé pour le développement back-end, l'automatisation de tâches, le traitement de données et l'intelligence artificielle. Parfait pour créer des API robustes, des scripts d'automatisation et des systèmes complexes."
        },
        html: {
            title: "HTML5 & CSS3",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            description: "Technologies fondamentales du web. HTML5 structure le contenu de vos pages (textes, images, vidéos), tandis que CSS3 gère le design et la mise en page. Ensemble, ils créent des sites web modernes, responsive et accessibles."
        },
        nodejs: {
            title: "Node.js",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            description: "Environnement JavaScript côté serveur permettant de créer des applications web rapides et scalables. Idéal pour les API REST, les applications en temps réel (chat, notifications) et les microservices."
        },
        typescript: {
            title: "TypeScript",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            description: "Extension de JavaScript ajoutant un système de types statiques. Réduit les bugs, améliore la maintenabilité du code et facilite le travail en équipe sur de gros projets. Recommandé pour les applications d'entreprise."
        },
        firebase: {
            title: "Firebase",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
            description: "Plateforme Google complète pour le développement d'applications. Offre une base de données en temps réel, authentification, hébergement, analytics et notifications push. Parfaite pour lancer rapidement des MVPs et prototypes."
        },
        mongodb: {
            title: "MongoDB",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
            description: "Base de données NoSQL flexible et scalable. Stocke les données au format JSON, idéale pour les applications nécessitant des requêtes rapides sur de gros volumes de données non structurées (réseaux sociaux, e-commerce, catalogues produits)."
        }
    };
    
    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-modal');
    
    // Ouvrir la modale au clic sur une compétence
    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            const skillKey = badge.getAttribute('data-skill');
            const skill = skillsData[skillKey];
            
            if (skill) {
                modalTitle.textContent = skill.title;
                modalIcon.src = skill.icon;
                modalIcon.alt = skill.title;
                modalDescription.textContent = skill.description;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Fermer la modale
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // 6. Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Hauteur de la navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
