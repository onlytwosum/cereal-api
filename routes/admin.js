/*------------------------------------------------------------------------------------
function: admin router 
------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var logger = require('../libs/common/logger');
var m_admin = require('../models/m_admin');

router.options('/*',function(req,res,next){
	res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

/*
a. banner ng-admin API
b. listview: list all banner
c. creationview : create a new banner
d. showview: show certain banner detail info
e. editview: edit centain banner
f. deleteview: delete centain banner
*/
router.get('/v1/banner',function(req,res,next){
	var params = {
		limit : req.query.limit,
		offset : req.query.offset
	};
	
	//console.log(params.customerId);
  	m_admin.listBanner(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"list banner failed"});
	})
	.finally(function(){
			
	}) 
});

router.get('/v1/banner/:id',function(req,res,next){
	var params = {
		id : req.params.id
	};
	
	//console.log(params.customerId);
  	m_admin.showBanner(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"show banner failed"});
	})
	.finally(function(){
			
	}) 
});

router.post('/v1/banner',function(req,res,next){
	var params = {
		description : req.body.vsdescription,
		imagelink : req.body.imagelink,
		bannerlink : req.body.bannerlink,
		priority : req.body.priority,
		startdate : req.body.startdate,
		enddate : req.body.enddate,
		pagetype : req.body.pagetype,
		pageid : req.body.pageid,
		position : req.body.position,
		destination : req.body.destination,
		destinationid : req.body.destinationid
	};
	
	//console.log(params.customerId);
  	m_admin.createBanner(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"create banner success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"create banner failed"});
	})
	.finally(function(){
			
	}) 
});

router.put('/v1/banner/:id',function(req,res,next){
	var params = {
		id : req.params.id,
		description : req.body.vsdescription,
		imagelink : req.body.imagelink,
		bannerlink : req.body.bannerlink,
		priority : req.body.priority,
		startdate : req.body.startdate,
		enddate : req.body.enddate,
		pagetype : req.body.pagetype,
		pageid : req.body.pageid,
		position : req.body.position,
		destination : req.body.destination,
		destinationid : req.body.destinationid
	};
	
	//console.log(params.customerId);
  	m_admin.updateBanner(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"update banner success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"update banner failed"});
	})
	.finally(function(){
			
	}) 
});

router.delete('/v1/banner/:id',function(req,res,next){
	var params = {
		id : req.params.id
	};
	
  	m_admin.deleteBanner(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"delete banner success"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"delete banner failed"});
	})
	.finally(function(){
			
	}) 
});

module.exports = router;