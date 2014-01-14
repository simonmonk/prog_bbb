// 05_02_blink_sos.js

var b = require('bonescript');

var dot = 200;
var dash = dot * 3;
var gap = dot;

var leds = ["USR0", "USR1", "USR2", "USR3"];
leds.forEach(function(led) { b.pinMode(led, b.OUTPUT); });


function ledsOn() { // turn the four on-board LEDs on
    leds.forEach(function(led) { b.digitalWrite(led, 1); });
}
    
function ledsOff() { 
    leds.forEach(function(led) { b.digitalWrite(led, 0); });
}

function flash(period) {
    ledsOn();
    setTimeout(ledsOff, period);
}

function flashMessage(durations) {
    var timeline = 0;
    for (var i = 0; i < durations.length; i++) {
        var d = durations[i];
        setTimeout(function() { flash(d); }, timeline);
        timeline = timeline + d + gap;
    }
}

flashMessage([ dot, dot, dot, dash, dash, dash, dot, dot, dot]);