
//  add movies + info: title - originalTitle - originalLanguage - averageVote

function addMovies(title, originalTitle, originalLanguage, averageVote) {
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

  var myContainer = $(".container");
  myContainer.animate({ scrollTop: myContainer.prop("scrollHeight")});  // not working yet
}

//  movie search with BUTTON

function movieButtonSearch() {

  var input = $("input");
  var title = input.val().toLowerCase();

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

        addMovies(title, originalTitle, originalLanguage, averageVote);
      }
    },

    error: function (rquest, state, error) {
      console.log("AJAX ERROR");
    }
  });

  clearInput();
}

//  movie search with KEYUP - work in progress

function movieKeyupSearch() {
  var me = $(this);
  var title = me.val().toLowerCase();

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
      console.log("AJAX ERROR");
    }
  });
}

//  clear input function

function clearInput() {
  var input = $("input");
  input.val("");
}

//  clear films function - wprk in progress

function clearFilms() {
  var films = $(".film-container");
}

// init function

function init() {
  var doc = $(document);

  // search movie BUTTON
  doc.on("click", "button", movieButtonSearch)

  // search movie KEYUP
  // doc.on("keyup", "input", movieKeyupSearch);

}

$(document).ready(init);
