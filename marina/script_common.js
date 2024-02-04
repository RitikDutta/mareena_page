function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.classList.remove('background-fade-in');
        menu.classList.add('background-fade-out');
        setTimeout(function() { menu.style.display = "none"; }, 500); // Wait for animation to finish
    } else {
        menu.style.display = "block";
        menu.classList.remove('background-fade-out');
        menu.classList.add('background-fade-in');
    }
}



document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach((el) => observer.observe(el));
});







