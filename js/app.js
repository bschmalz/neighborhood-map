var viewModel = {
  
  // Map Initialization
  initMap: function() {
   map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: 34.216806, lng: -117.857176},
     zoom: 11, 
     disableDefaultUI: true
   });
   viewModel.markerInit();  
   viewModel.search("");
 },

/*
 // Menu Initialization, this is to setup the swiping functionality for mobile responsiveness. 
 menuInit: function () {
 var menu = $('.options-box'); 
 var menuStatus = "open"; 
 $('#burger').click(function () {
  if (menuStatus === "open") {
    menu.removeClass("open").addClass("closed");
    menuStatus = "closed";  
  } else {
    menu.removeClass("closed").addClass("open");
    menuStatus = "open"; 
  }
});
},
*/

  // General Init Function to call the more specific ones. 
  init: function() {
    //viewModel.menuInit();
  },

  markerInit: function() {
    var largeInfowindow = new google.maps.InfoWindow();
    model.forEach(function(placeItem){
      var position = placeItem.latlng; 
      var title = placeItem.name;
        placeItem.marker = new google.maps.Marker({
        position: position, 
        title: title, 
        animation: google.maps.Animation.DROP
        });

        markers.push(placeItem.marker);
        // Create an onclick event to open an infowindow at each marker.
        placeItem.marker.addListener('click', function() {
            viewModel.populateInfoWindow(this, largeInfowindow);
        });
      });
    var bounds = new google.maps.LatLngBounds();

  },


  
  // Set up observables for search functionality. 
  places: ko.observableArray([]), 
  query: ko.observable(''),
  menu: ko.observable(true), 

  toggleMenu: function() {
    console.log('toggle'); 
    if (viewModel.menu()) {
      viewModel.menu(false);
    }
    else {
      viewModel.menu(true); 
    }
  },

  // Search controls what is seen based on text input. 
  search: function(value) {
    viewModel.places.removeAll();
    var bounds = new google.maps.LatLngBounds();
    var markerPlaced = false; 

    if (value == '') {
      markerPlaced = true;  
      model.forEach(function(placeItem){
        viewModel.places.push(placeItem);
        placeItem.marker.setMap(map); 
        bounds.extend(placeItem.marker.position); 

      });

    }
    else {
      model.forEach(function(placeItem){
        placeItem.marker.setMap(null); 
        if (placeItem.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          viewModel.places.push(placeItem);
          placeItem.marker.setMap(map); 
          bounds.extend(placeItem.marker.position);
          markerPlaced = true;  
        }

      });
    }
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
       var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
       var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
       bounds.extend(extendPoint1);
       bounds.extend(extendPoint2);
    }

    if (markerPlaced) {
    map.fitBounds(bounds);
  }
  }, 

  populateInfoWindow: function(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;



          infowindow.setContent('<div class="infoWindow">' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }



}


viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel); 
viewModel.init(); 

