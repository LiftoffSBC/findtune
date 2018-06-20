var songTitle = $(".input");
console.log(songTitle);
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://uncc-cors-proxy.herokuapp.com/' + options.url;
    }
  });
  jQuery.ajaxSettings.traditional = true;
  var searchURL =
    "https://api.musixmatch.com/ws/1.1/track.search?q_artist=%22Sting %22&"
  var lyricURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id="

  var key = "apikey=27b1b9c9a65fd7e140176cc0d63d7304"
  //console.log(lyricURL);
  $.ajax({
    // Go get the song details
    url: searchURL + key,
    method: "GET"
  }).done(function (response) {
    var parsed = JSON.parse(response);
    var myTracks = parsed.message.body.track_list
    //console.log(JSON.stringify(myTracks, null, 4, ));
    // now go get the lyrics
    for (var i = 0; i < myTracks.length; i++) {

      var songID = myTracks[i].track.track_id.toString() + "&";
      getLyrics(songID);

    }
  });

  function getLyrics(id) {
    //console.log("URL = " + lyricURL + id + key);
    $.ajax({
      // Go get the song details
      url: lyricURL + id + key,
      method: "GET"
    }).done(function (response) {
      var parsed = JSON.parse(response);
      console.log(parsed);
      var lyrics = parsed.message.body.lyrics.lyrics_body
      //+console.log(lyrics)

    });
  }