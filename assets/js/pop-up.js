const overlay = document.querySelector('.overlay');
const body = document.querySelector('.calculator-body');

const modal = document.querySelector('.tension-type-pop-up');
const modalDimensions = document.querySelector('.dimensions-pop-up');
const modalClosePaintingOrPrint = document.querySelector('.painting-or-print-pop-up');
const modalCloseVarnish = document.querySelector('.varnish-pop-up');
const modalCloseFrame = document.querySelector('.frame-pop-up');

const closeButton = document.querySelector('.tension-type-pop-up-close');
const closeDimensionsPopUp = document.querySelector('.dimensions-pop-up-close');
const closePaintingOrPrintPopUp = document.querySelector('.painting-or-print-pop-up-close');
// const closeVarnishPopUp = document.querySelector('.varnish-pop-up-close');
const closeFramePopUp = document.querySelector('.frame-pop-up-close');

const tensionOpen = document.getElementById('tension-type-pop-up');
const dimensionsPopUpOpen = document.getElementById('dimensions-pop-up');
const paintingOrPrintPopUpOpen = document.getElementById('painting-or-print-pop-up');
// const varnishPopUpOpen = document.getElementById('varnish-pop-up');
const framePopUpOpen = document.getElementById('frame-pop-up');

function openModal(modalElement) {
    modalElement.style.display = 'block';
    overlay.style.display = 'block';
    body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
}

function closeModal(modalElement) {
    modalElement.style.display = 'none';
    overlay.style.display = 'none';
    body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}

closeButton.addEventListener('click', () => closeModal(modal));
closeDimensionsPopUp.addEventListener('click', () => closeModal(modalDimensions));
closePaintingOrPrintPopUp.addEventListener('click', () => closeModal(modalClosePaintingOrPrint));
// closeVarnishPopUp.addEventListener('click', () => closeModal(modalCloseVarnish));
closeFramePopUp.addEventListener('click', () => closeModal(modalCloseFrame));

tensionOpen.addEventListener('click', () => openModal(modal));
dimensionsPopUpOpen.addEventListener('click', () => openModal(modalDimensions));
paintingOrPrintPopUpOpen.addEventListener('click', () => openModal(modalClosePaintingOrPrint));
// varnishPopUpOpen.addEventListener('click', () => openModal(modalCloseVarnish));
// framePopUpOpen.addEventListener('click', () => openModal(modalCloseFrame));
