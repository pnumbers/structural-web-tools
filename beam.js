const lengthEntry = document.getElementById("length");
const loadEntry = document.getElementById("linear-load");
const ultMomentEl = document.getElementById("ult-moment");
const momentCapcityEntry = document.getElementById("moment-capacity");
const calcButton = document.getElementById("calc-button");
const momentUtilElement = document.getElementById("moment-util");
const kipFtUnits = document.getElementById("kip-ft-units")

function calculateMoment() {
    const length = lengthEntry.value;
    const linearLoad = loadEntry.value;
    const moment = linearLoad * (length ** 2) / 8;
    ultMomentEl.innerHTML = moment;
    kipFtUnits.style.display = "inline"
    checkCapcity();
}

function checkCapcity() {
    util = calcMomentUtilization();
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

calcButton.addEventListener("click", calculateMoment);

