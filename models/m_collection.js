/*------------------------------------------------------------------------------------
function: collection 
author	: lynn
data	: 2016-6-11
------------------------------------------------------------------------------------*/
var db = require('../libs/common/db.js');
var db_collection = require('../libs/dbconf/db_collection');
var nconf = require('nconf');

//get collections by customer id
exports.getCollectionsByCid = function(params){
		return db.exec.result(db_collection.getCollectionsByCid.sql,[
			params.customerId,
			params.cDate
		]);
};

//get collection detail info by  id
exports.getCollectionDetail = function(params){
		return db.exec.oneOrNone(db_collection.getCollectionDetail.sql,[
			params.collectionId
		]);
};

//delete collection by id
exports.deleteCollection = function(params){
		return db.exec.oneOrNone(db_collection.deleteCollection.sql,[
			params.collectionId,
			params.customerId
		]);
};

//update collection by id
exports.updateCollection = function(params){
		return db.exec.oneOrNone(db_collection.updateCollection.sql,[
			params.collectionId,
			params.customerId,
			params.name,
			params.vsDescription,
			params.isPrivate
		]);
};

//collection viewed +1
exports.viewedCollectonPlus1 = function(params){
		return db.exec.oneOrNone(db_collection.viewedCollectonPlus1.sql,[
			params.collectionId
		]);
};