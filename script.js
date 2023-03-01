var nameInputEl = document.querySelector('#citySearch');
var currentIconEl = document.querySelector('#currentIcon');
var citySearchEl = document.querySelector('#citySearch');
var cityListEl = document.querySelector('#cityList');
var currentCityEl = document.querySelector('#currentCity');
var currentTempEl = document.querySelector('#currentTemp');
var currentWinEl = document.querySelector('#currentWin');
var currentHumEl = document.querySelector('#currentHum');
var searchSubmitEl = document.querySelector('#searchSubmit');
var currentDateEl = document.querySelector('#currentDate');
var currentInfoEl = document.querySelector('#currentInfo');
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humid = document.querySelector("#humid");
var search = JSON.parse(localStorage.getItem("searchSubmit") || "[]");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = nameInputEl.value.trim();

  if (cityName) {
    getCityTemp(cityName);

    citySearchEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a city name');
  }
};

var getCityTemp = function (cityName) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}' + cityName + '&limit=1&appid=' + key;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayTemp(data, cityName);
        })
      } 
    .then(function(data) {
        var lat = (data[0].lat)
        var lon = (data[0].lon)
        displayWeather(lat, lon);
      })

    .catch(function (error) {
      alert('Unable to find city provided');
      return;
    })
}};


var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

searchSubmitEl.addEventListener('submit', formSubmitHandler);

