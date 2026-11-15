document.addEventListener('DOMContentLoaded', () => {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") currentPage = "index.html"; 
    const navLinks = document.querySelectorAll('.headerNav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    const enableDragScroll = (element) => {
        if (!element) return;
        let isDown = false;
        let startX;
        let scrollLeft;

        element.addEventListener('mousedown', (e) => {
            isDown = true;
            element.style.cursor = 'grabbing';
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        });

        element.addEventListener('mouseleave', () => {
            isDown = false;
            element.style.cursor = 'grab';
        });

        element.addEventListener('mouseup', () => {
            isDown = false;
            element.style.cursor = 'grab';
        });

        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 1.5;
            element.scrollLeft = scrollLeft - walk;
        });

        element.style.cursor = 'grab';
    };

    const popularTrack = document.getElementById('popularTrack');
    const newGrid = document.querySelector('.new-grid');
    const looksGrid = document.querySelector('.looks-grid');

    enableDragScroll(popularTrack);
    enableDragScroll(newGrid);
    enableDragScroll(looksGrid);

    const viewAllPopularBtn = document.getElementById('viewAllPopularBtn');
    if (viewAllPopularBtn) {
        viewAllPopularBtn.addEventListener('click', () => {
            window.location.href = 'popular.html'; 
        });
    }

    const viewAllBtn = document.getElementById('viewAllBtn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            window.location.href = 'new-collection.html'; 
        });
    }

    const viewAllLooksBtn = document.getElementById('viewAllLooksBtn');
    if (viewAllLooksBtn) {
        viewAllLooksBtn.addEventListener('click', () => {
            window.location.href = 'Looks.html'; 
        });
    }
});