const lengthEntry = document.getElementById("length");
const loadEntry = document.getElementById("linear-load");
const ultMomentEl = document.getElementById("ult-moment");
const momentCapcityEntry = document.getElementById("moment-capacity");
const calcButton = document.getElementById("calc-button");
const momentUtilElement = document.getElementById("moment-util");


function calculateMoment() {
    const length = lengthEntry.value;
    const linearLoad = loadEntry.value;
    const moment = linearLoad * (length ** 2) / 8;
    ultMomentEl.innerHTML = moment;
    checkCapcity();
}

function checkCapcity() {
    calcMomentUtilization();
}

function calcMomentUtilization() {
    const ultMoment = parseFloat(ultMomentEl.innerHTML);
    const momentCapcity = momentCapcityEntry.value;
    let util = ultMoment / momentCapcity;
    momentUtilElement.innerHTML = util.toFixed(2);

}

calcButton.addEventListener("click", calculateMoment);

