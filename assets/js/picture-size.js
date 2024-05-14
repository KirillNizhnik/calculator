document.addEventListener('DOMContentLoaded', function() {
    let singleModuleElement = document.querySelector('[data-id="single-module"]');
    parseSizes(singleModuleElement);
    let moduleTypeRadios = document.querySelectorAll('input[name="module_type"]');

    moduleTypeRadios.forEach(function(radioButton) {
        radioButton.addEventListener('input', function() {
            parseSizes(radioButton)
        });
    });


    let widthInput = document.getElementById('width');
    let timer;

    widthInput.addEventListener('input', function() {
        clearTimeout(timer);

        const delay = 1000;


        timer = setTimeout(function() {
            let width = parseFloat(widthInput.value);
            let cowbellInput = document.getElementById('cowbell');
            let minCowbellValue = getMinValue()
            let maxCowbellValue = getMaxValue()
            let isValueInRange = width >= minCowbellValue && width <= maxCowbellValue;
            if (isValueInRange){
                setHeight();
                setStartMyRange(width);
            } else if (width < minCowbellValue){
                widthInput.value = minCowbellValue;
                setHeight();
                setStartMyRange(minCowbellValue)
            } else if (width > maxCowbellValue){
                widthInput.value = maxCowbellValue;
                setHeight();
                setStartMyRange(maxCowbellValue)

                }
        }, delay);
    });



    let heightInput = document.getElementById('height');
    let timerHeight;
    heightInput.addEventListener('input', function() {
        clearTimeout(timerHeight);
        const delay = 1000;
        timerHeight = setTimeout(function() {
            setWidth();
            let resultWidth = widthInput.value;
            let cowbellInput = document.getElementById('cowbell');
            let minCowbellValue = getMinValue()
            let maxCowbellValue = getMaxValue()
            console.log(maxCowbellValue, maxCowbellValue)
            let isValueInRange = resultWidth >= minCowbellValue && resultWidth <= maxCowbellValue;
            if (isValueInRange){
                setHeight();
                setStartMyRange(resultWidth)
            } else if (resultWidth < minCowbellValue){
                widthInput.value = minCowbellValue;
                setHeight();
                setStartMyRange(minCowbellValue)
            } else if (resultWidth > maxCowbellValue){
                widthInput.value = maxCowbellValue;
                setHeight();
                setStartMyRange(maxCowbellValue)
            }
            cowbellInput.value = widthInput.value
        }, delay);
    });







});



function parseSizes(module) {
    updatePopularSizes(module);
    setRange(module);
    setHeight()

}



function setRange(module){
    let maxWidth = module.getAttribute('data-max-width');
    let minWidth = module.getAttribute('data-min-width');
    let cowbellRange = document.getElementById('cowbell');
    if (maxWidth && minWidth){
    cowbellRange.style.display = "block";
    updateRange(minWidth, maxWidth)
    setStartMyRange(minWidth)
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


function rangeTrack() {
    let widthInput = document.getElementById('width');
    let cowbellRange = document.getElementById('cowbell');

    widthInput.value = getRangeValue();
    rangeListener()
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
            setStartMyRange(width)
            generateSegments()
        });
    });
}




function setHeight(){
    let heightInput = document.getElementById('height');
    let widthInput = document.getElementById('width');
    console.log(widthInput.value)
    heightInput.value = calculateHeight(widthInput.value);
}

function calculateHeight(width) {
    const metaInfoElement = document.querySelector('.calculator-meta-info');
    const growthRatio = parseFloat(metaInfoElement.getAttribute('data-growth-ratio'));
    let floatResult =  Math.round(width * growthRatio * 10) / 10;
    if (floatResult % 1 !== 0){
        return Math.floor(floatResult);
    } else{
        return floatResult;
    }
}


function setWidth(){
    let heightInput = document.getElementById('height');
    let widthInput = document.getElementById('width');
    widthInput.value = calculateWidth(heightInput.value);






}

function calculateWidth(height) {
    const metaInfoElement = document.querySelector('.calculator-meta-info');
    const growthRatio = parseFloat(metaInfoElement.getAttribute('data-growth-ratio'));
    let floatResult = Math.ceil(height / (growthRatio * 100) * 100);
    console.log(floatResult)
    if (floatResult % 1 !== 0){
        return Math.ceil(floatResult);
    }else{
        return floatResult;
    }
}













