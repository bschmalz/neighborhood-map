// This is called if the google map fails to load. Lets the user know that there was an issue with Google. 
function googleError() {
    alert("There seems to be an issue with loading Google Maps. Try refreshing your window.");
};


// This is called when an infoWindow is opened in order to populate it with that places data from Yelp. 
var yelpApiRequest = function(location, title) {
    // Clear out data that Yelp will retrieve. 
    viewModel.placeData.removeAll();

    // Function to generate a nonce for API authentication. 
    var nonce = function() {
        return (Math.floor(Math.random() * 1e12).toString());
    };

    // Takes the coordinates in the model and formats them to be Yelp friendly. 
    var place = location[0] + "," + location[1];

    // General API key and token info. 
    var yelpAPIUrl = "https://api.yelp.com/v2/search";
    var consumerKey = "xvXh4B427NsVnC2-F4kESQ";
    var token = "iqY4Sz_8lWn3rRiD7Z_CrLkLB6jMemtA";
    var consumerSecret = "qjqTxLIF2WifccrRtw62AI-dZsI";
    var tokenSecret = "tCgodZ0C8Ll-P4eCiYydFTiXx5E";

    // Api Parameters that Yelp requries. 
    var parameters = {
        oauth_consumer_key: consumerKey,
        oauth_token: token,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: Math.floor(Date.now() / 1000),
        //this is typical for oauth found this explanation: see this for explanation https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
        oauth_nonce: nonce(),
        oauth_version: '1.0',
        callback: 'cb',
        term: title,
        location: place
    };

    // This uses the oauth-signature library in order to take the above data and retrieve an encoded signature for Yelp. 
    var encodedSignature = oauthSignature.generate('GET', yelpAPIUrl, parameters, consumerSecret, tokenSecret);
    parameters.oauth_signature = encodedSignature;


    // Setting up the last pieces of settings data for the Yelp API. 
    var settings = {
        url: yelpAPIUrl,
        data: parameters,
        cache: true,
        dataType: "jsonp",
        // Do this if the API request is successful. 
        success: function(results) {

            viewModel.apiRecieve(results.businesses["0"].name, results.businesses["0"].image_url, results.businesses["0"].snippet_text);

        },
        // Do this if the API request fails. 
        error: function() {
            viewModel.apiRecieve("Whoops!", "img/face_sad.png", "There seems to be an issue accessing Yelp. Try refreshing your page.");
        }
    };

    // Fires off the ajax request. 
    $.ajax(settings);
};