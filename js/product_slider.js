// /**
//  * @Author: DASTAN_E_ALAM
//  * @Date:   2025-07-02 19:31:01
//  * @Last Modified by:   DASTAN_E_ALAM
//  * @Last Modified time: 2025-07-05 05:04:07
//  */
//    document.addEventListener('DOMContentLoaded', function() {
//             // Initialize GSAP
//             gsap.registerPlugin(ScrollTrigger);
            
//             // Slider elements
//             const slider = document.getElementById('slider');
//             const prevBtn = document.getElementById('prevBtn');
//             const nextBtn = document.getElementById('nextBtn');
//             const sliderDots = document.getElementById('sliderDots');
//             const items = document.querySelectorAll('.portfolio-item');
            
//             let currentIndex = 0;
//             let isAnimating = false;
//             let autoScrollInterval;
//             let isMobile = window.innerWidth < 768;
            
//             // Create dots
//             items.forEach((_, index) => {
//                 const dot = document.createElement('div');
//                 dot.classList.add('slider-dot');
//                 if (index === 0) dot.classList.add('active');
//                 dot.addEventListener('click', () => goToSlide(index));
//                 sliderDots.appendChild(dot);
//             });
            
//             const dots = document.querySelectorAll('.slider-dot');
            
//             // Set up event listeners
//             prevBtn.addEventListener('click', goToPrevSlide);
//             nextBtn.addEventListener('click', goToNextSlide);
            
//             // Handle window resize
//             window.addEventListener('resize', function() {
//                 isMobile = window.innerWidth < 768;
//                 updateSliderPosition();
//             });
            
//             // Touch events for mobile
//             let touchStartX = 0;
//             let touchEndX = 0;
            
//             slider.addEventListener('touchstart', (e) => {
//                 touchStartX = e.changedTouches[0].screenX;
//             }, {passive: true});
            
//             slider.addEventListener('touchend', (e) => {
//                 touchEndX = e.changedTouches[0].screenX;
//                 handleSwipe();
//             }, {passive: true});
            
//             function handleSwipe() {
//                 if (touchEndX < touchStartX - 30) {
//                     goToNextSlide();
//                 } else if (touchEndX > touchStartX + 30) {
//                     goToPrevSlide();
//                 }
//             }
            
//             // Keyboard navigation
//             document.addEventListener('keydown', (e) => {
//                 if (e.key === 'ArrowLeft') goToPrevSlide();
//                 if (e.key === 'ArrowRight') goToNextSlide();
//             });
            
//             // Get item width including margin
//             function getItemWidth() {
//                 const itemStyle = window.getComputedStyle(items[0]);
//                 return items[0].offsetWidth + parseInt(itemStyle.marginRight);
//             }
            
//             // Update slider position based on current index
//             function updateSliderPosition() {
//                 const scrollPos = currentIndex * getItemWidth();
//                 slider.scrollLeft = scrollPos;
//             }
            
//             // Animate scroll to position
//             function animateScroll(position) {
//                 isAnimating = true;
//                 gsap.to(slider, {
//                     scrollLeft: position,
//                     duration: 0.4,
//                     ease: "power2.out",
//                     onComplete: () => {
//                         isAnimating = false;
//                     }
//                 });
//             }
            
//             // Go to specific slide
//             function goToSlide(index) {
//                 if (isAnimating) return;
                
//                 currentIndex = Math.max(0, Math.min(index, items.length - 1));
//                 const scrollPos = currentIndex * getItemWidth();
                
//                 if (isMobile) {
//                     // For mobile, snap to position without animation
//                     slider.scrollLeft = scrollPos;
//                 } else {
//                     animateScroll(scrollPos);
//                 }
                
//                 updateDots();
//             }
            
//             // Previous slide
//             function goToPrevSlide() {
//                 if (currentIndex > 0) {
//                     goToSlide(currentIndex - 1);
//                 } else {
//                     // Loop to last slide
//                     goToSlide(items.length - 1);
//                 }
//             }
            
