import shapesJSON from './asic_shapes.json' assert {type:'json'}

const lengthEntry = document.getElementById("length");
const loadEntry = document.getElementById("linear-load");
const ultMomentEl = document.getElementById("ult-moment");
const momentCapcityEntry = document.getElementById("moment-capacity");
const calcButton = document.getElementById("calc-button");
const momentUtilElement = document.getElementById("moment-util");
const kipFtUnits = document.getElementById("kip-ft-units")
const shapeSelector = document.getElementById("shape-selector");
const zxPropSpan = document.getElementById("Zx");
const ixPropSpan = document.getElementById("Ix");
const propUnits = document.getElementsByClassName("propUnits");

function addShapesToDropDown(){
    for (const shape in shapesJSON['W']) {
       let option = document.createElement("option");
        option.value = shape;
        option.innerHTML = shape;
        shapeSelector.appendChild(option)
    }
}

function calculateMoment() {
    const length = lengthEntry.value;
    const linearLoad = loadEntry.value;
    const moment = linearLoad * (length ** 2) / 8;
    ultMomentEl.innerHTML = moment;
    kipFtUnits.style.display = "inline"
    checkCapcity();
}

function checkCapcity() {
    const util = calcMomentUtilization();
    colorUtilization(util);
}

function calcMomentUtilization() {
    const ultMoment = parseFloat(ultMomentEl.innerHTML);
    const momentCapcity = momentCapcityEntry.value;
    let util = ultMoment / momentCapcity;
    momentUtilElement.innerHTML = util.toFixed(2);
    return util;
}

function colorUtilization(util) {
    if (util > 1.0) {
        momentUtilElement.style.color = "red"
    }
    else {
        momentUtilElement.style.color = "green"
    }
}

function addShapeProperties() {
    const beam = shapeSelector.value;
    const zx = shapesJSON['W'][beam]['Zx'];
    const ix = shapesJSON['W'][beam]['Ix'];

    zxPropSpan.innerHTML = zx
    ixPropSpan.innerHTML = ix

    // TODO: Change to fix type error
    // This currently works and properly displays the units
    // but it should be changed
    for (const i in propUnits){
        propUnits[i].style.display = "inline";
    }
}

calcButton.addEventListener("click", calculateMoment);
shapeSelector.addEventListener("change", addShapeProperties)


addShapesToDropDown()

