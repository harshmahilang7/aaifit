/**
 * @Author: Dastan Alam
 * @Date:   2025-07-02 07:31:01 PM   19:07
 * @Last Modified by:   Dastan Alam
 * @Last Modified time: 2025-07-06 07:47:49 PM   19:07
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
    const totalDots = isMobile ? items.length : Math.ceil(items.length / itemsPerPage);
    
    // ======================
    // DOT NAVIGATION SETUP
    // ======================
    
    // Clear existing dots
    sliderDots.innerHTML = '';
    
    // Create dots based on view
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        
        if (isMobile) {
            dot.addEventListener('click', () => goToSlide(i));
        } else {
            dot.addEventListener('click', () => goToPage(i));
        }
        
        sliderDots.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.slider-dot');
    
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
    prevBtn.addEventListener('click', () => isMobile ? goToPrevSlide() : goToPrevPage());
    nextBtn.addEventListener('click', () => isMobile ? goToNextSlide() : goToNextPage());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') isMobile ? goToPrevSlide() : goToPrevPage();
        if (e.key === 'ArrowRight') isMobile ? goToNextSlide() : goToNextPage();
    });
    
    // ======================
    // CORE FUNCTIONS
    // ======================
    
    function getItemWidth() {
        const itemStyle = window.getComputedStyle(items[0]);
        return items[0].offsetWidth + parseInt(itemStyle.marginRight);
    }
    
    function goToSlide(index) {
        if (isAnimating) return;
        
        currentIndex = Math.max(0, Math.min(index, items.length - 1));
        const scrollPos = currentIndex * getItemWidth();
        
        slider.scrollTo({
            left: scrollPos,
            behavior: 'smooth'
        });
        
        updateDots();
        animateActiveCard();
    }
    
    function goToPage(pageIndex) {
        if (isAnimating) return;
        
        const newIndex = pageIndex * itemsPerPage;
        currentIndex = Math.max(0, Math.min(newIndex, items.length - 1));
        const scrollPos = currentIndex * getItemWidth();
        
        animateScroll(scrollPos);
        updateDots();
        animateVisibleCards();
    }
    
    // Mobile navigation
    function goToPrevSlide() {
        goToSlide(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
    }
    
    function goToNextSlide() {
        goToSlide(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
    }
    
    // Desktop navigation
    function goToPrevPage() {
        const currentPage = Math.floor(currentIndex / itemsPerPage);
        const newPage = currentPage > 0 ? currentPage - 1 : Math.ceil(items.length / itemsPerPage) - 1;
        goToPage(newPage);
    }
    
    function goToNextPage() {
        const currentPage = Math.floor(currentIndex / itemsPerPage);
        const newPage = currentPage < Math.ceil(items.length / itemsPerPage) - 1 ? currentPage + 1 : 0;
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
        const activeDot = isMobile ? currentIndex : Math.floor(currentIndex / itemsPerPage);
        
        dots.forEach((dot, index) => {
            if (index === activeDot) {
                gsap.to(dot, {
                    scale: 1.3,
                    duration: 0.3,
                    ease: "back.out(2)"
                });
                dot.classList.add('active');
            } else {
                gsap.to(dot, {
                    scale: 1,
                    duration: 0.3
                });
                dot.classList.remove('active');
            }
        });
    }
    
    function animateActiveCard() {
        const activeCard = items[currentIndex].querySelector('.portfolio-card');
        gsap.fromTo(activeCard,
            { y: 20, opacity: 0.8 },
            { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
    }
    
    function animateVisibleCards() {
        const startIdx = Math.floor(currentIndex / itemsPerPage) * itemsPerPage;
        const endIdx = Math.min(startIdx + itemsPerPage, items.length);
        
        for (let i = startIdx; i < endIdx; i++) {
            const card = items[i].querySelector('.portfolio-card');
            gsap.fromTo(card,
                { y: 20, opacity: 0.8 },
                { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
            );
        }
    }
    
    // ======================
    // AUTO-SCROLL FEATURE
    // ======================
    
    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        
        autoScrollInterval = setInterval(() => {
            if (isMobile) {
                goToNextSlide();
            } else {
                goToNextPage();
            }
        }, 5000);
    }
    
    function pauseAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    slider.addEventListener('mouseenter', pauseAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);
    slider.addEventListener('touchstart', pauseAutoScroll);
    
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
                updateDots();
                
                if (isMobile) {
                    animateActiveCard();
                } else {
                    animateVisibleCards();
                }
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
        
        // Header animations
        gsap.from(".section-header .subtitle", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1
        });
        
        gsap.from(".section-header .title", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2
        });
        
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
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('.portfolio-card'), {
                    rotationX: 0,
                    rotationY: 0,
                    ease: "elastic.out(1, 0.5)",
                    duration: 1.2
                });
            });
        });
    }
    
    // Initialize
    updateDots();
    startAutoScroll();
    if (isMobile) {
        animateActiveCard();
    } else {
        animateVisibleCards();
    }
});