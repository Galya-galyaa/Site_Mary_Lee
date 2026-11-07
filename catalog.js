document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('#catalogGrid .product-card');
    const paginationItems = document.querySelectorAll('.pagination__item');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    let currentPage = 1;

    function setActivePage(page) {
        currentPage = page;
        paginationItems.forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.page) === page);
        });
    }

    function showAllItems() {
        cards.forEach(card => card.classList.remove('hidden'));
        setActivePage(2);
    }

    function hideExtraItems() {
        cards.forEach((card, index) => {
            if (index >= 8) card.classList.add('hidden');
            else card.classList.remove('hidden');
        });
        setActivePage(1);
    }

    paginationItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = parseInt(item.dataset.page);
            if (page === 1) hideExtraItems();
            if (page === 2) showAllItems();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage === 2) hideExtraItems();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage === 1) showAllItems();
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (currentPage === 1) {
                showAllItems();
            }
        });
    }

    hideExtraItems();
});