/*------------------------------------------------------------------------------------
function: token generator
author	: lynn
data	: 2016-4-1
------------------------------------------------------------------------------------*/
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var sha256 = function(cpoStr){
	return crypto.createHash('sha256').update(cpoStr).update('colykyrowe').digest('hex');
};

module.exports = { 
	/*"token": jwt.sign(data,'cklroyyollnyiinanxn',{
					 expiresIn: "30d" // expires in 24 hours
					}),*/

	"sha256": sha256
};

