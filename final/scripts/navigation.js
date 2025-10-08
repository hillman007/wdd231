// Hamburger menu toggle for nav

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    navToggle.addEventListener('click', function () {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('open');
    });
    // Close menu when clicking outside (mobile only)
    document.addEventListener('click', function (e) {
        if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
            navList.classList.remove('open');
            navToggle.setAttribute('aria-expanded', false);
        }
    });
});
