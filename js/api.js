function googleError() {
  alert("There seems to be an issue with loading Google Maps. Try refreshing your window."); 
}; 

var yelpApiRequest = function(location, title) {
  viewModel.placeData.removeAll();
  console.log(location); 
  console.log(title); 

  var nonce = function() {
          return (Math.floor(Math.random() * 1e12).toString());
        }; 

  var place = location[0] + "," + location[1]; 

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
    oauth_nonce: nonce(),
    oauth_version : '1.0',
    callback: 'cb',
    term: title,
    location: place          
  };

  var encodedSignature = oauthSignature.generate('GET', yelpAPIUrl, parameters, consumerSecret, tokenSecret);
    parameters.oauth_signature = encodedSignature;

  var settings = {
    url: yelpAPIUrl,
      data: parameters,
      cache: true,
      dataType: "jsonp",
      success: function(results){
        console.log(results.businesses["0"].image_url)
        console.log(results.businesses["0"].rating)
        console.log(results.businesses["0"].snippet_text)
        console.log(results.businesses["0"].snippet_image_url)
        viewModel.apiRecieve(results.businesses["0"].name, results.businesses["0"].image_url, results.businesses["0"].snippet_text); 

      }
  };

  $.ajax(settings);

}; 

