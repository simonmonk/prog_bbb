// 04_04_leds_off.js

var b = require('bonescript');
for (var i = 0; i < 4; i++) {
    var pin = "USR" + i;
    b.pinMode(pin, b.OUTPUT);
    b.digitalWrite(pin, 0);
}
