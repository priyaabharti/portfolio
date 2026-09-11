/* =========================================================
   PRIYA BHARTI PORTFOLIO
   Main JavaScript
   ========================================================= */


/* =========================
   ELEMENTS
   ========================= */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("themeToggle");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");


/* =========================
   CURRENT YEAR
   ========================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================
   MOBILE MENU
   ========================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.textContent =
            isOpen ? "✕" : "☰";

    });

}


/* =========================
   CLOSE MOBILE MENU
   ========================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";
        }

    });

});


/* =========================
   HEADER ON SCROLL
   ========================= */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader
);

updateHeader();


/* =========================
   DARK / LIGHT MODE
   ========================= */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (themeToggle) {

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeToggle.textContent = "☀";

    } else {

        themeToggle.textContent = "☾";

    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");


        themeToggle.textContent =
            isDark ? "☀" : "☾";


        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );
    });

}


/* =========================
   ACTIVE NAVIGATION
   ========================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 160;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


/* =========================
   BACK TO TOP
   ========================= */

window.addEventListener("scroll", () => {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

}


/* =========================
   REVEAL ANIMATION
   ========================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .about-content, .info-card, " +
        ".timeline-item, .project-card, .skill-category, " +
        ".education-card, .contact-card, .cta-card"
    );


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});