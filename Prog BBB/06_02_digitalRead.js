// 06_02_digitalRead.js

var b = require('bonescript');

var pin = "P9_12";
b.pinMode(pin, b.INPUT);

function readInput() {
    var reading = b.digitalRead(pin);
    console.log(reading);
}

setInterval(readInput, 1000);