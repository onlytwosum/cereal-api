/*------------------------------------------------------------------------------------
function: admin moduel
author	: lynn
data	: 2016-6-22
------------------------------------------------------------------------------------*/
var db = require('../libs/common/db.js');
var db_admin = require('../libs/dbconf/db_admin');

//banner 
exports.listBanner = function(params){
		return db.exec.result(db_admin.listBanner.sql,[
			params.limit
		]);
};

exports.showBanner = function(params){
		return db.exec.oneOrNone(db_admin.showBanner.sql,[
			params.id
		]);
};

exports.createBanner = function(params){
		return db.exec.oneOrNone(db_admin.createBanner.sql,[
			params.description,
			params.imagelink,
			params.bannerlink,
			params.priority,
			params.startdate,
			params.enddate,
			params.pagetype,
			params.pageid,
			params.position,
			params.destination,
			params.destinationid
		]);
};

exports.updateBanner = function(params){
		return db.exec.oneOrNone(db_admin.updateBanner.sql,[
			params.id,
			params.description,
			params.imagelink,
			params.bannerlink,
			params.priority,
			params.startdate,
			params.enddate,
			params.pagetype,
			params.pageid,
			params.position,
			params.destination,
			params.destinationid
		]);
};

exports.deleteBanner = function(params){
		return db.exec.oneOrNone(db_admin.deleteBanner.sql,[
			params.id
		]);
};