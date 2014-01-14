// 05_03_blink_morse.js

var b = require('bonescript');

var dot = 100;
var dash = dot * 3;
var gap = dot; // between dots and dashes

var letters = {
    "a" : ".-",
    "b" : "-...",
    "c" : "-.-.",
    "d" : "-..",
    "e" : ".",
    "f" : "..-.",
    "g" : "--.",
    "h" : "....",
    "i" : "..",
    "j" : ".---",
    "k" : "-.-",
    "l" : ".-..",
    "m" : "--",
    "n" : "-.",
    "o" : "---",
    "p" : ".--.",
    "q" : "--.-",
    "r" : ".-.",
    "s" : "...",
    "t" : "-",
    "u" : "..-",
    "v" : "...-",
    "w" : ".--",
    "x" : "-..-",
    "y" : "-.--",
    "z" : "--..",
    " " : "   "
};

var leds = ["USR0", "USR1", "USR2", "USR3"];
leds.forEach(function(led) { b.pinMode(led, b.OUTPUT); });


function ledsOn() { // turn the four on-board LEDs on
    leds.forEach(function(led) { b.digitalWrite(led, 1); });
}
    
function ledsOff() { 
    leds.forEach(function(led) { b.digitalWrite(led, 0); });
}

function flash(period)
{
    ledsOn();
    setTimeout(function() { ledsOff(); }, period);
}

function flashMessage(message) {
    var timeline = 0;
    for (var i = 0; i < message.length; i++) {
        if (message[i] == '.') {
            setTimeout(function() { flash(dot); }, timeline);
            timeline = timeline+  dot + gap;
        }
        else if (message[i] == '-') {
            setTimeout(function() { flash(dash); }, timeline);
            timeline = timeline + dash + gap;
        }
        else if (message[i] == ' ') {
            timeline = timeline +  dot + gap;
        }
    }
}

function flashText(text) {
    var dotsAndDashes = "";
    text = text.toLowerCase();
    for (var i = 0; i < text.length; i++) {
        dotsAndDashes += letters[text[i]] + " ";
    }
    console.log(dotsAndDashes);
    flashMessage(dotsAndDashes);
}

flashText("It was the best of times");