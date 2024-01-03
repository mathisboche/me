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
