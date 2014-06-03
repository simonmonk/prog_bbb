// 09_06_timer_server.js

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var bb = require('bonescript');

var htmlPage = 'Prog BBB/09_06_timer.html'; // Angstrom
// var htmlPage = '09_06_timer.html'; // Debian

var cancelTimer;
var pin = "P9_14";
bb.pinMode(pin, bb.OUTPUT);
 
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
    socket.on('startTimer', handleStartTimer);
    socket.on('cancelTimer', handleCancelTimer);
}

function handleStartTimer(duration) {
    console.log("write pin:" + pin);
    bb.digitalWrite(pin, 1);
    cancelTimer = setTimeout(handleCancelTimer, duration * 1000);
}

function handleCancelTimer() {
    console.log("cancel pin:" + pin);
    bb.digitalWrite(pin, 0);
    clearTimeout(cancelTimer);
}
   
io.sockets.on('connection', onConnect);
