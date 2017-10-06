/*------------------------------------------------------------------------------------
function: admin console api
author	: lynn
data	: 2016-6-23
------------------------------------------------------------------------------------*/
var multiline = require('multiline');

module.exports = {
	"listBanner":{
		"sql":multiline(function () {/*
select id,vsdescription,imageLink,bannerLink,priority,startDate,endDate,
   pageType,pageId,position,bannerDestination,destinationId,indate,lastEditDate
from vs_banner as a
order by lasteditdate desc
limit 20 offset 0
        */})
	},
	"showBanner":{
		"sql":multiline(function () {/*
select id,vsdescription,imageLink,bannerLink,priority,startDate,endDate,
	pageType,pageId,position,bannerDestination,destinationId,indate,lastEditDate
from vs_banner as a
where a.id =$1
        */})
	},
	"createBanner":{
		"sql":multiline(function () {/*
insert into vs_banner(vsdescription,imageLink,bannerLink,priority,startDate,endDate,
   pageType,pageId,position,bannerDestination,destinationId,indate,lastEditDate)
values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW()))
        */})
	},
	"updateBanner":{
		"sql":multiline(function () {/*
update vs_banner
set vsDescription = $2,
	imageLink = $3,
	bannerLink = $4,
	priority= $5,
	startDate = $6,
	endDate = $7,
	pageType = $8,
	pageId = $9,
	position = $10,
	bannerDestination = $11,
	destinationId = $12,
	lastEditDate = DATE_TRUNC('ms', NOW())
where id = $1
        */})
	},
	"deleteBanner":{
		"sql":multiline(function () {/*
delete from vs_banner where id = $1
        */})
	}
}