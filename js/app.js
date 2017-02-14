var largeInfowindow;


var makeMarkerIcon = function(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http:/chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|&E2%80%A2', 
        new google.maps.Size(21,34), 
        new google.maps.Point(0,0), 
        new google.maps.Point(10,10),
        new google.maps.Size(21, 34)); 

        return markerImage; 
        
}


var viewModel = {

    // Map Initialization
    initMap: function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 34.216806,
                lng: -117.857176
            },
            zoom: 11,
            disableDefaultUI: true
        });
        viewModel.markerInit();
        viewModel.search("");
    },

    markerInit: function() {
        
        // Set up Infowindow to be hooked up with markers created below. 
        largeInfowindow = new google.maps.InfoWindow({
            content: infoWindowTemplate
        });
        var isInfoWindowLoaded = false;
        google.maps.event.addListener(largeInfowindow, 'domready', function() {
            if (!isInfoWindowLoaded) {
                ko.applyBindings(largeInfowindow, $("#info-window")[0]);
                isInfoWindowLoaded = true;
            }
        });

        //Establishing default and highlighted icons for markers. These are created in the makeMarkerIcon function above. 
        var defaultIcon = makeMarkerIcon('ff3838'); 
        var highlightedIcon = makeMarkerIcon('87ff38'); 



        // Iterate through our model and create markers for each one. 
        model.forEach(function(placeItem) {
            var position = {
                lat: placeItem.latlng[0],
                lng: placeItem.latlng[1]
            };
            var yelpPosition = placeItem.latlng;
            var title = placeItem.name;
            placeItem.marker = new google.maps.Marker({
                position: position,
                title: title,
                icon: defaultIcon,
                yelpData: yelpPosition,
                animation: null
            });

            markers.push(placeItem.marker);
            // Create an onclick event to open an infowindow at each marker.
            placeItem.marker.addListener('click', function() {
                viewModel.populateInfoWindow(this);
                map.setCenter(position);
            });

            // Add mouse over and mouse out events to change marker color on selection. 
            placeItem.marker.addListener('mouseover', function() {
                this.setIcon(highlightedIcon); 
            });
            placeItem.marker.addListener('mouseout', function() {
                this.setIcon(defaultIcon); 
            });
        });
        var bounds = new google.maps.LatLngBounds();


    },


    menuItem: ko.observable(),

    menuClick: function() {
        viewModel.populateInfoWindow(this.marker, largeInfowindow);
        map.setCenter(this.marker.position);

    },

    menuMouseOver: function() {
        this.marker.setAnimation(google.maps.Animation.BOUNCE); 

    },

     menuMouseOut: function() {
        this.marker.setAnimation(null); 

    },



    // Set up observables for search functionality. 
    places: ko.observableArray([]),
    query: ko.observable(''),
    menu: ko.observable(true),

    toggleMenu: function() {
        console.log('toggle');
        if (viewModel.menu()) {
            viewModel.menu(false);
        } else {
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
            model.forEach(function(placeItem) {
                viewModel.places.push(placeItem);
                placeItem.marker.setMap(map);
                bounds.extend(placeItem.marker.position);

            });

        } else {
            model.forEach(function(placeItem) {
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
            var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.05, bounds.getNorthEast().lng() + 0.05);
            var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.05, bounds.getNorthEast().lng() - 0.05);
            bounds.extend(extendPoint1);
            bounds.extend(extendPoint2);
        }

        if (markerPlaced) {
            map.fitBounds(bounds);
        }
    },

    placeData: ko.observableArray(''),


    populateInfoWindow: function(marker) {
    
        if (largeInfowindow.marker != marker) {
            largeInfowindow.marker = marker;
            largeInfowindow.open(map, marker);
            viewModel.placeData.removeAll();
            yelpApiRequest(marker.yelpData, marker.title);
            // Make sure the marker property is cleared if the infowindow is closed.
            largeInfowindow.marker.addListener('closeclick', function() {
                largeInfowindow.marker.marker = null;
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