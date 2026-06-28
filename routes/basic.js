/*------------------------------------------------------------------------------------
function: album router
------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var logger = require('../libs/common/logger');
var nconf = require('nconf');
var m_basic = require('../models/m_basic');
var paramsPro = require('../middleware/paramsProcessor');
var request = require('request');

var postIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:post').toString();
var customerIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:customer').toString();
var productIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:product').toString();
var weatherURL = nconf.get('tpservice:weather:url').toString();
var weatherKey = nconf.get('tpservice:weather:apikey').toString();
var weatherUnits = nconf.get('tpservice:weather:units') ? nconf.get('tpservice:weather:units').toString() : 'imperial';

/*
Map an OpenWeatherMap icon code (e.g. "01d", "10n") to a Dark Sky-style icon
string so existing clients that read currently.icon keep working.
*/
function owmIconToDarkSky(icon){
	var map = {
		'01d':'clear-day','01n':'clear-night',
		'02d':'partly-cloudy-day','02n':'partly-cloudy-night',
		'03d':'cloudy','03n':'cloudy','04d':'cloudy','04n':'cloudy',
		'09d':'rain','09n':'rain','10d':'rain','10n':'rain','11d':'rain','11n':'rain',
		'13d':'snow','13n':'snow','50d':'fog','50n':'fog'
	};
	return map[icon] || 'clear-day';
}


/*
a. IOS config
*/
router.get('/v1/iosconfig',function(req,res,next){
	try{
		return res.status(200).json(nconf.get('IOS_config'));
	}catch(e){
		//console.log("1");
		return res.status(500).json('load ios config failed');
	}

});

/*
a. images config
*/
router.get('/v1/imagespath',function(req,res,next){
	try{
		return res.status(200).json({post:postIcon,customer:customerIcon,product:productIcon});
	}catch(e){
		return res.status(500).json('load image path failed');
	}
});

/*
a. get country list by keywords
*/
router.get('/v1/countrysearch/:keywords', paramsPro.keywords, function(req,res,next){
	var params = {
		keywords : req.params.keywords
	};

  	m_basic.countryList(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"country search failed"});
	})
	.finally(function(){

	})
});

router.get('/v1/country/search', paramsPro.keywords, function(req,res,next){
	var params = {
		keywords : req.query.keywords
	};

  	m_basic.countryList(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"country search failed"});
	})
	.finally(function(){

	})
});

/*
app version
*/
router.get('/v1/iosversion', function(req, res, next){
	m_basic.appVersion()
	.then(function(data){
		return res.status(200).json(data.rows[0]);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get app version failed"});
	})
	.finally(function(){

	})
});

router.get('/v1/countrylist',function(req,res,next){
	m_basic.allCountry()
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"country search failed"});
	})
	.finally(function(){

	})
});

/*
a. get brand list by keywords
*/
router.get('/v1/brandlist/:keywords',paramsPro.keywords,function(req,res,next){
	var params = {
		keywords : req.params.keywords,
		limitCount: req.query.count,
		priority: req.query.priority
	};
	//console.log(params.customerId);
  	m_basic.brandList(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"brand search failed"});
	})
	.finally(function(){

	})
});

router.get('/v1/brand/search',paramsPro.keywords,function(req,res,next){
	var params = {
		keywords : req.query.keywords,
		limitCount: req.query.count,
		priority: req.query.priority
	};
	//console.log(params.customerId);
  	m_basic.brandList(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"brand search failed"});
	})
	.finally(function(){

	})
});

/*
a. get store list by keywords
*/
router.get('/v1/storelist/:keywords',paramsPro.keywords,function(req,res,next){
	var params = {
		keywords : req.params.keywords
	};
	//console.log(params.customerId);
  	m_basic.storeList(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"store search failed"});
	})
	.finally(function(){

	})
});

router.get('/v1/store/search',paramsPro.keywords,function(req,res,next){
	var params = {
		keywords : req.query.keywords
	};
	//console.log(params.customerId);
  	m_basic.storeList(params)
	.then(function(data){
		return res.status(200).json(data.rows);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"store search failed"});
	})
	.finally(function(){

	})
});

/*
a. get hot topics,
*/
router.get('/v1/hottopics',function(req,res,next){
	var params = {
		limitCount : req.query.count,
		type : req.query.type
	};
	//console.log(params.customerId);
  	m_basic.hotTopics(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get hot topics failed"});
	})
	.finally(function(){

	})
});


/*
a. get topics list by keywords
*/
router.get('/v1/topicsList/:keywords',paramsPro.keywords,function(req,res,next){
	var params = {
		keywords : req.params.keywords,
		limitCount: req.query.count,
		priority: req.query.priority
	};
	//console.log(params.customerId);
  	m_basic.topicsList(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"topics search failed"});
	})
	.finally(function(){

	})
});

router.get('/v1/topics/search',paramsPro.keywords,function(req,res,next){
	var params = {
		keywords : req.query.keywords,
		limitCount: req.query.count,
		priority: req.query.priority
	};
	//console.log(params.customerId);
  	m_basic.topicsList(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"topics search failed"});
	})
	.finally(function(){

	})
});

