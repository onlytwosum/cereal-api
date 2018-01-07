/*------------------------------------------------------------------------------------
function: collection 
------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var logger = require('../libs/common/logger');
var m_collection = require('../models/m_collection');

/* 
a. get collections by customer id
*/
router.get('/v1/getcollectionsbycustomer/:customerid/:cdate',function(req,res,next){
	var params = {
		customerId : req.params.customerid,
		cDate : req.params.cdate
	};

	m_collection.getCollectionsByCid(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get collections by customer failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. get collection detail by id
*/
router.get('/v1/detail/:id',function(req,res,next){
	var params = {
		collectionId : req.params.id
	};

	m_collection.getCollectionDetail(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:err});
	})
	.finally(function(){
			
	}) 
});

/* 
a. del collection
*/
router.delete('/v1/:id/:customerid',function(req,res,next){
	var params = {
		collectionId : req.params.id,
		customerId: req.params.customerid
	};

	m_collection.deleteCollection(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"delete collection success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"delete collection failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. update collection
*/
router.post('/v1/update',function(req,res,next){
	var params = {
		collectionId : req.body.id,
		customerId: req.body.customerid,
		name: req.body.name,
		vsDescription: req.body.vsdescription,
		isPrivate: req.body.isprivate
	};

	m_collection.updateCollection(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"update collection success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"update collection failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. update collection
*/
router.put('/v1/viewedplusone/:id',function(req,res,next){
	var params = {
		collectionId : req.params.id
	};

	m_collection.viewedCollectonPlus1(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"collection viewed plus 1 success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"collection viewed plus 1 failed"});
	})
	.finally(function(){
			
	}) 
});

module.exports = router;