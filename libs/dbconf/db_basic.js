/*------------------------------------------------------------------------------------
function: basic sql
author	: lynn
data	: 2016-4-15
------------------------------------------------------------------------------------*/
var multiline = require('multiline');

module.exports = {
	"countryList":{
		"sql":multiline(function () {/*
select id, name, currency
from vs_country as a,plainto_tsquery($1) AS q
where (tsv @@ q)
order by ts_rank_cd(a.tsv, plainto_tsquery($1)) DESC
limit 5;
        */})
	},
  "appVersion": {
    "sql": multiline(function() {/*
select version, url
from vs_appVersion;
    */})
  },
	"allCountry":{
		"sql":multiline(function () {/*
select id, name, currency
from vs_country
order by name;
        */})
	},
	"brandList":{
		"sql":multiline(function () {/*
brandkeywordsearch
        */})
	},
	"storeList":{
		"sql":multiline(function () {/*
select id, name
from vs_store as a,to_tsquery($1||':*') AS q
where (tsv @@ q)
order by ts_rank_cd(a.tsv, to_tsquery($1||':*')) DESC
limit 5;
        */})
	},
	"hotTopics":{
		"sql":multiline(function () {/*
hotTopics1
        */})
	},
	"topicsList":{
		"sql":multiline(function () {/*
topicskeywordsearch
        */})
	},
	"trendingBasicInfo":{
		"sql":multiline(function () {/*
discovertrendingbasicinfo
        */})
	},
	"searchTopic":{
		"sql":multiline(function () {/*
searchtopic
        */})
	},
	"getPageBanner":{
		"sql":multiline(function () {/*
getpagebanner
        */})
	},
	"hotBrands":{
		"sql":multiline(function () {/*
hotbrands1
        */})
	},
	"hotSubcategory":{
		"sql":multiline(function () {/*
hotsubcategroy1
        */})
	},
	"subcategroyList":{
		"sql":multiline(function () {/*
subcategorykeywordsearch
        */})
	},
	"getCategroyInfo":{
		"sql":multiline(function () {/*
select id,name,type
from vs_productCategory as a
where a.id = $1 and a.type =$2
        */})
	},
	"getBrandInfo":{
		"sql":multiline(function () {/*
select id, name
from vs_brand
where id = $1
        */})
	},
	"getTopicsInfo":{
		"sql":multiline(function () {/*
select id, name
from vs_topics
where id = $1
        */})
	}
}
