// 08_04_serial_gps.js

var sp = require("serialport");

var port = '/dev/ttyO4';
var options = { baudrate: 9600, parser: sp.parsers.readline("\n") };


var gpsPort = new sp.SerialPort(port, options);

gpsPort.on('data', function(data) {
    //console.log('data received: ' + data);
    var parts = data.split(",");
    if (parts[0] == "$GPRMC") {
        var lat = parseFloat(parts[3]) / 100;
        var ns = parts[4];
        var lon = parseFloat(parts[5]) / 100;
        var ew = parts[6];
        console.log("Lat=" + lat + ns + " long=" + lon + ew);
    }
});



