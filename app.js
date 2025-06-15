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
