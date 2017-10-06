/*------------------------------------------------------------------------------------
function: product related sql
author	: lynn
data	: 2016-4-15
------------------------------------------------------------------------------------*/
var multiline = require('multiline');

module.exports = {
	"productSearchForPostUpload":{
		"sql":multiline(function () {/*
productSearchForPostUpload
        */})
	},
	"postRelatedProducts":{
		"sql":multiline(function () {/*
select a.id,a.title,
case when a.images is null then
	null
else
	a.images[1]
end as image,
c.name as brandname,c.id as brandid
from vs_product as a
	inner join vs_postAdditional as b on b.product @> array[a.id]
	left join vs_brand as c on a.brandId = c. id
where b.postId = $1 and a.status = 'approve'
order by a.viewed desc,a.liked desc
limit 5;
        */})
	},
	"discoverDefaultMostRecom":{
		"sql":multiline(function () {/*
 select a.id,a.title,a.images[1] as image,c.name as brandname
 from vs_product as a
  inner join vs_brand as c on a.brandId = c.id
 where a.status = 'approve'
 order by a.priority desc, a.viewed desc,a.liked desc
limit 20;
        */})
	},
	"discoverTrendingProduct":{
		"sql":multiline(function () {/*
discovertrendingproduct
        */})
	},
	"productKeywordsSearch":{
		"sql":multiline(function () {/*
searchproduct1
        */})
	},
	"saveToCollection":{
		"sql":multiline(function () {/*
savetocollection
        */})
	},
	"removeFromCollection":{
		"sql":multiline(function () {/*
removefromcollection
        */})
	},
	"brandWeLove":{
		"sql":multiline(function () {/*
select b.id as brandid, b.name as brandname,
case when b.image is not null then
    ($1 || b.image)
else
    c.image
end as image
from vs_brand as b
inner join (
   select distinct on (a.brandid) a.brandid, a.images[1] as image
   from vs_product as a
   where a.status = 'approve'
   order by a.brandid
) c on b.id = c.brandid
where b.active = true
order by b.manual desc, b.viewed desc, b.follower desc
limit 4;
        */})
	},
	"shopbytopics":{
		"sql":multiline(function () {/*
shopbytopics
        */})
	},
	"shopbybrand":{
		"sql":multiline(function () {/*
shopbybrand
        */})
	},
	"shopbycategroy":{
		"sql":multiline(function () {/*
shopbycategroy
        */})
	},
	"productDetailinfo":{
		"sql":multiline(function () {/*
productdetailinfo
        */})
	},
	"productRelatedPosts":{
		"sql":multiline(function () {/*
select a.id,$2||a.photos[1] as photo
from vs_post as a
where a.status = 'approve' and array[a.id] <@ (select postId from vs_productAdditional as b where b.productid = $1)
order by a.viewed desc,a.liked desc
limit 3
        */})
	},
	"likeProduct":{
		"sql":multiline(function () {/*
customerlikeunlike
        */})
	},
  "viewProduct":{
    "sql":multiline(function () {/*
viewproduct
    */})
  }
}
