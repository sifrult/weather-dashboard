var searchInput = $('#search-input');

var searchText = $('#search-text');

var searchBtn = $("#search-button");

var currentWeather = $('#current-weather');

var searchList = $('#search-list');

var searches = [];

// When you click the search button, the following happens
function searchWeather(event) {
    event.preventDefault();

    var srchTxt = searchText.val();

    if (srchTxt === '') {
        return;
    }
console.log(srchTxt)

    // searches.push(srchTxt);
    searchText.val('');

    // storeSearches();
    // addToList();

  }

// Adds content to the previous searches section
function addToList() {

    var storedSearches = JSON.parse(localStorage.getItem("searches"));
    console.log(storedSearches);

    // searchList.innerHTML = "";

    // for (var i = 0; i < searches.length; i++) {
    //     var search = searches[i];

    //     var li = document.createElement('li');
    //     li.textContent = search;
    //     li.setAttribute("data-index", i);

    //     var button = document.createElement('button');
    //     button.textContent = "x";

    //     li.appendChild(button);
    //     searchList.appendChild(li);
    // }
}

// Locally stores the entry in text box

function storeSearches(){

    localStorage.setItem("searches", JSON.stringify(searches));
    console.log(searches)

}

// Click events
searchBtn.on('click', searchWeather)
