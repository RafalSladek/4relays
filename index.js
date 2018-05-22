let Blynk = require('blynk-library');
let Gpio = require('onoff').Gpio;

let relay1 = new Gpio(2,'out');
let relay2 = new Gpio(3,'out');
let relay3 = new Gpio(4,'out');
let relay4 = new Gpio(17,'out');

let AUTH = '9922fbffbb7e42aebd71032ff9f5e759';

var blynk = new Blynk.Blynk(AUTH);

var v1 = new blynk.VirtualPin(1);
var v2 = new blynk.VirtualPin(2);
var v3 = new blynk.VirtualPin(3);
var v4 = new blynk.VirtualPin(4);
var v9 = new blynk.VirtualPin(9);

v1.on('write', function(param) {
	controlPin(relay1, param);  
	console.log('V1:', param[0]);
});


v9.on('read', function() {
	  v9.write(new Date().getSeconds());
});


function controlPin(pin, value) {
	if(value == '1') {
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
