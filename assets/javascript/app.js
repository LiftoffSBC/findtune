
$("#submit-button").on("click", function (event) {
  event.preventDefault();

  // initial variable to grab bands from search input
  var search = $("#search-input").val().trim()
  var fixedBandName = search.split(' ').join('-');
  var images = [];


  var apiKey = "OTZjM2VhNDgtNTRkNi00ZGI0LWFhYWItOWJjYjhlMGQzODg5";
  var queryURL = "https://api.napster.com/v2.2/artists/" + fixedBandName + "?apikey=" + apiKey;



  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // current artist name
    var artistID = response.artists[0].id;
    //current artist bio
    var bio = response.artists[0].blurbs[0];
    // similar artist images
    var queryURL = 'https://api.napster.com/v2.2/artists/' + artistID + '/similar?apikey=' + apiKey;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      for (var i = 0; i < 10; i++) {
        images[i] = response.artists[i].links.images;
        var img = $("<img>");
        img.attr("src", response.artists[i].links.images);
        console.log(images[i]);
      }


    })
    // current artist image
    var queryURL = 'https://api.napster.com/v2.2/artists/' + artistID + '/images?apikey=' + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"

    }).then(function (response) {

      image = response.images[0].url;
      console.log(image);
      $("#artist-image").append(image);

    });
  })

  //show/hide results div   
  $("#results").show();
  $("#main").hide();
});

// submit button and take search-input
console.log(search);
 



