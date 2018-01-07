/*------------------------------------------------------------------------------------
function: product categroy model
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