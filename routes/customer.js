/*------------------------------------------------------------------------------------
function: customer router
------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var paramsPro = require('../middleware/paramsProcessor');
var request = require('request');
var nconf = require('nconf');
var logger = require('../libs/common/logger');
var uploader = require('../libs/common/uploader');
var m_customer = require('../models/m_customer');
var crypto = require('crypto');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');

var facebookURL = nconf.get('tpservice:facebook:url').toString();
var facebookIconURL = nconf.get('tpservice:facebook:iconURL').toString();
var googleURL = nconf.get('tpservice:google:url').toString();
/*
a. customer basic info
*/

var gmailAuth = {
  user: 'cerealauto@gmail.com',
  pass: 'Secret1031!'
}

router.get('/v1/basicinfo/:id',function(req,res,next){
  var params = {
    customerId : req.params.id
  };
  //console.log(req.params);
  m_customer.getCustomerBasicInfo(params)
  .then(function(data){
    if(!data){
      return res.status(500).json({success:false,data:'invalid user'});
    }else{
      return res.status(200).json(data);
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"err:invalid user"});
  })
  .finally(function(){

  })
});

/*
a. customer basic info
*/
router.get('/v1/basicinfobyname',function(req,res,next){
  var params = {
    customerName : req.query.name
  };
  //console.log(req.params);
  m_customer.getCustomerBasicInfoByName(params)
  .then(function(data){
    if(!data){
      return res.status(500).json({success:false,data:'invalid user'});
    }else{
      return res.status(200).json(data[0]);
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"err:invalid user"});
  })
  .finally(function(){

  })
});

/*
a. customer basic info with follow info
*/
router.get('/v1/basicinfowfollow/:id/:myid',function(req,res,next){
  var params = {
    customerId : req.params.id,
    myId : req.params.myid
  };

  m_customer.getCustomerBasicInfoWFllow(params)
  .then(function(data){
    if(!data){
      return res.status(500).json({success:false,data:'invalid user'});
    }else{
      return res.status(200).json(data);
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"err:invalid user"});
  })
  .finally(function(){

  })
})

/*
a. customer sign up
b.
*/
router.post('/v1/signup',function(req,res,next){
  var params = {
    email : req.body.email,
    password : req.body.password,
    nickName : req.body.nickName,
    bio : req.body.bio,
    gendar : req.body.gendar,
    livingCity : req.body.livingCity,
    livingCountry : req.body.livingCountry,
    intersts : req.body.intersts && req.body.intersts.length == 0 ? undefined : req.body.intersts
  };

    m_customer.customerSignup(params)
  .then(function(data){
    //console.log(data[0].customerid);
    if(data.length == 0){
      return res.status(500).json({success:false,data:"signup failed"});
    }
    if(data[0].customerid == '0'){
      return res.status(501).json({success:false,data:"email already exists",customerId:data[0].customerid});
    } else if (data[0].customerid == '-1'){
      return res.status(501).json({success:false,data:"nick name already exists",customerId:data[0].customerid});
    } else{
      //send temp password to customer's email
      var transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: gmailAuth
      });
      var mailOptions = {
          from: 'cerealauto@gmail.com', // sender address
          to: params.email, // list of receivers
          subject: 'Welcome to Viashots!', // Subject line
          text: 'Welcome to Viashots!', // plaintext body
          html: 'Dear ' + params.nickName + ', <br/> Your account has been created — now it is time to share and tag.' + 
          '<br/> If you have any questions, contact cerealauto@gmail.com. <br/>--Viashots Team'
      };
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
            logger.error(error);
            return res.status(500).json({success:false,data:error});
          }
          //console.log('Message sent: ' + info.response);
      });
      return res.status(200).json({success: true, customerId: data[0].customerid, data:"signup success"});
    }

  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"signup failed"});
  })
  .finally(function(){

  })
});

