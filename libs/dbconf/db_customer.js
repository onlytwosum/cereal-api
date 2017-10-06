/*------------------------------------------------------------------------------------
function: customer sql
author	: lynn
data	: 2016-4-11
------------------------------------------------------------------------------------*/
var multiline = require('multiline');

module.exports = {
	"getCustomerBasicInfo":{
		"sql":multiline(function () {/*
select nickName,customerIcon(icon,$2) as icon,bio,follower,following,level as cusotmerType
from vs_customer
where id = $1
        */})
	},
	"getCustomerBasicInfoByName":{
		"sql":multiline(function () {/*
getcustomerbasicinfobyname
        */})
	},
	"getCustomerBasicInfoWFllow":{
		"sql":multiline(function () {/*
select nickName,customerIcon(icon,$3) as icon,bio,follower,following,level as cusotmerType,
case when b.followerCustomers is null then
	false
else
	$2 = any(b.followerCustomers)
end as isfollowed,level::text as customerlevel
from vs_customer as a
left join vs_customerFollowing as b on a.id = b.customerId
where a.id = $1
        */})
	},
	"customerSignup":{
		"sql": multiline(function () {/*
customerSignup
        */})
	},
	"customerSignupStep2":{
		"sql": multiline(function () {/*
customerSignupStep2
        */})
	},
	"customerLoginLocal":{
		"sql": multiline(function () {/*
customerSigninLocal
        */})
	},
	"customerLogin":{
		"sql": multiline(function () {/*
customerSignin
        */})
	},
	"customerChangePassword":{
		"sql": multiline(function () {/*
customerChangePassword
        */})
	},

	"customerProfilePosts":{
		"sql": multiline(function () {/*
customerProfilePhotos
        */})
	},
	"customerProfileAlbums":{
		"sql": multiline(function () {/*
customerProfileAlbum
        */})
	},
	"customerFollowCustomer":{
		"sql": multiline(function () {/*
followingCustomers
        */})
	},
	"customerFollowingsearch":{
		"sql": multiline(function () {/*
select a.id as customerId, a.nickname as customerName,
				customerIcon(a.icon,$3) as icon
				from vs_customer as a
				where array[a.id] <@ (select followingCustomers from vs_customerFollowing as b where b.customerId =$1)
				and a.nickname like '%' || $2 || '%'
				order by a.nickname
				limit 60;
        */})
	},
	"customerFollowUnfollow":{
		"sql": multiline(function () {/*
followunfollow
        */})
	},
	"customerProfileAlbumDetail":{
		"sql": multiline(function () {/*
customerProfileAlbumDetail
        */})
	},
	"customerProfileAlbumEdit":{
		"sql": multiline(function () {/*
editAlbumPosts
        */})
	},
	"discoverFeaturedCreator":{
		"sql": multiline(function () {/*
select a.id as customerid,a.nickName as customername, customerIcon(a.icon,$4) as customericon, a.bio as customerbio,
hstore_to_json(a.LivingIn)  as customerlivingin, array[$1::int] <@ c.followerCustomers as isfollowed,
row_number() over(order by follower desc) as priority,
	(
		select array_to_json(array_agg(row_to_json(t)))
		from(
			select p.id, $3 || p.photos[1] as photo
			from vs_post as p
			where p.customerId = a.id and p.status = 'approve'
			order by p.lastEditDate desc
			limit 5
		)t
	) as posts
from vs_customer as a
	inner join vs_creator as b on a.id = b.customerId
	inner join vs_customerFollowing as c on a.id=c.customerId
where a.status = 'approve' and b.status = 'approve' and a.level = 'creator'
order by follower desc
limit 10 offset $2;
        */})
	},
	"searchCustomer":{
		"sql": multiline(function () {/*
searchcustomer
        */})
	},
	"getJWTByCid":{
		"sql": multiline(function () {/*
select jwt from vs_customer where id =$1
        */})
	},
	"addFeedback":{
		"sql": multiline(function () {/*
insert into vs_feedback(customerId,vsDescription,indate,lastEditDate)
values($1,$2,DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW()))
        */})
	},
  "addReport":{
    "sql": multiline(function(){/*
insert into vs_report(customerId,postId, type,indate,lastEditDate)
values($1,$2, case when $3 = 0 THEN 'spam'::vs_report_type else 'inappropriate'::vs_report_type end, DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW()))
    */})
  },
	"getNotificationFlag":{
		"sql": multiline(function () {/*
getnoticeflag
        */})
	},
	"updateNotificationFlag":{
		"sql": multiline(function () {/*
updatenoticeflag
        */})
	},
	"updateNotificationLastviewdate":{
		"sql": multiline(function () {/*
updatenoticelastviewdate
        */})
	},
	"hasNewNotice":{
		"sql": multiline(function () {/*
getHasNewNotice
        */})
	},
	"getNewNotice":{
		"sql": multiline(function () {/*
getNewNotice
        */})
	},
	"likedPost":{
		"sql": multiline(function () {/*
getlikedpost
        */})
	},
	"likedProduct":{
		"sql": multiline(function () {/*
getlikedproduct
        */})
	},
	"getWishlist":{
		"sql": multiline(function () {/*
getwishlist
        */})
	},
	"delWishlist":{
		"sql": multiline(function () {/*
delwishlist
        */})
	},
	"addWishlist":{
		"sql": multiline(function () {/*
addwishlist
        */})
	},
	"getFollowingTopics":{
		"sql": multiline(function () {/*
getfollowtopics
        */})
	},
	"getFollowingBrands":{
		"sql": multiline(function () {/*
getfollowbrand
        */})
	},
	"getFollowingStore":{
		"sql": multiline(function () {/*
getfollowstore
        */})
	},
	"getFollowingCountry":{
		"sql": multiline(function () {/*
getfollowcountry
        */})
	},
	"getCustomerProfile":{
		"sql": multiline(function () {/*
select email,a.nickName,customerIcon(a.icon,$2) as icon,
a.bio ,gendar,birthday,Occupation,livingin->'city' as livingCity,livingin->'country' as livingCountry,phone,b.intrests
from vs_customer as a
	inner join vs_customerFollowing as b on a.id =b.customerId
where a.id =$1
        */})
	},
	"updateCustomerProfile":{
		"sql": multiline(function () {/*
select updatecustomerprofile($1::int,$2::text,$3::text,$4::text,$5::text,cast($6 as vs_gendar),
$7::date,$8::text,$9::text,$10::text,$11::text,$12::int[],$13::text)
        */})
	},
	"updateCustomerProfileIcon":{
		"sql": multiline(function () {/*
updatecustomerprofileicon
        */})
	},
	"updateCustomerProfileWithoutIcon":{
		"sql": multiline(function () {/*
select updatecustomerprofilewithouticon($1::int,$2::text,$3::text,$4::text,cast($5 as vs_gendar),
$6::date,$7::text,$8::text,$9::text,$10::text,$11::int[],$12::text)
        */})
	},
	"creatorCategory":{
		"sql": multiline(function () {/*
select id,name from vs_creatorCategory
order by name
        */})
	},
	"getCreatorinfo":{
		"sql": multiline(function () {/*
select b.id as categroyid,b.name as categroy,a.status,a.creatorInfo
from vs_creator as a
	left join vs_creatorCategory as b on a.creatorCategory = b.id
where a.customerid = $1
        */})
	},
	"addCreator":{
		"sql": multiline(function () {/*
addcreator
        */})
	},
	"updateCreator":{
		"sql": multiline(function () {/*
updatecreator
        */})
	},
	"getLinkAccount":{
		"sql": multiline(function () {/*
getcustomerlinkaccount
        */})
	},
	"updateLinkAccount":{
		"sql": multiline(function () {/*
updatecustomerlinkaccount
        */})
	},
	"findFriends":{
		"sql": multiline(function () {/*
findfriends
        */})
	},
	"customerProfileCollection":{
		"sql": multiline(function () {/*
customerProfileCollection
        */})
	},
	"customerProfileCollectionDetail":{
		"sql": multiline(function () {/*
customerProfileCollectionDetail
        */})
	},
	"customerProfileCollectionEdit":{
		"sql": multiline(function () {/*
editCollectionProduct
        */})
	},
	"customerResetPassword":{
		"sql": multiline(function () {/*
customerResetPassword
        */})
	},
  "usersList": {
    "sql":multiline(function () {/*
userskeywordsearch
        */})
  },
}
