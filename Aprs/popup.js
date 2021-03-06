

var ie  = document.all;
var ns6 = document.getElementById&&!document.all;
var isGecko = (navigator.product == 'Gecko');

var allowedPopups = 1;
var isMenu        = false ;
var activepopup   = null; 
var psubdiv       = null;
var myScroll      = null;
var onCallback = null, offCallback = null; 


function menuMouseSelect()
{
    if( allowedPopups <= 0 ) { 
        removePopup();
        if (myScroll != null) 
             myScroll.destroy();
        myScroll = null; 
        return false; 
    }
    return true;
}


function popupActive()
   { return (activepopup != null); }


function onPopup(on, off) 
   { onCallback = on; offCallback = off; }
  


/************************************************************************
 * Create executable link item (for menus typically) 
 ************************************************************************/

function createItem(text, actn, arg)
{
  function _executeItem(elem, actn, arg)
  { 
    if (elem.active)
        return;
    elem.className += ' ITEM_selected';
    elem.active=true;
    setTimeout(function() { 
        removePopup(); 
        actn(arg); 
        elem.active=false; 
    }, 300); 
  }
 
  var elem = document.createElement('div');
  elem.origCls = '';
  if (isMobile)
    elem.addEventListener('tap', function() { _executeItem(elem, actn, arg);  e.cancelBubble=true; }, false); 
  elem.onmouseup   = function(e) { _executeItem(elem, actn, arg);  e.cancelBubble=true;}
  elem.onmousedown = function(e) { _executeItem(elem, actn, arg);  e.cancelBubble=true;}
  elem.onmouseover = function(e) { elem.origCls = elem.className; 
                                   elem.className += ' ITEM_hover'; }                                
  elem.onmouseout  = function(e) { elem.className = elem.origCls;}
  
  elem.appendChild(document.createTextNode(text));
  return elem;
}


/************************************************************************
 * PopupMenu class 
 ************************************************************************/

function PopupMenu(title, heading)
{
    this.lastItem = null;
    this.menudiv = null;
    this.heading = null;
}


PopupMenu.prototype.clear = function()
{  
   this.lastItem = null;
   this.menudiv = document.createElement('div');
//   this.menudiv.style.display = 'none';
//   this.menudiv.className = 'POPUPMENU';
}


PopupMenu.prototype.setHeading = function(hd)
{
  this.heading = hd; 
}


PopupMenu.prototype.add = function(txt, func, arg)
{
   if (txt == null) 
     this.lastItem.className = 'ITEM_sep';
   else {
     var atxt  = (txt == null ? '' : txt);
     var alink = (func == null ? '' : func);
     this.lastItem = createItem(atxt, alink, arg);
     this.menudiv.appendChild(this.lastItem);
  }
}



PopupMenu.prototype.activate = function(onDiv, x, y)
{
    this.lastItem.className = 'ITEM_last';
    isMenu = true;
   
    wrapper = document.createElement('div');
    
    if (this.heading != null) {
       var h = document.createElement("H1");
       var t = document.createTextNode(this.heading); 
       h.appendChild(t);  
       wrapper.appendChild(h);
    }
    wrapper.appendChild(this.menudiv);
    wrapper.style.display = 'none';
    wrapper.className = 'POPUPMENU';
    
    popup(onDiv, wrapper, x, y, false);  
    return wrapper; 
}

/************ End of PopupMenu class  *************/




function removePopup()
{
  if (activepopup == null)
    return;
  if (offCallback != null)
    offCallback(); 
  isMenu = false;
  allowedPopups++;
  activepopup.style.display = "none" ;
  activepopup.parentNode.removeChild(activepopup);
  activepopup = null;
}



function popupwindow(onDiv, ihtml, x, y, img, id, delay)
{
    var pdiv = document.createElement('div');
    pdiv.className = 'POPUP'; 
    pdiv.innerHTML = ihtml;
    if (id != null) pdiv.id = id;
    if (delay) 
        setTimeout( function() {
          popup(onDiv, pdiv, x, y, img);
        }, 900);
    else 
      popup(onDiv, pdiv, x, y, img);
    
    pdiv.onmousedown = function(e) 
       { e = (e)?e:((event)?event:null); e.cancelBubble = true; return null; };
    pdiv.onmouseup = function(e) 
       { e = (e)?e:((event)?event:null); e.cancelBubble = true; return null; };
    pdiv.onclick = function(e)   
       { e = (e)?e:((event)?event:null); e.cancelBubble = true; return null; };
    pdiv.onmousemove = function(e)
       { e = (e)?e:((event)?event:null); e.cancelBubble = true; return null; };
   return pdiv;
}



