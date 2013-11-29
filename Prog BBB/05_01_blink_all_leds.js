// 05_01_blink_all_leds.js

var b = require('bonescript');

var leds = ["USR0", "USR1", "USR2", "USR3"];

leds.forEach(function(led) { b.pinMode(led, b.OUTPUT); });

var state = 0;

function toggleLED() {
    state = state ^ 1;
    leds.forEach(function(led) { b.digitalWrite(led, state); });
}

setInterval(toggleLED, 500);