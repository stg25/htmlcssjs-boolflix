
//  add movies + info: title - originalTitle - originalLanguage - starVote

function addMovies(title, originalTitle, originalLanguage, averageVote, img) {
  var tempData = {

    img: img,
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

function addSeries(title, originalTitle, originalLanguage, averageVote, img) {
  var tempData = {

    img: img,
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

  if (title.length == 0) {  // block ajax call
    return;
  }

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
        var img = result.poster_path;

        originalLanguage = addFlag(originalLanguage)  // display states flag

        averageVote = voteCount(averageVote)  // count vote and
        averageVote = addStars(averageVote)   // display stars

        img = addMovieImg(img) // add image to HTML

        addMovies(title, originalTitle, originalLanguage, averageVote, img);
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
        var img = result.backdrop_path;

        originalLanguage = addFlag(originalLanguage)

        averageVote = voteCount(averageVote)
        averageVote = addStars(averageVote)

        img = addSerieImg(img)

        addSeries(title, originalTitle, originalLanguage, averageVote, img);
      }
    },

    error: function (rquest, state, error) {
      console.log("AJAX ERROR");
    }
  });

  clearInput();
}

//  add movie images to html

function addMovieImg(img) {
  if (img == null) {
    imgPath = "movieImg.jpeg"
  } else {
    imgPath = "https://image.tmdb.org/t/p/w300" + img;
  }
  return imgPath
}

//  add tv series images to html

function addSerieImg(img) {
  if (img == null) {
    imgPath = "serieImg.jpeg"
  } else {
    imgPath = "https://image.tmdb.org/t/p/w300" + img;
  }
  return imgPath
}

//  add right flag to html

function addFlag(originalLanguage) {
  var flag = "";
  if (originalLanguage == "it") {
    flag = "🇮🇹";
  } else if (originalLanguage == "en") {
    flag = "🇬🇧";
  } else if (originalLanguage == "es") {
    flag = "🇪🇸";
  } else {
    flag = "🏳️";
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
      starVote += '<i class="fas fa-star"></i>';
    } else {
      starVote += '<i class="far fa-star"></i>';
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

//  clear films function

function clearDiv() {
  var films = $(".films-container > div.film");
  var series = $(".series-container > div.serieTv");

  films.remove();
  series.remove();
}

// init function

function init() {
  var doc = $(document);

  // search movie BUTTON
  doc.on("click", "button", searchButton)

  // search movie ENTER
  doc.on("keyup", "input", movieEnterSearch);

  // mouseenter movie-info shown
  doc.on("mouseenter", ".film-img", function () {
    var me = $(this);
    var finded = me.find("div.film-info");
    finded.removeClass("hidden")
  })

  // mouseleave movie-info hidden
  doc.on("mouseleave", ".film-img", function () {
    var me = $(this);
    var finded = me.find("div.film-info");
    finded.addClass("hidden")
  })

  // mouseenter serie-info shown
  doc.on("mouseenter", ".serieTv-img", function () {
    var me = $(this);
    var finded = me.find("div.serieTv-info");
    finded.removeClass("hidden")
  })

  // mouseleave serie-info hidden
  doc.on("mouseleave", ".serieTv-img", function () {
    var me = $(this);
    var finded = me.find("div.serieTv-info");
    finded.addClass("hidden")
  })


}

$(document).ready(init);
