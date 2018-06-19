//variables
var artistNames = [];
var artistSongs = [];
var queryURL = "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&formatversion=2";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

  // Printing the entire object to console
  console.log(response);
  
});

