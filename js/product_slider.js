/**
 * @Author: DASTAN_E_ALAM
 * @Date:   2025-07-02 19:31:01
 * @Last Modified by:   DASTAN_E_ALAM
 * @Last Modified time: 2025-07-05 11:47:41
 */
document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const items = document.querySelectorAll('.portfolio-item');
    const sizeOptions = document.querySelectorAll('.size-option');

    let currentIndex = 0;
    let isAnimating = false;
    let autoScrollInterval;
    const isMobile = window.innerWidth < 768;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    sizeOptions.forEach(option => {
        option.addEventListener('click', function () {
            const parent = this.parentElement;
            parent.querySelectorAll('.size-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');

            if (!isMobile) {
                gsap.fromTo(this,
                    { scale: 0.8, opacity: 0.5 },
                    { scale: 1.1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
                );
            }
        });
    });

    prevBtn.addEventListener('click', goToPrevSlide);
    nextBtn.addEventListener('click', goToNextSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToPrevSlide();
        if (e.key === 'ArrowRight') goToNextSlide();
    });

    function getItemWidth() {
        const itemStyle = window.getComputedStyle(items[0]);
        return items[0].offsetWidth + parseInt(itemStyle.marginRight);
    }

    function goToSlide(index) {
        if (isAnimating) return;

        currentIndex = Math.max(0, Math.min(index, items.length - 1));
        const scrollPos = currentIndex * getItemWidth();

        if (isMobile) {
            slider.scrollTo({ left: scrollPos, behavior: 'auto' });
        } else {
            animateScroll(scrollPos);
        }

        updateDots();

        if (!isMobile) {
            const activeCard = items[currentIndex].querySelector('.portfolio-card');
            gsap.fromTo(activeCard,
                { y: 30, opacity: 0.8 },
                { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
            );
        }
    }

    function animateScroll(position) {
        isAnimating = true;
        gsap.to(slider, {
            scrollLeft: position,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => {
                isAnimating = false;
            }
        });
    }

    function goToPrevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(items.length - 1);
        }
    }

    function goToNextSlide() {
        if (currentIndex < items.length - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                if (!isMobile) {
                    gsap.to(dot, {
                        scale: 1.3,
                        duration: 0.4,
                        ease: "back.out(2)"
                    });
                }
                dot.classList.add('active');
            } else {
                if (!isMobile) {
                    gsap.to(dot, {
                        scale: 1,
                        duration: 0.4
                    });
                }
                dot.classList.remove('active');
            }
        });
    }

    function startAutoScroll() {
        if (isMobile) return;
        autoScrollInterval = setInterval(() => {
            if (currentIndex < items.length - 1) {
                goToNextSlide();
            } else {
                goToSlide(0);
            }
        }, 5000);
    }

    function pauseAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    slider.addEventListener('mouseenter', pauseAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);
    slider.addEventListener('touchstart', pauseAutoScroll);

    updateDots();
    startAutoScroll();

    let scrollTimeout;
    slider.addEventListener('scroll', function () {
        if (isMobile) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const itemWidth = getItemWidth();
                currentIndex = Math.round(slider.scrollLeft / itemWidth);
                updateDots();
            }, 100);
        }
    });

    // Remove touch-based swipe to avoid bouncing on mobile
    // Removed touchStart/touchEnd event listeners

    if (!isMobile) {
        gsap.from(".portfolio-item", {
            scrollTrigger: {
                trigger: ".portfolio-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 80,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.2
        });

        gsap.from(".section-header .subtitle", {
            scrollTrigger: {
                trigger: ".portfolio-section",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1
        });

        gsap.from(".section-header .title", {
            scrollTrigger: {
                trigger: ".portfolio-section",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2
        });

        gsap.from(".section-header .description", {
            scrollTrigger: {
                trigger: ".portfolio-section",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.3
        });

        gsap.to(".element-1", {
            duration: 20,
            x: 100,
            y: 50,
            rotation: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".element-2", {
            duration: 25,
            x: -100,
            y: -50,
            rotation: -5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 5
        });

        gsap.to(".element-3", {
            duration: 18,
            x: 50,
            y: -30,
            rotation: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 3
        });

        items.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const angleX = (y - centerY) / 25;
                const angleY = (centerX - x) / 25;

                gsap.to(item.querySelector('.portfolio-card'), {
                    rotationX: angleX,
                    rotationY: angleY,
                    transformPerspective: 1000,
                    transformOrigin: "center center",
                    ease: "power2.out",
                    duration: 0.8
                });

                gsap.to(item.querySelector('.portfolio-image'), {
                    y: -(centerY - y) / 15,
                    x: (centerX - x) / 15,
                    duration: 1.5,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('.portfolio-card'), {
                    rotationX: 0,
                    rotationY: 0,
                    ease: "elastic.out(1, 0.5)",
                    duration: 1.2
                });

                gsap.to(item.querySelector('.portfolio-image'), {
                    y: 0,
                    x: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });

        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const badge = card.querySelector('.portfolio-badge');
                if (badge) {
                    gsap.fromTo(badge,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
                    );
                }
            });
        });
    }
});