/*
a. customer sign up step 2
*/
router.post('/v1/signupstep2',function(req,res,next){
  var params = {
    customerId : req.body.customerId,
    livingCity : req.body.livingCity,
    livingCountry : req.body.livingCountry,
    intersts : req.body.intersts
  };

    m_customer.customerSignupStep2(params)
  .then(function(data){

    return res.status(200).json({success:true,data:"step 2 success"});;

  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"signup failed"});
  })
  .finally(function(){

  })
});

/*
a. customer login (local, facebook, google+)
*/
router.post('/v1/signin',function(req,res,next){
  var tp_info = {
    tp_token : typeof req.body.tp_info != 'undefined'? req.body.tp_info.token:' ',
    tp_id : typeof req.body.tp_info != 'undefined'? req.body.tp_info.id : ' '
  };
  var params = {
    email : req.body.email,
    password : req.body.password,
    signinType : req.body.signinType,
    tpinfo : {
      nickname : '',
      gender : '',
      icon : ''
    }
  };
  //console.log(params);
  if(params.signinType == 'facebook'){
    //get customer info by token, to verify the customer info
    request(facebookURL+tp_info.tp_token,function(error,response,body){
      if(!error && response.statusCode == 200){
        //console.log(JSON.parse(body));
        var jsonbody = JSON.parse(body);
        if(tp_info.tp_id == jsonbody.id){  // verified facebook customer
          params.tpinfo.nickname = jsonbody.name;
          params.tpinfo.gender = jsonbody.gender;
          params.tpinfo.icon = facebookIconURL.replace('{1}',jsonbody.id);

          m_customer.customerLogin(params)
          .then(function(data){
            return res.status(200).json(data[0]);
          })
          .catch(function(err){
            logger.error(err);
            return res.status(500).json({success:false,data:"invalid facebook user"});
          })
          .finally(function(){

          })
        }else{   // id not match the id from facebook api
          return res.status(500).json({success:false,data:"invalid facebook user"});
        }
      }else{   //token verify failed
        logger.error(error);
        return res.status(500).json({success:false,data:"invalid facebook token"});
      }
    })
  }else if(params.signinType == 'google'){
    request(googleURL+tp_info.tp_token,function(error,response,body){//console.log(googleURL+tp_info.tp_token);
      if(!error && response.statusCode == 200){
        var jsonbody = JSON.parse(body);
        //console.log(jsonbody);
        if(params.email == jsonbody.email){
          params.tpinfo.nickname = jsonbody.name;
          //params.tpinfo.gender = jsonbody.gender;
          params.tpinfo.icon = jsonbody.picture;

          m_customer.customerLogin(params)
          .then(function(data){
            return res.status(200).json(data[0]);
          })
          .catch(function(err){
            logger.error(err);
            return res.status(500).json({success:false,data:"invalid google user"});
          })
          .finally(function(){

          })
        }else{  //verify user failed
          return res.status(500).json({success:false,data:"invalid google user"});
        }
      }else{
        logger.error(error);
        return res.status(500).json({success:false,data:"invalid google token"});
      }

    })
  }else{
    m_customer.customerLogin(params)
    .then(function(data){
      return res.status(200).json(data[0]);
    })
    .catch(function(err){
      logger.error(err);
      return res.status(500).json({success:false,data:"invalid user"});
    })
    .finally(function(){

    })
  }
});

/*
a. customer change password
*/
router.post('/v1/changepwd',function(req,res,next){
  var params = {
    customerId : req.body.customerId,
    email : req.body.email,
    password : req.body.password,
    newPassword : req.body.newPassword
  };

    m_customer.customerChangePassword(params)
  .then(function(data){
    //console.log(data[0].customerchangepassword);
    if(data[0].customerchangepassword == '0'){
      return res.status(501).json({success:false,data:"email or password invalid"});
    }else{
      return res.status(200).json({success:true,data:"change password successful"});;
    }

  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"change password"});
  })
  .finally(function(){

  })
});

