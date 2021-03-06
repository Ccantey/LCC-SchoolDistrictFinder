//global variables
var map, geojson, switchMap ={};

//map Layers
var pushPinMarker, vectorBasemap, streetsBasemap, MinnesotaBoundaryLayer;

//map overlay layers... called like overlayLayers.CongressionalBoundaryLayer
var overlayLayers ={};

//google geocoder
var geocoder = null;

//Set initial basemap with initialize() - called in helper.js
function initialize(){
	// $("#map").height('544px');
	geocoder = new google.maps.Geocoder;
	
	if (/Mobi/.test(navigator.userAgent)) {
		screensize = true;
	} else {screensize = false;}

	map = L.map("map", {
		center: getCenter(),
		dragging: !L.Browser.mobile,
		zoom: 6,
		gestureHandling:screensize
		// ,dragging: !L.Browser.mobile
	});

	//if you want to open up map on user location...
    // map.locate({setView: true, maxZoom: 16});
    
	if (/Mobi/.test(navigator.userAgent)) {
	    // mobile!
	    map.dragging.disable() //also disables user scroll through map
	    map.options.tap = false;
	    map.locate({setView: true, maxZoom: 16});
	}
    

	vectorBasemap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2NhbnRleSIsImEiOiJjaWVsdDNubmEwMGU3czNtNDRyNjRpdTVqIn0.yFaW4Ty6VE3GHkrDvdbW6g', {
					maxZoom: 18,
					minZoom: 6,
					 zIndex: 1,
					attribution: 'Basemap data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, ' +
						'Legislative data &copy; <a href="http://www.gis.leg.mn/">LCC-GIS</a>, ' +
						'Imagery Â© <a href="http://mapbox.com">Mapbox</a>',
					id: 'mapbox.streets'
					})

	streetsBasemap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2NhbnRleSIsImEiOiJjaWVsdDNubmEwMGU3czNtNDRyNjRpdTVqIn0.yFaW4Ty6VE3GHkrDvdbW6g', {
					maxZoom: 18,
					minZoom: 6,
					 zIndex: 1,
					attribution: 'Basemap data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, ' +
						'Legislative data &copy; <a href="http://www.gis.leg.mn/">LCC-GIS</a>, ' +
						'Imagery Â© <a href="http://mapbox.com">Mapbox</a>',
					id: 'mapbox.streets-satellite'
					});

	toggleBaseLayers($('#satellitonoffswitch'),vectorBasemap,streetsBasemap);
};

//get the center of the map on load, from URL or default
function getCenter(){
    if (getQueryVariable('address')){
         getQueryVariable('address');
    } else {
        var center = L.latLng(46.1706, -94.9678);
        return center;
    }
}

//toggle basemap layers
function toggleBaseLayers(el, layer1, layer2){
	//console.log(el, 'has been toggled');
	if (el.is(':checked')){
		map.removeLayer(layer2);
		map.addLayer(layer1);
	} else {
		map.removeLayer(layer1);
		map.addLayer(layer2);
	}
}

//fetch the overlay layers from WMS, published through FOSS mapserver (mapserver.org) - much faster than fetching large vector datasets through PGIS
function getOverlayLayers(el, switchId){
    $('.loader').show();

    switchMap = {"sdonoffswitch": "sd1819","countyonoffswitch": "cty2010", "cityonoffswitch":"mcd2015", "cononoffswitch":"cng2012", "ssonoffswitch":"sen2012_vtd2015", "shonoffswitch":"hse2012_vtd2015"}
    console.log(switchMap[switchId]);
   
    if(el.is(':checked')){
    	map.removeLayer(overlayLayers[switchMap[switchId]]);
        $('.leaflet-marker-icon.'+switchMap[switchId]).hide();
		$('.loader').hide();
    } else {
    	$('.leaflet-marker-icon.'+switchMap[switchId]).show();

    	if(typeof overlayLayers[switchMap[switchId]] === 'undefined'){
    		overlayLayers[switchMap[switchId]] = L.tileLayer.wms('https://www.gis.leg.mn/cgi-bin/mapserv?map=/web/gis/iMaps/schooldistricts/data/mapserver.map', {
			    format: 'image/png',
			    transparent: false,
			    minZoom: 6,
			    zIndex: 3,
                crs:L.CRS.EPSG4326,
			    layers: switchMap[switchId]
			}).addTo(map);
			$('.loader').hide();
		} else {
			overlayLayers[switchMap[switchId]].addTo(map);
			$('.loader').hide();
		}
    }
}

