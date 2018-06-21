// $("#submit-button").on("click", function (event) {
//   event.preventDefault();
//   // initial variable to grab band from search input
//   var search = $("#search-input").val().trim()
//   jQuery.ajaxPrefilter(function (options) {
//     if (options.crossDomain && jQuery.support.cors) {
//       options.url = 'https://uncc-cors-proxy.herokuapp.com/' + options.url;
//     }
//   });
//   jQuery.ajaxSettings.traditional = true;
//   // https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=101516356&apikey=27b1b9c9a65fd7e140176cc0d63d7304
 
//   // https://api.musixmatch.com/ws/1.1/track.search?q_track=%22Layla%22&apikey=27b1b9c9a65fd7e140176cc0d63d7304
//   var searchURL =
//     "https://api.musixmatch.com/ws/1.1/track.search?q_artist=%22" + search + "%22&"
//   var lyricURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id="
 
//   var key = "apikey=27b1b9c9a65fd7e140176cc0d63d7304"
  $.ajax({
    // Go get the song details
    url: searchURL + key,
    method: "GET"
  }).done(function (response) {
    //console.log(response);
    var parsed = JSON.parse(response);
    var myTracks = parsed.message.body.track_list
    console.log(JSON.stringify(myTracks, null, 4, ));
    // now go get the lyrics
    var songID = myTracks[0].track.track_id.toString() + "&";
    getLyrics(songID);
 
    }
  );
 
  function getLyrics(id) {
    console.log("URL = " + lyricURL + id + key);
    $.ajax({
      // Go get the song details
      url: lyricURL + id + key,
      method: "GET"
    }).done(function (response) {
      var parsed = JSON.parse(response);
      console.log(parsed);
      var lyrics = parsed.message.body.lyrics.lyrics_body
      console.log(lyrics)
 
    });
  }
 })