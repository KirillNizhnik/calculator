document.addEventListener("DOMContentLoaded", function() {
    const variationInputs = document.querySelectorAll('.calculator-variation-mode input[type="radio"]');

    variationInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            const parentVariation = input.closest('.calculator-variation-mode');

            const allVariations = document.querySelectorAll('.calculator-variation-mode');
            allVariations.forEach(function(variation) {
                variation.classList.remove('calculator-variation-active');
            });

            parentVariation.classList.add('calculator-variation-active');
        });
    });

    const slider = document.querySelector('.calculator-variations-slider');
    const moduleWidth = document.querySelector('.calculator-slider-variation').offsetWidth;

    const prevButton = document.querySelector('.calculator-mode-slide-prev-button');
    const nextButton = document.querySelector('.calculator-mode-slide-next-button');
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    nextButton.addEventListener('click', function() {
        slider.scrollBy({
            left: moduleWidth,
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', function() {
        slider.scrollBy({
            left: -moduleWidth,
            behavior: 'smooth'
        });
    });

    slider.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', function() {
        isMouseDown = false;
    });

    slider.addEventListener('mouseup', function() {
        isMouseDown = false;
    });

    slider.addEventListener('mousemove', function(e) {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
    });
});