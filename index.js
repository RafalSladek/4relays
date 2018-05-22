const Blynk = require('blynk-library');
const Gpio = require('onoff').Gpio;
const argv = require('./cli');
const AUTH = argv.t;
const blynk = new Blynk.Blynk(AUTH);

const relay1 = new Gpio(2,'out');
const relay2 = new Gpio(3,'out');
const relay3 = new Gpio(4,'out');
const relay4 = new Gpio(17,'out');

const v1 = new blynk.VirtualPin(1);
const v2 = new blynk.VirtualPin(2);
const v3 = new blynk.VirtualPin(3);
const v4 = new blynk.VirtualPin(4);
const v9 = new blynk.VirtualPin(9);

v1.on('write', function(param) {
	controlPin(relay1, param);  
	console.log('V1:', param[0]);
});


v9.on('read', function() {
	  v9.write(new Date().getSeconds());
});


function controlPin(pin, value) {
	if (value == '1') {
		console.log("On");
		pin.writeSync(1);
	} else {
		console.log("Off");
	 	pin.writeSync(0);	
	}
}
process.on('SIGINT', function () {
	  relay1.unexport();
	  relay2.unexport();
	  relay3.unexport();
	  relay4.unexport();
});
