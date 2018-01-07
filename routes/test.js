/*
Only for test Azure Upload
*/
var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
var router = express.Router();
var uploader = require('../libs/common/uploader');

 
router.get('/aws', function (req, res) {
    res.status(200)
        .send('<form method="POST" enctype="multipart/form-data">'
            + '<input type="file" name="file" id="file"/><input type="submit"/>'
            + '</form>')
        .end();
})

router.post('/aws',uploader.uploadImageS3('public/','file'), function(req, res, next) {
  res.send('Successfully uploaded files!')
})

router.get('/azure', function (req, res) {
    res.status(200)
        .send('<form method="POST" enctype="multipart/form-data">'
            + '<input type="file" name="file" id="file"/><input type="submit"/>'
            + '</form>')
        .end();
})

router.post('/azure',uploader.uploadImageAzure('public/','file'), function(req, res, next) {
  res.send('Successfully uploaded files!')
})

module.exports = router;