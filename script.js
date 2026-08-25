const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("active");
        menuButton.setAttribute("aria-expanded", isOpen);
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

const gallery = document.querySelector(".gallery-grid");
const galleryWindow = document.querySelector(".gallery-window");
const cards = document.querySelectorAll(".gallery-card");
const previousButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;

function getVisibleCards() {
    if (window.innerWidth <= 500) return 1;
    if (window.innerWidth <= 760) return 2;
    if (window.innerWidth <= 1000) return 3;
    return 4;
}

function getCardWidth() {
    if (!cards.length) return 0;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(gallery).gap) || 0;
    return cardWidth + gap;
}

function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCards());
}

function updateCarousel() {
    if (!gallery || !cards.length) return;

    const maxIndex = getMaxIndex();

    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    gallery.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;

    if (dotsContainer) {
        dotsContainer.innerHTML = "";

        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Ir para posição ${i + 1}`);

            if (i === currentIndex) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                currentIndex = i;
                updateCarousel();
            });

            dotsContainer.appendChild(dot);
        }
    }
}

if (previousButton) {
    previousButton.addEventListener("click", () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
        updateCarousel();
    });
}

window.addEventListener("resize", updateCarousel);

updateCarousel();