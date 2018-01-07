/*------------------------------------------------------------------------------------
function: comments model
------------------------------------------------------------------------------------*/
var db = require('../libs/common/db.js');
var vs_util = require('../libs/common/util');
var vsEnum = require('../libs/common/enum');
var db_comments = require('../libs/dbconf/db_comments');
var nconf = require('nconf');

var customerIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:customer').toString();


//add comments
exports.addComments = function(params){
	return db.exec.tx(function (t){
		return t.batch([
			t.none(db_comments.addComments.sql,[
					params.postId,
					params.customerId,
					params.vsDescription,
					params.memo,
					vsEnum.vs_statusType.approve,
					params.type
				]),
			t.none(db_comments.addCommentedCustomer.sql,[
					params.customerId,
					params.postId,
					params.type
				])
			]);
	});
};


//delete comments
exports.delComments = function(params){//console.log(params);
	return db.exec.tx(function (t){
		return t.batch([
			t.none(db_comments.delComments.sql,[
					params.commentsId,
					params.type
				]),
			t.none(db_comments.delCommentedCusotmer.sql,[
					params.customerId,
					params.postId,
					params.type
				])
			]);
	});
};


//get comments by post id
exports.listComments = function(params){
	if(params.cDate  == 'null'){
		return db.exec.result(db_comments.getCommentsByPid.sql,[
			params.postId,
			customerIcon,
			params.type
		]);
	}else if(params.scrollType == 1){
		return db.exec.result(db_comments.getCommentsByPidUp.sql,[
			params.postId,
			params.cDate,
			customerIcon,
			params.type
		]);
	}else{
		return db.exec.result(db_comments.getCommentsByPidDown.sql,[
			params.postId,
			params.cDate,
			customerIcon,
			params.type
		]);
	}
	
};


