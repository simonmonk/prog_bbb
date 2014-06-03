// 07_03_rgb.js

var b = require('bonescript');

var ledRed = "P9_14";
var ledGreen = "P8_13";
var ledBlue = "P8_19";

var red = 0.5;
var green = 0.5;
var blue = 0.5;

function tweak(color) {
    var change = (Math.random() - 0.5) / 50;
    color = color + change;
    if (color > 1.0) color = 1.0;
    if (color < 0.0) color = 0.0;
    return color;
}

function changeColor() {
    red = tweak(red);
    green = tweak(green);
    blue = tweak(blue);
    b.analogWrite(ledRed, red);
    b.analogWrite(ledGreen, green);
    b.analogWrite(ledBlue, blue);
}

setInterval(changeColor, 5);