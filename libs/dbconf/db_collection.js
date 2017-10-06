/*------------------------------------------------------------------------------------
function: collection 
author	: lynn
data	: 2016-6-11
------------------------------------------------------------------------------------*/
var multiline = require('multiline');

module.exports = {
	"getCollectionsByCid":{
		"sql":multiline(function () {/*
select  a.id,a.name,a.vsDescription,b.images[1] as image, a.indate
from vs_collection as a 
	inner join vs_product as b on a.products[1]=b.id
where a.creator = $1  and a.indate < $2::timestamp with time zone
order by a.indate desc
limit 100
        */})
	},
	"getCollectionDetail":{
		"sql":multiline(function () {/*
select id, name, vsdescription, private as isprivate,
	case when follower is null then
		0
	else 
		follower
	end as follower,
	case when viewed is null then
		0
	else
		viewed
	end as viewed,
	case when products is null or products = '{}' then
		0
	else
		array_length(products,1)
	end as products,creator as customerid
from vs_collection 
where id = $1
        */})
	},
	"deleteCollection":{
		"sql":multiline(function () {/*
delete from vs_collection 
where id = $1 and creator = $2
        */})
	},
	"updateCollection":{
		"sql":multiline(function () {/*
update vs_collection
set name = $3,
	vsdescription = $4,
	private = $5,
	lasteditdate = DATE_TRUNC('ms', NOW())
where id  = $1 and creator =$2
        */})
	},
	"viewedCollectonPlus1":{
		"sql":multiline(function () {/*
update vs_collection
set viewed = viewed + 1,
	lasteditdate = DATE_TRUNC('ms', NOW())
where id  = $1 
        */})
	}
}