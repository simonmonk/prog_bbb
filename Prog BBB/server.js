var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var bb = require('bonescript');

var htmlPage = 'Prog BBB/index.html';
 
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
 
io.sockets.on('connection', function (socket) {
  socket.on('analog_read', function (pin) {
    var value = bb.analogRead(pin);
    socket.emit(pin, value);
  });
  socket.on('digitalWrite', function (message) {
    var data = JSON.parse(message);
    bb.digitalWrite(data.pin, data.value);
  });
  // {"pin":"USR3", "duration":duration};
  socket.on('ledOnForSeconds', function (message) {
    var data = JSON.parse(message);
    bb.digitalWrite(data.pin, 1);
    setTimeout(function(){bb.digitalWrite(data.pin, 0);}, data.duration);
  });
  
});
