<!-- Remove the scripts from top2012.inc so that we have acces to them later -->
<!DOCTYPE html>
<html lang="en">
<head>
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<!--<script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>-->
	<!--<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>-->
	<!-- load the header -->
	<?
	    define('INCLUDEPATH',"views/");
	    include(INCLUDEPATH."top2012.inc");

	?>
	<script src="js/app.js"></script>
	<script src="js/helper.js"></script>
	<!-- Bring over the core js from top.inc -->
	<script type="text/javascript" src="../../css/leg_core_20.js"></script>
	<script type="text/javascript"  src="../../css/leg_mobile_20.js"></script>
	<script type="text/javascript" src="../../css/js/hideshow2.js"></script>
	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.css" />
	<link rel="stylesheet" href="css/plugins/css/font-awesome.min.css" />
	<link rel="stylesheet" href="css/app.css" />
	<script src="http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.js"></script>
    <!--uses Google JS APi -not geocoding API -->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCAPiQ_pNX0vOYz5w04VSn0WUTS_5knWOg" > 
    </script>
	<!--<script src="http://cdn.jsdelivr.net/leaflet.esri/1.0.0/esri-leaflet.js"></script>-->


<div class='leg_Col4of4-First'> <!-- Closes in footer - so leave this openended -->
	<h2 id='map_title'>School District Finder</h2>
	<div id='map_reset'><a class='noref'>Reset Map <i class="fa fa-refresh"></i></a></div>
    <a ><div id="triangle-topright"><i class="fa fa-map fa-lg"></i></div></a>
     <div class="loader">Loading...</div>

    <div id="map_layers">
    	<div id="map_layers_content">
    		<div id="map_layers_toggle"> Hide Layers <i class="fa fa-map fa-sm"></i> <i class="fa fa-chevron-right fa-sm"></i></div>
    		<div id="map_layers_content_title">Layers</div>
    		<div id="map_layers_content_list">

    		    <div id="vtddiv" class="onoffswitch">
	    		    
	    			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="sdonoffswitch" checked>
	    				<label class="onoffswitch-label" for="sdonoffswitch">
	        				<span class="onoffswitch-inner"></span>
	        				<span class="onoffswitch-switch"></span>
	    				</label>	    			
				</div>
				<div class='layersswitchLabel'>School Districts</div>


	    		<div id="shdiv" class="onoffswitch">	    		    
	    			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="shonoffswitch" checked>
	    				<label class="onoffswitch-label" for="shonoffswitch">
	        				<span class="onoffswitch-inner"></span>
	        				<span class="onoffswitch-switch"></span>
	    				</label>	    			
				</div>
				<div class='layersswitchLabel'>State House Districts</div>


				<div id="ssdiv" class="onoffswitch">	    		    
	    			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="ssonoffswitch" checked>
	    				<label class="onoffswitch-label" for="ssonoffswitch">
	        				<span class="onoffswitch-inner"></span>
	        				<span class="onoffswitch-switch"></span>
	    				</label>
	    			
				</div>
				<div class='layersswitchLabel'>State Senate Districts</div>
				<div id="congressdiv" class="onoffswitch">
	    		    
	    			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cononoffswitch" checked>
	    				<label class="onoffswitch-label" for="cononoffswitch">
	        				<span class="onoffswitch-inner"></span>
	        				<span class="onoffswitch-switch"></span>
	    				</label>
	    			
				</div>
                <div class='layersswitchLabel'>Congressional Districts</div>
                <!-- boudaries -->
                <div id="citydiv" class="onoffswitch">
	    		    
	    			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="cityonoffswitch" checked>
	    				<label class="onoffswitch-label" for="cityonoffswitch">
	        				<span class="onoffswitch-inner"></span>
	        				<span class="onoffswitch-switch"></span>
	    				</label>
	    			
				</div>
				<div class='layersswitchLabel'>Municipal Boundaries</div>

				<div id="countydiv" class="onoffswitch">
	    		    
	    			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="countyonoffswitch" checked>
	    				<label class="onoffswitch-label" for="countyonoffswitch">
	        				<span class="onoffswitch-inner"></span>
	        				<span class="onoffswitch-switch"></span>
	    				</label>
	    			
				</div>
                <div class='layersswitchLabel'>County Boundaries</div>
			</div>
			
			


    		<div id="map_layers_basemap_title">Basemap Layers</div>
    		<!-- <button id = "switchBasemap">Switch</button> -->
    		<div id="satellitediv" class="onoffswitch">
    		    
    			<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="satellitonoffswitch" checked>
    				<label class="onoffswitch-label" for="satellitonoffswitch">
        				<span class="onoffswitch-inner"></span>
        				<span class="onoffswitch-switch"></span>
    				</label>
    			
			</div>
			<div id='switchLabel'>Satelite Imagery</div>
    	</div>
    </div>
 <div class='search'>
					
						<div class='form-group'>
							<form id='mainsearchform' onsubmit="geoCodeAddress()">
				                <label for="geocode">Enter Address, City, State, and Zipcode</label>
				                <button id="gpsButton"><i class="fa fa-location-arrow" alt="Zoom to GPS location"></i></button>
				                <input id ="geocodeAddress" type="text" name="geocode"></input>
				                <button id="searchButton" class="searchButton" alt="Submit address"><i class="fa fa-search"></i></button>
				                <p id="geocodeFeedback"></p>

				            </form>
				        </div>
			        	
		        </div>
	<div id="sidebar">
	    <div id="toggleSidebar">Go to Map <i class="fa fa-chevron-right"></i></div>
	    <div id="mask"> 
	    <div id="pull-in">
		    <i class="fa fa-chevron-left"> </i>
	    </div>
	    	<p><strong>To begin your search: </strong></p>
	    	<ol>
	    		<li>For best results, enter a complete Minnesota address including city, state, and zip code.</li>
	    		<li>Single-click or touch the map to select a search location. </li>
	    		<li>Select an elected official to view the official's web page/contact information.</li>
	    		<li>Select <span class='contact'>Show District <i class="fa fa-external-link"></i></span> on member results to view the member's district boundary on the map.</li>
	    		<li>Please note <span style="color:#a54a36; font-size:11px; padding:5px;"><i class="fa fa-info-circle"></i> Help</span> and <span style="color:#a54a36; font-size:11px; padding:5px;" class='noref' >Disclaimer <i class="fa fa-exclamation-triangle"></i> </span> below the map and <span style="color:#a54a36; font-size:11px; padding:5px;"><i class="fa fa-refresh"></i> Reset Map</span> above the map.</li>

	    	</ol>
	
	    </div>
	   

		<div id="officials">
			    <div class='precincts'>        	
			        
			        	
			        	<div class="membersublist">
			        		 <div class="memberLink"><span id="mnprecinctlink">Show District <i class="fa fa-external-link-square"></i></span></div>   	
			        		<div  class='precinctTitle'></div>
			        		<div id='precinctData' class='lcc_gis_precinct'></div>
			        		<div id='precinctName' class='lcc_gis_precinctName'></div>
			        	</div>
			        	<!-- <img id='housephoto' class='mnhouse_img' src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width="0" height="0" alt=""/> -->
			        
			    </div>
				 
		        <div class='mnhouse'>        	
			        
			        	
			        	<div class="membersublist">
			        		 <div class="memberLink"><span id="mnhouselink">Show District <i class="fa fa-external-link-square"></i></span></div>   	
			        		<div id='housemember' class='lcc_gis_member'></div>
			        		<div id='housedistrict' class='lcc_gis_memberdistrict'></div>
			        	</div>
			        	<img id='housephoto' class='mnhouse_img' src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width="0" height="0" alt=""/>
			        
			    </div>
			    <div class='mnsenate'>
			        
			        	
			        	<div class="membersublist">
			        		<div class="memberLink"><span id="mnsenlink">Show District <i class="fa fa-external-link-square"></i></span></div>
			        		<div id='senatemember' class='lcc_gis_member'></div>
			        		<div id='senatedistrict' class='lcc_gis_memberdistrict'></div>
			        	</div>
			        	<img id='senatephoto' class='mnsenate_img' src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width="0" height="0" alt=""/>
			        
			    </div>
			    <div class='ushouse'>
			        
			        	
			        	<div class="membersublist">
			        		<div class="memberLink"><span id="ushouselink">Show District <i class="fa fa-external-link-square"></i></span></div>
			        		<div id='ushousemember'  class='lcc_gis_member'></div>
			        		<div id='ushousedistrict' class='lcc_gis_memberdistrict'></div>
			        	</div>
			        	<img id='ushousephoto' class='ushouse_img' src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width="0" height="0" alt=""  />
			        
			    </div>
			    <div class='ussenate1'>
			        
			        	
			        	<div class="membersublist">
			        		<div class="memberLink"><span id="ussenatelink">Show District <i class="fa fa-external-link-square"></i></span></div>
			        		<div id='ussenatemember' class='lcc_gis_member'></div>
			        		<div id='ussenatedistrict' class='lcc_gis_memberdistrict'></div>
			        	</div>
			        	<img id='ussenatephoto' class='ussenate1_img' src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width="0" height="0" alt=""  />
			       
			    </div>
			    <div class='ussenate2'>
			        
			        	
			        	<div class="membersublist">
			        		<div class="memberLink"><span id="ussenate2link" >Show District <i class="fa fa-external-link-square"></i></span></div>
			        		<div id='ussenatemember2' class='lcc_gis_member'></div>
			        		<div id='ussenatedistrict2' class='lcc_gis_memberdistrict'></div>
			        	</div>
			        	<img id='ussenatephoto2' class='ussenate2_img' src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width="0" height="0" alt=""  />
			        
			    </div>
		    
		</div>
	</div>
    
	<div id="map">
		
	</div>
	<div id='map_help'>
		<a class='noref' id='modal' data-popup-open="popup-1"><i class="fa fa-info-circle"></i> Help</a>
	</div>
	<!-- <div id='map_search_results_metadata'>
		Search Results for Latitude: 44.9374, Longitude: -92.9778
	</div> -->
	<div id='map_disclaimer'>
		<a class='noref' data-popup-open="popup-2">Disclaimer <i class="fa fa-exclamation-triangle"></i> </a>
	</div>
	<div id="pull-out">
		<i class="fa fa-chevron-right"> </i>
	</div>
    <!-- <div class='form-group smallscreen'>
		<form action="javascript:submitQuery()">
		    <label for="geocode">Enter Address, City State, and Zipcode</label>
		    <input type="text" name="geocode"></input><button class="searchButton">Search</button>

		</form>
	</div> -->

    <!-- help modal -->
    <div class="popup" data-popup="popup-1">
	    <div class="popup-inner">
	        <h2>Help Section</h2>
	        <ul style="list-style-type:disc">
        		<li> Use the zoom control (+ -) in upper left or use your mouse wheel to zoom-in and zoom-out of the map. </li>
        		<li> Click and drag the map to pan around the map. </li>
        		<li> Click the map icon in upper right to view available layers. </li>
        		<li> Click on individual switches to turn on/off layers. </li>
        		<li> Click once on the map to open the member's webpage</li>
        		<li> Select <span class='contact'>Show District <i class="fa fa-external-link"></i></span> to view the member's district boundary.</li>

	        </ul>
	        <p><a data-popup-close="popup-1" href="#">Close Help</a></p>
	        <a class="popup-close" data-popup-close="popup-1" href="#">x</a>
	    </div>
	</div>

	<!-- dislaimer modal -->
    <div class="popup" data-popup="popup-2">
	    <div class="popup-inner">
	        <h2>Disclaimer</h2>
	        <p>
        		PLEASE NOTE: This Web application is intended to provide general information only.  Due to limitations in the data, the District Finder may incorrectly identify which district you live in, especially if the address is near the boundary of the district (where errors are more likely to occur).  Please examine the map to determine whether your address is near the boundary.  If it is, we recommend that you contact your county elections office.

	        </p>
	        <p><a data-popup-close="popup-2" href="#">Close Help</a></p>
	        <a class="popup-close" data-popup-close="popup-2" href="#">x</a>
	    </div>
	</div>

<!-- End leg_PageContent from top.inc -->

<?
    include(INCLUDEPATH."footer2012.inc");
?>