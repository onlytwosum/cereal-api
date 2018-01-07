/*------------------------------------------------------------------------------------
function: custom header
------------------------------------------------------------------------------------*/
exports.noCache = function(req,res,next){
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  	res.header('Expires', '-1');
  	res.header('Pragma', 'no-cache');
  	next();
};

exports.allowOrigin = function(req,res,next){
	var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
};