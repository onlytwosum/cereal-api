/*------------------------------------------------------------------------------------
function: logger
------------------------------------------------------------------------------------*/
var winston = require('winston');
var appRoot = require('app-root-path');

var logger = new (winston.Logger)({
	exitOnError: false,
	transports:[
		new (winston.transports.File)({
			name: 'log-info',
			level: 'info',
			filename: require('app-root-path').resolve('/logs/log-info.log'),
			maxsize: 5242880,
			maxFiles: 5
		}),
		new (winston.transports.File)({
			name: 'log-error',
			level:'error',
			filename:require('app-root-path').resolve('/logs/log-error.log'),
			maxsize: 5242880,
			maxFiles: 5
		}),
		new (winston.transports.Console)({
			level:'debug'
		})
	]
});

module.exports = logger;