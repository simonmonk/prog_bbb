// 06_03_analogWrite.js

var b = require('bonescript');

var pin = "P8_13";
b.pinMode(pin, b.OUTPUT);
b.analogWrite(pin, 0.5);
