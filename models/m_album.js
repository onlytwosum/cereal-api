/*------------------------------------------------------------------------------------
function: album moduel
author	: lynn
data	: 2016-3-30
------------------------------------------------------------------------------------*/
var db = require('../libs/common/db.js');
var db_album = require('../libs/dbconf/db_album');
var nconf = require('nconf');

var postIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:post').toString();

//get  album list by certain customer, for save to album
exports.getAlbumsByCid = function(params){
	if(params.cDate  == null){
		return db.exec.result(db_album.getAlbumsByCid.sql,[
			params.customerId,
			postIcon
		]);
	}else{console.log(params.cDate);
		return db.exec.result(db_album.getAlbumsByCidUp.sql,[
			params.customerId,
			params.cDate,
			postIcon
		]);
	}
};

//get  album detail info by id
exports.getAlbumsInfoById = function(params){
		return db.exec.oneOrNone(db_album.getAlbumsInfoById.sql,[
			params.albumId
		]);
};

//delete  album detail info by id
exports.deleteAlbumsById = function(params){
		return db.exec.oneOrNone(db_album.deleteAlbumsById.sql,[
			params.albumId,
			params.customerId
		]);
};

//update  album detail info by id
exports.updateAlbumsById = function(params){
		return db.exec.oneOrNone(db_album.updateAlbumsById.sql,[
			params.albumId,
			params.customerId,
			params.name,
			params.vsDescription,
			params.isPrivate
		]);
};

//get  album detail info by id
exports.viewedAlbumPlus1 = function(params){
		return db.exec.oneOrNone(db_album.viewedAlbumPlus1.sql,[
			params.albumId
		]);
};
