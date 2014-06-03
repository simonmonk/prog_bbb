// 09_07_combo_server.js
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var bb = require('bonescript');

var htmlPage = 'Prog BBB/09_07_combo.html'; // Angstrom
// var htmlPage = '09_07_combo.html'; // Debian


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
    socket.on('digitalWrite', handleDigitalWrite);
    socket.on('monitor', handleMonitorRequest);
    soc = socket;
}

function handleMonitorRequest(pin) {
    // console.log("got request to monitor pin:" + pin);
    pinStates[pin] = 0;
}

function handleDigitalWrite(message) {
    var data = JSON.parse(message);
    console.log("write pin:" + data.pin + " value:" + data.value);
    bb.pinMode(data.pin, bb.OUTPUT);
    bb.digitalWrite(data.pin, data.value);
}

function checkInputs() {
    for (var pin in pinStates) {
        var oldValue = pinStates[pin];
        var newValue = bb.analogRead(pin);
        console.log("new=" + newValue);
        if (oldValue != newValue) {
            soc.emit("pinUpdate", '{"pin":"' + pin + '", "value":' + newValue + '}');
            pinStates[pin] = newValue;
        }
    }
}

io.sockets.on('connection', onConnect);

setInterval(checkInputs, 1000);