/*
a. customer profile default page posts view
*/
router.post('/v1/profile/posts',function(req,res,next){
  var params = {
    customerId : req.body.customerId,
    cDate : req.body.cDate,
    scrollType : req.body.scrollType
  };

    m_customer.customerProfilePosts(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get posts failed"});
  })
  .finally(function(){

  })
});

/*
a. customer profile default page album view
*/
router.post('/v1/profile/album',function(req,res,next){
  var params = {
    customerId : req.body.customerId,
    cDate : req.body.cDate,
    scrollType : req.body.scrollType,
    currentCustomerId : req.body.currentCustomerId
  };

    m_customer.customerProfileAlbums(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get album failed"});
  })
  .finally(function(){

  })
});

/*
a. customer profile album detail page
*/
router.get('/v1/profile/albumdetail/:albumId/:customerId/:cDate/:scrollType',function(req,res,next){
  var params = {
    albumId : req.params.albumId,
    customerId : req.params.customerId,
    cDate : req.params.cDate,
    scrollType : req.params.scrollType
  };

    m_customer.customerProfileAlbumDetail(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get album detail failed"});
  })
  .finally(function(){

  })
});

/*
a. customer profile album edit, add / remove posts
*/
router.post('/v1/profile/albumedit',function(req,res,next){
  var params = {
    albumId : req.body.albumId,
    postId : req.body.postId,
    customerId : req.body.customerId,
    action : req.body.action.toLowerCase()
  };
  console.log(params);
    m_customer.customerProfileAlbumEdit(params)
  .then(function(data){
    if(data[0].editalbumposts == 1){
      return res.status(200).json({success:true,data:"album edit success"});
    }else{
      return res.status(500).json({success:false,data:"album edit failed"});
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"album edit failed"});
  })
  .finally(function(){

  })
});

/*
a. customer follow customer
*/
router.post('/v1/customerfollowcustomer',function(req,res,next){
  var params = {
    customerId : req.body.customerId,
    currentCId : req.body.currentCId,
    cDate : req.body.cDate,
    scrollType : req.body.scrollType,
    following : req.body.following
  };
  //console.log(params);
    m_customer.customerFollowCustomer(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get follow list failed"});
  })
  .finally(function(){

  })
});

/*
a. customer follow search
*/
router.get('/v1/followingsearch/:customerid/:username',function(req,res,next){
  var params = {
    customerId : req.params.customerid,
    keywords : req.params.username
  };
  //console.log(params);
    m_customer.customerFollowingsearch(params)
  .then(function(data){
    return res.status(200).json(data.rows);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get follow list failed"});
  })
  .finally(function(){

  })
});

/*
a. customer follow /unfollow, customer, brand, album, store, country,stopics
*/
router.post('/v1/customerfollowunfollow',function(req,res,next){
  var params = {
    followerId : req.body.followerId,
    followingId : req.body.followingId,
    followingType : req.body.followingType,
    isFollow : req.body.isFollow
  };
  //console.log(params);
    m_customer.customerFollowUnfollow(params)
  .then(function(data){
    return res.status(200).json({success:true,data:"successful"});
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"follow failed"});
  })
  .finally(function(){

  })
});

/*
a. discover page, featured creator
*/
router.get('/v1/featuedcreator/:customerid/:priority',function(req,res,next){
  var params = {
    customerId : req.params.customerid,
    priority : req.params.priority
  };
  //console.log(params);
    m_customer.discoverFeaturedCreator(params)
  .then(function(data){
    return res.status(200).json(data.rows);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get featured creator failed"});
  })
  .finally(function(){

  })
});

/*
a. search customer
*/
router.get('/v1/search',function(req,res,next){
  var params = {
    keywords: req.query.keywords,
    priority: req.query.priority,
    customerId: req.query.customerid
  };

    m_customer.searchCustomer(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"search customer failed"});
  })
  .finally(function(){

  })
});

