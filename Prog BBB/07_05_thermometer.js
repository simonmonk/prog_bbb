// 07_05_thermometer.js

var b = require('bonescript');

function readTemp() {
    b.analogRead('P9_39', displayTemp);
}

function displayTemp(reading) {
    var millivolts = reading.value * 1800;
    var tempC = (millivolts - 500) / 10;
    var tempF = (tempC * 9/5) + 32
    console.log("Temp C=" + tempC + "\tTemp F=" + tempF);
}

setInterval(readTemp, 500);