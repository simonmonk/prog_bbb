// 06_04_analogRead.js

var b = require('bonescript');

function readVoltage() {
    b.analogRead('P9_39', printVoltage);
}

function printVoltage(reading) {
    var voltage = reading.value * 1.8;
    console.log(voltage);
}

setInterval(readVoltage, 500);