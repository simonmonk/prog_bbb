// 06_05_interrupts.js

var b = require('bonescript');

var pin = "P9_12";
b.pinMode(pin, b.INPUT);
b.attachInterrupt(pin, true, b.CHANGE, interruptCallback);

var interruptCount = 1; 

function interruptCallback(x) {
    console.log("INTERRUPT " + interruptCount);
    interruptCount ++;
}
