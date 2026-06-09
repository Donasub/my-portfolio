//  HAMBURGER MENU TOGGLE

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');

    if (!toggle || !nav) {
        console.warn('Menu elements not found. Make sure id="menuToggle" and id="mainNav" exist.');
        return;
    }

    // Toggle menu open/close
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        nav.classList.toggle('active');
        toggle.classList.toggle('open');

        const icon = toggle.querySelector('i');
        if (icon) {
            if (nav.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        }
    });

    // Close when clicking outside menu
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('active');
            toggle.classList.remove('open');
            const icon = toggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    });

    // Close when a nav link is clicked
    nav.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            toggle.classList.remove('open');
            const icon = toggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });
});
