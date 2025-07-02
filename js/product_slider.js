/**
 * @Author: DASTAN_E_ALAM
 * @Date:   2025-07-02 14:55:09
 * @Last Modified by:   DASTAN_E_ALAM
 * @Last Modified time: 2025-07-02 15:52:33
 */
document.addEventListener('DOMContentLoaded', function() {
    // Slider navigation functionality
    const slider = document.querySelector('.products-slider');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const productCards = document.querySelectorAll('.product-card');
    const cardWidth = productCards[0].offsetWidth + 24; // width + gap
    
    function updateNavButtons() {
        const scrollLeft = slider.scrollLeft;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        
        prevBtn.classList.toggle('disabled', scrollLeft <= 0);
        nextBtn.classList.toggle('disabled', scrollLeft >= maxScroll - 1);
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        
        slider.addEventListener('scroll', updateNavButtons);
        window.addEventListener('resize', updateNavButtons);
        updateNavButtons();
    }
    
    // Quick view modal functionality
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const modalClose = document.querySelector('.modal-close');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productDesc = productCard.querySelector('.product-description').textContent;
            const productImg = productCard.querySelector('.product-image').src;
            const productBadge = productCard.querySelector('.product-badge')?.textContent || '';
            const features = Array.from(productCard.querySelectorAll('.product-features span')).map(span => span.innerHTML);
            
            document.getElementById('modal-product-img').src = productImg;
            document.getElementById('modal-product-img').alt = productName;
            document.getElementById('modal-product-name').textContent = productName;
            document.getElementById('modal-price').textContent = productPrice;
            document.getElementById('modal-description').textContent = productDesc;
            
            const modalBadge = document.getElementById('modal-badge');
            if (productBadge) {
                modalBadge.textContent = productBadge;
                modalBadge.style.display = 'block';
            } else {
                modalBadge.style.display = 'none';
            }
            
            const featuresList = document.getElementById('modal-features');
            featuresList.innerHTML = '';
            features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = feature;
                featuresList.appendChild(li);
            });
            
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    document.querySelector('.modal-overlay').addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Quantity selector functionality
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityDisplay = document.querySelector('.quantity');
    
    if (minusBtn && plusBtn && quantityDisplay) {
        let quantity = 1;
        
        minusBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });
    }
});