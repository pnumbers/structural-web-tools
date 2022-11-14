// import shapesJSON from './asic_shapes.json' assert {type:'json'}
import BeamWF from './BeamWF.js';
import shapesJSON from './asic_shapes.js';

// DOM Variables
const lengthEntry = document.getElementById("length");
const loadEntry = document.getElementById("linear-load");
const ultMomentEl = document.getElementById("ult-moment");
const momentCapacityEl = document.getElementById("moment-capacity");
// const calcButton = document.getElementById("calc-button");
const momentUtilElement = document.getElementById("moment-util");
const kipFtUnits = document.getElementById("kip-ft-units")
const shapeSelector = document.getElementById("shape-selector");

// Beam Props
const zxPropSpan = document.getElementById("Zx");
const ixPropSpan = document.getElementById("Ix");
const lpPropSpan = document.getElementById("Lp");
const lrPropSpan = document.getElementById("Lr");
const propUnits = document.getElementsByClassName("propUnits");


// Add event listeners
lengthEntry.addEventListener("change", lengthChanged);
loadEntry.addEventListener("change", loadChanged)
// calcButton.addEventListener("click", calculateMoment);
shapeSelector.addEventListener("change", shapeSelected);


// Initial Set up
addShapesToDropDown();
const inital_shape = getShape();
const intial_length = parseFloat(lengthEntry.value);


// Global variables
// TODO: Change this to an input
const FY = 50; //ksi
const BEAM = new BeamWF(inital_shape, FY, intial_length);


// Display beam data after a beam instance has been initalized
displayBeamData();
// TODO: Change this to be a different function
loadChanged();


// Set up functions
function addShapesToDropDown(){
// Adds the shapes to the drop down
    for (const shape in shapesJSON['W']) {
       let option = document.createElement("option");
        option.value = shape;
        option.innerHTML = shape;
        shapeSelector.appendChild(option);
    }
}

function lengthChanged() {
    const length = parseFloat(lengthEntry.value);
    BEAM.setLength(length);
    updateMomentCapacity();
    calculateMoment();
    // BEAM.
}

function loadChanged() {
    calculateMoment();
}

// Functions relating to the calculating the applied
// moment
function calculateMoment() {
    const length = lengthEntry.value;
    const linearLoad = loadEntry.value;
    if (length === '' || linearLoad === ''){
        alert('Enter a length and a load to calculate.');
    } else {
        const moment = linearLoad * (length ** 2) / 8;
        ultMomentEl.innerHTML = moment.toFixed(2);
        kipFtUnits.style.display = "inline";
        checkCapcity();
    }
}

function checkCapcity() {
    const util = calcMomentUtilization();
    colorUtilization(util);
}

function calcMomentUtilization() {
    const ultMoment = parseFloat(ultMomentEl.innerHTML);
    let momentCapacity = momentCapacityEl.innerHTML;
    if (momentCapacity && momentCapacity !== 'N/A') {
        momentCapacity = parseFloat(momentCapacity);
    }
    // const momentCapcity = parseFloat(momentCapcityEl.innerHTML);
    let util = ultMoment / momentCapacity;
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

function getShape(){
    const beam = shapeSelector.value;
    const shape_data = shapesJSON['W'][beam];
    return shape_data;
}

function shapeSelected() {
    const shape_data = getShape()
    BEAM.setShape(shape_data);
    displayBeamData();
    checkCapcity();
}

function updateMomentCapacity(){
    const phiMn = BEAM.phiMn; // kip-ft
    momentCapacityEl.innerHTML = phiMn.toFixed(2);
}

function displayBeamData() {
    // Displays the selected beam's properties to the UI
    // and adds them to the DOM
    const zx = BEAM.Zx;
    const ix = BEAM.Ix;
    const lp = BEAM.Lp;
    const lr = BEAM.Lr;
    
    zxPropSpan.innerHTML = zx
    ixPropSpan.innerHTML = ix
    lpPropSpan.innerHTML = lp.toFixed(2)
    lrPropSpan.innerHTML = lr.toFixed(2)

    updateMomentCapacity()

    // TODO: Scrap this. Beam data is shwon from
    // the start now so there isn't a time when units
    // shouldnt be present
    for (let i=0; i < propUnits.length; i++){
        propUnits[i].style.display = "inline";
    }

}