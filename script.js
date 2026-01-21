// Testimonial Slider with Enhanced Animations
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slider_slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 6000; // 6 seconds
    
    // Initialize slider
    function initSlider() {
        // Set initial active states
        updateActiveSlide();
        startAutoSlide();
        
        // Add click events to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function(e) {
                e.stopPropagation();
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                
                if (slideIndex !== currentSlide) {
                    goToSlide(slideIndex);
                    resetAutoSlide();
                }
            });
        });
        
        // Pause on hover
        const slider = document.querySelector('.testimonial_slider');
        slider.addEventListener('mouseenter', pauseAutoSlide);
        slider.addEventListener('mouseleave', resumeAutoSlide);
    }
    
    function goToSlide(slideIndex) {
        if (slideIndex === currentSlide) return;
        
        const oldSlide = slides[currentSlide];
        const newSlide = slides[slideIndex];
        
        // Animate out current slide
        oldSlide.classList.remove('active');
        oldSlide.classList.add('slide-out');
        
        // Reset and prepare new slide
        newSlide.style.display = 'block';
        newSlide.classList.remove('slide-out');
        newSlide.classList.add('slide-in');
        
        currentSlide = slideIndex;
        
        // Update active state after animation
        setTimeout(() => {
            oldSlide.style.display = 'none';
            oldSlide.classList.remove('slide-in', 'slide-out');
            newSlide.classList.remove('slide-in');
            newSlide.classList.add('active');
            updateDots();
        }, 800); // Match animation duration
    }
    
    function updateActiveSlide() {
        // Remove all inline styles and reset
        slides.forEach((slide, index) => {
            slide.style.display = index === currentSlide ? 'block' : 'none';
            slide.classList.remove('active', 'slide-in', 'slide-out');
            
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        updateDots();
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            const isActive = index === currentSlide;
            dot.classList.toggle('active', isActive);
            
            // Reset and restart progress animation
            const progress = dot.querySelector('.slide-progress');
            if (progress) {
                progress.style.animation = 'none';
                
                if (isActive) {
                    setTimeout(() => {
                        progress.style.animation = `progress ${slideDuration}ms linear forwards`;
                    }, 10);
                }
            }
        });
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    function pauseAutoSlide() {
        clearInterval(slideInterval);
        
        // Pause progress animation
        dots.forEach(dot => {
            const progress = dot.querySelector('.slide-progress');
            if (progress && dot.classList.contains('active')) {
                progress.style.animationPlayState = 'paused';
            }
        });
    }
    
    function resumeAutoSlide() {
        // Resume progress animation
        dots.forEach(dot => {
            const progress = dot.querySelector('.slide-progress');
            if (progress && dot.classList.contains('active')) {
                progress.style.animationPlayState = 'running';
            }
        });
        
        startAutoSlide();
    }
    
    // Initialize
    initSlider();
});