/*------------------------------------------------------------------------------------
function: product information model
------------------------------------------------------------------------------------*/
var db = require('../libs/common/db.js');
var db_product = require('../libs/dbconf/db_product');
var nconf = require('nconf');

var productIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:product').toString();
var postIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:post').toString();

/*
a. get product list by gavin keywords
b. for post upload
*/
exports.productsForPostUpload = function(params){
	return db.exec.func(db_product.productSearchForPostUpload.sql,[
			params.keywords
		]);
};

/*
a. post detail page related products
*/
exports.postRelatedProducts = function(params){
	return db.exec.result(db_product.postRelatedProducts.sql,[
			params.postId,
			productIcon
		]);
};

/*
a. discover Default Most Recom
*/
exports.discoverDefaultMostRecom = function(params){
	return db.exec.result(db_product.discoverDefaultMostRecom.sql,[

		]);
};

/*
a. discover trending product
*/
exports.discoverTrendingProduct = function(params){
	return db.exec.func(db_product.discoverTrendingProduct.sql,[
			params.sortby,
			params.priority,
			productIcon
		]);
};

/*
a. search page - search product
*/
exports.productKeywordsSearch = function(params){
	return db.exec.func(db_product.productKeywordsSearch.sql,[
			params.keywords,
			params.priority,
			productIcon,
			params.brandId,
			params.subcategoryId
		]);
};

/*
a. save to collection
*/
exports.saveToCollection = function(params){
	return db.exec.func(db_product.saveToCollection.sql,[
			params.productId,
			params.customerId,
			params.collectionId,
			params.collectionName,
			params.collectionDesc
		]);
};

/*
a. remove from collection
*/
exports.removeFromCollection = function(params){
	return db.exec.func(db_product.removeFromCollection.sql,[
			params.customerId,
			params.productId,
			params.collectionId
		]);
};

/*
a. brands we love
*/
exports.brandWeLove = function(params){
	return db.exec.result(db_product.brandWeLove.sql,[
			postIcon
		]);
};

/*
a. shop by topics
*/
exports.shopbytopics = function(params){
	return db.exec.func(db_product.shopbytopics.sql,[
			params.sortby,
			params.topicsId,
			params.count,
			params.priority
		]);
};

/*
a. shop by topics
*/
exports.shopbybrand = function(params){
	return db.exec.func(db_product.shopbybrand.sql,[
			params.sortby,
			params.brandId,
			params.count,
			params.priority
		]);
};

/*
a. shop by categroy
*/
exports.shopbycategroy = function(params){
	return db.exec.func(db_product.shopbycategroy.sql,[
			params.sortby,
			params.count,
			params.priority,
			params.tabId,
			params.subcategoryId,
			params.brandId
		]);
};

/*
a. product detail info
*/
exports.productDetailinfo = function(params){
	return db.exec.func(db_product.productDetailinfo.sql,[
			params.productId,
			params.customerId
		]);
};

/*
a. product related posts
*/
exports.productRelatedPosts = function(params){
	return db.exec.result(db_product.productRelatedPosts.sql,[
			params.productId,
			postIcon
		]);
};

/*
a. customer like / unlike product
*/
exports.likeProduct = function(params){
	return db.exec.func(db_product.likeProduct.sql,[
			params.customerId,
			params.productId,
			'product'
		]);
};

/*
view product
*/
exports.viewProduct = function(params){
	return db.exec.func(db_product.viewProduct.sql, [params.productId]);
};

