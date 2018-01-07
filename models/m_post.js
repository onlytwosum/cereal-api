/*------------------------------------------------------------------------------------
function: album model
------------------------------------------------------------------------------------*/
var db = require('../libs/common/db.js');
var db_post = require('../libs/dbconf/db_post');
var nconf = require('nconf');

var postIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:post').toString();
var customerIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:customer').toString();

//save post to album
exports.saveToAlbum = function(params){
	return db.exec.none(db_post.saveToAlbum.sql,[
			params.postId,
			params.customerId,
			params.albumId,
			params.albumName,
			params.abbumDesc
		]);
};

//remove post from album
exports.removeFromAlbum = function(params){
	return db.exec.func(db_post.removeFromAlbum.sql,[
			params.customerId,
			params.postId,
			params.albumId
		]);
};

//click like / unlike post 
exports.likePost = function(params){
	return db.exec.none(db_post.likePost.sql,[
			params.customerId,
			params.postId
		]);
};

//get posts for homepage
exports.getHomepagePosts = function(params){
	return db.exec.func(db_post.homepagePosts.sql,[
			params.customerId,
			params.cDate,
			params.scrollType,
			params.isNonfollow,
			customerIcon,
			postIcon
		]);
};

//get posts for post detail page
exports.postDetailPage = function(params){
	return db.exec.func(db_post.postDetailPage.sql,[
			params.postId,
			params.customerId,
			params.isMyview,
			postIcon,
			customerIcon
		]);
};

// posts upload
exports.postUpload = function(params){
	var postinfo = JSON.parse(params.postinfo);
	//console.log(postinfo);
	return db.exec.one(db_post.postUpload.sql,[
			postinfo.customerid,
			postinfo.postdesc,
			postinfo.additionalinfo,
			postinfo.phototags,
			postinfo.existtopics,
			postinfo.newtopics
		]);
};

// posts update description
exports.postUpdate = function(params){
	return db.exec.func(db_post.postUpdate.sql,[
			params.postId,
			params.customerId,
			params.postdesc
		]);
};

// posts delete
exports.postDelete = function(params){
	return db.exec.func(db_post.postDelete.sql,[
			params.postId,
			params.customerId
		]);
};

//discover default page hot posts(topics,brand,store, country)
exports.discoverDefaultHotPosts = function(params){
	return db.exec.func(db_post.discoverDefaultHotPosts.sql,[
			postIcon
		]);
};

//discover default page hot posts view all page(topics,brand,store, country)
exports.discoverDefaultHotPostsViewall = function(params){
	return db.exec.func(db_post.discoverDefaultHotPostsViewall.sql,[
			params.trendingtype,
			params.priority,
			postIcon
		]);
};

//discover default page top new posts(all posts)
exports.discoverDefaultNewPosts = function(params){
	return db.exec.func(db_post.discoverDefaultNewPosts.sql,[
			params.cDate,
			params.scrollType,
			postIcon
		]);
};

//discover topic, brand , store, country subcategory page
exports.discoverSubcategory = function(params){
	return db.exec.func(db_post.discoverSubcategory.sql,[
			params.trendingtype,
			params.trendingid,
			params.sortby,
			params.priority,
			params.trendingname,
			postIcon
		]);
};

//discover topic, brand , store, country subcategory page
exports.searchPost = function(params){
	return db.exec.func(db_post.searchPost.sql,[
			params.keywords,
			params.priority,
			postIcon
		]);
};
