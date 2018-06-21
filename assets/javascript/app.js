
$("#submit-button").on("click", function (event) {
  event.preventDefault();

  // initial variable to grab bands from search input
  var search = $("#search-input").val().trim()
  var fixedBandName = search.split(' ').join('-');
  // var images = [];


  var apiKey = "OTZjM2VhNDgtNTRkNi00ZGI0LWFhYWItOWJjYjhlMGQzODg5";
  var queryURL = "https://api.napster.com/v2.2/artists/" + fixedBandName + "?apikey=" + apiKey;



  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // current artist name
    var artistID = response.artists[0].id;
    //current artist bio
    var bio = response.artists[0].blurbs[0];
    // similar artist images
    var queryURL = 'https://api.napster.com/v2.2/artists/' + artistID + '/similar?apikey=' + apiKey;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (res) {
      console.log("image response: ");
      console.log(res);
      for (var i = 0; i < 4; i++) {
        apiKey = "OTZjM2VhNDgtNTRkNi00ZGI0LWFhYWItOWJjYjhlMGQzODg5";
        var imageURL = res.artists[i].links.images.href + "?apikey=" + apiKey;
        
        $.ajax({
          url: imageURL,
          method: "GET"
        }).done(function(imageRes) {
          console.log("image res -----------------")
          console.log(imageRes);
          var imageSrc = imageRes.images[0].url;
          console.log(imageSrc)
          $(".carousel-image-four").attr("src", imageSrc);
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
});

// submit button and take search-input
console.log(search);
 



