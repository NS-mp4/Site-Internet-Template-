document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Chargement Dynamique des Projets ---
    const grid = document.getElementById('portfolio-grid');
    let allProjects = [];

    async function loadProjects() {
        try {
            // Étape 1 : Lire le catalogue
            const response = await fetch('projects.json');
            const projectFolders = await response.json();

            // Étape 2 : Boucler sur chaque dossier et récupérer data.json
            for (const folder of projectFolders) {
                const dataResponse = await fetch(`projects/${folder}/data.json`);
                const projectData = await dataResponse.json();
                
                // Ajouter le nom du dossier pour construire les liens
                projectData.folder = folder; 
                allProjects.push(projectData);
            }

            renderProjects(allProjects);

        } catch (error) {
            console.error("Erreur lors du chargement des projets:", error);
            grid.innerHTML = "<p>Impossible de charger les projets pour le moment.</p>";
        }
    }

    function renderProjects(projects) {
        grid.innerHTML = ''; // On vide la grille
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-category', project.category);
            
            card.innerHTML = `
                <img src="projects/${project.folder}/preview.png" alt="${project.title}" loading="lazy">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="projects/${project.folder}/index.html" target="_blank">Voir le site →</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // --- 2. Filtrage des Projets ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Gérer le style actif
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Filtrer
            const filterValue = e.target.getAttribute('data-filter');
            const cards = document.querySelectorAll('.project-card');

            cards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 3. Animations au Scroll (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });

    // Lancer le chargement
    loadProjects();
});