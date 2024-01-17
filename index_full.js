const Blynk = require('blynk-library');
const sensorLib = require('node-dht-sensor');
const Gpio = require('onoff').Gpio;
const argv = require('./cli');
const AUTH = argv.t;
const blynk = new Blynk.Blynk(AUTH);

let relay1;

if (Gpio.accessible) {
	relay1 = new Gpio(2, 'out');
} else {
	relay1 = { 
	writeSync: function (value) {
		console.log('Reboot: ' + value);
		}
	};
}

relay1 = new Gpio(2, 'out');
const relay2 = new Gpio(3, 'out');
const relay3 = new Gpio(4, 'out');
const relay4 = new Gpio(17, 'out');

const reboot = new blynk.VirtualPin(5);
const v1 = new blynk.VirtualPin(1);
const v2 = new blynk.VirtualPin(2);
const v3 = new blynk.VirtualPin(3);
const v4 = new blynk.VirtualPin(4);
const v9 = new blynk.VirtualPin(9);

//relay1.writeSync(relay1.readSync() ^ 1);
//relay2.writeSync(relay2.readSync() ^ 1);
//relay3.writeSync(relay3.readSync() ^ 1);
//relay4.writeSync(relay4.readSync() ^ 1);

v1.on('write', function (param) {
	controlPin(relay1, param);
	controlPin(relay2, param);
	controlPin(relay3, param);
	controlPin(relay4, param);
});


reboot.on('write', function(value) {
	var value = relay1.readSync();
//	console.log("Before: " + value);
	relay1.writeSync(value ^ 1);
//	console.log("After: " + relay1.readSync());
});

v9.on('read', function () {
	v9.write(new Date());
});


function controlPin(pin, value) {
	if (value == '1') {
		console.log("On");
		pin.writeSync(1);
		console.log(pin.name, value);
	} else {
		console.log("Off");
		pin.writeSync(0);
		console.log(pin.name, value);
	}
}

var sensor = {
	sensors: [{
		name: "Indoor",
		type: 11,
		pin: 26
	}],
	read: function () {
		for (var a in this.sensors) {
			if (!sensorLib.initialize(this.sensors[a].type, this.sensors[a].pin)) {
				console.warn('Failed to initialize sensor');
				process.exit(1);
			}
			var b = sensorLib.read(this.sensors[a].type, this.sensors[a].pin);
			console.log(this.sensors[a].name + ": " +
				b.temperature.toFixed(1) + "°C, " +
				b.humidity.toFixed(1) + "%");
			blynk.virtualWrite(2, this.sensors[a].name);
			blynk.virtualWrite(3, b.temperature.toFixed(1) + "\xc2\xb0C");
			blynk.virtualWrite(4, b.humidity.toFixed(1) + "%");
		}
		setTimeout(function () {
			sensor.read();
		}, 2000);
	}
};

sensor.read();
function exit() {
	relay1.unexport();
	relay2.unexport();
	relay3.unexport();
	relay4.unexport();
	process.exit();
}

process.on('SIGINT', exit);

blynk.on('connect', function() { console.log("Blynk ready."); });
blynk.on('disconnect', function() { console.log("DISCONNECT"); });
