var food = [];
var mgif= 10;
function renderButtons() {
    $("#food").empty();
    //ngif=$("#food-ngif").val().trim();
    for (var i = 0; i < food.length; i++) {
      
      var fooditem = $("<button>");
      fooditem.addClass("food1");
      fooditem.attr("data-food", food[i]);
      //fooditem.attr("data-gif", ngif);
      fooditem.text(food[i]);
      $("#food").append(fooditem);
    }
  }

  $("#add-food").on("click", function(event) {
    event.preventDefault();

    var item = $("#food-input").val().trim();
    mgif = $("#food-ngif").val()
    food.push(item);
    renderButtons();
  });

  function foodfunction() {
    $("#food-view").empty();
    var food2 = $(this).attr("data-food");
    //var mgif = $(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      food2 + "&api_key=dc6zaTOxFJmzC&limit=" + mgif;
    
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
         
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var stat = "still";
            var p = $("<p>").text("Rating: " + results[i].rating);
            var foodImage = $("<img>");
            foodImage.addClass("animate");
            foodImage.attr("src", results[i].images.fixed_height_still.url);
            foodImage.attr("data-animate", results[i].images.fixed_height.url);
            foodImage.attr("data-still", results[i].images.fixed_height_still.url);
            foodImage.attr("data-state", stat);
            $("#food-view").prepend(p);
            $("#food-view").prepend(foodImage);
          }
        });
  }

  $(document).on("click", ".animate", foodanimate);

  function foodanimate(){
  
    var state = $(this).attr("data-state");

    
      if (state == "still"){
        var image = $(this).attr("data-animate");
        $(this).attr("src", image);
        $(this).attr("data-state","animate");

      } else {
        var image = $(this).attr("data-still");
        $(this).attr("src", image);
        $(this).attr("data-state","still");
      }
    };

  $(document).on("click", ".food1", foodfunction);
 
  renderButtons();

