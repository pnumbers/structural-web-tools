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
// Adds the shapes to the drop down
    for (const shape in shapesJSON['W']) {
       let option = document.createElement("option");
        option.value = shape;
        option.innerHTML = shape;
        shapeSelector.appendChild(option)
    }
}

// Functions relating to the calculating the applied
// moment
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
    // Displays the selected beam's properties to the UI
    // and adds them to the DOM
    // TODO: Add beam to the DOM
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

// Functions related to calculating the beam's moment
// capacity
function calcPlasticMoment(zx, fy){
    // zx (in^3)
    // fy (ksi)
    const plasticMoment = zx * fy;
    return plasticMoment;
}

function calcNominalMoment(){
    const zx = ; // in in^3
    const fy = 50; // in ksi
    const plasticMoment = calcPlasticMoment(zx, fy);
    const mn = Math.min(plasticMoment);
}

function calcFactoredMoment(){
    const phi = 0.9;
    const mn = calcNominalMoment();
    const phiMn = phi * mn;
    return phiMn;
}

calcButton.addEventListener("click", calculateMoment);
shapeSelector.addEventListener("change", addShapeProperties)


addShapesToDropDown()

class BeamWF{
    constructor(zx, fy){
        this.zx = zx;
        this.fy = fy;
    }

    calcPlasticMoment(){
        this.plasticMoment = this.zx * this.fy;
        return plasticMoment;
    }

    calcNominalMoment(){
        this.calcPlasticMoment();
        this.mn = Math.min(this.plasticMoment);
        return this.mn;
    }

    calcFactoredMoment(){
        // TODO: Verify phi factor of 0.9
        // TODO: Add a way to change 0.9
        this.phi = 0.9;
        this.calcNominalMoment();
        this.phiMn = this.phi * this.mn;
        return phiMn;
    }
}