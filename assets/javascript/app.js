var apiKey = "OTZjM2VhNDgtNTRkNi00ZGI0LWFhYWItOWJjYjhlMGQzODg5";
var bandName = "the beatles"; // band name to pass through
var fixedBandName = bandName.split(' ').join('-');
var queryURL = "https://api.napster.com/v2.2/artists/" + fixedBandName + "?apikey=" + apiKey;
var bands = [];
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
  var bio = response.artists[0].blurbs[0]; //artist bio
  console.log(bio);
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
      images[i] = response.artists[i].links.images; // similar artist image url
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
    image = response.images[0].url; // current artist image
    console.log(image);
    $("#artist-image").append(image);
    // current artist name


  });

})
// submit button show/hide results div and take search-input
$("#submit-button").on("click", function (event) {
  event.preventDefault();
  var search = $("#search-input").val().trim()
  if (search === '' || search === undefined || search === null) {
    return;
  }
  bands.push(search);
  console.log(search);
  $("#results").show();
  $("#main").hide();
});

