/*------------------------------------------------------------------------------------
function: Enum functions
------------------------------------------------------------------------------------*/
var Enum = require('enum');

exports.vs_statusType = function(){
	return new Enum({'approve':'approve','decline':'decline','process':'process','disable':'disable'});
}