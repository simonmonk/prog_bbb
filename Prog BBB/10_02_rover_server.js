// 10_02_rover_server.js

var b = require('bonescript');
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

var htmlPage = 'Prog BBB/10_02_rover.html';

var pwmPinA = "P9_14";
var in1PinA = "P8_20";
var in2PinA = "P8_18";
var pwmPinB = "P8_16";
var in1PinB = "P8_22";
var in2PinA = "P8_24";

b.pinMode(pwmPinA, b.OUTPUT);
b.pinMode(in1PinA, b.OUTPUT);
b.pinMode(in2PinA, b.OUTPUT);
b.pinMode(pwmPinB, b.OUTPUT);
b.pinMode(in1PinB, b.OUTPUT);
b.pinMode(in2PinA, b.OUTPUT);

app.listen(8080);
 
function handler (req, res) {
  fs.readFile(htmlPage,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading file: ' + htmlPage);
      }
      res.writeHead(200);
      res.end(data);
    });
} 

function onConnect(socket) {
    socket.on('forwards', forwards);
    socket.on('left', left);
    socket.on('right', right);
    socket.on('stop', stop);
    socket.on('backwards', backwards);
}

function setPins(pwmA, in1A, in2A, pwmB, in1B, in2B) {
	b.analogWrite(pwmPinA, pwmA); 
	b.digitalWrite(in1PinA, in1A);
	b.digitalWrite(in2PinA, in2A);
	b.analogWrite(pwmPinB, pwmB); 
	b.digitalWrite(in1PinB, in1B);
	b.digitalWrite(in2PinB, in2B);
}

function forwards() {
    setPins(0.7, 1, 0, 0.7, 1, 0);
}

function backwards() {
    setPins(0.7, 0, 1, 0.7, 0, 1);
}

function left() {
    setPins(0.7, 0, 1, 0.7, 1, 0);
}

function right() {
    setPins(0.7, 1, 0, 0.7, 0, 1);
}

function stop() {
    setPins(0, 0, 0, 0, 0, 0);
}



