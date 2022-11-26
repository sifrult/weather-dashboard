var searchText = $('#search-text');

var searchBtn = $("#search-button");

var currentWeather = $('#current-weather');

var searchList = $('#search-list');


var searches = [];
var i = 0;

// Adds content to the previous searches section
function addToList() {
    var storedSearches = JSON.parse(localStorage.getItem("searches"));

    if (storedSearches !== null) {
        searches = storedSearches;
    }

    searchList.innerHTML = "";

    for (; i < searches.length; i++) {
        var search = searches[i];

        var button = $('<button>');
        button.text(search);
        button.attr("data-index", i);

        searchList.append(button);
    }

// Code to find the lat and long of a city
var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search.replace(" ", "_") + '&limit=5&appid=3081b8e03e427d8a8b2f19d6ac27558d';

fetch(apiUrl)
    .then (function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data[0].lat)
        console.log(data[0].lon)
    })

}

// Locally stores the entry in text box
function storeSearches(){
    localStorage.setItem("searches", JSON.stringify(searches));
}

// When you click the search button, the following happens
searchBtn.on('click', function(e) {
    e.preventDefault();
    var srchTxt = searchText.val();

    if (srchTxt === '') {
        return;
    }

    searches.push(srchTxt);
    searchText.val('');



    storeSearches();
    addToList();
  })

// Pressing 'enter' triggers the search
searchText.on('keypress', function(event){
    var code = event.keyCode || event.which;
    if (code==13) {
        event.preventDefault();
        var srchTxt = searchText.val();

        if (srchTxt === '') {
            return;
        }

        searches.push(srchTxt);
        searchText.val('');

        storeSearches();
        addToList();
    }
});
