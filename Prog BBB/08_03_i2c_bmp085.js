var b = require('bonescript');
var iic = '/sys/class/i2c-adapter/i2c-1/'; 

//Sensor Locations on the BeagleBone Black
var temperature = '/sys/bus/i2c/drivers/bmp085/1-0077/temp0_input';
var pressure = '/sys/bus/i2c/drivers/bmp085/1-0077/pressure0_input';

// We will initialize the driver for the BMP085 sensor located at I2C location 0x77
b.writeTextFile(iic + 'new_device', 'bmp085 0x77');

// Opens,reads, and prints pressure and temperature
b.readTextFile(pressure, printPressure);
b.readTextFile(temperature, printTemperature); 

// Prints Pressure
function printPressure(x) {
   console.log("Pressure: ", x.data/100 + " millibar");
}

// Prints Temperature
function printTemperature(x) {
   // '\xB0' is the degree symbol in hexademical
   console.log("Temperature: ", x.data/10 + '\xB0' + " Celcius");
   x.data /= 10;
   x.data *= 1.8;
   x.data += 32;
   console.log("or: ", x.data + '\xB0' + " Fahrenheit"); 
}