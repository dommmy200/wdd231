export function dynamicNavHeader() {
    
    const header = document.querySelector('.taste-header');
    const nav = document.querySelector('.taste-nav');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY >= headerHeight) {
            nav.classList.add('fixed');
        } else {
            nav.classList.remove('fixed');
        }
    });
}