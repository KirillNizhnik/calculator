const {fromEvent, timer, mergeWith} = rxjs;
const {switchMap, tap} = rxjs.operators;


const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

const pageLoadObservable = fromEvent(document, 'DOMContentLoaded');
const radioInputs = document.querySelectorAll('input[type="radio"][name="module_type"]');
const popularItem = document.querySelector('.calculator-dimensions-popular-item');
const rangeInput = document.getElementById('cowbell');


const inputWidthObservable = fromEvent(widthInput, 'input');
const inputHeightObservable = fromEvent(heightInput, 'input');

const radioChangeObservable = fromEvent(radioInputs, 'change');
const rangeChangeObservable = fromEvent(rangeInput, 'input');


const combinedObservable = pageLoadObservable.pipe(
    mergeWith(inputWidthObservable, inputHeightObservable, radioChangeObservable, rangeChangeObservable)
);


let timerId;


combinedObservable.pipe(
    tap(() => clearTimeout(timerId)),
    switchMap(() => {
        return new Promise(resolve => {
            timerId = setTimeout(resolve, 2000);
        });
    })
).subscribe(() => {
    generateSegments();
});

function generateSegments() {
    let segmentContainer = document.getElementById('segment-container')
    let width = document.getElementById('width').value;
    let height = document.getElementById('height').value;
    let checkedRadio = document.querySelector('input[type="radio"][name="module_type"]:checked');

    segmentContainer.innerHTML = '';
    const picType = checkedRadio.getAttribute("data-pic_type");
    const wSizes = checkedRadio.getAttribute("data-w_sizes").split(",").map(parseFloat);
    const hSizes = checkedRadio.getAttribute("data-h_sizes").split(",").map(parseFloat);
    const segments = checkedRadio.getAttribute('data-segment')
    const segmentsInt = parseInt(segments);


    if (picType === 'single') {
        let segment = generateHtmlForSegment('1', width, height);
        segmentContainer.appendChild(segment)
    } else if (picType === 'module') {
        let count = 1;
        for (let i = 0; i < segmentsInt; i++) {
            console.log(`Сегмент №${count}:`, {
                width: wSizes[i],
                height: hSizes[i],

            });
            let segment = generateHtmlForSegment(count, (width * wSizes[i]), (height * hSizes[i]));
            segmentContainer.appendChild(segment);
            count++;

        }

    }
}



function generateHtmlForSegment(number, width, length) {
    let segmentItem = document.createElement('li');
    segmentItem.classList.add('calculator-dimensions-select-modal-size-item');

    let spanElement = document.createElement('span');

    if (Number.isInteger(width) && Number.isInteger(length)) {
        spanElement.textContent = `${width} x ${length} см`;
    } else {
        spanElement.textContent = `${Math.round(width * 10) / 10} x ${Math.round(length * 10) / 10} см`;
    }

    segmentItem.textContent = `Сегмент №${number}: `;
    segmentItem.appendChild(spanElement);
    return segmentItem;
}


