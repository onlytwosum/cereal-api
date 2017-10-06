/*------------------------------------------------------------------------------------
function: product categroy
author	: lynn
data	: 2016-4-11
------------------------------------------------------------------------------------*/
var multiline = require('multiline');

module.exports = {
	"interestList":{
		"sql": multiline(function () {/*
select id,name
from vs_productCategory
order by name
        */})
	}
}
