/*------------------------------------------------------------------------------------
function: custom header
------------------------------------------------------------------------------------*/
var m_customer = require('../models/m_customer');
var logger = require('../libs/common/logger');

exports.APIAuth = function(req,res,next){
	var params = {
		customerId : 0,
		reqAuth : req.headers['authorization']
	};

	if (typeof params.reqAuth == 'undefined' || params.reqAuth == ''){  //no token,not valid request
		return res.status(401).json({success:false,data:"api auth failed"});
	}else{ //the request has token 
		if (req.body.customerId || req.body.customerid){ //post / delete / put 
			params.customerId = req.body.customerId ? req.body.customerId:req.body.customerid;
			
			//get jwt from db by customer id
			m_customer.getJWTByCid(params)
			.then(function(data){
				if(!data){
					return res.status(401).json({success:false,data:"api auth failed"});
				}else{console.log(data);
					if(params.reqAuth  == data.jwt){ // verify success
						return next();
					}else{
						return res.status(401).json({success:false,data:"api auth failed"});
					}
				}
			})
			.catch(function(err){
				logger.error(err);
				return res.status(500).json({success:false,data:"server error"});
			})
			.finally(function(){
				
			}) 
		}else{  //get requst, just do next

			return next();
		}

	}
};