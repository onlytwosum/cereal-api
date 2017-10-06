/*------------------------------------------------------------------------------------
function: album sql
author	: lynn
data	: 2016-4-5
------------------------------------------------------------------------------------*/
var multiline = require('multiline');

module.exports = {
	"getAlbumsByCid":{
		"sql":multiline(function () {/*
select  a.id,a.name,a.vsDescription,
case when b.photos[1] is null then
	b.photos[1]
else
	$2 || b.photos[1]
end as postImage,a.indate
from vs_album as a
	inner join vs_post as b on a.posts[1]=b.id
where a.creator = $1
order by a.indate desc
limit 100
        */})
	},
	"getAlbumsByCidUp":{
		"sql":multiline(function () {/*
select  a.id,a.name,a.vsDescription,
case when b.photos[1] is null then
	b.photos[1]
else
	$3 || b.photos[1]
end as postImage,a.indate
from vs_album as a
	inner join vs_post as b on a.posts[1]=b.id
where a.creator = $1  and a.indate < $2::timestamp with time zone
order by a.indate desc
limit 100
        */})
	},
	"getAlbumsInfoById":{
		"sql":multiline(function () {/*
select id, name, vsdescription,
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
	case when posts is null or posts = '{}' then
		0
	else
		array_length(posts,1)
	end as posts,creator as customerid,
	private as isprivate
from vs_album
where id = $1
        */})
	},
	"deleteAlbumsById":{
		"sql":multiline(function () {/*
delete from vs_album
where id = $1 and creator = $2
        */})
	},
	"updateAlbumsById":{
		"sql":multiline(function () {/*
update vs_album
set name = $3,
	vsdescription = $4,
	private = $5,
	lasteditdate = DATE_TRUNC('ms', NOW())
where id  = $1 and creator =$2
        */})
	},
	"viewedAlbumPlus1":{
		"sql":multiline(function () {/*
update vs_album
set viewed = viewed + 1,
	lasteditdate = DATE_TRUNC('ms', NOW())
where id  = $1
        */})
	}
}