function remotepopupwindow(onDiv, url, x, y, id)
{
    var d =  popupwindow(onDiv, "", x, y, false, id, false);
    call(url, null, function(txt) { d.innerHTML = txt; } );
    return d;
}



function remotepopupwindowCSS(onDiv, url, x, y, css)
{
   call(url, null, function(txt) 
   { var div = popupwindow(onDiv, txt, 1, 1, false, null, false); 
     if (css != null) 
          div.className = css;
   } );
}

  
   
function popupImage(onDiv, x, y) {
  if (allowedPopups <= 0)
    return;
  image = document.createElement('img');
  activepopup = document.createElement('div');
  onDiv.appendChild(activepopup);
  activepopup.appendChild(image);
  image.src='images/cross.gif';
  image.style.position='absolute';
  image.style.left = x-11+'px';
  image.style.top = y-11+'px';
  image.style.zIndex = 1001;
  allowedPopups--;
  if (onCallback != null)
     onCallback();
}


   

function popup(onDiv, menudiv, x, y, img)
{
     if (allowedPopups <= 0)
         return;
     
     var image;
     psubdiv = activepopup = menudiv;  
     if (img != null && img) {
         image = document.createElement('img');
         activepopup.appendChild(image);
      	 image.src='images/cross.gif';
	 image.style.position='absolute';
	 image.style.left= -9+'px';
         image.style.top= -12+'px';
         image.style.zIndex = 1001;
         activepopup = document.createElement('div');
         activepopup.appendChild(psubdiv);
         activepopup.onclick = function(e) 
            {psubdiv.style.display = 'none';}; 
     }

     onDiv.appendChild(activepopup);
     var xoff=0;
     var yoff=0;
     var xoffs = yoffs = false;
     var firstTime = true;
  
     activepopup.style.position   = 'absolute';
     activepopup.style.display    = 'block';
     activepopup.style.padding    = '2px';
     activepopup.style.cursor     = 'default';
     if (document.body.clientWidth < 500 && menudiv.clientWidth > document.body.clientWidth)
       activepopup.style.minWidth   = document.body.clientWidth+'px'; 
     
     /* Is the height of the content more than the available height?
      * Then we need a scroller 
      */
     if (menudiv.clientHeight+10 > document.body.clientHeight) {
         activepopup.style.maxHeight = document.body.clientHeight-5 + "px";
         menudiv.id = 'wrapper';
         
         /* Activate scroller */
         if (isMobile) 
            setTimeout(function () {
              myScroll = new IScroll(activepopup, {
                    scrollbars : true, 
                    tap : true
                 });
            }, 1000);
         else
           activepopup.style.overflowY  = 'scroll';
     }
     else
       activepopup.style.overflowY = 'visible';
     
     adjustPosition();
     setTimeout(adjustPosition, 500); 
     activepopup.style.zIndex  = 1301;

     
     /* Workaround to prevent OL from reacting on mousemove as long as popup is active */
     if (!ie) {
       var evObj = document.createEvent('MouseEvents');
       evObj.initMouseEvent( 'mouseup', true, true, window, x, y, x, y, 220, false, false, true, false, 0, null );
       onDiv.dispatchEvent(evObj);
     }
     allowedPopups--;
     if (onCallback != null)
       onCallback(); 

 
    function adjustPosition()
    {   
      xoff = x + 4 + menudiv.clientWidth - document.body.clientWidth;
      if (xoff > 0) {
        xoffs = true;
        x -= xoff;
        if (x < 1) x=1;
        if (image!=null)
          image.style.left =(xoff-9)+'px';
      }
      yoff = y + 4 + menudiv.clientHeight - document.body.clientHeight;
      if (yoff > 0) {
	yoffs = true;
        y -= yoff;
        if (y < 1) y=1;
        if (image!=null)
          image.style.top =(yoff-12)+'px';
      }
      
      if (firstTime || xoff > 0 || yoff > 0) { 
         activepopup.style.left    = x-3+"px";
         activepopup.style.top     = y-3+"px";
      }  
      firstTime = false;
      if (xoffs && yoffs && image != null) 
         image.style.display = "none";
     }

}


// FIXME: Add position of window

function fullPopupWindow(name, url, width, height) {
  var ctrl = "left=50,top=100,width="+width+",height="+height+"resizable=1,scrollbars=1";
  eval( "this."+name+"=window.open('"+url+"','"+name+"','"+ctrl+"');" );
  if (window.focus)
    setTimeout(function() {eval("if(this."+name+") this."+name+".focus();" );}, 2000);
}


