// Fonction pour l'animation au scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Écouteur d'événement au scroll
window.addEventListener("scroll", reveal);

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
    reveal();
    
    // Message fictif pour le bouton commander
    const orderBtn = document.querySelector('.btn-order');
    orderBtn.addEventListener('click', () => {
        alert("La fonctionnalité de commande en ligne arrive bientôt chez La Mie Dorée !");
    });
});