/*
a. add feedback
*/
router.post('/v1/addfeedback',function(req,res,next){
  var params = {
    customerId: req.body.customerid,
    feedback : req.body.feedback
  };

    m_customer.addFeedback(params)
  .then(function(data){
    return res.status(200).json({success:true,data:"add feedback success"});
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"add feedback failed"});
  })
  .finally(function(){

  })
});

/*
report inappropriate
*/
router.post('/v1/addReport', function(req, res, next){
  var params = {
    customerId: req.body.customerid,
    postId: req.body.postid,
    reportType: req.body.reporttype
  };
  m_customer.addReport(params)
  .then(function(data){
    return res.status(200).json({success:true,data:"add report success"});
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"add report failed"});
  })
  .finally(function(){

  })
});

/*
a. get customer notification flag
*/
router.get('/v1/notification/getflag/:customerid',function(req,res,next){
  var params = {
    customerId: req.params.customerid
  };

    m_customer.getNotificationFlag(params)
  .then(function(data){
    return res.status(200).json(data[0]);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get customer notification failed"});
  })
  .finally(function(){

  })
});

/*
a. update customer notification flag
*/
router.post('/v1/notification/updateflag',function(req,res,next){
  var params = {
    customerId: req.body.customerid,
    noticeType: req.body.noticetype,
    noticeFlag: req.body.noticeflag
  };

    m_customer.updateNotificationFlag(params)
  .then(function(data){
    if(data[0].updatenoticeflag == 1){
      return res.status(200).json({success:true,data:"update customer notification success"});
    }else{
      return res.status(500).json({success:false,data:"customer not exists"});
    }

  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"update customer notification failed"});
  })
  .finally(function(){

  })
});

/*
a. update customer notification last view date
*/
router.post('/v1/notification/setlastdate',function(req,res,next){
  var params = {
    customerId: req.body.customerid,
    noticeType: req.body.noticetype,
    viewdate: req.body.viewdate
  };

    m_customer.updateNotificationLastviewdate(params)
  .then(function(data){
    if(data[0].updatenoticelastviewdate == 1){
      return res.status(200).json({success:true,data:"update customer notification last view date success"});
    }else{
      return res.status(500).json({success:false,data:"customer not exists"});
    }

  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"update customer notification last view date failed"});
  })
  .finally(function(){

  })
});

/*
a. has new notice
*/
router.get('/v1/notification/hasnewnotice/:customerid',function(req,res,next){
  var params = {
    customerId: req.params.customerid
  };

    m_customer.getHasNewNotice(params)
  .then(function(data){
    return res.status(200).json(data[0]);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get customer has new notice failed"});
  })
  .finally(function(){

  })
});

/*
a. get new notice
*/
router.get('/v1/notification/getnoticelist/:customerid/:noticetype/:cdate/:lastviewdate',function(req,res,next){
  var params = {
    customerId: req.params.customerid,
    noticeType: req.params.noticetype,
    cDate: req.params.cdate,
    lastviewdate: req.params.lastviewdate
  };

    m_customer.getNewNotice(params)
  .then(function(data){//console.log(data);
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get customer new notice failed"});
  })
  .finally(function(){

  })
});

/*
a. get liked post
*/
router.get('/v1/liked/post/:customerid/:cdate',function(req,res,next){
  var params = {
    customerId: req.params.customerid,
    cDate: req.params.cdate
  };

    m_customer.likedPost(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get liked post failed"});
  })
  .finally(function(){

  })
});

/*
a. get liked product
*/
router.get('/v1/liked/product/:customerid/:cdate',function(req,res,next){
  var params = {
    customerId: req.params.customerid,
    cDate: req.params.cdate
  };

    m_customer.likedProduct(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get liked product failed"});
  })
  .finally(function(){

  })
});

/*
a. get wish list
*/
router.get('/v1/wishlist/:customerid/:cdate',function(req,res,next){
  var params = {
    customerId: req.params.customerid,
    cDate: req.params.cdate
  };

    m_customer.getWishlist(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get wishlist failed"});
  })
  .finally(function(){

  })
});

