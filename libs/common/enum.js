/*------------------------------------------------------------------------------------
function: Enum functions
author	: lynn
data	: 2016-3-30
------------------------------------------------------------------------------------*/
var Enum = require('enum');

exports.vs_statusType = function(){
	return new Enum({'approve':'approve','decline':'decline','process':'process','disable':'disable'});
}