function toggleMenu() {
    var menu = document.getElementById("menu-principal");
    menu.classList.toggle("active");

    let links = document.querySelectorAll('#menu-principal a');

    if (menu.classList.contains("active")) {
        links.forEach((link, index) => {
            link.style.opacity = "0";
            link.style.animation = `fadeInDown 0.5s ease forwards ${index * 100 + 300}ms`;
        });
    } else {
        links.forEach(link => {
            link.style.opacity = "0";
            link.style.animation = '';
        });
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
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
        }, 500); // Ajustez ce délai si nécessaire
    });
});