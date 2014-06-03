// 09_01_led_control_server.js

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var bb = require('bonescript');

var htmlPage = 'Prog BBB/09_01_led_control.html'; // use this for Angstrom
//var htmlPage = '09_01_led_control.html'; // use this for Debian
 
app.listen(8085);
 
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
    socket.on('digitalWrite', handleDigitalWrite);
}

function handleDigitalWrite(message) {
    var data = JSON.parse(message);
    console.log("write pin:" + data.pin + " value:" + data.value);
    bb.pinMode(data.pin, bb.OUTPUT);
    bb.digitalWrite(data.pin, data.value);
}
   
io.sockets.on('connection', onConnect);
