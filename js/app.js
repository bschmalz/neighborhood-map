var largeInfowindow; 

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

  markerInit: function() {
    largeInfowindow = new google.maps.InfoWindow({content: infoWindowTemplate}); 
    var isInfoWindowLoaded = false;
    google.maps.event.addListener(largeInfowindow, 'domready', function () {
                if (!isInfoWindowLoaded) {
                    ko.applyBindings(self, $("#info-window")[0]);
                    isInfoWindowLoaded = true;
                }
            });


    model.forEach(function(placeItem){
      var position = {lat: placeItem.latlng[0],lng: placeItem.latlng[1]}; 
      var yelpPosition = placeItem.latlng; 
      var title = placeItem.name;
        placeItem.marker = new google.maps.Marker({
        position: position, 
        title: title, 
        yelpData: yelpPosition,
        animation: google.maps.Animation.DROP
        });

        markers.push(placeItem.marker);
        // Create an onclick event to open an infowindow at each marker.
        placeItem.marker.addListener('click', function() {
            viewModel.populateInfoWindow(this, largeInfowindow);
            map.setCenter(position);
        });
      });
    var bounds = new google.maps.LatLngBounds();

  },

  
  menuItem: ko.observable(), 
  
  menuClick: function() {
            viewModel.populateInfoWindow(this.marker, largeInfowindow);
            map.setCenter(this.marker.position);
            
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
    largeInfowindow.marker = null; 
    largeInfowindow.close(); 
    viewModel.placeData.removeAll();
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

  placeData: ko.observableArray(''), 

 
  populateInfoWindow: function(marker, infowindow) {
    viewModel.placeData.removeAll();
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.open(map, marker);
          yelpApiRequest(marker.yelpData, marker.title); 
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }, 
  apiRecieve: function(name, url, snippet) {
    viewModel.placeData.push(name); 
    viewModel.placeData.push(url); 
    viewModel.placeData.push(snippet); 
    console.log(viewModel.placeData()[0]); 

  }

}


viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel); 

