var searchBtn = $("#search-button");

var currentWeather = $('#current-weather');

function searchWeather(event) {
    event.preventDefault();

    console.log('hello');
}

searchBtn.on('click', searchWeather)
