// 09_05_analog_in_server.js
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var bb = require('bonescript');

var htmlPage = 'Prog BBB/09_05_analog_in.html'; // for Angstrom
//var htmlPage = '09_05_analog_in.html'; // for Debian


var pinStates = {};
var soc;

app.listen(8085);

function handler(req, res) {
    fs.readFile(htmlPage, function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading file: ' + htmlPage);
        }
        res.writeHead(200);
        res.end(data);
    });
}

function onConnect(socket) {
    socket.on('monitor', handleMonitorRequest);
    soc = socket;
}

function handleMonitorRequest(pin) {
    // console.log("got request to monitor pin:" + pin);
    pinStates[pin] = 0;
}

function checkInputs() {
    for (var pin in pinStates) {
        var oldValue = pinStates[pin];
        var newValue = bb.analogRead(pin);
        if (oldValue != newValue) {
            // console.log("interrupt pin " + pin + " value:" + newValue);
            soc.emit("pinUpdate", '{"pin":"' + pin + '", "value":' + newValue + '}');
            pinStates[pin] = newValue;
        }
    }
}

io.sockets.on('connection', onConnect);

setInterval(checkInputs, 50);
