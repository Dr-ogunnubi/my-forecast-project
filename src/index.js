function showWeather(response) {
  let temperatureValueElement = document.querySelector("#temperature-value");
  let cityInputElement = document.querySelector("#city-input");
  let h1 = document.querySelector("#weather-city");
  let currentHumidityElement = document.querySelector("#current-humidity");
  let currentWindspeedElement = document.querySelector("#current-windspeed");
  let currentDescriptionElement = document.querySelector(
    "#current-description"
  );
  let currentIconElement = document.querySelector("#current-temperature-icon");
  let CurrentDateElement = document.querySelector("#current-date");

  let currentTemperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  currentHumidity = `${response.data.temperature.humidity}%`;
  currentWindspeed = `${response.data.wind.speed}Km/h`;

  CurrentDateElement.innerHTML = formatDate(date);
  currentIconElement.innerHTML = `<img
      src= ${response.data.condition.icon_url}
      class="current-temperature-icon"/>`;
  currentDescriptionElement.innerHTML = response.data.condition.description;
  currentWindspeedElement.innerHTML = currentWindspeed;
  currentHumidityElement.innerHTML = currentHumidity;
  h1.innerHTML = city;
  temperatureValueElement.innerHTML = currentTemperature;
  console.log(response);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  console.log(date);
  console.log(minutes);
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[date.getDay()];
  console.log(day);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  console.log(time);

  return `${day} ${time}`;
}

let date = new Date();

function searchCity(city) {
  let apiKey = "ff69318boa02a4e62f1a9e845ad0e1t9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let city = cityInputElement.value;
  let h1 = document.querySelector("#weather-city");
  h1.innerHTML = city;

  searchCity(city);
  console.log(city);
}

let formContainer = document.querySelector("#form-container");
formContainer.addEventListener("submit", showCity);

searchCity("Sydney");

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-date">
            <div class="forecast-day">${day}</div>
            <div class="forecast-icon">⛅</div>
            <div class="forecast-temperatures">
              <div class="forecast-temperature"><strong>19°</strong></div>
              <div class="forecast-temperature">23°</div>
            </div>
            </div>`;
  });

  let forecastContainerElement = document.querySelector("#forecast-container");
  forecastContainerElement.innerHTML = forecastHtml;
}
displayForecast();
