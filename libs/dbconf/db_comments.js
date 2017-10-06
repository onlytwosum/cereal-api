/*------------------------------------------------------------------------------------
function: comments sql
author	: lynn
data	: 2016-3-31
------------------------------------------------------------------------------------*/
var multiline = require('multiline');

module.exports = {
	"addComments": {
		"sql": multiline(function () {/*
insert into vs_postComments(postid,customerid,vsDescription,memo,status,type,indate,lastEditDate)
values($1::int,$2::int,$3::text,$4::text,'approve',cast($6 as vs_commentType),DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW()))
        */})
	},

	"addCommentedCustomer":{
		"sql": multiline(function () {/*
DO $$
BEGIN
	if $3 = 'post' then
		IF EXISTS(select id from vs_postAdditional where postId = $2) THEN
			IF NOT EXISTS(select id from vs_postAdditional where postid = $2 and $1 = any(commented)) THEN
				update vs_postAdditional
				set commented = array_append(commented,cast($1 as int)),
					lastEditDate = DATE_TRUNC('ms', NOW())
				where postId = $2;
			END IF;
		ELSE
			insert into vs_postAdditional(postId,commented,indate,lastEditDate) values($2,array[$1],DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW()));
		END IF;
	else  -- add product comments
		IF EXISTS(select id from vs_productAdditional where productId = $2) THEN
			IF NOT EXISTS(select id from vs_productAdditional where productId = $2 and $1 = any(commented)) THEN
				update vs_productAdditional
				set commented = array_append(commented,cast($1 as int)),
					lastEditDate = DATE_TRUNC('ms', NOW())
				where productId = $2;
			END IF;
		ELSE
			insert into vs_productAdditional(productId,commented,indate,lastEditDate) values($2,array[$1],DATE_TRUNC('ms', NOW()),DATE_TRUNC('ms', NOW()));
		END IF;
	end if;
END;
$$;
        */})
	},

	"delComments": {
		"sql": multiline(function () {/*
delete from vs_postComments
where id = $1 and type = cast($2 as vs_commentType)
        */})
	},
	"delCommentedCusotmer":{
		"sql": multiline(function () {/*
DO $$
DECLARE
BEGIN
		if $3 = 'post' then
			update vs_postAdditional
			set commented = array_remove(commented,cast($1 as int)),
				lastEditDate = DATE_TRUNC('ms', NOW())
			where postId = $2;
		else
			update vs_productAdditional
			set commented = array_remove(commented,cast($1 as int)),
				lastEditDate = DATE_TRUNC('ms', NOW())
			where productId = $2;
		end if;
END;
$$;
        */})
	},

	"getCommentsByPid": {
		"sql": multiline(function () {/*
select a.id as commentid,a.vsDescription as commentdesc,a.indate,b.id as cusotmerId,b.nickName as customername,
customerIcon(b.icon,$2) as customericon
from vs_postcomments as a
	inner join vs_customer as b
	on a.customerId = b.id
where a.postId = $1 and a.status='approve' and a.type = cast($3 as vs_commentType)
order by a.indate DESC
limit 20
        */})
	},
	"getCommentsByPidUp": {
		"sql": multiline(function () {/*
select a.id as commentid,a.vsDescription as commentdesc,a.indate,b.id as cusotmerId,b.nickName as customername,
customerIcon(b.icon,$3) as customericon
from vs_postcomments as a
	inner join vs_customer as b
	on a.customerId = b.id
where a.postId = $1 and a.status='approve' and a.indate < $2::timestamp with time zone and a.type = cast($4 as vs_commentType)
order by a.indate DESC
limit 20
        */})
	},
	"getCommentsByPidDown": {
		"sql": multiline(function () {/*
select a.id as commentid,a.vsDescription as commentdesc,a.indate,b.id as cusotmerId,b.nickName as customername,
customerIcon(b.icon,$3) as customericon
from vs_postcomments as a
	inner join vs_customer as b
	on a.customerId = b.id
where a.postId = $1 and a.status='approve' and a.indate > $2::timestamp with time zone and a.type = cast($4 as vs_commentType)
order by a.indate DESC
limit 20
        */})
	}

}