/*
a. add wish list
*/
router.post('/v1/wishlist',function(req,res,next){
  var params = {
    customerId: req.body.customerid,
    productId: req.body.productid
  };
  console.log(params);
    m_customer.addWishlist(params)
  .then(function(data){
    return res.status(200).json({success:true,data:"add wishlist success"});
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"add wishlist failed"});
  })
  .finally(function(){

  })
});

/*
a. del wish list
*/
router.delete('/v1/wishlist/:customerid/:productid',function(req,res,next){
  var params = {
    customerId: req.params.customerid,
    productId: req.params.productid
  };

    m_customer.delWishlist(params)
  .then(function(data){
    return res.status(200).json({success:true,data:"del wishlist success"});
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"del wishlist failed"});
  })
  .finally(function(){

  })
});

/*
a. get following topics
*/
router.get('/v1/following/topics/:customerid/:cdate',function(req,res,next){
  var params = {
    customerId: req.params.customerid,
    cDate: req.params.cdate
  };

    m_customer.getFollowingTopics(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get following topics failed"});
  })
  .finally(function(){

  })
});

/*
a. get following topics
*/
router.get('/v1/following/brand/:customerid/:cdate',function(req,res,next){
  var params = {
    customerId: req.params.customerid,
    cDate: req.params.cdate
  };

    m_customer.getFollowingBrands(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get following brand failed"});
  })
  .finally(function(){

  })
});

/*
a. get following store
*/
router.get('/v1/following/store/:customerid/:cdate',function(req,res,next){
  var params = {
    customerId: req.params.customerid,
    cDate: req.params.cdate
  };

    m_customer.getFollowingStore(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get following store failed"});
  })
  .finally(function(){

  })
});

/*
a. get following store
*/
router.get('/v1/following/country/:customerid/:cdate',function(req,res,next){
  var params = {
    customerId: req.params.customerid,
    cDate: req.params.cdate
  };

    m_customer.getFollowingCountry(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get following store failed"});
  })
  .finally(function(){

  })
});

/*
a. get customer profile info
*/
router.get('/v1/profile/:customerid',function(req,res,next){
  var params = {
    customerId: req.params.customerid
  };

    m_customer.getCustomerProfile(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get customer profile failed"});
  })
  .finally(function(){

  })
});

/*
a. update customer profile info
*/
router.post('/v1/profile',uploader.uploadImageS3('public/images/customer/','customericon'),function(req,res,next){
  var params = {
    customerId: req.body.customerid,
    nickName: req.body.nickName,
    email: req.body.email,
    icon: req.body.icon,
    bio: req.body.bio,
    gendar: req.body.gendar,
    birthday: req.body.birthday,
    occupation: req.body.occupation,
    phone: req.body.phone,
    livingCity: req.body.livingCity,
    livingCountry: req.body.livingCountry,
    intersts: req.body.intersts
  };

    m_customer.updateCustomerProfile(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"update customer profile failed"});
  })
  .finally(function(){

  })
});

/*
a. update customer icon
*/
router.post('/v1/profile/icon',uploader.uploadImageS3('public/images/customer/','customericon'),function(req,res,next){
  var params = {
    customerinfo: req.body.customerinfo
  };
  //console.log(params);
    m_customer.updateCustomerProfileIcon(params)
  .then(function(data){
    if(data[0].updatecustomerprofileicon == 1628){
      return res.status(200).json({success:true,data:"update customer icon success"});
    }else{
      return res.status(500).json({success:false,data:"update customer icon failed"});
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"update customer icon failed"});
  })
  .finally(function(){

  })
});

