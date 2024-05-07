const imageInfoContainer = document.getElementById('image-info');
const fileInput = document.getElementById('calculator-file-upload');
const deleteImageBtn = document.getElementById('calculator-delete-image')
const calculatorInvalidFormat = document.getElementById('calculator-invalid-format')
const calculatorMenu = document.getElementById('custom-img')

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    clearImageInfoContainer();
    calculatorInvalidFormat.innerText = '';

    if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
        displayImage(file);
        showDeleteButton();
        showCalculatorMenu();
    } else {
        clearFileInput();
        displayInvalidFormatMessage();
    }
});



deleteImageBtn.addEventListener('click', function (){
    hideCalculatorMenu();
    hideDeleteImageButton();
    clearImageInfoContainer();
    clearFileInput();
});

function hideDeleteImageButton(){
    deleteImageBtn.style.visibility = 'hidden';
}

function showDeleteButton(){
    deleteImageBtn.style.visibility = 'visible';
}

function displayImage(file) {
    const imageUrl = URL.createObjectURL(file);

    const imageInnerDiv = document.createElement('div');
    imageInnerDiv.classList.add('calculator-image-inner');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('calculator-image-container');

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.classList.add('calculator-image');
    imageContainer.appendChild(imageElement);

    const textContainer = document.createElement('div');
    textContainer.classList.add('calculator-image-text-container');

    const yourImage = document.createElement('span');
    yourImage.classList.add('calculator-image-text');
    yourImage.textContent = "Your Image:";
    textContainer.appendChild(yourImage);

    const fileNameElement = document.createElement('span');
    fileNameElement.classList.add('calculator-image-text');
    fileNameElement.textContent = file.name;
    textContainer.appendChild(fileNameElement);

    imageInnerDiv.appendChild(imageContainer);
    imageInnerDiv.appendChild(textContainer);
    imageInfoContainer.appendChild(imageInnerDiv);
}

function clearImageInfoContainer() {
    imageInfoContainer.innerHTML = '';
}

function clearFileInput() {
    fileInput.value = '';
}

function displayInvalidFormatMessage() {
    calculatorInvalidFormat.innerText = 'Этот формат не подходит, пожалуйста вставьте jpg, jpeg, png.';
}

function showCalculatorMenu(){
    calculatorMenu.classList.remove('calculator-image-columns-custom-hidden')
}


function hideCalculatorMenu(){
    calculatorMenu.classList.add('calculator-image-columns-custom-hidden')
}


