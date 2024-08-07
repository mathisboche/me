import { Chess } from 'https://cdn.jsdelivr.net/npm/chess.js@0.13.1/chess.js';

document.addEventListener("DOMContentLoaded", function() {
    const timelineItems = document.querySelectorAll(".timeline-item");
    const isMobile = window.innerWidth <= 768;
    const luminescence = document.getElementById("luminescence");

    // Fonction pour vérifier si l'appareil est mobile
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }
    
    // Fonction pour gérer l'effet de luminescence
    function handleLuminescence(e) {
        if (!isMobileDevice()) {
            luminescence.style.left = e.clientX + "px";
            luminescence.style.top = e.clientY + "px";
            luminescence.style.display = "block";
        } else {
            luminescence.style.display = "none";
        }
    }
    
    // Ajouter l'écouteur d'événement uniquement si ce n'est pas un appareil mobile
    if (!isMobileDevice()) {
        document.addEventListener("mousemove", handleLuminescence);
    } else {
        luminescence.style.display = "none";
    }

    // Récupérer tous les éléments de la timeline et les cartes d'élo
    const eloCards = document.querySelectorAll(".elo-card");

    // Fonction pour trouver l'élément le plus centré dans la vue
    function findMostCenteredElement(elements) {
        const viewportHeight = window.innerHeight;
        let mostCentered = null;
        let smallestDistance = Infinity;

        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;
            const distance = Math.abs(elementCenter - viewportCenter);

            if (distance < smallestDistance) {
                smallestDistance = distance;
                mostCentered = element;
            }
        });

        return mostCentered;
    }

    // Fonction pour mettre à jour l'état de focus des éléments de la timeline
    function updateFocus() {
        const mostCenteredElement = findMostCenteredElement(timelineItems);

        timelineItems.forEach(item => {
            if (item === mostCenteredElement) {
                item.classList.add("in-focus");
                const emoji = item.querySelector(".emoji");
                if (emoji) {
                    emoji.style.opacity = "1";
                    emoji.style.transform = "translateY(0)";
                }
            } else {
                item.classList.remove("in-focus");
                const emoji = item.querySelector(".emoji");
                if (emoji) {
                    emoji.style.opacity = "0";
                    emoji.style.transform = "translateY(10px)";
                }
            }
        });

        // Mise à jour de l'effet de glow
        if (mostCenteredElement) {
            document.body.classList.add("darken-background");
            timelineItems.forEach(item => {
                if (item !== mostCenteredElement) {
                    item.classList.add("darken");
                } else {
                    item.classList.remove("darken");
                }
            });
        } else {
            document.body.classList.remove("darken-background");
            timelineItems.forEach(item => {
                item.classList.remove("darken");
            });
        }
    }

    // Fonction pour gérer l'apparition des éléments
    const handleAppearance = () => {
        timelineItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= windowHeight * 0.9) {
                item.classList.add("is-visible");
            }
        });
        updateFocus();
    };

    // Écouteur d'événements pour le défilement avec throttle
    let scrollThrottle;
    window.addEventListener("scroll", () => {
        if (!scrollThrottle) {
            scrollThrottle = setTimeout(() => {
                handleAppearance();
                scrollThrottle = null;
            }, 100); // Exécuter toutes les 100ms maximum
        }
    });
    
    // Appel initial pour gérer l'état initial
    handleAppearance();

    // Fonction pour ajouter la classe is-visible si l'élément est dans le viewport
    const run = () => {
        eloCards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= windowHeight * 0.9) {
                card.classList.add("is-visible");
            }
        });
    };

    // Exécutez la fonction run immédiatement après le chargement de la page
    run();

    // Utilisez un throttle pour limiter la fréquence d'exécution de la fonction run lors du défilement
    let ticking = false;
    window.addEventListener("scroll", function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                run();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Ajouter des événements pour vérifier le viewport au chargement et redimensionnement
    window.addEventListener("load", run);
    window.addEventListener("resize", run);

    // JavaScript pour le plateau d'échecs interactif
    var chessBoard = document.getElementById('chessboard');
    var chessInitialized = false;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !chessInitialized) {
                chessInitialized = true; // Empêche l'initialisation multiple

                // Initialisation du plateau d'échecs
                var board = Chessboard('chessboard', {
                    position: 'start',
                    pieceTheme: 'img/chesspieces/wikipedia/{piece}.png'
                });

                var game = new Chess();

                var londonSystemMoves = [
                    'd4', 'Nf6',
                    'Nf3', 'g6',
                    'Bf4', 'Bg7',
                    'e3', 'O-O',
                    'Be2', 'd6',
                    'h3', 'c5',
                    'c3', 'b6',
                    'O-O'
                ];

                var sicilianDefenseMoves = [
                    'e4', 'c5',
                    'Nf3', 'Nc6',
                    'd4', 'cxd4',
                    'Nxd4', 'd6',
                    'Nc3', 'Nf6',
                    'f3', 'e6',
                    'Be3', 'Be7',
                    'Qd2', 'O-O',
                    'O-O-O', 'a6',
                    'g4', 'Nxd4',
                    'Bxd4', 'b5'
                ];

                var currentMoves = [];
                var currentIndex = 0;
                var moveTimeout;

                function makeNextMove() {
                    if (currentIndex >= currentMoves.length) return;
                    game.move(currentMoves[currentIndex]);
                    board.position(game.fen());
                    currentIndex++;
                    moveTimeout = setTimeout(makeNextMove, 1000);
                }

                function resetBoard(orientation) {
                    clearTimeout(moveTimeout);
                    board.orientation(orientation);
                    board.start();
                    game.reset();
                    currentIndex = 0;
                }

                function showOpeningName(name) {
                    var openingNameElement = document.getElementById('openingName');
                    openingNameElement.innerText = name;
                    openingNameElement.classList.remove('hidden');
                }

                // Commence le Système de Londres lorsque l'élément entre dans la vue
                resetBoard('white');
                currentMoves = londonSystemMoves;
                showOpeningName('Système de Londres');
                setTimeout(makeNextMove, 1000);

                // Configuration des événements pour les boutons
                document.getElementById('selectWhite').addEventListener('change', function() {
                    if (this.checked) {
                        resetBoard('white');
                        currentMoves = londonSystemMoves;
                        showOpeningName('Système de Londres');
                        setTimeout(makeNextMove, 1000);
                    }
                });

                document.getElementById('selectBlack').addEventListener('change', function() {
                    if (this.checked) {
                        resetBoard('black');
                        currentMoves = sicilianDefenseMoves;
                        showOpeningName('Défense Sicilienne');
                        setTimeout(makeNextMove, 1000);
                    }
                });
            }
        });
    }, { threshold: 1.0 }); // Ajustez ce seuil selon vos besoins

    observer.observe(chessBoard);
});

async function fetchElos() {
    try {
        const response = await fetch('/api/get_fide_ratings');
        const data = await response.json();
        document.getElementById('standardElo').innerText = `${data.standard} F`;
        document.getElementById('rapidElo').innerText = `${data.rapid} F`;
        document.getElementById('blitzElo').innerText = `${data.blitz} F`;
    } catch (error) {
        console.error('Erreur lors de la récupération des Élos:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchElos);

document.querySelector('.scroll-indicator').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});