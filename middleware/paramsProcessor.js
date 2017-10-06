/*------------------------------------------------------------------------------------
function: parameter formate
author	: lynn
data	: 2016-4-30
------------------------------------------------------------------------------------*/
exports.keywords = function(req,res,next){
	if(req.params.keywords){
		req.params.keywords = req.params.keywords.replace(new RegExp('\\+', 'g'),' ');
		req.params.keywords = req.params.keywords.replace(/\s+/g,',');
	}else if(req.query.keywords){
		req.query.keywords = req.query.keywords.replace(new RegExp('\\+', 'g'),' ');
		req.query.keywords = req.query.keywords.replace(/\s+/g,',');
	}else if(req.body.keywords){
		req.body.keywords = req.body.keywords.replace(new RegExp('\\+', 'g'),' ');
		req.body.keywords = req.body.keywords.replace(/\s+/g,',');
	}
	next();
};
