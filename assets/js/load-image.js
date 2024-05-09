document.addEventListener('DOMContentLoaded', function() {
    const pictureImg = document.querySelector('.calculator-picture-img');
    const radioButtons = document.querySelectorAll('input[name="module_type"]');

    updateImage();

    radioButtons.forEach(function(checkbox) {
        checkbox.addEventListener('change', updateImage);
    });


    const moduleTypeInputs = document.querySelectorAll('input[name="module_type"]');

    moduleTypeInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            const dataId = input.dataset.id;
            let activeElements = document.querySelectorAll('.calculator-rights-column-picture-variation-active');
            activeElements.forEach(function(element) {
                element.classList.remove('calculator-rights-column-picture-variation-active');
            });
            if (dataId === 'single-module'){
                let moduleTypeSingle = document.getElementById('module-type-single');
                let parentDiv = moduleTypeSingle.closest('.calculator-rights-column-picture-variation');
                parentDiv.classList.add('calculator-rights-column-picture-variation-active')
            }else{
                let moduleTypeSingle = document.getElementById('module-type-module');
                let parentDiv = moduleTypeSingle.closest('.calculator-rights-column-picture-variation');
                parentDiv.classList.add('calculator-rights-column-picture-variation-active')
            }
        });
    });


    const singleOrModuleList = document.querySelectorAll('input[name="module-type-single-or-module"]');

    singleOrModuleList.forEach(function(radioButton) {
        radioButton.addEventListener('change', function() {
            let parentDiv = radioButton.closest('.calculator-rights-column-picture-variation');
            if (parentDiv) {
                let activeElements = document.querySelectorAll('.calculator-rights-column-picture-variation-active');
                activeElements.forEach(function(element) {
                    element.classList.remove('calculator-rights-column-picture-variation-active');
                });
                parentDiv.classList.add('calculator-rights-column-picture-variation-active')
                let id = radioButton.id;
                let radioInput
                if (id==='module-type-single'){
                     radioInput = document.querySelector('input[type="radio"][data-id="single-module"]');
                }else {
                     radioInput = document.querySelector('input[type="radio"][data-id="double-module"]');
                }
                radioInput.checked = true;
                const parentVariation = radioInput.closest('.calculator-variation-mode');
                const allVariations = document.querySelectorAll('.calculator-variation-mode');
                allVariations.forEach(function(variation) {
                    variation.classList.remove('calculator-variation-active');
                });
                updateImage();
                parentVariation.classList.add('calculator-variation-active');
            }
        });
    });







    function updateImage() {
        let checkedInput = document.querySelector('input[name="module_type"]:checked');
        if (checkedInput) {
            pictureImg.src = checkedInput.getAttribute('data-src');
            pictureImg.onload = function() {
                let magnifierGlass = document.querySelector('.img-magnifier-glass');
                if (magnifierGlass) {
                    magnifierGlass.remove();
                }
                magnify(pictureImg, 2);
                // Скрываем масштабное стекло
                let glass = document.querySelector('.img-magnifier-glass');
                if (glass) {
                    glass.style.display = 'none';
                }
            };
        }
    }
});
















function magnify(img, zoom) {
    let glass, w, h, bw;
    let isGlassVisible = false; // Переменная для отслеживания видимости масштабного стекла
    let hideTimer; // Таймер для задержки перед скрытием масштабного стекла

    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    img.parentElement.insertBefore(glass, img);

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /* Execute a function when mouse enters the image area */
    img.addEventListener("mouseenter", () => {
        if (!isGlassVisible) {
            glass.style.display = "block";
            isGlassVisible = true;
        }
    });

    img.addEventListener("mouseleave", () => {
        if (isGlassVisible) {
            glass.style.display = "none";
            isGlassVisible = false;
        }
    });


    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        let pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
        if (x < w / zoom) {x = w / zoom;}
        if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
        if (y < h / zoom) {y = h / zoom;}
        /* Set the position of the magnifier glass: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
}
