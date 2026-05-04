document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // Gestion du formulaire de contact avec CAPTCHA et redirection
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            // Récupération de la réponse Turnstile
            const turnstileResponse = formData.get('cf-turnstile-response');

            // Vérification côté client : bloque l'envoi si le CAPTCHA n'est pas validé
            if (!turnstileResponse) {
                alert('⚠️ Veuillez cocher ou valider le CAPTCHA avant d\'envoyer le formulaire.');
                return;
            }

            const data = {
                name: formData.get('name'),
                company: formData.get('company'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                budget: formData.get('budget'),
                message: formData.get('message'),
                captchaToken: turnstileResponse // Token transmis pour la validation serveur
            };

            console.log('Demande de contact prête à être envoyée au backend:', data);
            
            // C'est ici que vous ferez votre requête fetch() vers votre serveur backend.
            // Exemple : fetch('/votre-api/contact', { method: 'POST', body: JSON.stringify(data) })

            // Réinitialisation du formulaire avant la redirection
            contactForm.reset();

            // Réinitialisation du widget CAPTCHA
            if (typeof turnstile !== 'undefined') {
                turnstile.reset();
            }

            // Redirection vers la page de remerciement
            window.location.href = 'merci.html';
        });
    }

    // Animation au scroll (fade-in)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Mobile menu toggle
    const toggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (toggle && navMenu) {
        toggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});
