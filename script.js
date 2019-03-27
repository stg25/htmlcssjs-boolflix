
//  add movies + info: title - originalTitle - originalLanguage - starVote

function addMovies(title, originalTitle, originalLanguage, averageVote) {
  var tempData = {

    title: title,
    originalTitle: originalTitle,
    originalLanguage: originalLanguage,
    stars: averageVote

  };

  var template = $("#films-template").html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(tempData);
  var container = $(".films-container");
  container.append(finalHTML);
}

//  add TV series + info: title - originalTitle - originalLanguage - starVote

function addSeries(title, originalTitle, originalLanguage, averageVote) {
  var tempData = {

    title: title,
    originalTitle: originalTitle,
    originalLanguage: originalLanguage,
    stars: averageVote

  };

  var template = $("#series-template").html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(tempData);
  var container = $(".series-container");
  container.append(finalHTML);
}

//  movie search with BUTTON

function searchButton() {

  clearDiv() // bug when input is empty

  var input = $("input");
  var title = input.val().toLowerCase();

  var outData = {
    api_key: "d9a3a396cd57a78d96bf9dfa9321f9b2",
    language: "it-IT",
    query: title
  }

  $.ajax({  // movie AJAX
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

        averageVote = voteCount(averageVote)  // count vote and
        averageVote = addStars(averageVote)   // display stars

        originalLanguage = addFlag(originalLanguage)


        addMovies(title, originalTitle, originalLanguage, averageVote);
      }
    },

    error: function (rquest, state, error) {
      console.log("AJAX ERROR");
    }
  });

  $.ajax({  // TV series AJAX
    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: outData,

    success: function (data) {

      var results = data.results;
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var title = result.name;
        var originalTitle = result.original_name;
        var originalLanguage = result.original_language;
        var averageVote = result.vote_average;

        averageVote = voteCount(averageVote)  // count vote and
        averageVote = addStars(averageVote)   // display stars

        originalLanguage = addFlag(originalLanguage)


        addSeries(title, originalTitle, originalLanguage, averageVote);
      }
    },

    error: function (rquest, state, error) {
      console.log("AJAX ERROR");
    }
  });

  clearInput();
}

// add right flag to html

function addFlag(originalLanguage) {
  var flag = "";
  if (originalLanguage == "it") {
    flag = '<i class="fas fa-flag"></i>'
  } else if (originalLanguage == "en") {
    flag = '<i class="fas fa-flag-usa"></i>'
  }
  return flag
}

//  count total vote for stars display

function voteCount(averageVote) {
  dividedVote = averageVote / 2

  if (dividedVote >= 4.5) {
    dividedVote = 5;
  } else if (dividedVote >= 3.5 && dividedVote < 4.5) {
    dividedVote = 4;
  } else if (dividedVote >= 2.5 && dividedVote < 3.5) {
    dividedVote = 3;
  } else if (dividedVote >= 1.5 && dividedVote < 2.5) {
    dividedVote = 2;
  } else if (dividedVote >= 0.5 && dividedVote < 1.5) {
    dividedVote = 1;
  } else if (dividedVote >= 0 && dividedVote < 0.5) {
    dividedVote = 0;
  }

  return dividedVote
}

// add stars full or empty to HTML

function addStars(averageVote) {
  var starVote = "";

  for (var i = 0; i < 5; i++) {
    if (averageVote >= i) {
      starVote += '<i class="fas fa-star">';
    } else {
      starVote += '<i class="far fa-star">';
    }
  }
  return starVote
}

//  movie search with ENTER

function movieEnterSearch(event) {
  if (event.which == 13) {
    searchButton();
  }
}

//  clear input function

function clearInput() {
  var input = $("input");
  input.val("");
}

//  clear films function - wprk in progress

function clearDiv() {
  var films = $(".film-container > p");
  films.remove();
}

// init function

function init() {
  var doc = $(document);

  // search movie BUTTON
  doc.on("click", "button", searchButton)

  // search movie ENTER
  doc.on("keyup", "input", movieEnterSearch);

  // display stars as vote
}

$(document).ready(init);
