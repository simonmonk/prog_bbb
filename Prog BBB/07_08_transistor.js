// 07_08_transistor.js

var b = require('bonescript');
var outputPin = "P9_14";
var potPin = "P9_33";

function loop() {
    b.analogRead(potPin, setSpeed);
}

function setSpeed(reading) {
    var dutyCycle = reading.value;
    b.analogWrite(outputPin, dutyCycle, 50); 
}

setInterval(loop, 50);