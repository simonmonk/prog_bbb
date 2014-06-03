// 08_02_motor_mod.js

var b = require('bonescript');
var pwmPin = "P8_19";
var ain1Pin = "P8_17";
var ain2Pin = "P8_15";
var potPin = "P9_33";

b.pinMode(ain1Pin, b.OUTPUT);
b.pinMode(ain2Pin, b.OUTPUT);

function loop() {
    b.analogRead(potPin, adjustMotor);
}

function adjustMotor(reading) {
    if (reading.value > 0.5) {
        forwards((reading.value - 0.5) * 2);
    }
    else {
        backwards((0.5 - reading.value) * 2);
    }
}

function forwards(duty) {
    b.analogWrite(pwmPin, duty); 
    b.digitalWrite(ain1Pin, 1);
    b.digitalWrite(ain2Pin, 0);
}

function backwards(duty) {
    b.analogWrite(pwmPin, duty); 
    b.digitalWrite(ain1Pin, 0);
    b.digitalWrite(ain2Pin, 1);
}

setInterval(loop, 50);