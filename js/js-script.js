/**
 * @Author: Dastan Alam
 * @Date:   2025-07-02 07:31:01 PM   19:07
 * @Last Modified by:   Dastan Alam
 * @Last Modified time: 2025-07-06 06:07:16 PM   18:07
 */
  // Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

// Helper to find background color of parent element
function getEffectiveBackgroundColor(element) {
    while (element && element !== document.body) {
        const bg = window.getComputedStyle(element).backgroundColor;
        if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            return bg;
        }
        element = element.parentElement;
    }
    return 'transparent';
}

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;

    cursorRing.style.left = `${x}px`;
    cursorRing.style.top = `${y}px`;

    const el = document.elementFromPoint(x, y);
    const bgColor = getEffectiveBackgroundColor(el);

    if (bgColor === 'rgb(27, 94, 32)') { // #1b5e20
        cursorDot.style.backgroundColor = '#ffffff';
        cursorRing.style.borderColor = '#ffffff';
    } else {
        cursorDot.style.backgroundColor = '#1b5e20'; // Default
        cursorRing.style.borderColor = '#1b5e20';
    }
});

// Cursor hover effect on links and buttons
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
    });

    el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '30px';
        cursorRing.style.height = '30px';
    });
});


        // GSAP Animations 
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Animations
        gsap.to(".hero-title", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });

        gsap.to(".hero-subtext", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.7
        });

        gsap.to(".cta-button", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.9
        });

        gsap.to(".hero-model", {
            opacity: 1,
            x: 0,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.8
        });
        gsap.to(".hero-model2", {
            opacity: 1,
            x: 0,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.8
        });

        // Hover Effects 
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'scale(1.05)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
            });
        });

        // Hamburger Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeBtn = document.querySelector('.close-btn');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Toggle body overflow when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on close button
        closeBtn.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

// ABOUT US SECTION STARTS=======================================
   // Intersection Observer for scroll animations
        const aboutSection = document.querySelector('.about-section');
        const aboutImage = document.getElementById('aboutImage');
        const aboutContent = document.getElementById('aboutContent');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const aboutObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutImage.classList.add('animate');
                    aboutContent.classList.add('animate');
                } else {
                    // Reset animations when scrolling up past the section
                    const rect = aboutSection.getBoundingClientRect();
                    if (rect.top > window.innerHeight) {
                        aboutImage.classList.remove('animate');
                        aboutContent.classList.remove('animate');
                    }
                }
            });
        }, observerOptions);

        aboutObserver.observe(aboutSection);

        // Add scroll direction detection for more dynamic effects
        let lastScrollPosition = window.pageYOffset;

        window.addEventListener('scroll', function() {
            const currentScrollPosition = window.pageYOffset;
            const scrollDirection = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
            lastScrollPosition = currentScrollPosition;

            // Get section position
            const sectionRect = aboutSection.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionBottom = sectionRect.bottom;

            // Only trigger if section is in view
            if (sectionTop < window.innerHeight && sectionBottom > 0) {
                if (scrollDirection === 'down') {
                    // Additional effects when scrolling down
                    aboutImage.style.transitionDelay = '0s';
                    aboutContent.style.transitionDelay = '0.2s';
                } else {
                    // Additional effects when scrolling up
                    aboutImage.style.transitionDelay = '0.2s';
                    aboutContent.style.transitionDelay = '0s';
                }
            }
        });
    // ABOUT US SECTION ENDS========================================
/* <!-- WHY US SECTION STARTS=========================================================== --> */
 document.addEventListener('DOMContentLoaded', function() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Header animations
        gsap.to(".why3", {
            scrollTrigger: {
                trigger: ".why-section",
                start: "top 70%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            scale: 1,
            opacity: 1,
            ease: "elastic.out(1, 0.5)"
        });
        
        gsap.to(".why4", {
            scrollTrigger: {
                trigger: ".why-section",
                start: "top 70%",
                toggleActions: "play none none none"
            },
            duration: 1,
            y: 0,
            opacity: 1,
            ease: "back.out(4)"
        });
        
        // Card and icon animations - POP IN EFFECT TOGETHER
        gsap.to(".why6", {
            scrollTrigger: {
                trigger: ".why5",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            scale: 1,
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: "back.out(2)",
            onStart: function() {
                // Animate icons at the same time as cards
                gsap.to(".why7", {
                    duration: 0.6,
                    scale: 1,
                    stagger: 0.1,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        });
        
        // 3D TILT EFFECT
        const cards = document.querySelectorAll('.why6');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const xAxis = (card.offsetWidth / 2 - e.offsetX) / 15;
                const yAxis = (card.offsetHeight / 2 - e.offsetY) / 15;
                gsap.to(card, {
                    duration: 0.5,
                    rotateY: xAxis,
                    rotateX: yAxis,
                    ease: "power1.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.7,
                    rotateY: 0,
                    rotateX: 0,
                    ease: "elastic.out(1,0.3)"
                });
            });
        });
    });
/* <!-- WHY US SECTION ENDS=========================================================== --> */
// /* <!-- Sustainability SECTION starts ====================================================== --> */

