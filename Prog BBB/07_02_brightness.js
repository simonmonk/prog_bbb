// 07_02_brightness

var b = require('bonescript');

var sw1 = "P9_13";
var sw2 = "P9_15";
var led = "P9_14";
var step = 0.05;

b.pinMode(sw1, b.INPUT);
b.pinMode(sw2, b.INPUT);

var duty = 0.5;

function brighter() {
    duty = duty + step;
    if (duty > 1.0) {
        duty = 1.0;
    }
    b.analogWrite(led, duty);
}

function dimmer() {
    duty = duty - step;
    if (duty < 0.0) {
        duty = 0.0;
    }
    b.analogWrite(led, duty);
}

function loop() {
    if (b.digitalRead(sw1) == 0) {
        brighter();
    }
    if (b.digitalRead(sw2) == 0) {
        dimmer();
    }
}

setInterval(loop, 50);
