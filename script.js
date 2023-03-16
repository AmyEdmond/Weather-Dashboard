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
    saveSearch(cityName);
    getCoordinates(cityName);

    errorMesEl.innerHTML = "";
  } else {
    errorMesEl.innerHTML = "Please enter a valid city name!";
    return;
  }
};

var saveSearch = function (cityName) {
  console.log('array', search)
  if(Array.isArray(search)){
    localStorage.setItem('city', JSON.stringify(search))
  }
  var history = JSON.parse(localStorage.getItem('city')) /// []
   history.push(cityName)
   localStorage.setItem("city", JSON.stringify(history));
    loadSearch(cityName);
  
};


var loadSearch = function(cityName) {
  console.log(citySearchEl.length, citySearchEl[0])

     var saveCity = document.createElement("button");
     saveCity.className = "btn btn-info btn-sm"
      saveCity.textContent = cityName
      cityListEl.appendChild(saveCity);
    
  
};


var savedSearchHandler = function(event) {
  var listCity = event.target.innerHTML
  cityName = listCity
  getCoordinates(cityName);
  
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
