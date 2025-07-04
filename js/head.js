/**
 * @Author: DASTAN_E_ALAM
 * @Date:   2025-07-02 19:31:01
 * @Last Modified by:   DASTAN_E_ALAM
 * @Last Modified time: 2025-07-04 21:02:28
 */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeBtn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Optional: Close if clicked outside menu
    document.addEventListener('click', (e) => {
        if (
            mobileMenu.classList.contains('active') &&
            !e.target.closest('header') &&
            !e.target.closest('.mobile-menu')
        ) {
            closeMenu();
        }
    });

    // Optional: ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
});

