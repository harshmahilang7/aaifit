/**
 * @Author: Dastan Alam
 * @Date:   2025-07-02 07:31:01 PM   19:07
 * @Last Modified by:   Dastan Alam
 * @Last Modified time: 2025-07-06 08:21:08 PM   20:07
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize plugins and select elements
    gsap.registerPlugin(ScrollTrigger);
    
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const items = document.querySelectorAll('.portfolio-item');
    const sizeOptions = document.querySelectorAll('.size-option');
    
    // Configuration variables
    let currentIndex = 0;
    let isAnimating = false;
    let autoScrollInterval;
    const isMobile = window.innerWidth < 768;
    const itemsPerPage = isMobile ? 1 : 3;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    
    // ======================
    // INITIAL SETUP
    // ======================
    
    // Create navigation dots only for desktop
    if (!isMobile) {
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToPage(i));
            sliderDots.appendChild(dot);
        }
    }
    
    // ======================
    // EVENT LISTENERS
    // ======================
    
    // Size options interaction
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
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
    
    // Navigation controls
    prevBtn.addEventListener('click', () => isMobile ? goToPrevItem() : goToPrevPage());
    nextBtn.addEventListener('click', () => isMobile ? goToNextItem() : goToNextPage());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') isMobile ? goToPrevItem() : goToPrevPage();
        if (e.key === 'ArrowRight') isMobile ? goToNextItem() : goToNextPage();
    });
    
    // ======================
    // CORE FUNCTIONS
    // ======================
    
    function getItemWidth() {
        const itemStyle = window.getComputedStyle(items[0]);
        return items[0].offsetWidth + parseInt(itemStyle.marginRight);
    }
    
    function goToIndex(index) {
        if (isAnimating) return;
        
        currentIndex = Math.max(0, Math.min(index, items.length - 1));
        const scrollPos = currentIndex * getItemWidth();
        
        if (isMobile) {
            slider.scrollTo({ left: scrollPos, behavior: 'smooth' });
        } else {
            animateScroll(scrollPos);
        }
        
        updateDots();
        animateVisibleCards();
    }
    
    // Mobile navigation (item by item)
    function goToPrevItem() {
        goToIndex(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
    }
    
    function goToNextItem() {
        goToIndex(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
    }
    
    // Desktop navigation (page by page)
    function goToPage(pageIndex) {
        const newIndex = pageIndex * itemsPerPage;
        goToIndex(newIndex);
    }
    
    function goToPrevPage() {
        const newPage = Math.max(0, Math.floor(currentIndex / itemsPerPage) - 1);
        goToPage(newPage);
    }
    
    function goToNextPage() {
        const newPage = Math.min(totalPages - 1, Math.floor(currentIndex / itemsPerPage) + 1);
        goToPage(newPage);
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
    
    function updateDots() {
        if (isMobile) return;
        
        const currentPage = Math.floor(currentIndex / itemsPerPage);
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            if (index === currentPage) {
                gsap.to(dot, {
                    scale: 1.3,
                    duration: 0.4,
                    ease: "back.out(2)"
                });
                dot.classList.add('active');
            } else {
                gsap.to(dot, {
                    scale: 1,
                    duration: 0.4
                });
                dot.classList.remove('active');
            }
        });
    }
    
    function animateVisibleCards() {
        if (isMobile) {
            const activeCard = items[currentIndex].querySelector('.portfolio-card');
            gsap.fromTo(activeCard,
                { y: 30, opacity: 0.8 },
                { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
            );
        } else {
            const startIdx = Math.floor(currentIndex / itemsPerPage) * itemsPerPage;
            const endIdx = Math.min(startIdx + itemsPerPage, items.length);
            
            for (let i = startIdx; i < endIdx; i++) {
                const card = items[i].querySelector('.portfolio-card');
                gsap.fromTo(card,
                    { y: 30, opacity: 0.8 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
                );
            }
        }
    }
    
    // ======================
    // AUTO-SCROLL FEATURE
    // ======================
    
    // function startAutoScroll() {
    //     if (isMobile) return;
    //     autoScrollInterval = setInterval(() => {
    //         if (currentIndex < items.length - itemsPerPage) {
    //             isMobile ? goToNextItem() : goToNextPage();
    //         } else {
    //             goToIndex(0);
    //         }
    //     }, 5000);
    // }
    
    // function pauseAutoScroll() {
    //     clearInterval(autoScrollInterval);
    // }
    
    // slider.addEventListener('mouseenter', pauseAutoScroll);
    // slider.addEventListener('mouseleave', startAutoScroll);
    // slider.addEventListener('touchstart', pauseAutoScroll);
    
    // ======================
    // SCROLL HANDLING
    // ======================
    
    let scrollTimeout;
    slider.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const itemWidth = getItemWidth();
            const newIndex = Math.round(slider.scrollLeft / itemWidth);
            
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                
                if (!isMobile) {
                    // Snap to nearest page on desktop
                    const nearestPageIndex = Math.round(currentIndex / itemsPerPage) * itemsPerPage;
                    if (currentIndex !== nearestPageIndex) {
                        goToIndex(nearestPageIndex);
                    }
                }
                
                updateDots();
                animateVisibleCards();
            }
        }, 100);
    });
    
    // ======================
    // INITIAL ANIMATIONS
    // ======================
    
    if (!isMobile) {
        // Initial item animations
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
        
        // Background element animations
        gsap.to(".element-1", {
            duration: 20,
            x: 100,
            y: 50,
            rotation: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // ... (include your other desktop animations here)
        
        // Card hover effects
        items.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                gsap.to(item.querySelector('.portfolio-card'), {
                    rotationX: (y - centerY) / 25,
                    rotationY: (centerX - x) / 25,
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
    }
    
    // Start the auto-scroll
    // startAutoScroll();
});