/*
a. get weather based on location
*/
router.get('/v1/weather/',function(req,res,next){

	var url = weatherURL + '?lat=' + req.query.latitude + '&lon=' + req.query.longitude
		+ '&units=' + weatherUnits + '&appid=' + weatherKey;
	request(url,function(error,response,body){
		if(!error && response.statusCode == 200){
			var owm;
			try {
				owm = JSON.parse(body);
			} catch (e) {
				logger.error(e);
				return res.status(500).json({success:false,data:"get weather failed"});
			}
			// remap OpenWeatherMap response into the Dark Sky-style contract the client expects
			var w = (owm.weather && owm.weather[0]) || {};
			var wind = owm.wind || {};
			var clouds = owm.clouds || {};
			var main = owm.main || {};
			return res.status(200).json({
				"latitude": owm.coord ? owm.coord.lat : undefined,
				"longitude": owm.coord ? owm.coord.lon : undefined,
				"timezone": owm.timezone, // OWM returns a UTC offset in seconds (Dark Sky returned an IANA name)
				"currently": {
					"time": owm.dt,
					"summary": w.description,
					"icon": owmIconToDarkSky(w.icon),
					"temperature": main.temp,
					"apparentTemperature": main.feels_like,
					"humidity": typeof main.humidity === 'number' ? main.humidity / 100 : undefined,
					"pressure": main.pressure,
					"windSpeed": wind.speed,
					"windBearing": wind.deg,
					"cloudCover": typeof clouds.all === 'number' ? clouds.all / 100 : undefined
				},
				"flags": { "units": weatherUnits }
			});
		}else{
			logger.error(error || ('weather provider returned status ' + (response && response.statusCode)));
			return res.status(500).json({success:false,data:"get weather failed"});
		}
	})
});

/*
a. get weather based on location
*/
router.get('/v1/trendingbasicinfo/:trendingtype/:trendingid/:customerid',function(req,res,next){
	//var viewed = (typeof req.query.viewed != 'undefined')? req.query.viewed: true;
	var params = {
		trendingtype : req.params.trendingtype,
		trendingid : req.params.trendingid,
		customerid : req.params.customerid,
		viewed : (typeof req.query.viewed != 'undefined')? req.query.viewed: true,
		trendingname : (typeof req.query.name!='undefined')? req.query.name: ''
	};
	//console.log(params);
  	m_basic.trendingBasicInfo(params)
	.then(function(data){
		return res.status(200).json(data[0]);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"discover trending basic info get failed"});
	})
	.finally(function(){

	})
});

/*
a. search topic
*/
router.get('/v1/topic/search',function(req,res,next){
	var params = {
		keywords: req.query.keywords,
		priority: req.query.priority
	};

  	m_basic.searchTopic(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"search topic failed"});
	})
	.finally(function(){

	})
});

/*
a. search topic
*/
router.get('/v1/banner/:pagetype/:position/:count',function(req,res,next){
	var params = {
		pageType: req.params.pagetype,
		pageId: 0,
		bannerPosition: req.params.position,
		bannerCount: req.params.count
	};

  	m_basic.getPageBanner(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get banner failed"});
	})
	.finally(function(){

	})
});

/*
a. get hot topics,
*/
router.get('/v1/hotbrands',function(req,res,next){
	var params = {
		limitCount : req.query.count,
		type : req.query.type
	};
	//console.log(params.customerId);
  	m_basic.hotBrands(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get hot brands failed"});
	})
	.finally(function(){

	})
});

/*
a. get hot subcategory,
*/
router.get('/v1/hotsubcategory',function(req,res,next){
	var params = {
		limitCount : req.query.count ,
		type : req.query.type,
		tabid: req.query.tabid
	};
	//console.log(params.customerId);
  	m_basic.hotSubcategory(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get hot subcategory failed"});
	})
	.finally(function(){

	})
});

/*
a. get subcategory list by keywords
*/
router.get('/v1/subcategroyList',paramsPro.keywords,function(req,res,next){
	var params = {
		keywords : req.query.keywords,
		limitCount: req.query.count,
		priority: req.query.priority,
		tabid : req.query.tabid
	};
	//console.log(params.customerId);
  	m_basic.subcategroyList(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"subcategory search failed"});
	})
	.finally(function(){

	})
});

/*
a. get categroy info
*/
router.get('/v1/categroy/info',paramsPro.keywords,function(req,res,next){
	var params = {
		id : req.query.id,
		type: req.query.type
	};
	//console.log(params.customerId);
  	m_basic.getCategroyInfo(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get categroy info failed"});
	})
	.finally(function(){

	})
});

/*
a. get brand info
*/
router.get('/v1/brand/info',paramsPro.keywords,function(req,res,next){
	var params = {
		id : req.query.id
	};
	//console.log(params.customerId);
  	m_basic.getBrandInfo(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get brand info failed"});
	})
	.finally(function(){

	})
});

/*
a. get topics info
*/
router.get('/v1/topics/info',paramsPro.keywords,function(req,res,next){
	var params = {
		id : req.query.id
	};
	//console.log(params.customerId);
  	m_basic.getTopicsInfo(params)
	.then(function(data){
		return res.status(200).json(data);
	})
	.catch(function(err){
		logger.error(err);
		return res.status(500).json({success:false,data:"get topic info failed"});
	})
	.finally(function(){

	})
});

module.exports = router;
