// 08_01_breadboard_cape

var b = require('bonescript');

var led = "P9_14";

b.pinMode(led, b.OUTPUT);

var state = 0;

function toggleLED() {
    state = state ^ 1;
    b.digitalWrite(led, state);
}

setInterval(toggleLED, 500);