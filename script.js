document.addEventListener('DOMContentLoaded', () => {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") currentPage = "index.html"; 
    const navLinks = document.querySelectorAll('.headerNav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    const track = document.getElementById('popularTrack');
    const dotsContainer = document.getElementById('popularDots');

    if (track && dotsContainer) {
        const cards = track.querySelectorAll('.product-card');
        const cardsPerPage = 4;
        const totalPages = Math.ceil(cards.length / cardsPerPage);

        if (cards.length > cardsPerPage) {
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    const cardWidth = cards[0].offsetWidth;
                    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
                    const scrollAmount = (cardWidth + gap) * cardsPerPage * i;

                    track.scrollTo({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                });
                dotsContainer.appendChild(dot);
            }
        }

        track.addEventListener('scroll', () => {
            const dots = dotsContainer.querySelectorAll('.dot');
            if (dots.length === 0) return;

            const maxScroll = track.scrollWidth - track.clientWidth;
            let activeIndex = Math.round((track.scrollLeft / maxScroll) * (totalPages - 1));

            if (activeIndex < 0) activeIndex = 0;
            if (activeIndex >= totalPages) activeIndex = totalPages - 1;

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });

        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            track.scrollLeft = scrollLeft - walk;
        });

        track.style.cursor = 'grab';
    }
    const newGrid = document.querySelector('.new-grid');
    const viewAllBtn = document.getElementById('viewAllBtn');

    if (newGrid && viewAllBtn) {
        const newCards = newGrid.querySelectorAll('.product-card');
        const cardsPerLoad = 4;
        let visibleCards = cardsPerLoad;

        const updateCardsVisibility = () => {
            newCards.forEach((card, index) => {
                if (index < visibleCards) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            if (visibleCards >= newCards.length) {
                viewAllBtn.style.display = 'none';
            }
        };
        updateCardsVisibility();
        viewAllBtn.addEventListener('click', () => {
            visibleCards += cardsPerLoad;
            updateCardsVisibility();
        });
    }
    const looksGrid = document.getElementById('looksGrid');
    const viewAllLooksBtn = document.getElementById('viewAllLooksBtn');

    if (looksGrid && viewAllLooksBtn) {
        const lookCards = looksGrid.querySelectorAll('.look-card');
        const cardsPerLoad = 3;
        let visibleLookCards = cardsPerLoad;

        const updateLooksVisibility = () => {
            lookCards.forEach((card, index) => {
                if (index < visibleLookCards) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            if (visibleLookCards >= lookCards.length) {
                viewAllLooksBtn.style.display = 'none';
            }
        };
        updateLooksVisibility();
        viewAllLooksBtn.addEventListener('click', () => {
            visibleLookCards += cardsPerLoad;
            updateLooksVisibility();
        });
    }
});