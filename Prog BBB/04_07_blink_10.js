// 04_07_blink_10.js

var b = require('bonescript');

var led = "USR3";
b.pinMode(led, b.OUTPUT);

var state = 0;

function toggleLED() {
    state = state ^ 1;
    b.digitalWrite(led, state);
}

var timer = setInterval(toggleLED, 500);

function stopTimer() {
    clearInterval(timer);
}

setTimeout(stopTimer, 10000);