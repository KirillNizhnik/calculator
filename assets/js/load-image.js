const pictureImg = document.querySelector('.calculator-picture-img');
let checkedInput = document.querySelector('input[name="module_type"]:checked');
if (checkedInput) {
    pictureImg.src = checkedInput.getAttribute('data-src');
}

const radioButtons = document.querySelectorAll('input[name="module_type"]');

radioButtons.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            pictureImg.src = this.getAttribute('data-src');
        }
    });
});



