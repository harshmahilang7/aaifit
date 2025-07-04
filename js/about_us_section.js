/**
 * @Author: DASTAN_E_ALAM
 * @Date:   2025-07-02 19:31:01
 * @Last Modified by:   DASTAN_E_ALAM
 * @Last Modified time: 2025-07-04 20:44:59
 */
// document.addEventListener('DOMContentLoaded', function() {
//     // Load fonts
//     const link = document.createElement('link');
//     link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap';
//     link.rel = 'stylesheet';
//     document.head.appendChild(link);
    
//     // About section animation
//     const aboutSection = document.getElementById('about');
//     if (!aboutSection) return;
    
//     const aboutImage = document.getElementById('aboutImage');
//     const aboutContent = document.getElementById('aboutContent');
    
//     const observerOptions = {
//         threshold: 0.2,
//         rootMargin: '0px 0px -100px 0px'
//     };
    
//     const aboutObserver = new IntersectionObserver(function(entries) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 aboutImage.classList.add('animate');
//                 aboutContent.classList.add('animate');
                
//                 // Animate feature items with staggered delay
//                 const featureItems = document.querySelectorAll('.feature-item');
//                 featureItems.forEach((item, i) => {
//                     setTimeout(() => {
//                         item.style.opacity = '1';
//                         item.style.transform = 'translateY(0)';
//                     }, i * 100);
//                 });
                
//                 aboutObserver.disconnect();
//             }
//         });
//     }, observerOptions);
    
//     aboutObserver.observe(aboutSection);
    
//     // Add hover effect to feature items
//     const featureItems = document.querySelectorAll('.feature-item');
//     featureItems.forEach(item => {
//         item.style.opacity = '0';
//         item.style.transform = 'translateY(20px)';
//         item.style.transition = 'all 0.5s ease';
        
//         item.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-5px)';
//             this.style.boxShadow = '0 15px 30px rgba(108, 92, 231, 0.15)';
//         });
        
//         item.addEventListener('mouseleave', function() {
//             this.style.transform = 'translateY(0)';
//             this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
//         });
//     });
    
//     // Add hover effect to CTA button
//     const ctaButton = document.querySelector('.cta-button');
//     if (ctaButton) {
//         ctaButton.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-3px)';
//         });
        
//         ctaButton.addEventListener('mouseleave', function() {
//             this.style.transform = 'translateY(0)';
//         });
//     }
// });


const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

