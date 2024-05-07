document.addEventListener("DOMContentLoaded", function() {
    let radioInputs = document.querySelectorAll('.calculator-select-picture-type-element input[type="radio"]');
    const variationInputs = document.querySelectorAll('.calculator-variation input[type="radio"]');

    radioInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            let labels = document.querySelectorAll('.calculator-select-picture-type-element');
            labels.forEach(function(label) {
                label.classList.remove('calculator-select-picture-type-element-checked');
            });
            if (input.checked) {
                input.parentNode.classList.add('calculator-select-picture-type-element-checked');
            }
        });
    });

});