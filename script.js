var apiKey = "747edca747fb2dee8924bc6b71324f4a";
var currentIconEl = document.querySelector("#currentIcon");
var citySearchEl = document.querySelector("#citySearch");
var errorMesEl = document.querySelector("#cityError");
var cityListEl = document.querySelector("#cityList");
var currentCityEl = document.querySelector("#currentCity");
var currentWeatherEl = document.querySelector("#currentWeather");
var currentTempEl = document.querySelector("#currentTemp");
var currentWinEl = document.querySelector("#currentWin");
var currentHumEl = document.querySelector("#currentHum");
var searchSubmitEl = document.querySelector("#searchSubmit");
var currentDateEl = document.querySelector("#currentDate");
var currentInfoEl = document.querySelector("#currentInfo");
var today = dayjs();
var search = JSON.parse(localStorage.getItem("city")) || [];

var formSubmitHandler = function (event) {
  event.preventDefault();
  //console.log(formSubmitHandler)
  
  var cityName = citySearchEl.value.trim();
  citySearchEl.value = "";
  if (cityName) {
    search.push(cityName)
    saveSearch(search);
    getCoordinates(cityName);

    errorMesEl.innerHTML = "";
  } else {
    errorMesEl.innerHTML = "Please enter a valid city name!";
    return;
  }
};

var saveSearch = function (cityName) {
  localStorage.setItem("city", JSON.stringify(cityName));
  loadSearch();
};


var loadSearch = function () {
  var search = window.localStorage.getItem("city") || [];
      for (var i = 0; i < search.length; i++) {
      var li = document.createElement("li");
      li.textContent = search[i]
      cityListEl.appendChild(li);
    }
  
};

var savedSearchHandler = function(event){
  var city = event.target.getAttribute("cityName")
  if(city){
    getCoordinates(cityName);
  }
}

var getCoordinates = function (cityName) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=metric";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;
      getCityTemp(lat, lon);
      get5dayTemp(lat, lon);
    });
};

var getCityTemp = function (lat, lon) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=metric";

  fetch(apiUrl)
    .then(function (response) {
      // console.log(response)
      return response.json();
    })
    .then(function (data) {
      currentWeather(data);
    });
};

var currentWeather = function (data) {
  console.log(data);
  currentCityEl.textContent = data.name;

  currentDateEl.textContent = " (" + today.format("MMMM D YYYY") + ")";
  var iconLink =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  currentTempEl.textContent = "Temperature: " + data.main.temp + "\u00B0C";
  currentHumEl.textContent = "Humidity: " + data.main.humidity + "%";
  currentWinEl.textContent = "Wind speed: " + data.wind.speed + "KMH";
  currentIconEl.src = iconLink;
};

var get5dayTemp = function (lat, lon) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=metric";
  fetch(apiUrl)
    .then(function (response) {
      // console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      forecastWeather(data);
    });
};

var forecastWeather = function (data) {
  for (var i = 0; i <= 4; i++) {
    var tempEl = document.querySelector("#Temp-" + i);
    var windEl = document.querySelector("#Wind-" + i);
    var humidEl = document.querySelector("#Hum-" + i);
    var dayEl = document.querySelector("#day-" + i);
    var iconEl = document.querySelector("#icon-" + i);
    var weatherData = data.list[i * 8];
    var iconLink =
      "https://openweathermap.org/img/wn/" +
      weatherData.weather[0].icon +
      "@2x.png";
    var dateData = weatherData.dt_txt.split(" ");
    dayEl.textContent = "(" + dateData[0] + ")";
    tempEl.textContent = "Temperature: " + weatherData.main.temp + "\u00B0C";
    humidEl.textContent = "Humidity: " + weatherData.main.humidity + "%";
    windEl.textContent = "Wind speed: " + weatherData.wind.speed + "KMH";
    iconEl.src = iconLink;
  }
};


searchSubmitEl.addEventListener("click", formSubmitHandler);
cityListEl.addEventListener("click", savedSearchHandler)
