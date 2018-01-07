/*------------------------------------------------------------------------------------
function: album router 
------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var logger = require('../libs/common/logger');
var m_album = require('../models/m_album');

//album home
router.get('/', function(req, res, next) {
  res.render('index', { title: 'album' });
});

/* 
a. get album list by customer id, used for save to album
*/
router.post('/v1/getAlbumsByCustomer',function(req,res,next){
	var params = {
		customerId : req.body.customerId,
		cDate : req.body.cDate
	};
	
	//console.log(params.customerId);
  	m_album.getAlbumsByCid(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"list album failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. get album detail info by id
*/
router.get('/v1/getdetailinfobyid/:albumId',function(req,res,next){
	var params = {
		albumId : req.params.albumId
	};

	m_album.getAlbumsInfoById(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get album detail info failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. delete album by id
*/
router.delete('/v1/detelealbumbyid/:albumId/:customerId',function(req,res,next){
	var params = {
		albumId : req.params.albumId,
		customerId: req.params.customerId
	};

	m_album.deleteAlbumsById(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"successful"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"delete album failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. update album by id
*/
router.post('/v1/updatealbumbyid',function(req,res,next){
	var params = {
		albumId : req.body.albumId,
		customerId: req.body.customerId,
		name: req.body.name,
		vsDescription: req.body.vsDescription,
		isPrivate: req.body.isPrivate
	};

	m_album.updateAlbumsById(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"successful"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"delete album failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. album view +1
*/
router.put('/v1/viewedplusone/:albumId',function(req,res,next){
	var params = {
		albumId : req.params.albumId
	};

	m_album.viewedAlbumPlus1(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"successful"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"delete album failed"});
	})
	.finally(function(){
			
	}) 
});

module.exports = router;