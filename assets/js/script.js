var searchText = $('#search-text');

var city = $('.city');
var date = $('.date');
var todayTemp = $('.current_temp');
var todayWind = $('.current_wind');
var todayHum = $('.current_humidity');

var searchBtn = $("#search-button");

var currentWeather = $('#current-weather');

var searchList = $('#search-list');

var api = '3081b8e03e427d8a8b2f19d6ac27558d';
var searches = [];


var lat;
var lon;

// Adds content to the previous searches section
function addToList() {
    var storedSearches = JSON.parse(localStorage.getItem("searches"));

    if (storedSearches !== null) {
        searches = storedSearches;
    }

    searchList.empty();

    for (var i = 0; i < searches.length; i++) {
        var search = searches[i];

        var li = $('<li>');
        li.text(search);
        li.attr('data-index', i);

        var button = $('<button>');
        button.text('×');

        li.append(button);
        searchList.append(li);


    }

// Code to find the lat and lon of a city
var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + search.replace(" ", "_") + '&limit=5&appid=' + api;

fetch(apiUrl)
    .then (function(response) {
        return response.json();
    })
    .then(function (data) {
        lat = (data[0].lat);
        lon = (data[0].lon);
        city.text(data[0].name);
        date.text(dayjs().format('D/MM/YYYY'));


// Find weather from lat and lon
var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ lon + '&appid=' + api + '&units=imperial';

fetch(weatherApiUrl)
    .then (function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        todayTemp.text('Temp: ' + data.main.temp + '°F');
        todayWind.text('Wind: ' + data.wind.speed + 'MPH');
        todayHum.text('Humidity: ' + data.main.humidity + '%');
    })

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

searchList.on('click', function(event) {
    var element = $(event.target);

    if (element.is('button') === true) {
        var index = element.parent().attr('data-index');
        searches.splice(index, 1);
        storeSearches();
        addToList();
    }
})
