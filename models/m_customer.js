/*------------------------------------------------------------------------------------
function: customer moduel
author	: lynn
data	: 2016-4-11
------------------------------------------------------------------------------------*/
var db = require('../libs/common/db.js');
var vs_util = require('../libs/common/util');
var vsEnum = require('../libs/common/enum');
var vs_auth = require('../libs/common/auth');
var db_customer = require('../libs/dbconf/db_customer');
var nconf = require('nconf');

var customerIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:customer').toString();
var postIcon = nconf.get('vsglobal:images:host').toString()+nconf.get('vsglobal:images:path:post').toString();

/*
a. get customer login info
*/
exports.getCustomerBasicInfo = function(params){
	return db.exec.oneOrNone(db_customer.getCustomerBasicInfo.sql,[
			params.customerId,
			customerIcon
		]);
},

/*
a. get customer basic info by name
*/
exports.getCustomerBasicInfoByName = function(params){
	return db.exec.func(db_customer.getCustomerBasicInfoByName.sql,[
			params.customerName,
			customerIcon
		]);
},

/*
a. get customer login info with follow info
*/
exports.getCustomerBasicInfoWFllow = function(params){
	return db.exec.oneOrNone(db_customer.getCustomerBasicInfoWFllow.sql,[
			params.customerId,
			params.myId,
			customerIcon
		]);
},

/*
a. customer sign up
*/
exports.customerSignup = function(params){
	return db.exec.func(db_customer.customerSignup.sql,[
			params.email,
			params.password,
			params.nickName,
			params.bio,
			params.gendar,
			params.livingCity,
			params.livingCountry,
			params.intersts,
			vs_auth.sha256(params.email)
		]);
},

/*
a. customer sign up step2
*/
exports.customerSignupStep2 = function(params){
	return db.exec.func(db_customer.customerSignupStep2.sql,[
			params.customerId,
			params.livingCity,
			params.livingCountry,
			params.intersts
		]);
},

/*
a. customer login local
*/
exports.customerLoginLocal = function(params){
	return db.exec.func(db_customer.customerLoginLocal.sql,[
			params.email,
			params.password
		]);
},

/*
a. customer login facebook
*/
exports.customerLogin = function(params){ //console.log(params);
	return db.exec.func(db_customer.customerLogin.sql,[
			params.email,
			params.password,
			params.signinType,
			params.tpinfo,
			vs_auth.sha256(params.email)
		]);
},

/*
a. customer change password
*/
exports.customerChangePassword = function(params){
	return db.exec.func(db_customer.customerChangePassword.sql,[
			params.customerId,
			params.email,
			params.password,
			params.newPassword
		]);
},

/*
a. customer profile default page posts
*/
exports.customerProfilePosts = function(params){
	return db.exec.func(db_customer.customerProfilePosts.sql,[
			params.customerId,
			params.cDate,
			params.scrollType,
			postIcon
		]);
},

/*
a. customer profile default page album
*/
exports.customerProfileAlbums = function(params){
	return db.exec.func(db_customer.customerProfileAlbums.sql,[
			params.customerId,
			params.cDate,
			params.scrollType,
			params.currentCustomerId,
			postIcon
		]);
},

/*
a. customer profile default page album,, album detail page
*/
exports.customerProfileAlbumDetail = function(params){
	return db.exec.func(db_customer.customerProfileAlbumDetail.sql,[
			params.albumId,
			params.customerId,
			params.cDate,
			params.scrollType,
			postIcon
		]);
},

/*
a. customer profile album edit, add/remove post
*/
exports.customerProfileAlbumEdit = function(params){
	return db.exec.func(db_customer.customerProfileAlbumEdit.sql,[
			params.albumId,
			params.postId,
			params.customerId,
			params.action
		]);
},

/*
a. customer follow
*/
exports.customerFollowCustomer = function(params){

	return db.exec.func(db_customer.customerFollowCustomer.sql,[
			params.customerId,
			params.currentCId,
			params.cDate,
			params.scrollType,
			params.following,
			customerIcon
		]);
},

/*
a. customer following search
*/
exports.customerFollowingsearch = function(params){
	return db.exec.result(db_customer.customerFollowingsearch.sql,[
			params.customerId,
			params.keywords,
			customerIcon
		]);
},

