var queryURL = "https://api.napster.com/v2.2/artists/u2?apikey=OTZjM2VhNDgtNTRkNi00ZGI0LWFhYWItOWJjYjhlMGQzODg5";


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  //console.log(queryURL)
  // Printing the entire object to console
  //console.log(response);
  var artistID = response.artists[0].id;
  var queryURL = 'https://api.napster.com/v2.2/artists/' + artistID + '/similar?apikey=OTZjM2VhNDgtNTRkNi00ZGI0LWFhYWItOWJjYjhlMGQzODg5';
  //console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {
    //console.log(queryURL)

    //console.log(response);
    //print out 10 similar artists
    for (var i = 0; i < 10; i++) {
      console.log(response.artists[i].name);
    }

  })
})

