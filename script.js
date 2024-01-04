function toggleMenu() {
    var menu = document.getElementById("menu-principal");
    menu.classList.toggle("active");

    let links = document.querySelectorAll('#menu-principal a');

    if (menu.classList.contains("active")) {
        links.forEach((link, index) => {
            link.style.opacity = "0";
            link.style.animation = `fadeInDown 0.5s ease forwards ${index * 100 + 300}ms`;
        });
        document.body.style.overflow = 'hidden';
    } else {
        links.forEach(link => {
            link.style.opacity = "0";
            link.style.animation = '';
        });
        document.body.style.overflow = '';
    }
}

document.querySelectorAll('#menu-principal a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const href = link.getAttribute('href');
        const section = document.querySelector(href);

        // Ferme le menu hamburger
        toggleMenu();

        // Calcule la position de la section avec un décalage de 100px
        const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - 100;

        // Défilement doux vers la position calculée
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
});


document.getElementById('lienApropos').addEventListener('click', function(e) {
    e.preventDefault(); // Empêche le comportement de lien par défaut

    var apropos = document.querySelector('#apropos');
    if (apropos) {
        var offsetTop = apropos.getBoundingClientRect().top + window.pageYOffset - 100; // Calcul de la position avec un décalage de 100px
        window.scrollTo({ top: offsetTop, behavior: 'smooth' }); // Défilement doux vers la position calculée
    }
});

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden'; // Désactive le défilement
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.remove('show');
    modal.addEventListener('transitionend', () => {
        modal.style.display = 'none';
    }, { once: true });
    document.body.style.overflow = ''; // Réactive le défilement
}

// Ferme le modal lorsqu'on clique en dehors
window.onclick = function(event) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
}

function openImageModal(modalId) {
    // Utilisez la même logique que pour openModal pour cohérence
    openModal(modalId);
}

// openModal et closeModal restent inchangés.

// Assurez-vous que closeModal peut gérer la fermeture des deux types de modals
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        modal.addEventListener('transitionend', () => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Réactive le défilement
        }, { once: true });
    } else {
        // Si le modal est déjà en train de disparaître, rétablissez le scroll immédiatement
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Réactive le défilement
    }
}

// Modifier légèrement window.onclick pour gérer correctement les clics sur l'arrière-plan
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return (
            rect.top <= windowHeight * 0.50 && // Démarre l'animation lorsque l'élément atteint 75% du haut de l'écran
            rect.bottom >= 0
        );
    }

    function checkVisibility() {
        for (const element of elements) {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        }
    }

    // Vérifie la visibilité des éléments au chargement de la page
    checkVisibility();

    // Ajoute un écouteur d'événements pour le défilement
    window.addEventListener('scroll', checkVisibility);
});