let hamburger = document.querySelector('#ham-btn');
hamburger.addEventListener('click', () => {
    // Toggle the hamburger menu icon
    hamburger.classList.toggle('show');
    // Toggle the navigation menu
    let nav = document.querySelector('#nav');
    if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    } else {
        nav.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
    }
});