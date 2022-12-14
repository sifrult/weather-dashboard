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

// Renders items on the page
function renderItems(search) {

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

// Find today's weather
var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${search.replace(" ", "+")}&appid=${api}&units=imperial`;

fetch(currentWeather)
    .then (function(response) {
        return response.json();
    })
    .then (function(data) {
        city.text(data.name);
        $('#today_icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`).attr('title', data.weather[0].description).attr("alt", data.weather[0].description)
        todayTemp.text(`Temp: ${data.main.temp}°F`);
        todayWind.text(`Wind: ${data.wind.speed} MPH`);
        todayHum.text(`Humidity: ${data.main/humidity}%`);
    })

// Find weather for the next 5 days


// Find future weather from lat and lon
var futureWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search.replace(" ", "+")}&appid=${api}&units=imperial`;
console.log (futureWeatherUrl)

fetch(futureWeatherUrl)
    .then (function(response) {
        return response.json();
    })
    .then (function(data) {
        for ( var i = 0; i < data.list.length; i++) {
            var date = data.list[i].dt_txt
            var date1 = date.substr(0,10);
            var noon = date.substr(11,19);
            var reformatDate = dayjs(date1).format('MM/D/YYYY');

            if (reformatDate === oneDay && noon === '12:00:00') {
                $('#one_day_icon').attr('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`).attr('title', data.list[i].weather[0].description).attr('alt', data.list[i].weather[0].description)
                $('.one_day_temp').text(`Temp: ${data.list[i].main.temp}°F`);
                $('.one_day_wind').text(`Wind: ${data.list[i].wind.speed} MPH`);
                $('.one_day_hum').text(`Humidity: ${data.list[i].main.humidity}%`);
            }

            if (reformatDate === twoDays && noon === '12:00:00') {
                $('#two_days_icon').attr('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`).attr('title', data.list[i].weather[0].description).attr('alt', data.list[i].weather[0].description)
                $('.two_days_temp').text(`Temp: ${data.list[i].main.temp}°F`);
                $('.two_days_wind').text(`Wind: ${data.list[i].wind.speed} MPH`);
                $('.two_days_hum').text(`Humidity: ${data.list[i].main.humidity}%`);
            }

            if (reformatDate === threeDays && noon === '12:00:00') {
                $('#three_days_icon').attr('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`).attr('title', data.list[i].weather[0].description).attr('alt', data.list[i].weather[0].description)
                $('.three_days_temp').text(`Temp: ${data.list[i].main.temp}°F`);
                $('.three_days_wind').text(`Wind: ${data.list[i].wind.speed} MPH`);
                $('.three_days_hum').text(`Humidity: ${data.list[i].main.humidity}%`);
            }

            if (reformatDate === fourDays && noon === '12:00:00') {
                $('#four_days_icon').attr('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`).attr('title', data.list[i].weather[0].description).attr('alt', data.list[i].weather[0].description)
                $('.four_days_temp').text(`Temp: ${data.list[i].main.temp}°F`);
                $('.four_days_wind').text(`Wind: ${data.list[i].wind.speed} MPH`);
                $('.four_days_hum').text(`Humidity: ${data.list[i].main.humidity}%`);
            }

            if (reformatDate === fiveDays && noon === '12:00:00') {
                $('#five_days_icon').attr('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`).attr('title', data.list[i].weather[0].description).attr('alt', data.list[i].weather[0].description)
                $('.five_days_temp').text(`Temp: ${data.list[i].main.temp}°F`);
                $('.five_days_wind').text(`Wind: ${data.list[i].wind.speed} MPH`);
                $('.five_days_hum').text(`Humidity: ${data.list[i].main.humidity}%`);
            }
        }
    });
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
    $('#forecast-title').css('display', 'block');

    searchList.empty();

    for (var i = 0; i < searches.length; i++) {
        var search = searches[i];

        var li = $('<li>');
        var link = $('<a>');

        link.text(search);
        link.attr('href', '#').attr('class', search);
        li.attr('data-index', i);

        li.append(link);
        searchList.append(li);
    }

    storeSearches();
    renderItems(search);
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
        $('#forecast-title').css('display', 'block');

        searchList.empty();

        for (var i = 0; i < searches.length; i++) {
            var search = searches[i];

            var li = $('<li>');
            var link = $('<a>');

            link.text(search);
            link.attr('href', '#').attr('class', search);
            li.attr('data-index', i);

            li.append(link);
            searchList.append(li);
        }

        storeSearches();
        renderItems(search);
    }
});

// Re-render a previous search
$(document).on('click', 'a', function() {
    var search = $(this).attr('class');
    renderItems(search);
})
