var gifs = ["dog", "cat", "fish", "thanos", "iron man", "kratos", "aloy", "last of us", "bioshock", "blade runner", "black mirror"];

function displaygif() {

    var getGif = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=j1S6qOxo2x6cW8LpJ6qb5CaVqqfkhQr0&q=" +
        getGif + "&limit=5&offset=&rating=&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating

            // Creating a div for the gif
            var gifDiv = $("<div class='gifDiv'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifsHere").prepend(gifDiv);

        }
    })
}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < gifs.length; i++) {

        var addGif = $("<button>");

        addGif.addClass("gif");

        addGif.attr("data-name", gifs[i]);

        addGif.text(gifs[i]);

        $("#buttons-view").append(addGif)
    }
}

$("#add-gif").on("click", function (event) {

    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    gifs.push(gif);

    renderButtons();
});

$(document).on("click", ".gif", displaygif);

renderButtons();



