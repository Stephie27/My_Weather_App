function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = searchInput.value;
  let apiKey = "dbc80t431e2275e57a3b2912ao37a0f9";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

let enterCities = document.querySelector("#search-button");
enterCities = addEventListener("submit", enterCity);

function displayTemp(response) {
  let temperatureElement = document.querySelector(".temperature-num");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  let cityElement = document.querySelector(".current-city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#current-time");
  timeElement.innerHTML = time();

  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = ` <img
                src= "${response.data.condition.icon_url}"
              
                class="temperature-icon"
              />`;

  getForecast(response.data.city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "dbc80t431e2275e57a3b2912ao37a0f9";
  let apiUrll = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrll).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <img src="${day.condition.icon_url}"class="weather-forecast-icon"/>
    <div class="weather-forecast-temps">
      <div class="weather-forecast-temp"><strong>${Math.round(
        day.temperature.maximum
      )}</strong></div>

      <div class="weather-forecast-temp">${Math.round(
        day.temperature.minimum
      )}°C</div>
    </div> 
    </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}

function time() {
  return `${day}, ${hours}:${minutes}`;
}
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
enterCity("Johannesburg");
