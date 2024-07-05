/* scripts.js */
document.addEventListener("DOMContentLoaded", function() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const luminescence = document.getElementById("luminescence");

    // Luminescence effect (desktop only)
    if (!isMobile) {
        document.addEventListener("mousemove", function(e) {
            luminescence.style.left = e.clientX + "px";
            luminescence.style.top = e.clientY + "px";
        });
    } else {
        // Hide luminescence effect on mobile
        luminescence.style.display = 'none';
    }

    // Timeline visibility effect
    const items = document.querySelectorAll(".timeline-item");

    const isInViewport = (elem) => {
        const bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const run = () => {
        items.forEach((item) => {
            if (isInViewport(item)) {
                item.classList.add("is-visible");
            }
        });
    };

    // Darken background and other timeline items on hover (desktop only)
    if (!isMobile) {
        items.forEach(item => {
            item.addEventListener("mouseenter", () => {
                document.body.classList.add("darken-background");
                items.forEach(i => {
                    if (i !== item) {
                        i.classList.add("darken");
                    }
                });
            });
            item.addEventListener("mouseleave", () => {
                document.body.classList.remove("darken-background");
                items.forEach(i => {
                    i.classList.remove("darken");
                });
            });
        });
    }

    // Events
    window.addEventListener("load", run);
    window.addEventListener("resize", run);
    window.addEventListener("scroll", run);

    // Touch events for mobile timeline items
    if (isMobile) {
        items.forEach(item => {
            item.addEventListener("touchstart", () => {
                document.body.classList.add("darken-background");
                items.forEach(i => {
                    if (i !== item) {
                        i.classList.add("darken");
                    }
                });
            });
            item.addEventListener("touchend", () => {
                document.body.classList.remove("darken-background");
                items.forEach(i => {
                    i.classList.remove("darken");
                });
            });
        });
    }
});