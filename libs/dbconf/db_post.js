/*------------------------------------------------------------------------------------
function: post sql
author	: lynn
data	: 2016-4-7
------------------------------------------------------------------------------------*/
var multiline = require('multiline');

module.exports = {
	"saveToAlbum":{
		"sql":multiline(function () {/*
DO $$
DECLARE
albumId int;
BEGIN
	IF NOT EXISTS(select id from vs_postAdditional where postId = $1) THEN
		insert into vs_postAdditional(postId, favorated, indate,lastEditDate) values($1, array[$2], DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW()));
	END IF;

	IF $3 = 0 THEN
		insert into vs_album(name,vsDescription,private,posts,creator,active,indate,lastEditDate)
		values($4,$5,false,array[$1],$2,true,DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW())) returning id into albumId;

		update vs_postAdditional set album = array_append(album,albumId) where postId = $1;
		IF NOT EXISTS (select id from vs_postAdditional where postId= $1 AND $2 = any(favorated)) THEN
		    UPDATE vs_postAdditional as b set favorated = array_append(favorated, $2) where postId = $1;
		END IF;
	ELSE
		IF NOT EXISTS(select id from vs_album where id = $3 and $1 = any(posts)) THEN
			update vs_album set posts = array_append(posts,cast($1 as int)) where id = $3;
		END IF;
		IF NOT EXISTS(select id from vs_postAdditional where postid = $1 and $3 = any(album)) THEN
			update vs_postAdditional set album = array_append(album,cast($3 as int)) where postId = $1;
		END IF;
		IF NOT EXISTS (select id from vs_postAdditional where postId= $1 AND $2 = any(favorated)) THEN
		    UPDATE vs_postAdditional as b set favorated = array_append(favorated, $2) where postId = $1;
		END IF;
	END IF;

END;
$$;
        */})
	},
	"removeFromAlbum":{
		"sql":multiline(function () {/*
removefromalbum
        */})
	},
	"likePost":{
		"sql": multiline(function () {/*
DO $$
DECLARE
BEGIN
	IF EXISTS(select id from vs_postAdditional where postId = $2) THEN
		IF NOT EXISTS(select id from vs_postAdditional where postid = $2 and $1 = any(liked)) THEN
			update vs_postAdditional set liked = array_append(liked,cast($1 as int)) where postId = $2;

			insert into vs_customerLiked(customerId,likedType,likedid,indate,lastEditDate)
			values($1,'post',$2,DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW()));
		ELSE
			update vs_postAdditional set liked = array_remove(liked,cast($1 as int)) where postId = $2;
			delete from vs_customerLiked where customerId = $1 and likedType = 'post' and likedid = $2;
		END IF;
	ELSE
		insert into vs_postAdditional(postId,liked,indate,lastEditDate) values($2,array[$1],DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW()));
	END IF;
END;
$$;
        */})
	},
	"homepagePosts":{
		"sql": multiline(function () {/*
			getPostsForHomepage
        */})
	},
	"postDetailPage":{
		"sql": multiline(function () {/*
			postDetailInfo
        */})
	},
	"postUpload":{
		"sql": multiline(function () {/*
select postUpload($1::int,$2::text,$3::jsonb,$4::jsonb[],$5::int[],$6::text[]);
        */})
	},
	"postUpdate":{
"sql": multiline(function () {/*
			postUpdate
        */})
	},
	"postDelete":{
"sql": multiline(function () {/*
			postDelete
        */})
	},
	"discoverDefaultHotPosts":{
		"sql": multiline(function () {/*
			discoverDefault
        */})
	},
	"discoverDefaultHotPostsViewall":{
		"sql": multiline(function () {/*
			discovertrendingviewall
        */})
	},
	"discoverDefaultNewPosts":{
		"sql": multiline(function () {/*
discoverAllPosts
        */})
	},
	"discoverSubcategory":{
		"sql": multiline(function () {/*
discoversubcategory
        */})
	},
	"searchPost":{
		"sql": multiline(function () {/*
searchpost
        */})
	}
}