/*
a. update customer profile without icon
*/
router.post('/v1/profile/detail',uploader.uploadImageS3('public/images/customer/','customericon'),function(req,res,next){
  var params = {
    customerinfo: req.body.customerinfo
  };
  //console.log(req.body);
    m_customer.updateCustomerProfileWithoutIcon(params)
  .then(function(data){

    var cdata = {
      customerid:0,
      jwt: '0'
    };
    if(data.updatecustomerprofilewithouticon){
      var str = data.updatecustomerprofilewithouticon.substring(1,data.updatecustomerprofilewithouticon.length-1)
      var arr = str.split(',');
      cdata.customerid = parseInt(arr[0]),
      cdata.jwt = arr[1]
    }
    return res.status(200).json(cdata);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"update customer profile failed"});
  })
  .finally(function(){

  })
});

/*
a. get creator categroy
*/
router.get('/v1/creator/categroy',function(req,res,next){
  var params = {
    //customerId: req.params.customerid
  };
  //console.log(params);
    m_customer.creatorCategory(params)
  .then(function(data){
    return res.status(200).json(data.rows);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get creator categroy failed"});
  })
  .finally(function(){

  })
});

/*
a. get creator info
*/
router.get('/v1/creator/:customerid',function(req,res,next){
  var params = {
    customerId: req.params.customerid
  };
  //console.log(params);
    m_customer.getCreatorinfo(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get creator info failed"});
  })
  .finally(function(){

  })
});

/*
a. add creator
*/
router.post('/v1/creator',function(req,res,next){
  var params = {
    customerId: req.body.customerid,
    categroyId: req.body.categroyid,
    creatorInfo: req.body.creatorinfo
  };
  //console.log(params);
    m_customer.addCreator(params)
  .then(function(data){
    if(data[0].addcreator == '1'){

      //send temp password to customer's email
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
          port: 465,
          secure: true, // use SSL
          auth: gmailAuth
      });
      var mailOptions = {
          from: 'cerealauto@gmail.com', // sender address
          to: 'cerealauto@gmail.com', // list of receivers
          subject: 'Request Viashots Creator', // Subject line
          text: 'Request Viashots Creator', // plaintext body
          html: 'Customer Id ' + params.customerId +' want to become viashots creator, please process.'
      };
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
            logger.error(error);
            return res.status(500).json({success:false,data:error});
          }
          //console.log('Message sent: ' + info.response);
      });

      return res.status(200).json({success:true,data:"add creator success"});
    }else{
      return res.status(500).json({success:false,data:"add creator failed"});
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"add creator failed"});
  })
  .finally(function(){

  })
});

/*
a. update creator
*/
router.put('/v1/creator',function(req,res,next){
  var params = {
    customerId: req.body.customerid,
    categroyId: req.body.categroyid,
    creatorInfo: req.body.creatorinfo
  };
  //console.log(params);
    m_customer.updateCreator(params)
  .then(function(data){
    if(data[0].updatecreator == '1'){
      return res.status(200).json({success:true,data:"update creator success"});
    }else{
      return res.status(500).json({success:false,data:"update creator failed"});
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"update creator failed"});
  })
  .finally(function(){

  })
});

/*
a. get link account
*/
router.get('/v1/linkaccount/:customerid',function(req,res,next){
  var params = {
    customerId: req.params.customerid
  };
  //console.log(params);
    m_customer.getLinkAccount(params)
  .then(function(data){
    return res.status(200).json(data[0]);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get link account failed"});
  })
  .finally(function(){

  })
});

/*
a. update link account
*/
router.post('/v1/linkaccount',function(req,res,next){
  var params = {
    customerId: req.body.customerid,
    linkType: req.body.linktype,
    flag: req.body.flag
  };
  //console.log(params);
    m_customer.updateLinkAccount(params)
  .then(function(data){
    if(data[0].updatecustomerlinkaccount == '1'){
      return res.status(200).json({success:true,data:"update linkaccount success"});
    }else{
      return res.status(500).json({success:false,data:"update linkaccount failed"});
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"update linkaccount failed"});
  })
  .finally(function(){

  })
});

