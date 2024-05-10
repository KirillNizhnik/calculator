document.addEventListener('DOMContentLoaded', function() {
    let singleModuleElement = document.querySelector('[data-id="single-module"]');
    parseSizes(singleModuleElement)
    let moduleTypeRadios = document.querySelectorAll('input[name="module_type"]');

    moduleTypeRadios.forEach(function(radioButton) {
        radioButton.addEventListener('change', function() {
            parseSizes(radioButton)
        });
    });


});



function parseSizes(module) {
    updatePopularSizes(module);
    setRange(module);

}



function setRange(module){
    let maxWidth = module.getAttribute('data-max-width');
    let minWidth = module.getAttribute('data-min-width');
    let cowbellRange = document.getElementById('cowbell');
    if (maxWidth && minWidth){
    cowbellRange.style.display = "block"
    cowbellRange.min = minWidth;
    cowbellRange.max = maxWidth;
    cowbellRange.value = minWidth
    }else {
        cowbellRange.style.display = "none";
    }
    rangeTrack()
}

function updatePopularSizes(module){
    let sizesString = module.getAttribute('data-popular-size');
    let popularList = document.querySelector('.calculator-dimensions-popular-list');
    popularList.innerHTML = '';
    if (sizesString) {
        let sizesArray = sizesString.split(",");
        let sizes = [];
        sizesArray.forEach(function (size) {
            let dimensions = size.split("X");
            let width = dimensions[0];
            let height = dimensions[1];
            sizes.push({width: width, height: height});
        });
        let popularItems = '';
        sizes.forEach(function (size) {
            popularItems += `<div class="calculator-dimensions-popular-item" data-w="${size.width}" data-h="${size.height}">
                            ${size.width}x${size.height}
                         </div>`;
        });
        popularList.innerHTML = popularItems;
        attachPopularItemsClickListener();
     }
}


function rangeTrack(){
    let widthInput = document.getElementById('width');
    let cowbellRange = document.getElementById('cowbell');
    widthInput.value = cowbellRange.value
    cowbellRange.addEventListener('input', function(event) {
    widthInput.value = cowbellRange.value;

    });
}




function attachPopularItemsClickListener() {
    const popularItems = document.querySelectorAll('.calculator-dimensions-popular-item');
    popularItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const widthInput = document.getElementById('width');
            const heightInput = document.getElementById('height');
            const width = item.getAttribute('data-w');
            const height = item.getAttribute('data-h');
            widthInput.value = width;
            heightInput.value = height;
            let cowbellRange = document.getElementById('cowbell');
            cowbellRange.value = width;

        });
    });
}



