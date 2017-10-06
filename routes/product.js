/*------------------------------------------------------------------------------------
function: product router
author	: lynn
data	: 2016-4-15
------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var logger = require('../libs/common/logger');
var nconf = require('nconf');
var m_product = require('../models/m_product');
var paramsPro = require('../middleware/paramsProcessor');

/*
a. get product list by keywords
b. for post upload
*/
router.get('/v1/productsbasic/:keywords',paramsPro.keywords,function(req,res,next){
	var params = {
		keywords : req.params.keywords
	};
	//console.log(params.customerId);
  	m_product.productsForPostUpload(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"product search failed"});
	})
	.finally(function(){

	})
});

/*
a. get related products
b. for post detail page
*/
router.get('/v1/postrelatedproducts/:postId',function(req,res,next){
	var params = {
		postId : req.params.postId
	};
	//console.log(params.customerId);
  	m_product.postRelatedProducts(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"post related products failed"});
	})
	.finally(function(){

	})
});

/*
a. discover default page, most recomm
*/
router.get('/v1/discoverdefaultmostrecom',function(req,res,next){
	var params = {

	};
	//console.log(params.customerId);
  	m_product.discoverDefaultMostRecom(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"discover default hot products failed"});
	})
	.finally(function(){

	})
});

/*
a. discover default page, most recomm
*/
router.get('/v1/discovertrendingproduct/:sortby/:priority',function(req,res,next){
	var params = {
		sortby: req.params.sortby,
		priority: req.params.priority
	};
	//console.log(params.customerId);
  	m_product.discoverTrendingProduct(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"discover trending products failed"});
	})
	.finally(function(){

	})
});

/*
a. product keywords search
*/
router.get('/v1/search/',function(req,res,next){
	var params = {
		keywords: req.query.keywords,
		priority: req.query.priority,
		brandId: req.query.brandid,
		subcategoryId: req.query.subcategoryid
	};

  	m_product.productKeywordsSearch(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"search products failed"});
	})
	.finally(function(){

	})
});

/*
a. save to collection
*/
router.post('/v1/collection/add',function(req,res,next){
	var params = {
		productId: req.body.productid,
		customerId: req.body.customerid,
		collectionId: req.body.collectionid,
		collectionName: req.body.collectionname,
		collectionDesc: req.body.collectiondesc
	};

  	m_product.saveToCollection(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"save to collection success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"save to collection failed"});
	})
	.finally(function(){

	})
});

/*
a. remove from collection
*/
router.post('/v1/collection/remove',function(req,res,next){
	var params = {
		customerId: req.body.customerid,
		productId: req.body.productid,
		collectionId: req.body.collectionid,
	};

  	m_product.removeFromCollection(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"remove from collection success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"remove from collection failed"});
	})
	.finally(function(){

	})
});

/*
a. brands we love
*/
router.get('/v1/brandwelove',function(req,res,next){
	var params = {

	};

  	m_product.brandWeLove(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get brand we love failed"});
	})
	.finally(function(){

	})
});

/*
a. shop by topics
*/
router.get('/v1/shop/topics',function(req,res,next){
	var params = {
		sortby: req.query.sortby,
		topicsId: req.query.topicsid,
		count: req.query.count,
		priority: req.query.priority
	};

  	m_product.shopbytopics(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get shop by topics failed"});
	})
	.finally(function(){

	})
});

/*
a. shop by topics
*/
router.get('/v1/shop/brand',function(req,res,next){
	var params = {
		sortby: req.query.sortby,
		brandId: req.query.brandid,
		count: req.query.count,
		priority: req.query.priority
	};

  	m_product.shopbybrand(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get shop by brand failed"});
	})
	.finally(function(){

	})
});

/*
a. shop by categroy
*/
router.get('/v1/shop/category',function(req,res,next){
	var params = {
		sortby: req.query.sortby,
		topicsId: req.query.topicsid,
		count: req.query.count,
		priority: req.query.priority,
		tabId:req.query.tabid,
		subcategoryId:req.query.subcategoryid,
		brandId:req.query.brandid
	};

  	m_product.shopbycategroy(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get shop by categroy failed"});
	})
	.finally(function(){

	})
});

/*
a. product detail info
*/
router.get('/v1/detailinfo/:productid/:customerid',function(req,res,next){
	var params = {
		productId: req.params.productid,
		customerId: req.params.customerid
	};

  	m_product.productDetailinfo(params)
	.then(function(data){
		return res.status(200).json(data[0]);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get product detail info failed"});
	})
	.finally(function(){

	})
});

/*
a. product related posts
*/
router.get('/v1/relatedposts/:productid',function(req,res,next){
	var params = {
		productId: req.params.productid
	};

  	m_product.productRelatedPosts(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get product related posts failed"});
	})
	.finally(function(){

	})
});

/*
a. customer like product
*/
router.get('/v1/like',function(req,res,next){
	var params = {
		customerId: req.query.customerid,
		productId : req.query.productid
	};

  	m_product.likeProduct(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"like product success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"like product failed"});
	})
	.finally(function(){

	})
});

/*
view a product to increase the viewed count
*/
router.get('/v1/view', function(req, res, next){
	var params = {
		productId : req.query.productid
	};

	m_product.viewProduct(params).then(function(data){
		return res.status(200).json({success: true, data: "success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success: false, data: "failed"});
	})
	.finally(function(){

	})
});

module.exports = router;
