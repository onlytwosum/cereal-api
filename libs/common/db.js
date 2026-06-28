/*------------------------------------------------------------------------------------
function: db connection
------------------------------------------------------------------------------------*/
var nconf = require('nconf');

// pg-promise v12 uses native promises (which support .finally); no promiseLib needed
var pgp = require('pg-promise')();

//db conn 
var conn = {
	host: nconf.get('vsglobal:database:host').toString(),
	port: nconf.get('vsglobal:database:port'),
	database: nconf.get('vsglobal:database:database').toString(),
	user: nconf.get('vsglobal:database:user').toString(),
	password: nconf.get('vsglobal:database:password').toString()
};

// Honor the ssl flag from config. Cloud Postgres (e.g. Neon) enforces SSL and
// rejects plaintext connections with "connection is insecure (try using
// sslmode=require)". rejectUnauthorized:false mirrors libpq's sslmode=require
// (encrypt the connection, skip CA verification). Local servers with ssl=off
// leave conn.ssl unset so they keep connecting in plaintext.
if (nconf.get('vsglobal:database:ssl')) {
	conn.ssl = { rejectUnauthorized: false };
}

var db = pgp(conn);

// pg-promise v12 quotes function names, making db.func() case-sensitive and
// whitespace-sensitive. The old pg-promise v3 injected names unquoted, so Postgres
// folded them to lower-case and ignored the surrounding whitespace that the
// multiline() func-name definitions carry. Trim + lower-case the name to preserve
// that behavior so the existing func names keep matching.
var pgFunc = db.func.bind(db);
db.func = function (funcName, values, qrm) {
	return pgFunc(typeof funcName === 'string' ? funcName.trim().toLowerCase() : funcName, values, qrm);
};

module.exports = {
	exec: db,
	pgp: pgp
};