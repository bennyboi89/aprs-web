
<!-- top toolbar, title and navigation -->
<form>
<div id="anchor"></div>
<div id="toolbar">
   <div id="toolbarBackground" class="transparentBackground"></div> 
   <div id="tools" style="text-align:left; padding-top:4px"> 

       <div id="sarmode"><img src="images/sar.png" title="SAR modus"></div>
       <img id="toolQuery" onclick="switchMode(this.id)" title="Click and drag or double click to query the Map" alt="Click and drag or double click to query the Map" src="KaMap/images/a_pixel.gif" > 
       <img id="toolPan"   onclick="switchMode(this.id)" title="Click and drag to Navigate the Map" alt="Click and drag to Navigate the Map" src="KaMap/images/a_pixel.gif">
       <img id="toolZoomRubber" onclick="switchMode(this.id)" title="rubber zoom" alt="rubber zoom" src="KaMap/images/a_pixel.gif" >
       <img id="toolZoomOut" onclick="myKaMap.zoomOut()" title="zoom Out" alt="zoom Out" src="KaMap/images/a_pixel.gif">
       <img id="toolZoomIn"  onclick="myKaMap.zoomIn()"  title="zoom in"  alt="zoom in"  src="KaMap/images/a_pixel.gif" >
       
       <img id="layerSelect" title="Map layers" src="images/layers.png">
       <img id="areaSelect" title="Velg område/kartutsnitt" src="images/areaselect.png">
       <img id="filterMenu" title="Velg filter profil" src="images/filter.png">
       <div id="filterChoice">..</div>
       
    <div style="visibility:hidden" id="permolink"></div>    
  </div>
</div>  <!-- id=toolbar -->
</form>