/*
a. find friends
*/
router.post('/v1/findfriends',function(req,res,next){
  var params = {
    customerId: req.body.customerid,
    tpCustomers: req.body.tpcustomers
  };
  //console.log(params);
    m_customer.findFriends(params)
  .then(function(data){
    return res.status(200).json(data);

  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"find friends failed"});
  })
  .finally(function(){

  })
});

/*
a. customer profile default page collection view
*/
router.post('/v1/profile/collection',function(req,res,next){
  var params = {
    customerId : req.body.customerId,
    cDate : req.body.cDate,
    scrollType : req.body.scrollType,
    currentCustomerId : req.body.currentCustomerId
  };

    m_customer.customerProfileCollection(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get collection failed"});
  })
  .finally(function(){

  })
});

/*
a. customer profile collection detail page
*/
router.get('/v1/profile/collectiondetail/:collectionId/:customerId/:cDate/:scrollType',function(req,res,next){
  var params = {
    collectionId : req.params.collectionId,
    customerId : req.params.customerId,
    cDate : req.params.cDate,
    scrollType : req.params.scrollType
  };

    m_customer.customerProfileCollectionDetail(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"get collection detail failed"});
  })
  .finally(function(){

  })
});

/*
a. customer profile collection edit, add / remove posts
*/
router.post('/v1/profile/collectionedit',function(req,res,next){
  var params = {
    collectionId : req.body.collectionId,
    productId : req.body.productId,
    customerId : req.body.customerId,
    action : req.body.action.toLowerCase()
  };
  //console.log(params);
    m_customer.customerProfileCollectionEdit(params)
  .then(function(data){
    if(data[0].editcollectionproduct == 1){
      return res.status(200).json({success:true,data:"collection edit success"});
    }else{
      return res.status(500).json({success:false,data:"collection edit failed"});
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"collection edit failed"});
  })
  .finally(function(){

  })
});

/*
a. customer reset password
*/
router.post('/v1/resetpwd',function(req,res,next){
  var params = {
    email : req.body.email,
    temppwd : ''
  };

  var temppwd = randomstring.generate(8);
  params.temppwd = crypto.createHash('sha256').update(temppwd).digest('hex');
  //console.log(params);
    m_customer.customerResetPassword(params)
  .then(function(data){
    if(data[0].customerresetpassword.customerid > 0){
      var cname = data[0].customerresetpassword.customername == null? 'Customer': '"'+data[0].customerresetpassword.customername+'"';
      //send temp password to customer's email
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
          port: 465,
          secure: true, // use SSL
          auth: gmailAuth
      });
      var mailOptions = {
          from: 'viashotsdev@gmail.com', // sender address
          to: params.email, // list of receivers
          subject: 'Viashots Password Recovery', // Subject line
          text: 'the new password,please update once login.', // plaintext body
          html: 'Dear ' + cname +',' + '<br />  We received your request to reset your Viashots password.<br/><br/>'
            + 'Temporary password: '+temppwd + '<br/><br/>If you have received this message in error, please contact us immediately at help@viashots.com. <br/>'
        + 'Sincerely,<br/>Viashots'
      };
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
            logger.error(error);
            return res.status(500).json({success:false,data:error});
          }
          //console.log('Message sent: ' + info.response);
      });

      return res.status(200).json({success:true,data:"reset password success"});
    }else{
      return res.status(500).json({success:false,data:"reset password failed"});
    }
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"reset password failed"});
  })
  .finally(function(){

  })
});

router.get('/v1/usersList/:keywords', paramsPro.keywords, function(req, res, next){
  var params = {
    keywords : req.params.keywords,
    limitCount: req.query.count,
    priority: req.query.priority
  };
  //console.log(params.customerId);
    m_customer.usersList(params)
  .then(function(data){
    return res.status(200).json(data);
  })
  .catch(function(err){
    logger.error(err);
    return res.status(500).json({success:false,data:"users search failed"});
  })
  .finally(function(){

  })
});

module.exports = router;

