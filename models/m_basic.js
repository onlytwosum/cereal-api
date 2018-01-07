/*------------------------------------------------------------------------------------
function: basic information moduel
------------------------------------------------------------------------------------*/
var db = require('../libs/common/db.js');
var db_basic = require('../libs/dbconf/db_basic');
var nconf = require('nconf');

var postIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:post').toString();

/*
a. get country list by gavin keywords
*/
exports.countryList = function(params){
	return db.exec.result(db_basic.countryList.sql,[
			params.keywords
		]);
};

exports.appVersion = function(){
	return db.exec.result(db_basic.appVersion.sql, []);
};

exports.allCountry = function(){
	return db.exec.result(db_basic.allCountry.sql,[]);
};

/*
a. get brand list by gavin keywords
*/
exports.brandList = function(params){
	return db.exec.func(db_basic.brandList.sql,[
			params.keywords,
			params.limitCount,
			params.priority
		]);
};

/*
a. get store list by gavin keywords
*/
exports.storeList = function(params){
	return db.exec.result(db_basic.storeList.sql,[
			params.keywords
		]);
};

/*
a. get hot topics
*/
exports.hotTopics = function(params){
	return db.exec.func(db_basic.hotTopics.sql,[
		params.limitCount,
		params.type
		]);
};

/*
a. get topics list by gavin keywords
*/
exports.topicsList = function(params){
	return db.exec.func(db_basic.topicsList.sql,[
			params.keywords,
			params.limitCount,
			params.priority
		]);
};

/*
a. topic, brand, store and country basic info
*/
exports.trendingBasicInfo = function(params){
	return db.exec.func(db_basic.trendingBasicInfo.sql,[
			params.trendingtype,
			params.trendingid,
			params.customerid,
			params.viewed,
			params.trendingname
		]);
};

/*
a. topic search
*/
exports.searchTopic = function(params){
	return db.exec.func(db_basic.searchTopic.sql,[
			params.keywords,
			params.priority,
			postIcon
		]);
};

/*
a. get page banner
*/
exports.getPageBanner = function(params){
	return db.exec.func(db_basic.getPageBanner.sql,[
			params.pageType,
			params.pageId,
			params.bannerPosition,
			params.bannerCount
		]);
};

/*
a. get hot brands
*/
exports.hotBrands = function(params){
	return db.exec.func(db_basic.hotBrands.sql,[
		params.limitCount,
		params.type
		]);
};

/*
a. get hot subcategroy
*/
exports.hotSubcategory = function(params){
	return db.exec.func(db_basic.hotSubcategory.sql,[
		params.limitCount,
		params.type,
		params.tabid
		]);
};

/*
a. get subcategory list by gavin keywords
*/
exports.subcategroyList = function(params){
	return db.exec.func(db_basic.subcategroyList.sql,[
			params.keywords,
			params.limitCount,
			params.priority,
			params.tabid
		]);
};

/*
a. get categroy info
*/
exports.getCategroyInfo = function(params){
	return db.exec.oneOrNone(db_basic.getCategroyInfo.sql,[
			params.id,
			params.type
		]);
};

/*
a. get brand info
*/
exports.getBrandInfo = function(params){
	return db.exec.oneOrNone(db_basic.getBrandInfo.sql,[
			params.id
		]);
};

/*
a. get topics info
*/
exports.getTopicsInfo = function(params){
	return db.exec.oneOrNone(db_basic.getTopicsInfo.sql,[
			params.id
		]);
};
