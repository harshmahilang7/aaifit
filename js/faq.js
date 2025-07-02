/**
 * @Author: DASTAN_E_ALAM
 * @Date:   2025-07-02 16:10:07
 * @Last Modified by:   DASTAN_E_ALAM
 * @Last Modified time: 2025-07-02 16:20:28
 */
document.addEventListener('DOMContentLoaded', function() {
            // Enhanced FAQ toggle functionality
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            otherAnswer.style.maxHeight = '0';
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                    const answer = item.querySelector('.faq-answer');
                    
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = '0';
                    }
                });
            });

            // Intersection Observer for scroll animations
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
                        threshold: 0.1
                    });

                    elements.forEach(element => {
                        observer.observe(element);
                    });
                } else {
                    // Fallback for browsers without IntersectionObserver
                    elements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('visible');
                        }, index * 200);
                    });
                }
            };

            // Animate FAQ items
            const faqElements = document.querySelectorAll('.faq-item, .faq-cta');
            animateElements(faqElements);

            // Add hover effect to absorbency levels
            const absorbencyLevels = document.querySelectorAll('.absorbency-level');
            absorbencyLevels.forEach(level => {
                level.addEventListener('mouseenter', () => {
                    level.style.transform = 'translateY(-5px)';
                    level.style.boxShadow = '0 10px 25px rgba(76, 175, 80, 0.2)';
                });
                
                level.addEventListener('mouseleave', () => {
                    level.style.transform = '';
                    level.style.boxShadow = '';
                });
            });

            // Add ripple effect to CTA button
            const ctaButton = document.querySelector('.faq-cta-btn');
            if (ctaButton) {
                ctaButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Ripple effect
                    const ripple = document.createElement('span');
                    ripple.className = 'ripple-effect';
                    ripple.style.width = ripple.style.height = Math.max(ctaButton.offsetWidth, ctaButton.offsetHeight) + 'px';
                    ripple.style.left = e.offsetX - ripple.offsetWidth/2 + 'px';
                    ripple.style.top = e.offsetY - ripple.offsetHeight/2 + 'px';
                    ctaButton.appendChild(ripple);
                    
                    // Remove ripple after animation
                    setTimeout(() => {
                        ripple.remove();
                        window.location.href = ctaButton.href;
                    }, 600);
                });
            }
        });