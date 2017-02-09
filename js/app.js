     


     var map;
     // Function to initialize the map within the map div
     var mapView = {

     initMap: function() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 40.74135, lng: -73.99802},
         zoom: 14, 
         disableDefaultUI: true
       });
     }
   }
     /*
       // Create a single latLng literal object.
       var singleLatLng = {lat: 40.74135, lng: -73.99802};
       // TODO: Create a single marker appearing on initialize -
       // Create it with the position of the singleLatLng,
       // on the map, and give it your own title!
       var marker = new google.maps.Marker({
            map: map,
            position: singleLatLng,
            title: "Phish Rules",
            animation: google.maps.Animation.DROP,
            id: 1
          });

       // TODO: create a single infowindow, with your own content.
       // It must appear on the marker
       var largeInfowindow = new google.maps.InfoWindow();

       function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + singleLatLng.lat + " " + singleLatLng.lng + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }

       // TODO: create an EVENT LISTENER so that the infowindow opens when
       // the marker is clicked!
       marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
     }
     */

     var menu = $('.options-box'); 
     var menuStatus = "open"; 
     $('#burger').click(function () {
        if (menuStatus === "open") {
            menu.removeClass("open").addClass("closed");
            menuStatus = "closed"; 
            console.log("phish"); 
        } else {
            menu.removeClass("closed").addClass("open");
            menuStatus = "open"; 
            console.log("rules"); 
        }
    });
     
