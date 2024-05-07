document.addEventListener("DOMContentLoaded", function() {
    let checkedRadioButton = document.querySelector('input[name="module-type-single-or-module"]:checked');
    if (checkedRadioButton) {
        let labelText = checkedRadioButton.closest('.calculator-rights-column-picture-variation-label')?.textContent.trim();
        if (labelText) setPictureType(labelText);
    }
    let radioButtons = document.querySelectorAll('input[name="module-type-single-or-module"]');
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener("change", function() {
            if (this.checked) {
                let labelText = this.closest('.calculator-rights-column-picture-variation-label')?.textContent.trim();
                if (labelText) setPictureType(labelText);
            }
        });
    });


    let checkedRadioButtonMode = document.querySelector('input[name="module_type"]:checked');
    if (checkedRadioButtonMode) {
        let label = checkedRadioButtonMode.parentElement.querySelector('.calculator-variation-label-1');
        if (label) {
            let labelText = label.textContent.trim();
            if (labelText)
                setModeNumber(labelText);
        }
    }
    document.querySelectorAll('input[name="module_type"]').forEach(function(radioButton) {
        radioButton.addEventListener('change', function() {
            let label = this.parentElement.querySelector('.calculator-variation-label-1');
            if (label) {
                let labelText = label.textContent.trim();
                if (labelText)
                    setModeNumber(labelText);
            }
        });
    });


});











function setPictureType(value){
    document.getElementById('table-picture-type').textContent = value;
}

function setModeNumber(value){
    document.getElementById('table-picture-mode-number').textContent = value;
}


function setPictureWidthAndLength(value){
    document.getElementById('table-picture-width-and-height').textContent = value;
}

function setPictureMaterial(value){
    document.getElementById('table-picture-material').textContent = value;
}

function setPictureVarnish(value){
    document.getElementById('table-picture-vanish').textContent = value;
}

function setPictureFrameType(value){
    document.getElementById('table-picture-subframe-type').textContent = value;
}

function setPictureSubFrameType(value){
    document.getElementById('table-picture-vanish').textContent = value;
}