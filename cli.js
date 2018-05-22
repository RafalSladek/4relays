const yargs = require('yargs');
module.exports = yargs
  .usage('Usage: $0 -t [token]')
  .options({
	      token: {
		            alias: 't',
		            describe: 'Blynk token',
		            demandOption: true,
		          },
	    }).argv;