function geoCodeAddress(geocoder, resultsMap, address) {
  // var address = document.getElementById('geocodeAddress').value;
  // console.log(address)
  $('.loader').show();

  geocoder.geocode({'address': address}, function(results, status) {
  	
    if (status === google.maps.GeocoderStatus.OK) {
    	// console.log(address)
      var precision = results[0].geometry.location_type;
      var components = results[0].address_components;
      var pos = {
        latlng: {lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()},
        lat:results[0].geometry.location.lat(),
        lng:results[0].geometry.location.lng()
      };
      // console.log(pos.lat);
      // console.log(pos.lng);
      map.setView(L.latLng(pos.lat,pos.lng),16);
      addMarker(pos);
      identifyDistrict(pos);
      geocodeFeedback(precision, components);
      // console.log("used google")
    } else {
      
      geoCodeMBAddress(address);
      $('.loader').hide();
    }
  });
}

function geoCodeMBAddress(address){
	console.log('used mb')
	L.mapbox.accessToken = 'pk.eyJ1IjoiY2NhbnRleSIsImEiOiJjaWVsdDNubmEwMGU3czNtNDRyNjRpdTVqIn0.yFaW4Ty6VE3GHkrDvdbW6g';
    var geocoder = L.mapbox.geocoder('mapbox.places')
    geocoder.query(address, showMapBoxMap)

	return false;
}

function showMapBoxMap(err, data){
	   var pos = {
        latlng: {
        	lat:data.latlng[0],
        	lng:data.latlng[1]
        },
        lat:data.latlng[0],
        lng:data.latlng[1]
      };   
      map.setView(L.latLng(pos.lat,pos.lng),16);
      addMarker(pos);
      identifyDistrict(pos);
      //geocodeFeedback(precision, components);   
}

function geocodeFeedback(precision, components){
	//console.log(precision, 'location, center of ', components[0].types[0]);
	var message = "";
	var componentMap = {"street_number": "street", "postal_code": "zip code", "administrative_area_level_1": "state", "locality": "city", "administrative_area_level_2": "county", "route": "route", "intersection": "intersection", "political": "political division", "country": "country","administrative_area_level_3": "minor civil division", "administrative_area_level_4": 'minor civil division', "administrative_area_level_5": "minor civil division", "colloquial_area": "country", "neighborhood": "neighborhood", "premise": "building", "subpremise": "building", "natural_feature": "natural feature", "airport": "airport", "park": "park", "point_of_interest": "point of interest"};

	if (precision == "ROOFTOP"){
		message = "Address match!";
		$('#geocodeFeedback').html(message).css('color', 'green');
		$('#geocodeFeedback').show();
	} else {
		message = "Approximate location! Center of " + componentMap[components[0].types[0]];
		$('#geocodeFeedback').html(message).css('color', 'red');
		$('#geocodeFeedback').show();
	}
	slideSidebar();
	
}

//submit search text box - removed button for formatting space
function keypressInBox(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode                        
        e.preventDefault();
        address = document.getElementById('geocodeAddress').value;
        geoCodeAddress(geocoder, map, address);
    }
};

//fetch location data from postgres on mouseclick/geocode submition
function identifyDistrict(d){
	// console.log(d.latlng); 
	var data = {
		lat: d.latlng.lat,
		lng: d.latlng.lng
	};
    $('.loader').show();
	$.ajax("php/getPointData.php", {
		 data: data,
		success: function(result){			
			addMemberData(result);
		}, 
		error: function(){
			console.log('error');
		}
	});
}

