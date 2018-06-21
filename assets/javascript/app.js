
$("#submit-button").on("click", function (event) {
  event.preventDefault();

  // initial variable to grab bands from search input
  var search = $("#search-input").val().trim()
  var fixedBandName = search.split(' ').join('-');

  //MusixMatch Function filter
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://uncc-cors-proxy.herokuapp.com/' + options.url;
    }
  });
  jQuery.ajaxSettings.traditional = true;

  //Musixmatch APIs
  var searchURL =
    "https://api.musixmatch.com/ws/1.1/track.search?q_artist=%22" + search + "%22&"
  var lyricURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id="

  var key = "apikey=27b1b9c9a65fd7e140176cc0d63d7304"

  // Napster APIs
  var apiKey = "OTZjM2VhNDgtNTRkNi00ZGI0LWFhYWItOWJjYjhlMGQzODg5";
  var queryURL = "https://api.napster.com/v2.2/artists/" + fixedBandName + "?apikey=" + apiKey;

  if (search === "" || search === undefined || search === null) {
    return;
  }
  else {

    //musixmatch functions
    $.ajax({
      // Go get the song details
      url: searchURL + key,
      method: "GET"
    }).done(function (response) {
      console.log(searchURL);
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
        var lyrics = parsed.message.body.lyrics.lyrics_body;
        console.log(lyrics);
        $("#lyrics").text(lyrics);

      });
    }

    //Napster functions
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      // current artist name
      var artistName = response.artists[0].name;
      $("#artist-name").text(artistName);
      var artistName = response.artists[0].name;
      $("#artist-name-lower").text(artistName);
      console.log(artistName)
      //artist ID
      var artistID = response.artists[0].id;
      //current artist bio
      var bio = response.artists[0].blurbs[0];
      console.log(bio);
      $("#artist-bio").text(bio);



      // similar artist images
      var queryURL = 'https://api.napster.com/v2.2/artists/' + artistID + '/similar?apikey=' + apiKey;


      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (res) {
        console.log("image response: ");
        console.log(res);
        
        var imageSrcArray = [];
        for (var i = 0; i < 5; i++) {
          apiKey = "OTZjM2VhNDgtNTRkNi00ZGI0LWFhYWItOWJjYjhlMGQzODg5";
          var imageURL = res.artists[i].links.images.href + "?apikey=" + apiKey;

          $.ajax({
            url: imageURL,
            method: "GET"
          }).done(function (imageRes) {
            console.log("image res -----------------")
            console.log(imageRes);
            var imageSrc = imageRes.images[0].url;
            console.log(imageSrc)

            imageSrcArray.push(imageSrc);
            console.log(imageSrcArray);

            for (var i = 0; i < imageSrcArray.length; i++) {
              var tag = '.c' + i
              console.log(tag)
              console.log(imageSrcArray[i])
              $(tag).attr("src", imageSrcArray[i])
            }
          })

        }
      })
      // current artist image
      var queryURL = 'https://api.napster.com/v2.2/artists/' + artistID + '/images?apikey=' + apiKey;

      $.ajax({
        url: queryURL,
        method: "GET"

      }).then(function (response) {
        image = response.images[0].url;
        $("#artist-image").attr("src", response.images[0].url);

      });
    })

    //show/hide results div   
    $("#results").show();
    $("#main").hide();
  }
});

// submit button and take search-input
console.log(search);




