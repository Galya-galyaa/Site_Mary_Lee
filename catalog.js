document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('#catalogGrid .product-card, #catalogGrid .look-card');
    const paginationItems = document.querySelectorAll('.pagination__item');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    let currentPage = 1;
    const itemsPerPage = 8;

    function showPage(page) {
        currentPage = page;
        paginationItems.forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.page) === page);
        });
        cards.forEach((card, index) => {
            card.style.display = 'none';
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                card.style.display = 'block';
            }
        });
    }

    paginationItems.forEach(item => {
        item.addEventListener('click', () => {
            showPage(parseInt(item.dataset.page));
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) showPage(currentPage - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(cards.length / itemsPerPage);
            if (currentPage < totalPages) showPage(currentPage + 1);
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            let hiddenCount = 0;
            cards.forEach(card => {
                if (card.style.display === 'none') {
                    card.style.display = 'block';
                    hiddenCount++;
                }
            });
            if (hiddenCount === 0) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    showPage(1);
});