const lengthEntry = document.getElementById("length");
const loadEntry = document.getElementById("linear-load");
const ultMomentEntry = document.getElementById("ult-moment");
const calcButton = document.getElementById("calc-button");

function calculateMoment() {
    const length = lengthEntry.value;
    const linearLoad = loadEntry.value;
    const moment = linearLoad * (length ** 2) / 8;
    ultMomentEntry.value = moment;
}

calcButton.addEventListener("click", calculateMoment);