//             // Next slide
//             function goToNextSlide() {
//                 if (currentIndex < items.length - 1) {
//                     goToSlide(currentIndex + 1);
//                 } else {
//                     // Loop to first slide
//                     goToSlide(0);
//                 }
//             }
            
//             // Update dot indicators
//             function updateDots() {
//                 dots.forEach((dot, index) => {
//                     if (index === currentIndex) {
//                         dot.classList.add('active');
//                     } else {
//                         dot.classList.remove('active');
//                     }
//                 });
//             }
            
//             // Auto-scroll
//             function startAutoScroll() {
//                 if (isMobile) return; // Disable auto-scroll on mobile
                
//                 autoScrollInterval = setInterval(() => {
//                     if (currentIndex < items.length - 1) {
//                         goToNextSlide();
//                     } else {
//                         goToSlide(0);
//                     }
//                 }, 3000);
//             }
            
//             // Pause auto-scroll on interaction
//             function pauseAutoScroll() {
//                 clearInterval(autoScrollInterval);
//             }
            
//             slider.addEventListener('mouseenter', pauseAutoScroll);
//             slider.addEventListener('mouseleave', startAutoScroll);
//             slider.addEventListener('touchstart', pauseAutoScroll);
            
//             // Initialize
//             updateDots();
//             startAutoScroll();
            
//             // Handle scroll events for mobile
//             let scrollTimeout;
//             slider.addEventListener('scroll', function() {
//                 if (isMobile) {
//                     clearTimeout(scrollTimeout);
//                     scrollTimeout = setTimeout(() => {
//                         const itemWidth = getItemWidth();
//                         currentIndex = Math.round(slider.scrollLeft / itemWidth);
//                         updateDots();
//                     }, 100);
//                 }
//             });
            
//             // GSAP animations for elements - Optimized for performance
//             gsap.from(".portfolio-item", {
//                 scrollTrigger: {
//                     trigger: ".portfolio-section",
//                     start: "top 80%",
//                     toggleActions: "play none none none",
//                     once: true
//                 },
//                 y: 30,
//                 opacity: 0,
//                 duration: 0.6,
//                 stagger: 0.1,
//                 ease: "back.out(1.2)",
//                 delay: 0.1
//             });
            
//             gsap.from(".section-header .subtitle", {
//                 scrollTrigger: {
//                     trigger: ".portfolio-section",
//                     start: "top 90%",
//                     toggleActions: "play none none none",
//                     once: true
//                 },
//                 y: 15,
//                 opacity: 0,
//                 duration: 0.5,
//                 ease: "power2.out",
//                 delay: 0.1
//             });
            
//             gsap.from(".section-header .title", {
//                 scrollTrigger: {
//                     trigger: ".portfolio-section",
//                     start: "top 90%",
//                     toggleActions: "play none none none",
//                     once: true
//                 },
//                 y: 20,
//                 opacity: 0,
//                 duration: 0.6,
//                 ease: "power2.out",
//                 delay: 0.2
//             });
            
//             gsap.from(".section-header .description", {
//                 scrollTrigger: {
//                     trigger: ".portfolio-section",
//                     start: "top 90%",
//                     toggleActions: "play none none none",
//                     once: true
//                 },
//                 y: 20,
//                 opacity: 0,
//                 duration: 0.6,
//                 ease: "power2.out",
//                 delay: 0.3
//             });
            
//             // Floating elements animation - Optimized
//             gsap.to(".element-1", {
//                 duration: 20,
//                 x: 30,
//                 y: 20,
//                 rotation: 1,
//                 repeat: -1,
//                 yoyo: true,
//                 ease: "sine.inOut"
//             });
            
//             gsap.to(".element-2", {
//                 duration: 25,
//                 x: -30,
//                 y: -20,
//                 rotation: -1,
//                 repeat: -1,
//                 yoyo: true,
//                 ease: "sine.inOut",
//                 delay: 3
//             });
            
