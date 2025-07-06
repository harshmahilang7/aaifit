/**
 * @Author: DASTAN_E_ALAM
 * @Date:   2025-07-02 16:10:07
 * @Last Modified by:   Dastan Alam
 * @Last Modified time: 2025-07-06 08:05:59 PM   20:07
 */
document.addEventListener('DOMContentLoaded', function () {
    // Enhanced FAQ toggle functionality for mobile and desktop
    const faqItems = document.querySelectorAll('.faq-item');

    // Function to close all FAQ items except the specified one
    const closeOtherItems = (currentItem) => {
        faqItems.forEach(item => {
            if (item !== currentItem && item.classList.contains('active')) {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = '0';
            }
        });
    };

    // Initialize FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial state
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out';

        // Handle both click and touch events for better mobile support
        question.addEventListener('click', (e) => {
            // Prevent double-tap zoom on mobile
            if (e.target.tagName === 'A') return;
            e.preventDefault();
            
            const wasActive = item.classList.contains('active');
            closeOtherItems(item);
            
            item.classList.toggle('active', !wasActive);
            answer.style.maxHeight = !wasActive ? answer.scrollHeight + 'px' : '0';
        });

        // Better touch support for mobile
        question.addEventListener('touchend', (e) => {
            if (e.target.tagName === 'A') return;
            e.preventDefault();
            
            const wasActive = item.classList.contains('active');
            closeOtherItems(item);
            
            item.classList.toggle('active', !wasActive);
            answer.style.maxHeight = !wasActive ? answer.scrollHeight + 'px' : '0';
        });
    });

    // Improved Intersection Observer with mobile considerations
    const animateElements = (elements) => {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: window.innerWidth < 768 ? 0.05 : 0.1,
                rootMargin: window.innerWidth < 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
            });

            elements.forEach(element => observer.observe(element));
        } else {
            // Fallback for browsers without IntersectionObserver
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 200);
            });
        }
    };

    // Animate FAQ items and CTA with mobile-friendly delays
    const faqElements = document.querySelectorAll('.faq-item, .faq-cta');
    animateElements(faqElements);

    // Mobile-optimized hover effects
    const absorbencyLevels = document.querySelectorAll('.absorbency-level');
    absorbencyLevels.forEach(level => {
        // Only apply hover effects for non-touch devices
        if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
            level.addEventListener('mouseenter', () => {
                level.style.transform = 'translateY(-5px)';
                level.style.boxShadow = '0 10px 25px rgba(76, 175, 80, 0.2)';
            });

            level.addEventListener('mouseleave', () => {
                level.style.transform = '';
                level.style.boxShadow = '';
            });
        }
    });

    // Enhanced CTA button with better touch feedback
    const ctaButton = document.querySelector('.faq-cta-btn');
    if (ctaButton) {
        // Add touch feedback class for mobile
        ctaButton.addEventListener('touchstart', function() {
            this.classList.add('touching');
        });

        ctaButton.addEventListener('touchend', function() {
            this.classList.remove('touching');
        });

        ctaButton.addEventListener('click', function (e) {
            e.preventDefault();

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            // Adjust ripple size for mobile
            const size = Math.max(ctaButton.offsetWidth, ctaButton.offsetHeight);
            ripple.style.width = ripple.style.height = size + 'px';
            
            // Get position based on device type
            const rect = ctaButton.getBoundingClientRect();
            const x = e.clientX ? e.clientX - rect.left : size / 2;
            const y = e.clientY ? e.clientY - rect.top : size / 2;
            
            ripple.style.left = x - size / 2 + 'px';
            ripple.style.top = y - size / 2 + 'px';
            
            ctaButton.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
                window.location.href = ctaButton.href;
            }, 600);
        });
    }

    // Handle window resize to adjust FAQ item heights
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            faqItems.forEach(item => {
                if (item.classList.contains('active')) {
                    const answer = item.querySelector('.faq-answer');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }, 250);
    });
});