document.addEventListener('DOMContentLoaded', function() {
  // Scroll animation function
  function animateOnScroll() {
    const elements = document.querySelectorAll('[data-scroll]');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - elementVisible) {
        const delay = element.getAttribute('data-scroll-delay') || 0;
        setTimeout(() => {
          element.classList.add('visible');
        }, delay);
      }
    });
  }
  
  // Initialize on load
  animateOnScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);
  
  // Animate stats numbers
  const stats = document.querySelectorAll('.sus19');
  
  function animateStats() {
    stats.forEach(stat => {
      const target = parseInt(stat.textContent.replace('%', ''));
      let current = 0;
      const increment = target / 30;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        stat.textContent = Math.floor(current) + '%';
      }, 30);
    });
  }
  
  // Trigger stats animation when visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
//   document.querySelector('.sus16').querySelectorAll('*').forEach(el => {
//     statsObserver.observe(el);
//   });
  
  // Card hover effects
  const cards = document.querySelectorAll('.sus9');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 15px 40px rgba(27, 94, 32, 0.12)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '0 10px 30px rgba(27, 94, 32, 0.08)';
    });
  });
});
// <!-- Sustainability SECTION ENDS ====================================================== -->
// <!-- FAQ SECTION STARTS================================================================ -->
 document.addEventListener('DOMContentLoaded', function() {
            // FAQ toggle functionality
            const faqItems = document.querySelectorAll('.faq1');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            });

            // Scroll animation with Intersection Observer
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe each FAQ item and CTA
            const elementsToAnimate = document.querySelectorAll('.faq1, .faq-cta');
            elementsToAnimate.forEach((element, index) => {
                setTimeout(() => {
                    observer.observe(element);
                }, index * 150);
            });

            // Add hover effect to CTA button
            const ctaBtn = document.querySelector('.faq-cta-btn');
            if (ctaBtn) {
                ctaBtn.addEventListener('mouseenter', () => {
                    ctaBtn.style.transform = 'translateY(-3px)';
                    ctaBtn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                });
                
                ctaBtn.addEventListener('mouseleave', () => {
                    ctaBtn.style.transform = 'translateY(0)';
                    ctaBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                });
            }
        });
// <!-- FAQ SECTION ends================================================================ -->
/* <!-- FOOTER SECTION starts================================================== --> */
  document.addEventListener('DOMContentLoaded', function() {
            // Animate footer sections on scroll
            const footerSections = document.querySelectorAll('.footer-section');
            
            const footerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        footerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            footerSections.forEach(section => {
                section.style.animationPlayState = 'paused';
                footerObserver.observe(section);
            });

            // Smooth scroll for anchor links
            document.querySelectorAll('.footer-links a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if(targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
/* <!-- FOOTER SECTION ends================================================== --> */

// CONTACT US STARTS
 document.addEventListener('DOMContentLoaded', function() {
            // Form submission handling
            const contactForm = document.querySelector('.contact-form form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Show loading state
                    const submitBtn = this.querySelector('.submit-btn');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        // Reset form
                        this.reset();
                        
                        // Show success message
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                        
                        // Reset button after 2 seconds
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                        }, 2000);
                    }, 1500);
                });
            }

            // Animation trigger on scroll
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.breadcrumb-hero, .contact-header, .contact-info, .contact-form, .map-section');
                const windowHeight = window.innerHeight;
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementPosition < windowHeight - elementVisible) {
                        element.style.animationPlayState = 'running';
                    }
                });
            };
            
            // Set initial state to paused
            document.querySelectorAll('.breadcrumb-hero, .contact-header, .contact-info, .contact-form, .map-section').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
            
            // Run on load and scroll
            window.addEventListener('load', animateOnScroll);
            window.addEventListener('scroll', animateOnScroll);
        });
        // CONTACT US ENDS---------------------------
        // PRIVACY POLICY SECTION STARTS===============================

         document.addEventListener('DOMContentLoaded', function() {
        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding content
                const tabId = btn.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                tabContent.classList.add('active');
                
                // Animate the new content
                animateContent(tabContent);
            });
        });
        
        // Animate elements when they come into view
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.animate-slidein, .animate-slideup, .animate-pop, .animate-fadein');
            const windowHeight = window.innerHeight;
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementPosition < windowHeight - elementVisible) {
                    const delay = element.style.getPropertyValue('--delay') || '0s';
                    element.style.animationDelay = delay;
                    element.style.animationPlayState = 'running';
                }
            });
        };
        
        // Set initial state to paused
        document.querySelectorAll('.animate-slidein, .animate-slideup, .animate-pop, .animate-fadein').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
        
        // Run on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
        
        // // Function to animate tab content
        // function animateContent(tabContent) {
        //     const items = tabContent.querySelectorAll('.animate-slidein, .animate-slideup, .animate-pop, .animate-fadein');
        //     items.forEach((item, index) => {
        //         item.style.animationPlayState = 'paused';
        //         setTimeout(() => {
        //             item.style.animationPlayState = 'running';
        //         }, index * 100);
        //     });
        // }
        
        // Animate the initial active tab
        const initialTab = document.querySelector('.tab-content.active');
        // animateContent(initialTab);
    });
// PRIVACY POLICY SECTION ENDS=================================
// PRODUCT SLIDER STARTS========================
  $(document).ready(function(){
            $('.ps3').slick({
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 3,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            centerPadding: '40px'
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            centerPadding: '30px'
                        }
                    }
                ]
            });
            
            // Add hover effects for mobile touch devices
            $('.ps5').on('touchstart', function() {
                $(this).addClass('hover-effect');
            }).on('touchend', function() {
                setTimeout(() => {
                    $(this).removeClass('hover-effect');
                }, 500);
            });
        });
        // PRODUCT SLIDER ENDS==========================