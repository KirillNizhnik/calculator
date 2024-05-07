document.addEventListener("DOMContentLoaded", function() {
    const nextButton = document.querySelector('.calculator-interior-slide-next-button');
    const prevButton = document.querySelector('.calculator-interior-slide-prev-button');
    const slider = document.querySelector('.calculator-interiors-slider');

    let startX;
    let scrollLeft;

    nextButton.addEventListener('click', function() {
        slider.scrollBy({
            left: slider.offsetWidth,
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', function() {
        slider.scrollBy({
            left: -slider.offsetWidth,
            behavior: 'smooth'
        });
    });

    slider.addEventListener('mousedown', function(e) {
        e.preventDefault();
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    function mouseMoveHandler(e) {
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
    }

    function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

});

