const modal = document.querySelector('.tension-type-pop-up');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('.calculator-body');
const tensionOpen = document.getElementById('tension-type-pop-up')
const closeButton = document.querySelector('.tension-type-pop-up-close');

function openModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
}

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}


closeButton.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);
tensionOpen.addEventListener('click', openModal)
