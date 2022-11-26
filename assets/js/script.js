var searchText = $('#search-text');

var searchBtn = $("#search-button");

var currentWeather = $('#current-weather');

var searchList = $('#search-list');

var searches = [];
var i = 0;
// Adds content to the previous searches section
function addToList() {
       searchList.innerHTML = "";

    for (; i < searches.length; i++) {
        var search = searches[i];

        var li = $('<li>');
        li.text(search);
        li.attr("data-index", i);

        var button = $('<button>');
        button.text("x");

        li.append(button);
        searchList.append(li);
    }
}

// This function runs when the page loads
function init() {
    var storedSearches = JSON.parse(localStorage.getItem("searches"));

    console.log(storedSearches);

    if (storedSearches !== null) {
        searches = storedSearches;
    }

    addToList();
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

searchList.on("click", function(event) {
    var element = event.target;

    if (element.matches("button") === true) {
      var index = element.parentElement.getAttribute("data-index");
      searches.splice(index, 1);
      window.location.reload();
      storeSearches();
      addToList();
    }
  });

  init();
