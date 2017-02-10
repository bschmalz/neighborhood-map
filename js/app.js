     
var map;
var markers = []; 

















var model = [
  {
    name: "Echo Mountain", 
    Address: "E Loma Alta Dr At Lake Ave, Altadena, CA 91001", 
    latlng: {lat: 34.204037, lng: -118.130727}
  },
    {
    name: "Mount Baldy", 
    Address: "6700 Mount Baldy Rd, Mount Baldy, CA 91759", 
    latlng: {lat: 34.263857, lng: -117.633171}
  },
  {
    name: "IceHouse Canyon", 
    Address: "Mount Baldy, CA 91759", 
    latlng: {lat: 34.250548, lng: -117.635915}
  },
  {
    name: "Bridge to Nowhere", 
    Address: "Sheep Mountain at East Fork Rd, Azusa, CA 91702", 
    latlng: {lat: 34.237041, lng: -117.765125}
  },
  {
    name: "Mount Wilson", 
    Address: "189 E Mira Monte Ave, Sierra Madre, CA 91024", 
    latlng: {lat: 34.169445, lng: -118.048322}
  },
  {
    name: "Devil's Punchbowl", 
    Address: "Devil's Punchbowl, 28000 Devils Punchbowl Rd, Pearblossom, CA 93553, USA", 
    latlng: {lat: 34.414584, lng: -117.859712}
  },
  {
    name: "Switzer Falls", 
    Address: "34-14 Angeles Crest Hwy, La Canada Flintridge, CA 91011", 
    latlng: {lat: 34.266005, lng: -118.144769}
  },
  {
    name: "Gabrielino Trail", 
    Address: "Windsor St, Altadena, CA", 
    latlng: {lat: 34.193337, lng: -118.168434}
  },
  {
    name: "Monrovia Canyon", 
    Address: "1200 N Canyon Blvd, Monrovia, CA 91016", 
    latlng: {lat: 34.174983, lng: -117.987154}
  },
  {
    name: "Crystal Lake", 
    Address: "San Gabriel Canyon, Azusa, CA 91702", 
    latlng: {lat: 34.32416, lng: -117.835568}
  },
  {
    name: "North Etiwanda Preserve", 
    Address: "4800 Etiwanda Ave, Rancho Cucamonga, CA 91739", 
    latlng: {lat: 34.165617, lng: -117.523311}
  },
  {
    name: "Strawberry Peak", 
    Address: "Angeles Crest Hwy at Mile Marker 38.4, Los Angeles, CA", 
    latlng: {lat: 34.258502, lng: -118.104763}
  },
  {
    name: "Cooper Canyon Falls", 
    Address: "Angeles Crest Highway, Buckhorn Campground, Angeles National Forest, La Canada Flintridge, CA", 
    latlng: {lat: 34.346094, lng: -117.914629}
  }
]; 


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

  // General Init Function to call the more specific ones. 
  init: function() {
    viewModel.menuInit();
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

  yelp: {
      nonce: function() {
        return (Math.floor(Math.random() * 1e12).toString());
      }, 
      request: function(term, location, marker, infowindow) {
        
        var yelp_url = "https://api.yelp.com/v2/search?";

        var YELP_KEY = "xvXh4B427NsVnC2-F4kESQ";
        YELP_TOKEN = "iqY4Sz_8lWn3rRiD7Z_CrLkLB6jMemtA";
        YELP_KEY_SECRET ="qjqTxLIF2WifccrRtw62AI-dZsI";
        YELP_TOKEN_SECRET = " tCgodZ0C8Ll-P4eCiYydFTiXx5E";

      var parameters = {
      term: term,
      location: location,
      oauth_consumer_key: YELP_KEY,
      oauth_token: YELP_TOKEN,
      oauth_nonce: viewModel.yelp.nonce(),
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version : '1.0',
      callback: 'cb'              // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    };

}
  },

  populateInfoWindow: function(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
/*
var nytUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=4419e7dabaf1427b8d0760db2b917bf6'; 
    $.getJSON(nytUrl, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr); 
        var articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i]; 
    $("#nytimes-articles").append('<li> <a href="'+article.web_url+'">'+article.headline.main+'</a> <p>'+article.snippet+'</p> </li>');       } 

    })
    .fail(function(e) {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded'); 

    }); 

    */


          infowindow.setContent('<div class="infoWindow">' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }



}
/*
var ViewModel = function() {
  var self = this; 
  this.placeList = ko.observableArray([]); 
  model.forEach(function(placeItem){
    self.placeList.push(new Place(placeItem));

   
  });
}
*/

viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel); 

var nonce = function() {
        return (Math.floor(Math.random() * 1e12).toString());
      }; 

nonceNumber = nonce(); 
var coolSpot = "34.204037, -118.130727";

var yelpAPIUrl = "https://api.yelp.com/v2/search";
var consumerKey = "xvXh4B427NsVnC2-F4kESQ";
var token = "iqY4Sz_8lWn3rRiD7Z_CrLkLB6jMemtA";
var consumerSecret = "qjqTxLIF2WifccrRtw62AI-dZsI";
var tokenSecret = "tCgodZ0C8Ll-P4eCiYydFTiXx5E";

var parameters = {
  oauth_consumer_key: consumerKey,
  oauth_token: token,
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Math.floor(Date.now()/1000),
  //this is typical for oauth found this explanation: see this for explanation https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
  oauth_nonce: nonceNumber,
  oauth_version : '1.0',
  callback: 'cb',
  term: "food",
  location: coolSpot           
};

var encodedSignature = oauthSignature.generate('GET', yelpAPIUrl, parameters, consumerSecret, tokenSecret);
  parameters.oauth_signature = encodedSignature;

var settings = {
  url: yelpAPIUrl,
    data: parameters,
    cache: true,
    dataType: "jsonp",
    success: function(results){
      console.log(results);
    }
};

$.ajax(settings);



viewModel.init(); 


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
        */
     
