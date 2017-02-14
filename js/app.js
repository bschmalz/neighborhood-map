// This creates our google marker icons. Used to generate the default and highlighted versions. 
var makeMarkerIcon = function(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http:/chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|&E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 10),
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
            zoom: 10,
            disableDefaultUI: true
        });

        // Now that the map is setup. Initialize the markers. 
        viewModel.markerInit();

        // Runs a search on a fresh initialization to center/zoom map on model data. 
        viewModel.search("");
    },

    // Marker Initialization
    markerInit: function() {

        // Set up Infowindow to be hooked up with markers created below. 
        largeInfowindow = new google.maps.InfoWindow({
            content: infoWindowTemplate
        });

        // Set up bindings on InfoWindow once it is created.
        google.maps.event.addListener(largeInfowindow, 'domready', function() {
            ko.applyBindings(largeInfowindow, $("#info-window")[0]);

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


    },

    // Called by knockout when list items are clicked. Positions map and opens infoWindow. 
    menuClick: function() {
        viewModel.populateInfoWindow(this.marker, largeInfowindow);
        map.setCenter(this.marker.position);

    },

    // Called by knockout when list items are moused over. Causes them to bounde. 
    menuMouseOver: function() {
        this.marker.setAnimation(google.maps.Animation.BOUNCE);

    },


    // Called by knockout when list items are moused off. Removes bounce animation. 
    menuMouseOut: function() {
        this.marker.setAnimation(null);

    },



    // Observable about menu status used to open close it. 
    menu: ko.observable(true),

    // Simple method used to toggle the menu observable called by knockout events placed in the burger icon on the index file. 
    toggleMenu: function() {
        console.log('toggle');
        if (viewModel.menu()) {
            viewModel.menu(false);
        } else {
            viewModel.menu(true);
        }
    },

    // Set up observables for search functionality. 
    places: ko.observableArray([]),
    query: ko.observable(''),

    // Search controls what is seen based on text input. 
    search: function(value) {

        // Clear our the places array to create a fresh search. 
        viewModel.places.removeAll();

        // Set up bounds to be used for map zooming centering based on search results. 
        var bounds = new google.maps.LatLngBounds();

        // Track whether or not a marker is placed to avoid google from zooming into the a random spot when no results are returned. 
        var markerPlaced = false;

        // Do this is the search is empty. (Return all items)
        if (value == '') {
            markerPlaced = true;

            model.forEach(function(placeItem) {
                viewModel.places.push(placeItem);
                placeItem.marker.setMap(map);
                bounds.extend(placeItem.marker.position);

            });

            // If there is search data, compare it against each item in our model data for a match. 
        } else {
            model.forEach(function(placeItem) {
                placeItem.marker.setMap(null);
                if (placeItem.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {

                    // Add place to our places array since it matched our search. 
                    viewModel.places.push(placeItem);

                    // Place the item on the map. 
                    placeItem.marker.setMap(map);

                    //Extend the bounds of the map to fit the new marker. 
                    bounds.extend(placeItem.marker.position);

                    // Lets us know that we have placed a marker. 
                    markerPlaced = true;
                }

            });
        }

        // This code is used to pull back our map zoom a bit as I've found google likes its zoom tighter that I'd prefer for this example at least. 
        var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.03, bounds.getNorthEast().lng() + 0.03);
        var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.03, bounds.getNorthEast().lng() - 0.03);
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);

        // If we a marker is placed then re fit map bounds accordingly. 
        if (markerPlaced) {
            map.fitBounds(bounds);
        }

    },

    // Observable data used to fill in infoWindows on the map. Info is generated by the Yelp API. 
    placeData: ko.observableArray(''),

    // This is called on events to open the infoWindow. 
    populateInfoWindow: function(marker) {

        // Check that we aren't clicking on a marker that is already active. 
        if (largeInfowindow.marker != marker) {
            largeInfowindow.marker = marker;
            largeInfowindow.open(map, marker);

            // Remove data on observable array before requesting data from Yelp to replace it with. 
            viewModel.placeData.removeAll();
            yelpApiRequest(marker.yelpData, marker.title);

            // Make sure the marker property is cleared if the infowindow is closed.
            largeInfowindow.addListener('closeclick', function() {
                largeInfowindow.marker = null;
            });
        }
    },

    // This is the function that runs after we recieve a callback from the Yelp API. 
    apiRecieve: function(name, url, snippet) {
        viewModel.placeData.push(name);
        viewModel.placeData.push(url);
        viewModel.placeData.push(snippet);
        console.log(viewModel.placeData()[0]);

    }

}

// Sets up our KO search on load. 
viewModel.query.subscribe(viewModel.search);

// Applies knockout to the viewModel on load. 
ko.applyBindings(viewModel);