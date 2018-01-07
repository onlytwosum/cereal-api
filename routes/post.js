/*------------------------------------------------------------------------------------
function: album router 
------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var logger = require('../libs/common/logger');
var m_post = require('../models/m_post');
var uploader = require('../libs/common/uploader');

/*
a. get posts for homepage
*/
router.post('/v1/homepageposts',function(req,res,next){
	var params = {
		customerId : req.body.customerId,
		cDate : req.body.cDate,
		scrollType : req.body.scrollType,
		isNonfollow : req.body.isNonfollow
	};

  	m_post.getHomepagePosts(params)
	.then(function(data){
		//console.log(data);
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"list homepage posts failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. save post to album
*/
router.post('/v1/savetoalbum',function(req,res,next){
	var params = {
		postId : req.body.postId,
		customerId : req.body.customerId,
		albumId : req.body.albumId,
		albumName : req.body.albumName,
		abbumDesc : req.body.abbumDesc
	};

  	m_post.saveToAlbum(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"successful"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"save to album failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. save post to album
*/
router.post('/v1/removefromalbum',function(req,res,next){
	var params = {
		customerId: req.body.customerId,
		postId : req.body.postId,
		albumId : req.body.albumId
	};

	m_post.removeFromAlbum(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"successful"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"remove from album failed"});
	})
	.finally(function(){
			
	}) 
})

/* 
a. like/unlike post
*/
router.post('/v1/like',function(req,res,next){
	var params = {
		customerId : req.body.customerId,
		postId : req.body.postId	
	};

  	m_post.likePost(params)
	.then(function(data){
		return res.status(200).json({success:true,data:"successful"});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"like/unlike post failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. get post detail information
*/
router.get('/v1/detailinfo/:postId/:customerId/:isMyview',function(req,res,next){
	var params = {
		postId : req.params.postId,
		customerId : req.params.customerId,
		isMyview : req.params.isMyview	
	};
	//console.log(params);
  	m_post.postDetailPage(params)
	.then(function(data){
		//console.log(data[0]);
		return res.status(200).json(data[0]);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get post detail failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. post upload
*/
router.post('/v1/uploadlocal',uploader.uploadImage('/public/images/post/','postphoto'),function(req,res,next){
	var params = {
		postinfo: req.body.postinfo.toLowerCase()
	};

  	m_post.postUpload(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"upload post failed"});
	})
	.finally(function(){
			
	}) 

});

/* 
a. post upload to amazon s3
*/
router.post('/v1/upload',uploader.uploadImageS3('public/images/post/','postphoto'),function(req,res,next){
	var params = {
		postinfo: req.body.postinfo
	};

  	m_post.postUpload(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"upload post failed"});
	})
	.finally(function(){
			
	}) 

});

/* 
a. post update description
*/
router.post('/v1/update',function(req,res,next){
	var params = {
		postId: req.body.postId,
		customerId: req.body.customerId,
		postdesc: req.body.postdesc
	};

  	m_post.postUpdate(params)
	.then(function(data){
		if(data[0].postupdate ==0 || data[0].postupdate =='0'){
			return res.status(500).json({success:false,data:"update post failed1"});
		}else{
			return res.status(200).json({success:true,data:"update post success"});
		}		
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"update post failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. post delete
*/
router.post('/v1/delete',function(req,res,next){
	var params = {
		postId: req.body.postId,
		customerId: req.body.customerId
	};

  	m_post.postDelete(params)
	.then(function(data){
		if(data[0].postdelete ==0 || data[0].postdelete =='0'){
			return res.status(500).json({success:false,data:"delete post failed1"});
		}else{
			return res.status(200).json({success:true,data:"delete post success"});
		}		
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"delete post failed"});
	})
	.finally(function(){
			
	}) 
});

/* 
a. discover default page hot posts(topics,brand,store, country)
*/
router.get('/v1/discover/default/hotposts',function(req,res,next){
	var params = {
		
	};

  	m_post.discoverDefaultHotPosts(params)
	.then(function(data){
		return res.status(200).json(data[0]);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"discover default hot post get failed"});
	})
	.finally(function(){
			
	}) 

});

/* 
a. discover default page hot posts(topics,brand,store, country)
b. view all page
*/
router.get('/v1/discover/default/hotpostsviewall/:trendingtype/:priority',function(req,res,next){
	var params = {
		trendingtype : req.params.trendingtype.toLowerCase(),
		priority : req.params.priority
	};

  	m_post.discoverDefaultHotPostsViewall(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"discover view all get failed"});
	})
	.finally(function(){
			
	}) 

});

/* 
a. discover default page top new posts(all post)
*/
router.get('/v1/discover/default/allposts/:cDate/:scrollType',function(req,res,next){
	var params = {
		cDate : req.params.cDate,
		scrollType : req.params.scrollType
	};

  	m_post.discoverDefaultNewPosts(params)
	.then(function(data){
		return res.status(200).json({});
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"discover default new post get failed"});
	})
	.finally(function(){
			
	}) 

});

/* 
a. discover topic, brand, store and country subcategory page
*/
router.get('/v1/subcategory/:trendingtype/:trendingid/:sortby/:priority',function(req,res,next){
	var params = {
		trendingtype : req.params.trendingtype,
		trendingid : req.params.trendingid,
		sortby : req.params.sortby,
		priority : req.params.priority,
		trendingname : (typeof req.query.name!='undefined')? req.query.name: ''
	};

  	m_post.discoverSubcategory(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"discover subcategory page get failed"});
	})
	.finally(function(){
			
	}) 

});

/* 
a. search post
*/
router.get('/v1/search/',function(req,res,next){
	var params = {
		keywords: req.query.keywords,
		priority: req.query.priority
	};
	
  	m_post.searchPost(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"search post failed"});
	})
	.finally(function(){
			
	}) 
});

module.exports = router;