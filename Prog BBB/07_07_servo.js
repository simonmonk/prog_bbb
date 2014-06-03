// 07_07_servo.js

var b = require('bonescript');
var servoPin = "P9_14";
var potPin = "P9_33";
var minDuty = 0.03;

function loop() {
    b.analogRead(potPin, setAngle);
}

function setAngle(reading) {
    var angle = reading.value * 180.0;
    var dutyCycle = (angle / 1565.0) + minDuty;
    b.analogWrite(servoPin, dutyCycle, 50); 
}

setInterval(loop, 50);