(function(){var d={am_pm:["AM","PM"],day_name:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),day_short:"Sun Mon Tue Wed Thu Fri Sat".split(" "),era:["BC","AD"],era_name:["Before Christ","Anno Domini"],month_name:"January February March April May June July August September October November December".split(" "),month_short:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),order_full:"DMY",order_long:"DMY",order_medium:"DMY",order_short:"DMY"},e={decimal_separator:".",
grouping_separator:",",minus:"-"},f={SHORT_PADDED_CENTURY:function(a){if(a)return(a.getDate()+101+"").substring(1)+"/"+(a.getMonth()+101+"").substring(1)+"/"+a.getFullYear()},SHORT:function(a){if(a)return(a.getDate()+101+"").substring(1)+"/"+(a.getMonth()+101+"").substring(1)+"/"+(a.getFullYear()+"").substring(2)},SHORT_NOYEAR:function(a){if(a)return(a.getDate()+101+"").substring(1)+"/"+(a.getMonth()+101+"").substring(1)},SHORT_NODAY:function(a){if(a)return(a.getMonth()+101+"").substring(1)+"/"+(a.getFullYear()+
"").substring(2)},MEDIUM:function(a){if(a)return(a.getDate()+101+"").substring(1)+"-"+d.month_short[a.getMonth()]+"-"+a.getFullYear()},MEDIUM_NOYEAR:function(a){if(a)return(a.getDate()+101+"").substring(1)+"-"+d.month_short[a.getMonth()]},MEDIUM_WEEKDAY_NOYEAR:function(a){if(a)return d.day_short[a.getDay()]+" "+(a.getDate()+101+"").substring(1)+"-"+d.month_short[a.getMonth()]},LONG_NODAY:function(a){if(a)return d.month_name[a.getMonth()]+" "+a.getFullYear()},LONG:function(a){if(a)return(a.getDate()+
101+"").substring(1)+" "+d.month_name[a.getMonth()]+" "+a.getFullYear()},FULL:function(a){if(a)return d.day_name[a.getDay()]+", "+a.getDate()+" "+d.month_name[a.getMonth()]+" "+a.getFullYear()}};window.icu=window.icu||{};var c=window.icu;c.getCountry=function(){return"GB"};c.getCountryName=function(){return"United Kingdom"};c.getDateFormat=function(a){var b={};b.format=f[a];return b};c.getDateFormats=function(){return f};c.getDateFormatSymbols=function(){return d};c.getDecimalFormat=function(a){return{format:function(b){var c=
(0>b?Math.abs(b).toFixed(a):b.toFixed(a)).split(".");s=c[0];for(var c=c[1],d=/(\d+)(\d{3})/;d.test(s);)s=s.replace(d,"$1"+e.grouping_separator+"$2");return(0>b?e.minus:"")+s+e.decimal_separator+c}}};c.getDecimalFormatSymbols=function(){return e};c.getIntegerFormat=function(){return{format:function(a){for(var b=0>a?Math.abs(a).toString():a.toString(),c=/(\d+)(\d{3})/;c.test(b);)b=b.replace(c,"$1"+e.grouping_separator+"$2");return 0>a?e.minus+b:b}}};c.getLanguage=function(){return"en"};c.getLanguageName=
function(){return"English"};c.getLocale=function(){return"en-GB"};c.getLocaleName=function(){return"English (United Kingdom)"}})();(function(){var d=function(a){var b;b=a;if(null!=c&&null!=b)if(0==b in c)b=null!=f?f(b):b;else{var d=c[b];b=null==d?b:d}"function"==typeof b?b=b.apply(this,arguments):1<arguments.length&&(d=Array.prototype.slice.call(arguments,1),b=e(b,d));return b};d.translate=d;var e=function(){var a=/\{([^}]+)\}/g;return function(b,c){return b.replace(a,function(a,b){return c[b]})}}();d.setFormatter=function(a){e=a};d.format=function(){var a=arguments[0],b=Array.prototype.slice.call(arguments,1);return e(a,b)};
var f=null;d.setDynamicTranslator=function(a){f=a};var c=null;d.setTranslation=function(a){c=a};d.extendTranslation=function(a){c=$.extend(c,a)};window._=d})();
