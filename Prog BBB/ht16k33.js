var i2c = require('i2c');
var address = 0x70;
var dispReg = 0x80;
var sysReg = 0x20;
var dimReg = 0xE0

var wire = new i2c(address, {device: '/dev/i2c-1', debug: false});

var buffer = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var digits = [ 0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 
               0x7D, 0x07, 0x7F, 0x6F, 0x77, 0x7C, 
               0x39, 0x5E, 0x79, 0x71];


exports.start = function() {
    wire.writeBytes(sysReg | 0x01, [0x00]); // oscillator on
    exports.setBlinkRate(0);
    exports.setBrightness(15);
}

exports.setBrightness = function(brightness) {
    wire.writeBytes(dimReg | brightness, [0x00]);
}

exports.setBlinkRate = function(rate) {
    wire.writeBytes(dispReg | 0x01 | rate, [0x00]);
}

exports.writeDisplay = function() {
    wire.writeBytes(0x00, buffer);
}

function setBufferRow(row, value) {
    buffer[row * 2] = value & 0xFF;
    buffer[row * 2 + 1] = (value >> 8);
    exports.writeDisplay();
}

exports.clear = function() {
    for (var i = 0; i < 16; i++) {
        buffer[i] = 0;
    }
    exports.writeDisplay();
}

exports.writeDigitRaw = function(charNumber, value) {
    setBufferRow(charNumber, value);
}

exports.writeDigit = function(charNumber, value, dot) {
    setBufferRow(charNumber, digits[value] | (dot << 7));
}

exports.setColon = function(colonOn) {
    if (colonOn){
        setBufferRow(2, 0xFF);
    }
    else {
        setBufferRow(2, 0);
    }
}

