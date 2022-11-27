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
        var link = $('<a>');
        var button = $('<button>');

        link.text(search);
        link.attr('href', '#');
        li.attr('data-index', i);
        button.text('×');

        li.append(link);
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

// Display the dates
date.text(dayjs().format('MM/D/YYYY'));
var oneDay = dayjs().add(1, 'day').format('MM/D/YYYY');
var twoDays = dayjs().add(2, 'day').format('MM/D/YYYY');
var threeDays = dayjs().add(3, 'day').format('MM/D/YYYY');
var fourDays = dayjs().add(4, 'day').format('MM/D/YYYY');
var fiveDays = dayjs().add(5, 'day').format('MM/D/YYYY');
$('#one_day').text(oneDay);
$('#two_days').text(twoDays);
$('#three_days').text(threeDays);
$('#four_days').text(fourDays);
$('#five_days').text(fiveDays);

// Find todays weather from lat and lon
var todayWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ lon + '&appid=' + api + '&units=imperial';

fetch(todayWeatherUrl)
    .then (function(response) {
        return response.json();
    })
    .then(function(data) {
        todayTemp.text('Temp: ' + data.main.temp + '°F');
        todayWind.text('Wind: ' + data.wind.speed + ' MPH');
        todayHum.text('Humidity: ' + data.main.humidity + '%');
    });

// Find future weather from lat and lon
var futureWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+ lon + '&appid=' + api + '&units=imperial';

fetch(futureWeatherUrl)
    .then (function(response) {
        return response.json();
    })
    .then(function(data) {

        for ( var i = 0; i < data.list.length; i++) {
            var date = data.list[i].dt_txt
            var date1 = date.substr(0,10);

            var noon = date.substr(11,19);

            var reformatDate = dayjs(date1).format('MM/D/YYYY');

            if (reformatDate === oneDay && noon === '12:00:00') {
                $('.one_day_temp').text('Temp: ' + data.list[i].main.temp + '°F');
                $('.one_day_wind').text('Wind: ' + data.list[i].wind.speed + ' MPH');
                $('.one_day_hum').text('Humidity: ' + data.list[i].main.humidity + '%');
            }

            if (reformatDate === twoDays && noon === '12:00:00') {
                $('.two_days_temp').text('Temp: ' + data.list[i].main.temp + '°F');
                $('.two_days_wind').text('Wind: ' + data.list[i].wind.speed + ' MPH');
                $('.two_days_hum').text('Humidity: ' + data.list[i].main.humidity + '%');
            }

            if (reformatDate === threeDays && noon === '12:00:00') {
                $('.three_days_temp').text('Temp: ' + data.list[i].main.temp + '°F');
                $('.three_days_wind').text('Wind: ' + data.list[i].wind.speed + ' MPH');
                $('.three_days_hum').text('Humidity: ' + data.list[i].main.humidity + '%');
            }

            if (reformatDate === fourDays && noon === '12:00:00') {
                $('.four_days_temp').text('Temp: ' + data.list[i].main.temp + '°F');
                $('.four_days_wind').text('Wind: ' + data.list[i].wind.speed + ' MPH');
                $('.four_days_hum').text('Humidity: ' + data.list[i].main.humidity + '%');
            }

            if (reformatDate === fiveDays && noon === '12:00:00') {
                $('.five_days_temp').text('Temp: ' + data.list[i].main.temp + '°F');
                $('.five_days_wind').text('Wind: ' + data.list[i].wind.speed + ' MPH');
                $('.five_days_hum').text('Humidity: ' + data.list[i].main.humidity + '%');
            }
        }


    });
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

    $('.hr').css('display', 'block');

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

        $('.hr').css('display', 'block');

        storeSearches();
        addToList();
    }
});

// Close previous search
searchList.on('click', function(event) {
    var element = $(event.target);

    if (element.is('button') === true) {
        var index = element.parent().attr('data-index');
        searches.splice(index, 1);
        storeSearches();
        addToList();
    }
})
