document.addEventListener('DOMContentLoaded', () => {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") {
        currentPage = "index.html"; 
    }
    const navLinks = document.querySelectorAll('.headerNav a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});