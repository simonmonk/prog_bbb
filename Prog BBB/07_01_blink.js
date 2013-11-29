// 07_01_blink.js

var b = require('bonescript');

var led = "P9_11";
b.pinMode(led, b.OUTPUT);

var state = 0;

function toggleLED() {
    state = state ^ 1;
    b.digitalWrite(led, state);
}

setInterval(toggleLED, 500);