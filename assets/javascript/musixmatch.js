jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://uncc-cors-proxy.herokuapp.com/' + options.url;
    }
});
jQuery.ajaxSettings.traditional = true;

queryURL = "https://api.musixmatch.com/ws/1.1/track.search?q_track=%22Layla%22&apikey=27b1b9c9a65fd7e140176cc0d63d7304";


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  //console.log(queryURL)
  // Printing the entire object to console
  console.log(response);
  //get the track id
  var trackID = response.message.body.track_list[0].track.track_id;
  console.log(trackID);
})
