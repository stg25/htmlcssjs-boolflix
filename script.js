
// add movie info: title and popularity

function addMovieInfo(title, originalTitle, originalLanguage, averageVote) {
  var tempData = {

    title: title,
    originalTitle: originalTitle,
    originalLanguage: originalLanguage,
    averageVote: averageVote

  };

  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(tempData);
  var container = $(".film-container");
  container.append(finalHTML);
}

// ajax test

function movieSearch(title) {

  var outData = {
    api_key: "d9a3a396cd57a78d96bf9dfa9321f9b2",
    language: "it-IT",
    query: title
  }

  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: outData,

    success: function (data) {

      var results = data.results;
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var title = result.title;
        var originalTitle = result.original_title;
        var originalLanguage = result.original_language;
        var averageVote = result.vote_average;

        addMovieInfo(title, originalTitle, originalLanguage, averageVote);
      }

    },

    error: function (rquest, state, error) {

    }
  });
}

// init function

function init() {
  var doc = $(document);

  doc.on("click", "button", function () {
    movieSearch("back in the future")
  })


}

$(document).ready(init);

















































// Finish