//sidebar member data
function addMemberData(memberData){
	console.log(memberData)
	// memberData.features[0] = MN House
	// memberData.features[1] = MN Senate
	// memberData.features[2] = US House
	if (typeof memberData.features[0] !== "undefined"){
	    $('#mask').hide();
	    geojson = memberData;
		//also show hyperlinks here
	    $('.memberLink, .precinctLink').show();
	    //add memberdata from map selection to member list
	    //ALTERNATIVE SOLUTION! Use house/senate image server: http://www.house.leg.state.mn.us/hinfo/memberimgls89/ -- but then you have issue of large image sizes, slow performance
	    $('.precinctTitle').html('2015-16 School District');
	    $('#precinctData').html('School District - ' + memberData.features[3].properties.district).delay("slow").fadeIn();
	    $('#precinctName').html(memberData.features[3].properties.name).delay("slow").fadeIn();
	    $('#precinctlink').attr('href', memberData.features[3].properties.party);

	    $('#housephoto').attr('src', 'images/House/'+memberData.features[0].properties.district+'.jpg').attr('width','auto').attr('height','auto').attr('alt', 'Minnesota House ' + memberData.features[0].properties.party +' '+ memberData.features[0].properties.name + ' district ' + memberData.features[0].properties.district);
		$('#housemember').html(memberData.features[0].properties.name + '<span class="party"> ('+ memberData.features[0].properties.party +')</span>').delay("slow").fadeIn();
		$('#housedistrict').html('MN House - ' + memberData.features[0].properties.district).delay("slow").fadeIn();
		$('#mnhouselink').attr('href', 'https://www.house.leg.state.mn.us/members/members.asp?id='+ memberData.features[0].properties.memid);
		$('#mnhouselink').attr('title', 'Contact '+ memberData.features[0].properties.name);
		
		$('#senatephoto').attr('src', 'images/Senate/'+memberData.features[1].properties.district+'.jpg').attr('width','auto').attr('height','auto').attr('alt', 'Minnesota Senate ' + memberData.features[1].properties.party +' '+ memberData.features[1].properties.name + ' district ' + memberData.features[1].properties.district);
		$('#senatemember').html(memberData.features[1].properties.name + '<span class="party">  ('+memberData.features[1].properties.party+')</span>');
		$('#senatedistrict').html('MN Senate - ' + memberData.features[1].properties.district);
		$('#mnsenlink').attr('href', 'https://www.senate.leg.state.mn.us/members/member_bio.php?leg_id='+ memberData.features[1].properties.memid);
		$('#mnsenlink').attr('title', 'Contact '+ memberData.features[1].properties.name);
		
		var ushouseURL = '';
		var lastname = memberData.features[2].properties.name.split(" ")[1];

        switch(memberData.features[2].properties.district){
        	case 7:
        	  ushouseURL = 'collinpeterson';
        	  break;
        	// case 2:
        	//   ushouseURL = 'jasonlewis';
        	//   break;
        	default:
        	  ushouseURL = lastname;
        }
        
		$('#ushousephoto').attr('src', 'images/USHouse/US'+memberData.features[2].properties.district+'.jpg').attr('width','auto').attr('height','auto').attr('alt', 'United States Representative ' + memberData.features[2].properties.party +' '+ memberData.features[2].properties.name + ' district ' + memberData.features[2].properties.district);
		$('#ushousemember').html(memberData.features[2].properties.name + ' <span class="party"> ('+memberData.features[2].properties.party+')</span>');
		$('#ushousedistrict').html('U.S. House - ' + memberData.features[2].properties.district);
		var lastname = memberData.features[2].properties.name.split(" ")[1];
		$('#ushouselink').attr('href', 'http://'+ ushouseURL +'.house.gov/');
		$('#ushouselink').attr('title', 'Contact '+ memberData.features[2].properties.name);
		
		$('#ussenatephoto').attr('src', 'images/USSenate/USsenate1.jpg').attr('width','auto').attr('height','auto').attr('alt', 'United States Senator DFL Amy Klobuchar Minnesota');
		$('#ussenatemember').html('Amy Klobuchar <span class="party"> (DFL)</span>');
		$('#ussenatedistrict').html('U.S. Senate' );
		$('#ussenatelink').attr('href', 'http://www.klobuchar.senate.gov/');
		$('#ussenatelink').attr('title', 'Contact Amy Klobuchar');
		
		$('#ussenatephoto2').attr('src', 'images/USSenate/USsenate2.jpg').attr('width','auto').attr('height','auto').attr('alt', 'United States Senator DFL Tina Smith Minnesota');
		$('#ussenatemember2').html('Tina Smith <span class="party"> (DFL)</span>');
		$('#ussenatedistrict2').html('U.S. Senate');
		$('#ussenate2link').attr('href', 'https://www.smith.senate.gov/HomePage');
		$('#ussenate2link').attr('title', 'Contact Tina Smith');
		$('.loader').hide();
	} else { 
		$('#mask').show();
		$('.loader').hide();
	}	
}

