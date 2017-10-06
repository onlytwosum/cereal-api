/*------------------------------------------------------------------------------------
function: product categroy moduel
author	: lynn
data	: 2016-4-11
------------------------------------------------------------------------------------*/
var db = require('../libs/common/db.js');
var db_productCategory = require('../libs/dbconf/db_productCategory');

/*
a. get intetrests list
*/
exports.interestList = function(params){
	return db.exec.result(db_productCategory.interestList.sql,[
		]);
}