/*
a. customer follow, unfolow
*/
exports.customerFollowUnfollow = function(params){

	return db.exec.func(db_customer.customerFollowUnfollow.sql,[
			params.followerId,
			params.followingId,
			params.followingType,
			params.isFollow
		]);
},

/*
a. discover page, feature creator
*/
exports.discoverFeaturedCreator = function(params){
	return db.exec.result(db_customer.discoverFeaturedCreator.sql,[
			params.customerId,
			params.priority,
			postIcon,
			customerIcon
		]);
},

/*
a. search customer
*/
exports.searchCustomer = function(params){
	return db.exec.func(db_customer.searchCustomer.sql,[
			params.keywords,
			params.priority,
			params.customerId,
			postIcon,
			customerIcon
		]);
},

/*
a. get customer jwt code
*/
exports.getJWTByCid = function(params){
	return db.exec.oneOrNone(db_customer.getJWTByCid.sql,[
			params.customerId
		]);
},

/*
a. add feed back
*/
exports.addFeedback = function(params){
	return db.exec.oneOrNone(db_customer.addFeedback.sql,[
			params.customerId,
			params.feedback
		]);
},

/*
report inappropriate
*/
exports.addReport = function(params){
	return db.exec.oneOrNone(db_customer.addReport.sql, [
			params.customerId,
			params.postId,
			params.reportType
		]);
};

/*
a. get notification flag
*/
exports.getNotificationFlag = function(params){
	return db.exec.func(db_customer.getNotificationFlag.sql,[
			params.customerId
		]);
},

/*
a. update notification flag
*/
exports.updateNotificationFlag = function(params){
	return db.exec.func(db_customer.updateNotificationFlag.sql,[
			params.customerId,
			params.noticeType,
			params.noticeFlag
		]);
},

/*
a. update notification last view date
*/
exports.updateNotificationLastviewdate = function(params){
	return db.exec.func(db_customer.updateNotificationLastviewdate.sql,[
			params.customerId,
			params.noticeType,
			params.viewdate
		]);
},

/*
a. has new notice
*/
exports.getHasNewNotice = function(params){
	return db.exec.func(db_customer.hasNewNotice.sql,[
			params.customerId
		]);
},

/*
a. get new notice
*/
exports.getNewNotice = function(params){
	return db.exec.func(db_customer.getNewNotice.sql,[
			params.customerId,
			params.noticeType,
			params.cDate,
			params.lastviewdate,
			customerIcon
		]);
},

/*
a. get liked post
*/
exports.likedPost = function(params){
	return db.exec.func(db_customer.likedPost.sql,[
			params.customerId,
			params.cDate,
			postIcon
		]);
},

/*
a. get liked product
*/
exports.likedProduct = function(params){
	return db.exec.func(db_customer.likedProduct.sql,[
			params.customerId,
			params.cDate,
			postIcon
		]);
},

/*
a. get wishlist
*/
exports.getWishlist = function(params){
	return db.exec.func(db_customer.getWishlist.sql,[
			params.customerId,
			params.cDate,
			postIcon
		]);
},

/*
a. add wishlist
*/
exports.addWishlist = function(params){
	return db.exec.func(db_customer.addWishlist.sql,[
			params.customerId,
			params.productId
		]);
},

/*
a. del wishlist
*/
exports.delWishlist = function(params){
	return db.exec.func(db_customer.delWishlist.sql,[
			params.customerId,
			params.productId
		]);
},

/*
a. get following topics
*/
exports.getFollowingTopics = function(params){
	return db.exec.func(db_customer.getFollowingTopics.sql,[
			params.customerId,
			params.cDate
		]);
},

/*
a. get following brands
*/
exports.getFollowingBrands = function(params){
	return db.exec.func(db_customer.getFollowingBrands.sql,[
			params.customerId,
			params.cDate
		]);
},

/*
a. get following store
*/
exports.getFollowingStore = function(params){
	return db.exec.func(db_customer.getFollowingStore.sql,[
			params.customerId,
			params.cDate,
			postIcon
		]);
},

/*
a. get following country
*/
exports.getFollowingCountry = function(params){
	return db.exec.func(db_customer.getFollowingCountry.sql,[
			params.customerId,
			params.cDate,
			postIcon
		]);
},