//             gsap.to(".element-3", {
//                 duration: 18,
//                 x: 20,
//                 y: -15,
//                 rotation: 0.5,
//                 repeat: -1,
//                 yoyo: true,
//                 ease: "sine.inOut",
//                 delay: 2
//             });
//         });


document.addEventListener('DOMContentLoaded', function() {
            // Initialize GSAP
            gsap.registerPlugin(ScrollTrigger);
            
            // Slider elements
            const slider = document.getElementById('slider');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const sliderDots = document.getElementById('sliderDots');
            const items = document.querySelectorAll('.portfolio-item');
            const sizeOptions = document.querySelectorAll('.size-option');
            
            let currentIndex = 0;
            let isAnimating = false;
            let autoScrollInterval;
            
            // Create dots
            items.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                sliderDots.appendChild(dot);
            });
            
            const dots = document.querySelectorAll('.slider-dot');
            
            // Size selector functionality
            sizeOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected class from all options in this group
                    const parent = this.parentElement;
                    parent.querySelectorAll('.size-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked option
                    this.classList.add('selected');
                    
                    // Animation
                    gsap.fromTo(this, 
                        { scale: 0.8, opacity: 0.5 },
                        { scale: 1.1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
                    );
                });
            });
            
            // Set up event listeners
            prevBtn.addEventListener('click', goToPrevSlide);
            nextBtn.addEventListener('click', goToNextSlide);
            
            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, {passive: true});
            
            function handleSwipe() {
                if (touchEndX < touchStartX - 50) {
                    goToNextSlide();
                } else if (touchEndX > touchStartX + 50) {
                    goToPrevSlide();
                }
            }
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') goToPrevSlide();
                if (e.key === 'ArrowRight') goToNextSlide();
            });
            
            // Get item width including margin
            function getItemWidth() {
                const itemStyle = window.getComputedStyle(items[0]);
                return items[0].offsetWidth + parseInt(itemStyle.marginRight);
            }
            
            // Animate scroll to position
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
            
            // Go to specific slide
            function goToSlide(index) {
                if (isAnimating) return;
                
                currentIndex = Math.max(0, Math.min(index, items.length - 1));
                const scrollPos = currentIndex * getItemWidth();
                
                animateScroll(scrollPos);
                updateDots();
                
                // Animate the active card
                const activeCard = items[currentIndex].querySelector('.portfolio-card');
                gsap.fromTo(activeCard, 
                    { y: 30, opacity: 0.8 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
                );
            }
            
            // Previous slide
            function goToPrevSlide() {
                if (currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                } else {
                    // Loop to last slide
                    goToSlide(items.length - 1);
                }
            }
            
            // Next slide
            function goToNextSlide() {
                if (currentIndex < items.length - 1) {
                    goToSlide(currentIndex + 1);
                } else {
                    // Loop to first slide
                    goToSlide(0);
                }
            }
            
            // Update dot indicators
            function updateDots() {
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
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
            
            // Auto-scroll (optional)
            function startAutoScroll() {
                autoScrollInterval = setInterval(() => {
                    if (currentIndex < items.length - 1) {
                        goToNextSlide();
                    } else {
                        goToSlide(0);
                    }
                }, 5000);
            }
            
            // Pause auto-scroll on interaction
            function pauseAutoScroll() {
                clearInterval(autoScrollInterval);
            }
            
            slider.addEventListener('mouseenter', pauseAutoScroll);
            slider.addEventListener('mouseleave', startAutoScroll);
            slider.addEventListener('touchstart', pauseAutoScroll);
            
            // Initialize
            updateDots();
            // startAutoScroll(); // Uncomment to enable auto-scroll
            
            // GSAP animations for elements
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
            
            // Floating elements animation
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
            
            // 3D tilt effect on cards
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
                    
                    // Parallax effect for image
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
                    
                    // Reset image position
                    gsap.to(item.querySelector('.portfolio-image'), {
                        y: 0,
                        x: 0,
                        duration: 1.2,
                        ease: "elastic.out(1, 0.5)"
                    });
                });
            });
            
            // Badge animation on hover
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
        });