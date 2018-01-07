/*------------------------------------------------------------------------------------
function: db connection
------------------------------------------------------------------------------------*/
var promise = require('bluebird');
var nconf = require('nconf');

var options = {
	promiseLib : promise
};

var pgp = require('pg-promise')(options);

//db conn 
var conn = {
	host: nconf.get('vsglobal:database:host').toString(),
	port: nconf.get('vsglobal:database:port'),
	database: nconf.get('vsglobal:database:database').toString(),
	user: nconf.get('vsglobal:database:user').toString(),
	password: nconf.get('vsglobal:database:password').toString()
};

module.exports = {
	exec: pgp(conn),
	pgp: pgp
};