/*
a. get customer profile
*/
exports.getCustomerProfile = function(params){
	return db.exec.oneOrNone(db_customer.getCustomerProfile.sql,[
			params.customerId,
			customerIcon
		]);
},

/*
a. update customer profile
*/
exports.updateCustomerProfile = function(params){
	return db.exec.oneOrNone(db_customer.updateCustomerProfile.sql,[
			params.customerId,
			params.nickname,
			params.email,
			params.icon,
			params.bio,
			params.gendar,
			params.birthday,
			params.occupation,
			params.phone,
			params.livingCity,
			params.livingCountry,
			params.intersts,
			vs_auth.sha256(params.email)
		]);
},

/*
a. update customer profile Icon
*/
exports.updateCustomerProfileIcon = function(params){
	var customerinfo = JSON.parse(params.customerinfo);
	//console.log(customerinfo);
	return db.exec.func(db_customer.updateCustomerProfileIcon.sql,[
			customerinfo.id,
			customerinfo.icon
		]);
},

/*
a. update customer profile without Icon
*/
exports.updateCustomerProfileWithoutIcon = function(params){//console.log(params);
	var customerinfo = JSON.parse(params.customerinfo);

	return db.exec.one(db_customer.updateCustomerProfileWithoutIcon.sql,[
			customerinfo.id,
			customerinfo.nickname,
			customerinfo.email,
			customerinfo.bio,
			customerinfo.gendar,
			customerinfo.birthday == ""?null:customerinfo.birthday,
			customerinfo.occupation,
			customerinfo.phone,
			customerinfo.livingcity,
			customerinfo.livingcountry,
			customerinfo.intrests,
			vs_auth.sha256(customerinfo.email)
		]);
},

/*
a. get creator category
*/
exports.creatorCategory = function(params){
	return db.exec.result(db_customer.creatorCategory.sql,[

		]);
},

/*
a. get creator info
*/
exports.getCreatorinfo = function(params){
	return db.exec.oneOrNone(db_customer.getCreatorinfo.sql,[
			params.customerId
		]);
},

/*
a. add creator
*/
exports.addCreator = function(params){
	return db.exec.func(db_customer.addCreator.sql,[
			params.customerId,
			params.categroyId,
			params.creatorInfo
		]);
},

/*
a. update creator
*/
exports.updateCreator = function(params){
	return db.exec.func(db_customer.updateCreator.sql,[
			params.customerId,
			params.categroyId,
			params.creatorInfo
		]);
},

/*
a. get link account
*/
exports.getLinkAccount = function(params){
	return db.exec.func(db_customer.getLinkAccount.sql,[
			params.customerId
		]);
},

/*
a. update link account
*/
exports.updateLinkAccount = function(params){
	return db.exec.func(db_customer.updateLinkAccount.sql,[
			params.customerId,
			params.linkType,
			params.flag
		]);
},

/*
a. find friends
*/
exports.findFriends = function(params){
	return db.exec.func(db_customer.findFriends.sql,[
			params.customerId,
			params.tpCustomers,
			customerIcon
		]);
},

/*
a. customer profile collection view
*/
exports.customerProfileCollection = function(params){
	return db.exec.func(db_customer.customerProfileCollection.sql,[
			params.customerId,
			params.cDate,
			params.scrollType,
			params.currentCustomerId
		]);
},

/*
a. customer profile collection detail page
*/
exports.customerProfileCollectionDetail = function(params){
	return db.exec.func(db_customer.customerProfileCollectionDetail.sql,[
			params.collectionId,
			params.customerId,
			params.cDate,
			params.scrollType
		]);
},

/*
a. customer profile collection edit, add/remove product
*/
exports.customerProfileCollectionEdit = function(params){
	return db.exec.func(db_customer.customerProfileCollectionEdit.sql,[
			params.collectionId,
			params.productId,
			params.customerId,
			params.action
		]);
},

/*
a. customer reset password
*/
exports.customerResetPassword = function(params){
	return db.exec.func(db_customer.customerResetPassword.sql,[
			params.email,
			params.temppwd
		]);
},

exports.usersList = function(params) {
	return db.exec.func(db_customer.usersList.sql,[
			params.keywords,
			params.limitCount,
			params.priority,
			customerIcon
		]);
}





