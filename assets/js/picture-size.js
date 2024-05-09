document.addEventListener('DOMContentLoaded', function() {
    const popularItems = document.querySelectorAll('.calculator-dimensions-popular-item');

    popularItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const widthInput = document.getElementById('width');
            const heightInput = document.getElementById('height');
            const width = item.getAttribute('data-w');
            const height = item.getAttribute('data-h');

            widthInput.value = width;
            heightInput.value = height;
        });
    });
});