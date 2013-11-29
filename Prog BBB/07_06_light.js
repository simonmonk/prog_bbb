// 07_06_light.js

var b = require('bonescript');

function readLight() {
    b.analogRead('P9_39', displayLight);
}

function displayLight(reading) {
    var millivolts = reading.value * 1800;
    console.log("Light=" + millivolts);
}

setInterval(readLight, 500);