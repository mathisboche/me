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
        event.preventDefault(); // Empêcher le comportement par défaut du lien
        const href = link.getAttribute('href');
        const section = document.querySelector(href);

        // Fermer le menu avant de commencer le défilement
        toggleMenu();

        // Attendre la fin de l'animation du menu avant de défiler
        /*setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Ajustez ce délai si nécessaire*/
        
        section.scrollIntoView({ behavior: 'smooth' });
        
    });
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
