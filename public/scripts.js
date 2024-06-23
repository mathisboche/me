/* scripts.js */
document.addEventListener("DOMContentLoaded", function() {
    // Luminescence effect
    document.addEventListener("mousemove", function(e) {
        const luminescence = document.getElementById("luminescence");
        luminescence.style.left = e.clientX + "px";
        luminescence.style.top = e.clientY + "px";
    });

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

    // Darken background and other timeline items on hover
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

    // Events
    window.addEventListener("load", run);
    window.addEventListener("resize", run);
    window.addEventListener("scroll", run);
});
