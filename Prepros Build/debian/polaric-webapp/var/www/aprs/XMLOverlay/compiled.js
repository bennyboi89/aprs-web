var labelStyle=null;function init_labelStyle(a,c){labelStyle=new LabelStyle(a,c)}function LabelStyle(a,c){this.currentIndex=0;this.start=5;this.styles="40% 50% 60% 70% 80% 90% 100% 110% 120% 130% 140% 150%".split(" ");this.uid=c;this.storage=a;var b=parseInt(a[c+".labelStyle"]);b&&(this.currentIndex=b)}LabelStyle.prototype.setFontForClass=function(a,c){for(var b=getElementsByClassName(document,c),d=0;d<b.length;d++)b[d].style.fontSize=this.styles[a]};
LabelStyle.prototype.setFont=function(){this.storage[this.uid+".labelStyle"]=this.currentIndex;var a=this.currentIndex+this.start;this.setFontForClass(a,"lstill");this.setFontForClass(a,"lobject");this.setFontForClass(a,"lmoving")};LabelStyle.prototype.next=function(){this.currentIndex<this.styles.length-this.start-1&&(this.currentIndex++,this.setFont())};LabelStyle.prototype.previous=function(){this.currentIndex>0-this.start&&(this.currentIndex--,this.setFont())};
LabelStyle.prototype.getFontSize=function(){return this.styles[this.currentIndex+this.start]};function getElementsByClassName(a,c){if(a.getElementsByClassName)return a.getElementsByClassName(c);var b=a;null==b&&(b=document);var d=[],b=b.getElementsByTagName("*"),e=b.length,g=new RegExp("(^|\\s)"+c+"(\\s|$)"),f,h;for(h=f=0;f<e;f++)g.test(b[f].className)&&(d[h]=b[f],h++);return d};var ovrLastEventId=0,XMLOVERLAY_LOAD=ovrLastEventId++,XMLOVERLAY_ERROR=ovrLastEventId++,zzindex,_sstorage=null;function setSesStorage(a){_sstorage=a}function toggleTracked(a){var c=_sstorage["polaric.tracked"];null!=c&&clearTracking(c);a==c?_sstorage["polaric.tracked"]=null:(_sstorage["polaric.tracked"]=a,setTracking(a))}function setTracking(a){x=document.getElementById(a+"_label_txt");null!=x&&(_sstorage["polaric.trackedOrigStyle"]=x.className,x.className+=" tracked")}
function clearTracking(a){x=document.getElementById(a+"_label_txt");null!=x&&(x.className=_sstorage["polaric.trackedOrigStyle"])}function isTracked(a){return a==_sstorage["polaric.tracked"]}function hidePointLabel(a){_sstorage["polaric.hidelabel."+a]="T";a=document.getElementById(a+"_label_txt");null!=a&&(a.style.visibility="hidden")}function showPointLabel(a){_sstorage["polaric.hidelabel."+a]=null;a=document.getElementById(a+"_label_txt");null!=a&&(a.style.visibility="visible")}
function labelIsHidden(a){return"T"==_sstorage["polaric.hidelabel."+a]}function hasTrace(a){return null!=document.getElementById(a+"_trace")}
kaXmlOverlay.prototype._setPointTrace=function(a,c){function b(a,b){var c=document.getElementById(a+"_trace");null!=c&&(c.style.visibility=b?"hidden":"visible")}if("ALL"==a)for(var d=0;d<this.ovrObjects.length;d++)null!=this.ovrObjects[d]&&b(this.ovrObjects[d].pid,c);else{if("T"==_sstorage["polaric.hidetrace.ALL"])return;b(a,c)}_sstorage["polaric.hidetrace."+a]=c?"T":null};kaXmlOverlay.prototype.hidePointTrace=function(a){this._setPointTrace(a,!0)};
kaXmlOverlay.prototype.showPointTrace=function(a){this._setPointTrace(a,!1)};function traceIsHidden(a){return"T"==_sstorage["polaric.hidetrace."+a]}kaXmlOverlay.prototype.registerForEvent=function(a,c,b){return this.eventManager.registerForEvent(a,c,b)};kaXmlOverlay.prototype.deregisterForEvent=function(a,c,b){return this.eventManager.deregisterForEvent(a,c,b)};kaXmlOverlay.prototype.triggerEvent=function(a){return this.eventManager.triggerEvent.apply(this.eventManager,arguments)};
function kaXmlOverlay(a,c){kaTool.apply(this,[a]);this.name="kaXmlOverlay";this.postLoadXml=null;this.meta=[];this.seq=-1;for(var b in kaTool.prototype)kaXmlOverlay.prototype[b]||(kaXmlOverlay.prototype[b]=kaTool.prototype[b]);this.urlBase=this.kaMap.server;this.urlBase+=""!=this.urlBase&&"/"!=this.urlBase.substring(-1)?"":"/";this.ovrObjects=[];zzindex=this.z_index=c;this.overlayCanvas=this.kaMap.createDrawingCanvas(c,!0);this.kaMap.registerForEvent(KAMAP_SCALE_CHANGED,this,this.scaleChanged);this.eventManager=
new _eventManager;for(b=0;b<gnLastEventId;b++)this.eventManager.registerEventID(b)}kaXmlOverlay.prototype.scaleChanged=function(a,c){if(null!=this.ovrObjects)for(var b=0;b<this.ovrObjects.length;b++)this.ovrObjects[b]&&this.ovrObjects[b].rescale()};kaXmlOverlay.prototype.remove=function(){this.kaMap.deregisterForEvent(KAMAP_SCALE_CHANGED,this,this.scaleChanged);this.removePoint();this.kaMap.removeDrawingCanvas(this.overlayCanvas)};
kaXmlOverlay.prototype.loadXml=function(a){return call(a,this,function(a){this.applyXml(a)},!0)};kaXmlOverlay.prototype.applyXml=function(a){null==a?this.triggerEvent(XMLOVERLAY_ERROR):this.loadXmlDoc(a)&&this.triggerEvent(XMLOVERLAY_LOAD)};
"undefined"==typeof DOMParser&&(DOMParser=function(){},DOMParser.prototype.parseFromString=function(a,c){if("undefined"!=typeof ActiveXObject){var b=new ActiveXObject("MSXML.DomDocument");b.loadXML(a);return b}if("undefined"!=typeof XMLHttpRequest)return b=new XMLHttpRequest,b.open("GET","data:"+(c||"application/xml")+";charset=utf-8,"+encodeURIComponent(a),!1),b.overrideMimeType&&b.overrideMimeType(c),b.send(null),b.responseXML});var lastOvrSeq=0;
kaXmlOverlay.prototype.loadXmlDoc=function(a){if(10>a.length)return!1;a=(new DOMParser).parseFromString(a,"text/xml").documentElement;var c=a.getAttribute("cancel"),b=a.getAttribute("reboot");if(b&&"true"==b)return setTimeout(function(){window.location.reload()},25E3),!1;if(c&&"true"==c)return!1;if(c=a.getAttribute("seq")){c=parseInt(c);if(0<c&&c<=lastOvrSeq)return!1;this.seq=c;0<=c&&(lastOvrSeq=c)}if((c=a.getAttribute("view"))&&c!=filterProfiles.selectedProf())return OpenLayers.Console.info("LOAD XML: View name mismatch -> IGNORE"),
!1;b=a.getElementsByTagName("meta");for(c=0;c<b.length;c++){var d=b[c].getAttribute("name");if(d){var e=b[c].getAttribute("value");e&&(this.meta[d]=e)}}b=a.getElementsByTagName("delete");for(c=0;c<b.length;c++)(d=b[c].getAttribute("id"))?this.removePoint(d):this.removePoint();b=!1;a=a.getElementsByTagName("point");for(c=0;c<a.length;c++)if(d=a[c].getAttribute("id"))b=d,d=this.getPointObject(b),null==d&&(d=new kaXmlPoint(b,this),this.ovrObjects.push(d)),d.parse(a[c]),b=!0;b&&this.kaMap.updateObjects();
return!0};kaXmlOverlay.prototype.getDiv=function(a){a=this.getDivId(a);return getRawObject(a)};kaXmlOverlay.prototype.getPointObject=function(a){for(var c=0;c<this.ovrObjects.length;c++)if(null!=this.ovrObjects[c]&&this.ovrObjects[c].pid==a)return this.ovrObjects[c];return null};kaXmlOverlay.prototype.addNewPoint=function(a,c,b){this.removePoint(a);a=new kaXmlPoint(a,this);a.placeOnMap(c,b);this.ovrObjects.push(a);return a};kaXmlOverlay.prototype.getDivId=function(a){return"xmlovr_"+a+"_div"};
kaXmlOverlay.prototype.removePointExcept=function(a){for(var c=null==a?null:new RegExp(a),b=this.ovrObjects.length;0<b--;)null!=this.ovrObjects[b]?null!=a&&c.test(this.ovrObjects[b].pid)||(this.ovrObjects[b].removeFromMap(),delete this.ovrObjects[b],this.ovrObjects[b]=null):this.ovrObjects.splice(b,1)};
kaXmlOverlay.prototype.removePoint=function(a){if(1>this.removePoint.arguments.length||null==a)this.removePointExcept();else{a=new RegExp(a);for(var c=this.ovrObjects.length;0<c--;)null!=this.ovrObjects[c]?a.test(this.ovrObjects[c].pid)&&(this.ovrObjects[c].removeFromMap(),delete this.ovrObjects[c],this.ovrObjects[c]=null,this.ovrObjects.splice(c,1)):this.ovrObjects.splice(c,1)}};
kaXmlOverlay.prototype.removePointGeo=function(a,c,b,d){for(var e=this.ovrObjects.length;0<e--;){var g=this.ovrObjects[e];if(null!=g){if(g.geox<a||g.geoy<c||g.geox>b||g.geoy>d)g.removeFromMap(),delete g,this.ovrObjects[e]=null,this.ovrObjects.splice(e,1)}else this.ovrObjects.splice(e,1)}};function kaXmlGraphicElement(){}kaXmlGraphicElement.prototype.parseElement=function(a,c){};kaXmlGraphicElement.prototype.draw=function(a){};kaXmlGraphicElement.prototype.rescale=function(a){};
kaXmlGraphicElement.prototype.remove=function(a){};var _BrowserIdent_browser=null,_BrowserIdent_version=null,_BrowserIdent_place=0,_BrowserIdent_thestring=null,_BrowserIdent_detect=null,_BrowserIdent_isIE=!1;
function _BrowserIdent(){_BrowserIdent_detect=navigator.userAgent.toLowerCase();_BrowserIdent_checkIt("konqueror")?_BrowserIdent_browser="Konqueror":_BrowserIdent_checkIt("safari")?_BrowserIdent_browser="Safari":_BrowserIdent_checkIt("omniweb")?_BrowserIdent_browser="OmniWeb":_BrowserIdent_checkIt("opera")?_BrowserIdent_browser="Opera":_BrowserIdent_checkIt("msie")?_BrowserIdent_browser="Internet Explorer":_BrowserIdent_checkIt("firefox")?_BrowserIdent_browser="Firefox":_BrowserIdent_checkIt("iceweasel")?
_BrowserIdent_browser="Firefox":_BrowserIdent_checkIt("trident")?_BrowserIdent_browser="Newer IE":_BrowserIdent_checkIt("compatible")?_BrowserIdent_browser="An unknown browser":(_BrowserIdent_browser="Netscape Navigator",_BrowserIdent_version=_BrowserIdent_detect.charAt(8));_BrowserIdent_version||(_BrowserIdent_version=_BrowserIdent_detect.charAt(_BrowserIdent_place+_BrowserIdent_thestring.length));_BrowserIdent_isMSIE()&&9>=safeParseInt(_BrowserIdent_version)&&1!=safeParseInt(_BrowserIdent_version)&&
alert(_("Sorry: We do not support IE version 9 or older. Recommend upgrade of browser."))}function _BrowserIdent_isMSIE(){return"Internet Explorer"==_BrowserIdent_browser}function _BrowserIdent_isOpera(){return"Opera"==_BrowserIdent_browser}function _BrowserIdent_checkIt(a){_BrowserIdent_place=_BrowserIdent_detect.indexOf(a)+1;_BrowserIdent_thestring=a;return _BrowserIdent_place}
function _BrowserIdent_setOpacity(a,c){if(void 0==c||1<=c)return"";if("Netscape Navigator"==_BrowserIdent_browser)a.style.MozOpacity=c;else if("Internet Explorer"==_BrowserIdent_browser&&4<=parseInt(this.version)){var b=a.style.cssText;a.style.cssText="filter: alpha(opacity="+100*c+");"+b}else b=a.style.cssText,a.style.cssText="opacity: "+c+";"+b}function _BrowserIdent_getPreferredImageType(){return"Internet Explorer"==_BrowserIdent_browser?"G":"P"}
function _BrowserIdent_getPreferredOpacity(){return"client"}var xmlOverlayUseCanvas=!0;function _BrowserIdent_hasCanvasSupport(){return xmlOverlayUseCanvas?!0:!1}function _BrowserIdent_newCanvas(a){var c=document.createElement("canvas");a.appendChild(c);"undefined"!=typeof G_vmlCanvasManager&&(c=G_vmlCanvasManager.initElement(c));return c}function _BrowserIdent_getCanvasContext(a){return _BrowserIdent_hasCanvasSupport()?a.getContext("2d"):null}
function _BrowserIdent_setCanvasHW(a,c,b){a.width=b;a.height=c}_BrowserIdent();function kaXmlSymbol(){kaXmlGraphicElement.apply(this);_BrowserIdent_hasCanvasSupport()&&(kaXmlSymbol.prototype.draw=kaXmlSymbol.prototype.draw_canvas);for(var a in kaXmlGraphicElement.prototype)kaXmlSymbol.prototype[a]||(kaXmlSymbol.prototype[a]=kaXmlGraphicElement.prototype[a]);this.shape="bullet";this.size=10;this.stroke=1;this.bcolor=this.color=null;this.opacity=1;this.ldiv=this.canvas=null}kaXmlSymbol.prototype.remove=function(a){this.ldiv=this.canvas=null};
kaXmlSymbol.prototype.parseElement=function(a,c){this.shape=c.getAttribute("shape");this.size=parseInt(c.getAttribute("size"));var b=c.getAttribute("color");null!=b&&(this.color=b);b=c.getAttribute("bcolor");null!=b&&(this.bcolor=b);b=parseFloat(c.getAttribute("opacity"));isNaN(b)||(this.opacity=b);b=parseInt(c.getAttribute("stroke"));isNaN(b)||(this.stroke=b)};
kaXmlSymbol.prototype.draw_canvas=function(a){var c=Math.floor((this.size+this.stroke)/2);null==this.canvas&&(this.ldiv=document.createElement("div"),this.ldiv.style.position="absolute",this.ldiv.style.left=-c+"px",this.ldiv.style.top=-c+"px",a.div.appendChild(this.ldiv),this.canvas=_BrowserIdent_newCanvas(this.ldiv),_BrowserIdent_setCanvasHW(this.canvas,2*c,2*c));a=_BrowserIdent_getCanvasContext(this.canvas);a.save();a.translate(c,c);a.globalAlpha=this.opacity;a.lineWidth=this.stroke;this.bcolor&&
(a.strokeStyle=this.bcolor);this.color&&(a.fillStyle=this.color);"square"==this.shape?(this.color&&a.fillRect(-this.size/2,-this.size/2,this.size,this.size),this.bcolor&&a.strokeRect(-this.size/2,-this.size/2,this.size,this.size)):(a.beginPath(),a.arc(0,0,this.size/2,0,2*Math.PI,!1),this.color&&a.fill(),this.bcolor&&a.stroke());a.restore()};function kaXmlFeature(a){kaXmlGraphicElement.apply(this);for(var c in kaXmlGraphicElement.prototype)kaXmlFeature.prototype[c]||(kaXmlFeature.prototype[c]=kaXmlGraphicElement.prototype[c]);this.stroke=1;this.bcolor=this.color2=this.color=null;this.opacity=1;this.cxmax=this.cymin=this.cymax=this.cxmin=0;this.coords="";this.yn=this.xn=this.ldiv=this.canvas=this.img=null;this.maxScale=a.xml_overlay.kaMap.getMaxScale();this.mcs=a.xml_overlay.kaMap.getResolution()/(a.xml_overlay.kaMap.getCurrentScale()/
this.maxScale)}kaXmlFeature.prototype.remove=function(a){this.coords=this.ldiv=this.canvas=this.img=null;this.xn.splice(0);this.yn.splice(0)};
kaXmlFeature.prototype.parseElement=function(a,c){var b;b=parseInt(c.getAttribute("stroke"));isNaN(b)||(this.stroke=b);b=c.getAttribute("color");null!=b&&(this.color=b);b=c.getAttribute("color2");null!=b&&(this.color2=b);b=c.getAttribute("bcolor");null!=b&&(this.bcolor=b);b=parseFloat(c.getAttribute("opacity"));isNaN(b)||(this.opacity=b);b="";null!=c.firstChild&&(b=c.firstChild.data,this.readCoordinates(a,b))};
kaXmlFeature.prototype.readCoordinates=function(a,c){var b=[],d=[];this.tn=[];var e=c.split(","),g;for(g=0;g<e.length;g++){var f=e[g].match(/[-\+\d\.]+/g);if(null!=f){var h=parseFloat(f[0]),k=parseFloat(f[1]);b.push(h);d.push(k);this.tn.push(f[2])}}this.setCoordinates(a,b,d)};
kaXmlFeature.prototype.setCoordinates=function(a,c,b){this.cxmax=this.cymin=this.cymax=this.cxmin=0;this.coords="";var d;for(d=0;d<c.length;d++){var e=c[d],g=b[d],e=a.xml_overlay.kaMap.geoToPix(e,g);if(0==d||e[0]<this.cxmin)this.cxmin=e[0];if(0==d||e[1]>this.cymax)this.cymax=e[1];if(0==d||e[1]<this.cymin)this.cymin=e[1];if(0==d||e[0]>this.cxmax)this.cxmax=e[0];c[d]=e[0];b[d]=e[1]}this.xn=[];this.yn=[];for(d=0;d<c.length;d++)e=c[d]-this.cxmin,g=b[d]-this.cymin,0<d&&(this.coords+=", "),this.coords+=
"("+Math.round(e)+","+Math.round(g)+")",this.xn.push(e),this.yn.push(g)};kaXmlFeature.prototype.rescale=function(a){};function kaXmlLinestring(a){kaXmlFeature.apply(this,[a]);_BrowserIdent_hasCanvasSupport()?kaXmlLinestring.prototype.draw=kaXmlLinestring.prototype.draw_canvas:kaXmlLinestring.prototype.draw=function(){};for(var c in kaXmlFeature.prototype)kaXmlLinestring.prototype[c]||(kaXmlLinestring.prototype[c]=kaXmlFeature.prototype[c])}
kaXmlLinestring.prototype.draw_canvas=function(a){function c(a){return a?a.substring(8,10)+":"+a.substring(10,12):""}if(null==a||null==this.xn)OpenLayers.Console.warn("kaXmlLinestring: point/coordinate is null",a,this);else{var b=this.cxmin,d=this.cymin,e=this.cxmax,g=this.cymax;xy=a.xml_overlay.kaMap.geoToPix(a.div.lon,a.div.lat);var f=xy[0],h=xy[1],e=e-b+10,g=g-d+10;if(!(25>=e&&25>=g)){if(null==this.canvas){this.ldiv=document.createElement("div");this.ldiv.setAttribute("id",a.pid+"_trace");this.ldiv.style.position=
"absolute";if("T"==_sstorage["polaric.hidetrace."+a.pid]||"T"==_sstorage["polaric.hidetrace.ALL"])this.ldiv.style.visibility="hidden";a.div.appendChild(this.ldiv);this.canvas=_BrowserIdent_newCanvas(this.ldiv)}this.ldiv.style.left=b-f-5+"px";this.ldiv.style.top=d-h-5+"px";_BrowserIdent_setCanvasHW(this.canvas,g,e);b=_BrowserIdent_getCanvasContext(this.canvas);b.save();b.clearRect(0,0,e,g);b.translate(5,5);b.strokeStyle="#"+this.color;b.globalAlpha=this.opacity;b.lineWidth=this.stroke;b.beginPath();
b.moveTo(this.xn[0],this.yn[0]);for(d=1;d<this.xn.length;d++)b.lineTo(this.xn[d],this.yn[d]);b.stroke();b.strokeStyle="#"+this.color2;b.beginPath();for(d=1;d<this.xn.length;d++)b.moveTo(this.xn[d],this.yn[d]),b.arc(this.xn[d],this.yn[d],1,0,2*Math.PI,!1),f=document.createElement("div"),f._time=this.tn[d],f.style.position="absolute",f.title=a.pid+" "+c(this.tn[d]),f.className="trailPoint",this.ldiv.appendChild(f),f.style.left=this.xn[d]-4+"px",f.style.top=this.yn[d]-4+"px",f.style.width=f.style.height=
"14px",f.style.zIndex="1190",f._index=d,f._time=this.tn[d],f.setAttribute("id",a.pid+"_"+d+"_trail"),f.onclick=function(b){return myTrailClicked(a.pid,b)};b.stroke();b.restore()}}};kaXmlLinestring.prototype.rescale=function(a){this.draw(a)};
function kaXmlPointCloud(a){kaXmlFeature.apply(this,[a]);_BrowserIdent_hasCanvasSupport()?kaXmlPointCloud.prototype.draw=kaXmlPointCloud.prototype.draw_canvas:kaXmlPointCloud.prototype.draw=function(){};for(var c in kaXmlFeature.prototype)kaXmlPointCloud.prototype[c]||(kaXmlPointCloud.prototype[c]=kaXmlFeature.prototype[c])}
kaXmlPointCloud.prototype.draw_canvas=function(a){if(null==a||null==this.xn)OpenLayers.Console.warn("kaXmlPointCloud: point/coordinate is null",a,this);else{var c=this.cxmin,b=this.cymin,d=this.cxmax,e=this.cymax;xy=a.xml_overlay.kaMap.geoToPix(a.div.lon,a.div.lat);var g=xy[0],f=xy[1],d=d-c+10,e=e-b+10;if(!(25>=d&&25>=e)){null==this.canvas&&(this.ldiv=document.createElement("div"),this.ldiv.setAttribute("id",a.pid+"_trace"),this.ldiv.style.position="absolute",a.div.appendChild(this.ldiv),this.canvas=
_BrowserIdent_newCanvas(this.ldiv));this.ldiv.style.left=c-g-5+"px";this.ldiv.style.top=b-f-5+"px";_BrowserIdent_setCanvasHW(this.canvas,e,d);a=_BrowserIdent_getCanvasContext(this.canvas);a.save();a.clearRect(0,0,d,e);a.translate(5,5);a.strokeStyle="#"+this.color;a.fillStyle="#"+this.color2;a.globalAlpha=this.opacity;for(c=1;c<this.xn.length;c++)a.beginPath(),a.arc(this.xn[c],this.yn[c],4,0,4*Math.PI,!0),a.fill();a.restore()}}};kaXmlPointCloud.prototype.rescale=function(a){this.draw(a)};function kaXmlIcon(){kaXmlGraphicElement.apply(this);kaXmlIcon.prototype.draw=kaXmlIcon.prototype.draw_plain;for(var a in kaXmlGraphicElement.prototype)kaXmlIcon.prototype[a]||(kaXmlIcon.prototype[a]=kaXmlGraphicElement.prototype[a]);this.icon_src=null;this.rot=this.yoff=this.xoff=this.icon_h=this.icon_w=0;this.img=this.ldiv=null}kaXmlIcon.prototype.setImage=function(a,c,b,d){this.icon_src=c;this.icon_w=b;this.icon_h=d};
kaXmlIcon.prototype.remove=function(a){this.ldiv=null;this.img&&(this.img.onload=null);this.img=null};kaXmlIcon.prototype.parseElement=function(a,c){this.setImage(a,c.getAttribute("src"),c.getAttribute("w"),c.getAttribute("h"));var b;b=parseInt(c.getAttribute("px"));isNaN(b)||(this.xoff=b);b=parseInt(c.getAttribute("py"));isNaN(b)||(this.yoff=b);b=parseInt(c.getAttribute("rot"));isNaN(b)||(this.rot=b)};kaXmlIcon.prototype.setClass=function(a){this.ldiv.className=a};
kaXmlIcon.prototype.draw_plain=function(a){a=-this.icon_w/2+this.xoff;var c=-this.icon_h/2+this.yoff;this.ldiv=document.createElement("div");this.ldiv.style.position="absolute";this.ldiv.style.top=c+"px";this.ldiv.style.left=a+"px";this.ldiv.className="icon";this.img=document.createElement("img");this.img.src=this.icon_src;this.img.width=this.icon_w;this.img.height=this.icon_h;this.ldiv.appendChild(this.img)};function kaXmlLabel(){kaXmlGraphicElement.apply(this);for(var a in kaXmlGraphicElement.prototype)kaXmlLabel.prototype[a]||(kaXmlLabel.prototype[a]=kaXmlGraphicElement.prototype[a]);this.text="";this.color="black";this.boxcolor=null;this.w=64;this.h=24;this.yoff=this.xoff=0;this.fsize="10px";this.font="Arial";this.ltxt=this.ldiv=null;this.flash=!1;this.classn=null}kaXmlLabel.prototype.remove=function(a){this.ltxt=this.ldiv=this.canvas=null};
kaXmlLabel.prototype.parseElement=function(a,c){null!=c.firstChild&&(this.text=c.firstChild.data);var b;b=c.getAttribute("color");null!=b&&(this.color=b);this.boxcolor=c.getAttribute("boxcolor");b=parseInt(c.getAttribute("w"));isNaN(b)||(this.w=b);b=parseInt(c.getAttribute("h"));isNaN(b)||(this.h=b);b=parseInt(c.getAttribute("px"));isNaN(b)||(this.xoff=b);b=parseInt(c.getAttribute("py"));isNaN(b)||(this.yoff=b);b=c.getAttribute("fsize");null!=b&&(this.fsize=b);b=c.getAttribute("font");null!=b&&(this.font=
b);b=c.getAttribute("flash");null!=b&&(this.flash=b);b=c.getAttribute("style");null!=b&&(this.classn=b)};
kaXmlLabel.prototype.draw=function(a){a=this.xoff;var c=this.yoff;this.ldiv=document.createElement("div");null!=this.classn?this.ldiv.className=this.classn:(this.ldiv.style.fontFamily=this.font,this.ldiv.style.fontWeight="bold",this.ldiv.style.fontSize=this.fsize,this.ldiv.style.textAlign="center",this.ldiv.style.color=this.color,this.ldiv.style.left=a+"px",this.ldiv.style.top=c+"px",this.ldiv.style.paddingTop="1px",this.ldiv.style.paddingBottom="1px",this.ldiv.style.border="outset 1px",this.ldiv.style.position=
"absolute",this.ldiv.style.lineHeight="1.1em",this.flash&&(this.ldiv.style.textDecoration="blink",this.ldiv.style.border="solid 3px red"),null!=this.boxcolor&&(this.ldiv.style.backgroundColor=this.boxcolor),this.ldiv.style.whiteSpace="nowrap");this.ldiv.style.width="auto";this.ldiv.style.height="auto";this.ltxt=document.createTextNode(this.text);this.ldiv.appendChild(this.ltxt)};kaXmlLabel.prototype.rescale=function(a){};function kaXmlPoint(a,c){this.xml_overlay=c;this.pid=a;this.title=this.href=this.flags="";this.geoy=this.geox=0;this.isSign=this.own=this.hasTrace=this.shown=!1;this.thandler=new touchHandler;this.divId=this.xml_overlay.getDivId(a);this.graphics=[];this.div=document.createElement("div");this.div.setAttribute("id",this.divId)}kaXmlPoint.prototype.flash=function(){var a=this.div;a.classList.add("_FLASH_");setTimeout(function(){a.classList.remove("_FLASH_")},15E3)};
kaXmlPoint.prototype.placeOnMap=function(a,c){this.shown||(this.geox=a,this.geoy=c,this.showOnMap())};kaXmlPoint.prototype.showOnMap=function(){this.shown||(this.xml_overlay.kaMap.addObjectGeo(this.xml_overlay.overlayCanvas,this.geox,this.geoy,this.div),this.shown=!0)};
kaXmlPoint.prototype.removeFromMap=function(){this.shown&&(this.xml_overlay.kaMap.removeObject(this.div),this.shown=!1);var a;for(a=0;a<this.graphics.length;a++)this.graphics[a].remove(this);this.graphics.splice(0);this.xml_overlay=this.div=null};kaXmlPoint.prototype.setPosition=function(a,c){this.shown&&(this.geox=a,this.geoy=c,this.div.lat=c,this.div.lon=a)};kaXmlPoint.prototype.addGraphic=function(a){this.graphics.push(a);a.draw(this)};
kaXmlPoint.prototype.clear=function(){this.div.innerHTML="";this.graphics.length=0};kaXmlPoint.prototype.setInnerHtml=function(a){this.clear();this.div.innerHTML=a};kaXmlPoint.prototype.moveToFront=function(a){this.div.style.zIndex=zzindex+2E5};var tstate=null;
kaXmlPoint.prototype.parse=function(a){var c=this,b;b=parseFloat(a.getAttribute("x"));var d=parseFloat(a.getAttribute("y"));this.href=a.getAttribute("href");this.title=a.getAttribute("title");this.flags=a.getAttribute("flags");this.isSign="__"==this.pid.substr(0,2);var e=!1,g=!1;"true"==a.getAttribute("redraw")&&(e=!0);"true"==a.getAttribute("own")&&(this.own=!0);g=null!=_sstorage["polaric.tracked"]&&this.pid==_sstorage["polaric.tracked"];this.shown?(e&&this.clear(),this.setPosition(b,d),g&&this.xml_overlay.kaMap.zoomToGeo(b,
d,.2)):(this.placeOnMap(b,d),e=this.shown=!0);if(e){d=document.createElement("div");d.setAttribute("id",this.pid+"_label");this.div.appendChild(d);d.style.position="absolute";d.className="point";d.style.zIndex=zzindex+20;this.isSign?d.style.zIndex=zzindex-20:_BrowserIdent_isMSIE()?(d.onmouseover=function(){this.parentNode.style.zIndex+=100},d.onmouseout=function(){this.parentNode.style.zIndex-=100}):(d.onmouseover=function(){this.style.zIndex+=100},d.onmouseout=function(){this.style.zIndex-=100});
null!=this.title&&(d.title=(this.isSign?"":"["+this.pid+"] ")+this.title);if(!this.isSign||this.href)d.onclick=function(a){return myObjectClicked(c.pid,a,c.href,c.title)};d.oncontextmenu=function(a){ctxtMenu.show(c.pid,a);return!1};d.ontouchstart=this.thandler.handle;d.ontouchend=this.thandler.handle;e=a.getElementsByTagName("ihtml");for(b=0;b<e.length;b++)this.div.innerHTML=e[b].firstChild.nodeValue;var f;this.hasTrace=!1;f=a.getElementsByTagName("linestring");for(b=0;b<f.length;b++)e=new kaXmlLinestring(this),
e.parseElement(this,f[b]),this.addGraphic(e),this.hasTrace=!0;f=a.getElementsByTagName("icon");for(b=0;b<f.length;b++)e=new kaXmlIcon,e.parseElement(this,f[b]),this.addGraphic(e),d.appendChild(e.ldiv);f=a.getElementsByTagName("polygon");for(b=0;b<f.length;b++)e=new kaXmlPolygon(this),e.parseElement(this,f[b]),this.addGraphic(e);f=a.getElementsByTagName("pointcloud");for(b=0;b<f.length;b++)e=new kaXmlPointCloud(this),e.parseElement(this,f[b]),this.addGraphic(e);f=a.getElementsByTagName("label");for(b=
0;b<f.length;b++)e=new kaXmlLabel,e.parseElement(this,f[b]),this.addGraphic(e),d.appendChild(e.ldiv),d.style.zIndex+=10,e.ldiv.setAttribute("id",this.pid+"_label_txt"),e.ldiv.style.fontSize=labelStyle.getFontSize(),labelIsHidden(this.pid)&&(e.ldiv.style.visibility="hidden")}g&&setTracking(this.pid)};kaXmlPoint.prototype.rescale=function(a){this.placeOnMap(this.geox,this.geoy);for(a=0;a<this.graphics.length;a++)this.graphics[a].rescale(this)};function ImgRotate(a){this.rdeg=0;this.image=document.getElementById(a);this.canvas=_BrowserIdent_newCanvas(this.image.parentNode);this.canvas.setAttribute("width",this.image.width);this.canvas.setAttribute("height",this.image.height);this.canvasCtxt=_BrowserIdent_getCanvasContext(this.canvas);null!=this.canvasCtxt?(this.image.style.visibility="hidden",this.image.style.position="absolute"):this.canvas.parentNode.removeChild(this.canvas);this.rotate(0)}
ImgRotate.prototype.rotate=function(a){this.rdeg=a;if(null!=this.canvasCtxt){var c=this.canvas;this.canvasCtxt.clearRect(0,0,c.width,c.height);var b=c.width;c.width=1;c.width=b;a=a*Math.PI/180;this.canvasCtxt.rotate(a);this.canvasCtxt.drawImage(this.image,.5*Math.cos(a)*this.image.width+.5*Math.sin(a)*this.image.height-.5*this.image.height,.5*Math.cos(a)*this.image.width-.5*Math.sin(a)*this.image.height-.5*this.image.width)}};ImgRotate.prototype.getRotation=function(){return this.rdeg};