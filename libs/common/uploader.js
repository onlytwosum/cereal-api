/*------------------------------------------------------------------------------------
function: upload file
------------------------------------------------------------------------------------*/
var aws = require('aws-sdk')
var multer = require("multer");
var multerS3 = require("multer-s3");
var multerAzureStorage = require('multer-azure-storage');
var nconf = require('nconf');

exports.uploadImage = function(imagePath,iamgeName){
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
    		cb(null, require('app-root-path').resolve(imagePath).toString())
  		},
  		filename: function (req, file, cb) {
    		cb(null, file.originalname)
  		}
	});

	var fileFilter = function (req, file, cb) {

        if (file.mimetype !== 'image/png'
            && file.mimetype !== 'image/jpg'
            && file.mimetype !== 'image/jpeg'
            && file.mimetype !== 'image/gif') {
            //console.log('Got file of type', file.mimetype);
        	cb(null, false);
            return cb(new Error('Only image files are allowed!'));
        }

        // To accept the file pass `true`, like so:
        cb(null, true);
	};

	var limits = {
		fileSize: 5 * 1024 * 1024, //5*1000000,  2 * 1024 * 1024
		files: 5
	};

	var onerror = function(err,next){
		next(err);
	};

	var upload = multer({ 
		storage: storage,
		fileFilter: fileFilter,
		limits: limits,
		onError: onerror 
	});

	return upload.single(iamgeName);
};

exports.uploadImageS3= function(imagePath,iamgeName){
	var s3 = new aws.S3({
		dirname: imagePath,
		/*bucket: 'test.viashots-img.com',
		accessKeyId: 'AKIAIL7JWTYQTHQ7PGJQ',
		secretAccessKey: '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',
		region: 'us-west-1'*/
		bucket: nconf.get('vsglobal:amazonS3:bucket').toString(),
		accessKeyId: nconf.get('vsglobal:amazonS3:accessKeyId').toString(),
		secretAccessKey: nconf.get('vsglobal:amazonS3:secretAccessKey').toString(),
		region: nconf.get('vsglobal:amazonS3:region').toString()
	});

	var storage = multerS3({
		s3: s3,
		bucket: nconf.get('vsglobal:amazonS3:bucket').toString(),
		key: function (req, file, cb) {
    		cb(null, imagePath + file.originalname)
  		},
  		contentType: multerS3.AUTO_CONTENT_TYPE
	});

	var upload = multer({
		storage: storage
	});

	return upload.single(iamgeName);
};

exports.uploadImageAzure = function(imagePath,iamgeName) {
  var upload = multer({
    storage: new multerAzureStorage({
      azureStorageConnectionString: nconf.get('vsglobal:azureBlob:azureStorageConnectionString').toString(),
      azureStorageAccessKey: nconf.get('vsglobal:azureBlob:azureStorageAccessKey').toString(),
      azureStorageAccount: nconf.get('vsglobal:azureBlob:azureStorageAccount').toString(),
      containerName: nconf.get('vsglobal:azureBlob:containerName').toString(),
      containerSecurity: nconf.get('vsglobal:azureBlob:containerSecurity').toString(),
      fileName: function(file) {
        return imagePath + file.originalname;
      }
    })
  });

  return upload.single(iamgeName);
};

