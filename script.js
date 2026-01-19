// Testimonial Slider Functionality - Simplified Version
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slider_slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds

    // Initialize slider
    function initSlider() {
        // Set initial active states
        updateActiveSlide();
        
        // Start auto-slide
        startAutoSlide();
        
        // Add click events to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
                resetAutoSlide();
            });
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        
        // Loop back to first slide if at end
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        
        // Loop to last slide if before first
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        
        updateActiveSlide();
    }

    function updateActiveSlide() {
        // Update slides - using display instead of opacity to prevent height issues
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.display = 'block';
                slide.style.opacity = '1';
                slide.style.visibility = 'visible';
            } else {
                slide.style.display = 'none';
                slide.style.opacity = '0';
                slide.style.visibility = 'hidden';
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Initialize the slider
    initSlider();
});