let my_range = $(".js-range-slider");

my_range.ionRangeSlider({
    skin: "big",
    grid: true,
    force_edges: true,
    hide_min_max: true,
    hide_from_to: true,
    block: false,
    step: 11,
});

let rangeData = my_range.data("ionRangeSlider");

function updateRange(myMin, myMax) {
    let min = parseInt(myMin);
    let max = parseInt(myMax);

    rangeData.update({
        min: min,
        max: max
    });
}

function  setStartMyRange(value){
    rangeData.update({
        from: value
    });
}

function getRangeValue() {
    return parseInt(rangeData.result.from);
}


function rangeListener(){
    my_range.on("change", function (event) {
        widthInput.value = getRangeValue();
        setHeight()
        generateSegments()
    });
}

function getMinValue(){
    return my_range.data("ionRangeSlider").result.min;
}

function getMaxValue(){
    return my_range.data("ionRangeSlider").result.max;
}


