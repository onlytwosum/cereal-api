/*------------------------------------------------------------------------------------
function: logger
------------------------------------------------------------------------------------*/
var nconf = require('nconf');
var appRoot = require('app-root-path');
var path = require('path');

nconf.env()
	 .argv();

var env = process.env.NODE_ENV || 'production';
env = env.toLowerCase();
var envpath = 'prod';
if (env != 'production'){
	envpath = env;
}
//console.log('/conf/'+envpath+'/vsglobal.json');

nconf.file('vsglobal',require('app-root-path').resolve('/conf/'+envpath+'/vsglobal.json'));
nconf.file('IOS_config',require('app-root-path').resolve('/conf/prod/IOS_config.json'));
nconf.file('tpservice',require('app-root-path').resolve('/conf/prod/tpservice.json'));

module.exports = nconf;