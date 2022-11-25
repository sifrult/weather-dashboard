var searchInput = $('#search-input');

var searchText = $('#search-text');

var searchBtn = $("#search-button");

var currentWeather = $('#current-weather');

var searchList = $('#search-list');

var searches = [];
var i = 0;

// When you click the search button, the following happens
function searchWeather() {
    var srchTxt = searchText.val();

    if (srchTxt === '') {
        return;
    }

    searches.push(srchTxt);
    searchText.val('');

    storeSearches();
    addToList();

  }


// Adds content to the previous searches section
function addToList() {
    var storedSearches = JSON.parse(localStorage.getItem("searches"));
    console.log(storedSearches);

    searchList.innerHTML = "";

    for (; i < searches.length; i++) {
        var search = searches[i];

        var li = document.createElement('li');
        li.textContent = search;
        li.setAttribute("data-index", i);

        searchList.append(li);
    }
}

// Locally stores the entry in text box
function storeSearches(){
    localStorage.setItem("searches", JSON.stringify(searches));
}

// Click events
searchBtn.on('click', searchWeather)

searchText.on('keypress', function(event){

    var code = event.keyCode || event.which;
    if (code==13) {
        searchWeather()
    }
});
