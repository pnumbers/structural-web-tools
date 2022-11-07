const lengthEntry = document.getElementById("length");
const loadEntry = document.getElementById("linear-load");
const ultMomentEntry = document.getElementById("ult-moment");
const momentCapcityEntry = document.getElementById("moment-capacity");
const calcButton = document.getElementById("calc-button");
const momentUtilElement = document.getElementById("moment-util");

function calculateMoment() {
    const length = lengthEntry.value;
    const linearLoad = loadEntry.value;
    const moment = linearLoad * (length ** 2) / 8;
    ultMomentEntry.value = moment;
    checkCapcity();
}

function calcMomentUtilization() {
    const ultMoment = ultMomentEntry.value;
    const momentCapcity = momentCapcityEntry.value;
    let util = ultMoment / momentCapcity;
    momentUtilElement.innerHTML = util

}

calcButton.addEventListener("click", calculateMoment);

function checkCapcity() {
    calcMomentUtilization();
}