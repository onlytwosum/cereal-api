/*------------------------------------------------------------------------------------
function: product category router 
author	: lynn
data	: 2016-4-11
------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var logger = require('../libs/common/logger');
var m_productCategory = require('../models/m_productCategory');

/*
a. get interests for sign up
*/
router.get('/v1/interestList',function(req,res,next){
	m_productCategory.interestList()
	.then(function(data){
		//console.log(data);
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"list interests failed"});
	})
	.finally(function(){
			
	}) 
});

module.exports = router;