// 06_01_digitalWrite.js

var b = require('bonescript');

var pin = "P8_10";
b.pinMode(pin, b.OUTPUT);
b.digitalWrite(pin, 1);
