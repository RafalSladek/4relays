const Blynk = require('blynk-library');
const sensorLib = require('node-dht-sensor');
const Gpio = require('onoff').Gpio;
const argv = require('./cli');
const AUTH = argv.t;
const blynk = new Blynk.Blynk(AUTH);


const relay1 = new Gpio(2, 'out');
function exit() {
		relay1.unexport();
		process.exit();
}

process.on('SIGINT', exit);

blynk.on('connect', function() { console.log("Blynk ready."); });
blynk.on('disconnect', function() { console.log("DISCONNECT"); });
