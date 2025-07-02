/**
 * @Author: DASTAN_E_ALAM
 * @Date:   2025-07-02 12:51:45
 * @Last Modified by:   DASTAN_E_ALAM
 * @Last Modified time: 2025-07-02 18:08:46
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Start gradient rotation
  startGradientRotation();
  
  // Start product animations
  startProductAnimations();
  
  // Optimize performance by reducing animations when tab is not active
  handleVisibilityChange();
});

function initAnimations() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtext = document.querySelector('.hero-subtext');
  const heroCta = document.querySelector('.hero-cta');
  const heroModel = document.querySelector('.hero-model-container');
  
  // Apply initial animations
  setTimeout(() => {
    hero.style.animation = 'fadeInUp 1s cubic-bezier(0.19, 1, 0.22, 1) 0.2s forwards';
    heroContent.style.animation = 'slideInLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s forwards';
    heroTitle.style.animation = 'fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s forwards';
    heroSubtext.style.animation = 'fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s forwards';
    heroCta.style.animation = 'fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s forwards';
    heroModel.style.animation = 'slideInRight 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s forwards';
  }, 100);
}

function startGradientRotation() {
  const hero = document.querySelector('.hero');
  let rotation = 0;
  
  function animateGradient() {
    rotation = (rotation + 0.2) % 360;
    hero.style.setProperty('--gradient-rotation', `${rotation}deg`);
    requestAnimationFrame(animateGradient);
  }
  
  // Only start animation if prefers-reduced-motion is not set
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(animateGradient);
  }
}

function startProductAnimations() {
  const padBase = document.querySelector('.pad-base');
  const wingLeft = document.querySelector('.wing-left');
  const wingRight = document.querySelector('.wing-right');
  const productGlow = document.querySelector('.product-glow');
  
  // Check if elements exist
  if (!padBase || !wingLeft || !wingRight || !productGlow) return;
  
  // Only start animations if prefers-reduced-motion is not set
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  // Apply 3D floating animation
  padBase.style.animation = 'float-3d 8s ease-in-out infinite';
  
  // Apply wing animations
  wingLeft.style.animation = 'wing-flap-left 6s ease-in-out infinite';
  wingRight.style.animation = 'wing-flap-right 6s ease-in-out infinite';
  
  // Apply glow animation
  productGlow.style.animation = 'pulse-glow 4s ease-in-out infinite';
}

function handleVisibilityChange() {
  let hidden, visibilityChange;
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }
  
  if (typeof visibilityChange !== 'undefined') {
    document.addEventListener(visibilityChange, function() {
      const padBase = document.querySelector('.pad-base');
      if (document[hidden]) {
        // Pause animations when tab is not active
        if (padBase) padBase.style.animationPlayState = 'paused';
      } else {
        // Resume animations when tab becomes active
        if (padBase) padBase.style.animationPlayState = 'running';
      }
    }, false);
  }
}

// Optimize for mobile touch interactions
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('touchstart', function() {
    this.classList.add('active');
  });
  
  btn.addEventListener('touchend', function() {
    this.classList.remove('active');
  });
});