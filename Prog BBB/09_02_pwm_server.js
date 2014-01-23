// 09_02_led_pwm_server.js

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var bb = require('bonescript');

var htmlPage = 'Prog BBB/09_02_pwm.html';
 
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
    socket.on('analogWrite', handleAnalogWrite);
}

function handleAnalogWrite(message) {
    var data = JSON.parse(message);
    //bb.pinMode(data.pin, bb.OUTPUT);
    bb.analogWrite(data.pin, data.value);
}
   
io.sockets.on('connection', onConnect);
