/*------------------------------------------------------------------------------------
function: comments router 
------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var logger = require('../libs/common/logger');
var m_comments = require('../models/m_comments');

/* 
a. add comments 
b. add commented customer
*/
router.post('/v1/add', function(req, res, next) {
	var params = {
		postId : req.body.postId,
		customerId : req.body.customerId,
		vsDescription : req.body.vsDescription,
		memo : req.body.memo,
		type : req.body.type == undefined ? 'post':req.body.type
	};
	//console.log(params);
  	m_comments.addComments(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"successful"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"add comments failed"});
	})
	.finally(function(){
			
	}) 
});

/*
a. delete comments 
b. delete commented customer
*/
router.post('/v1/del', function(req, res, next) {
 	var params = {
		postId : req.body.postId,
		customerId : req.body.customerId,
		commentsId : req.body.commentsId,
		type : req.body.type == undefined ? 'post':req.body.type
	};

  	m_comments.delComments(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"successful"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"delete comments failed"});
	})
	.finally(function(){
			
	}) 
});

/*
a. list comments by postid, up/down
b. 
*/
router.get('/v1/list/:postid/:cdate/:scrolltype',function(req,res,next){
	var params = {
		postId : req.params.postid,
		cDate : req.params.cdate,
		scrollType : req.params.scrolltype,
		type : req.query.type == undefined ? 'post':req.query.type
	};
	console.log(params);

  	m_comments.listComments(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"list comments failed"});
	})
	.finally(function(){
			
	}) 
});

module.exports = router;
