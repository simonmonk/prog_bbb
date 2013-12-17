// 08_03_i2c_clock.js

var d = require('./hd16k33');

d.start();

var colonState = true;

function displayTime() {
    var date = new Date(); 
    var h = date.getHours(); 
    var m = date.getMinutes(); 
    d.writeDigit(0, Math.floor(h / 10));
    d.writeDigit(1, h % 10);
    d.writeDigit(3, Math.floor(m / 10));
    d.writeDigit(4, m % 10);
    d.writeDisplay();
}

function flashColon() {
    d.setColon(colonState);
    d.writeDisplay();
    colonState = ! colonState;
}

setInterval(displayTime, 1000);
setInterval(flashColon, 500);