function addMarker(e){
	//remove sidebar formatting
	$(".mnhouse, .mnsenate, .ushouse, .ussenate1, .ussenate2, .precincts" ).removeClass('active');
	$('.memberLink, .precinctLink').hide();
	$('.precinctTitle,#precinctData, #housemember, #senatemember, #ushousemember, #ussenatemember, #ussenatemember2').html('');
    $('#housedistrict, #senatedistrict, #ushousedistrict, #ussenatedistrict, #ussenatedistrict2').html('');
    $('#housephoto, #senatephoto, #ushousephoto, #ussenatephoto, #ussenatephoto2').removeAttr('src');

    //remove old pushpin and previous selected district layers 
	if (typeof pushPinMarker !== "undefined" ){ 
		map.removeLayer(pushPinMarker);			
	}
	if (typeof mapDistrictsLayer !== "undefined" ){ 
		map.removeLayer(mapDistrictsLayer);			
	}
	//add marker
	pushPinMarker = new L.marker(e.latlng).addTo(map);
}

//Show the district on the map
function showDistrict(div){
	slideSidebar();
	$('.loader').show();

	//div is the class name of the active member
	divmap = {"mnhouse active":0, "mnsenate active":1, "ushouse active":2, "precincts active":3};

	//remove preveious district layers.
	if (typeof mapDistrictsLayer !== "undefined" ){ 
		map.removeLayer(mapDistrictsLayer);			
	}
    
    //polygon overlay styling
	var myStyle = {
    	"color": "#991a36",
    	"weight": 2,
    	"opacity": 0.65
	};

	var thismember = div + ' ' + geojson.features[divmap[div]].properties.district;
    ga('send', 'event', 'member', 'showmapdistrict', thismember);

    mapDistrictsLayer = L.geoJson(geojson.features[divmap[div]], {
		style:myStyle,
		onEachFeature: function (feature, layer) {
			var html = "";
			for (prop in feature.properties){
				if (prop != 'memid'){
				  html += prop+": "+feature.properties[prop]+"<br>";
				} else {}
			};
	        layer.bindPopup(html);
	    }
	}).addTo(map);
	//zoom to selection
	map.fitBounds(mapDistrictsLayer.getBounds());
	$('.loader').hide();
}

function showSenateDistrict(div){
	slideSidebar();
    $('.loader').show();

	//remove preveious district layers.
	if (typeof mapDistrictsLayer !== "undefined" ){ 
		map.removeLayer(mapDistrictsLayer);			
	}
    
    mapDistrictsLayer = MinnesotaBoundaryLayer.addTo(map);
	map.fitBounds(mapDistrictsLayer.getBounds());
	$('.loader').hide();
}

function slideSidebar(){
	if ($('#sidebar').hasClass('animate')){
			$('#sidebar').removeClass('animate');
			try{
			   // $('#sidebar').animate({ 'left': '-105%' }, 250, 'easeOutQuad');
			}
			catch(err){}
		} else {
			try{
			    $('#sidebar').addClass('animate');
			    // $('#sidebar').animate({ 'left': '0px' }, 250, 'easeInQuad');
		    } catch(err){}} // Firebug throws a typeerror here - it doesn't break the app, 'easeInQuad' needs jQuery UI, but it forces the animation in desktop app... just ignore
}

//call getQueryVariable('district' or 'address', whatever variable you want to pass through url)
//example: http://www.gis.leg.mn/iMaps/Legacy/index.php?address=1414 Skyline Rd, Eagan
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       //console.log(vars);
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){
                address = pair[1].replace(/%20/g,' ');
                // console.log(address)
                geoCodeAddress(geocoder, map, address);
                $('#geocodeAddress').val(address);
                return address;
            }
       }
       return(false);
}

function zoomToGPSLocation() {
// Try HTML5 geolocation.
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        latlng: {lat:position.coords.latitude,lng:position.coords.longitude},
        lat:position.coords.latitude,
        lng:position.coords.longitude
      };

      addMarker(pos);
	  identifyDistrict(pos);
	  map.setView(L.latLng(pos.lat, pos.lng),13);

    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
 alert('Geocode was not successful - Your browser does not support Geolocation');
      $('.loader').hide();

}

function toggleLayerSwitches (){
    var inputs = $(".onoffswitch-checkbox");
    for (var i = 0, il = inputs.length; i < il; i++) {
    	var inputsID = '#'+ inputs[i].id;
        if($(inputsID).not(':checked')){
        	$(inputsID).prop('checked', true);
        }         
    }	
}

