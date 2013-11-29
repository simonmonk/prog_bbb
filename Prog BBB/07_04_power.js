// 07_04_power.js

var b = require('bonescript');
var secondsOn = 20;
var controlPin = "P8_14";
b.pinMode(controlPin, b.OUTPUT);

b.digitalWrite(controlPin, 1);

function turnOff() {
    b.digitalWrite(controlPin, 0);
}

setTimeout(turnOff, secondsOn * 1000);