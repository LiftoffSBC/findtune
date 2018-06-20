var apiKey = "OTZjM2VhNDgtNTRkNi00ZGI0LWFhYWItOWJjYjhlMGQzODg5";
var bandName = "the beatles";
var fixedBandName = bandName.split(' ').join('-');
var queryURL = "https://api.napster.com/v2.2/artists/" + fixedBandName + "?apikey=" + apiKey;
console.log(queryURL)
var images = [];
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  //console.log(queryURL)
  // Printing the entire object to console
  //console.log(response);
  var artistID = response.artists[0].id;
  var queryURL = 'https://api.napster.com/v2.2/artists/' + artistID + '/similar?apikey=' + apiKey;
  //console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {
    //console.log(queryURL)
    
    console.log(response);
    //print out 10 similar artists
    for (var i = 0; i < 10; i++) {
     console.log(response.artists[i].name);
     images[i] = response.artists[i].links.images;
     console.log(images[i]);
    }

  })
  //console.log(queryURL);
  var queryURL = 'https://api.napster.com/v2.2/artists/' + artistID + '/images?apikey=' + apiKey;
  //console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {
    //console.log(queryURL)

    console.log(response);
    //the image is the url of the first image grabbed. image of the current artist
    image = response.images[0].url;
    console.log(image);
  });
      
})


