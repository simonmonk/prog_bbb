// 11_01_mail_notifier.js

var b = require('bonescript');
var Imap = require('imap');

var pin = "P9_14";
var maxDuty = 0.7;
var lampState = false;
var newMail = true;

var imap = new Imap({
  user: 'youremail',
  password: 'yourpassword',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
});

imap.once('ready', function() {
    console.log("Ready");
    imap.openBox('INBOX', true, inboxOpen);
});


function inboxOpen() {
    console.log("Inbox Open");
    imap.on('mail', notify);
}

function notify() {
    console.log("MAIL");
    newMail = true;
    setTimeout(cancelNotify, 3000);
}

function cancelNotify() {
    newMail = false;
    lampState = false;
    b.analogWrite(pin, 0);
}

function updateLamp() {
    if (newMail) {
        lampState = ! lampState;
        if (lampState) {
            b.analogWrite(pin, maxDuty);
        }
        else { 
            b.analogWrite(pin, 0);
        }
    }
}
            
imap.connect();

setTimeout(cancelNotify, 2000);
setInterval(updateLamp, 300);
