// Display current time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDay = document.querySelector("#day-and-time");
currentDay.innerHTML = `${day}, ${date} of ${month} </br>${hour}:${minutes}`;

// Update City and weather

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");

  degrees.innerHTML = `${temperature}`;
}

function updateWeather(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#city-value");
  let city = document.querySelector("#city");

  if (searchCity.value) {
    city.innerHTML = `${searchCity.value}`;
    let cityName = city.innerHTML;

    let apiKey = "add14ae795612e68aab6557cae6f369f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemperature);
  } else {
    alert(`Please, type a city name.`);
  }
}

let enterCityForm = document.querySelector("#enter-city");
enterCityForm.addEventListener("submit", updateWeather);

// Show default city weather

let city = document.querySelector("#city");
let cityName = city.innerHTML;

let apiKey = "add14ae795612e68aab6557cae6f369f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);

// Bonus: Current location

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "add14ae795612e68aab6557cae6f369f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentCity(position) {
  let currentCity = position.data.list[0].name;

  let city = document.querySelector("#city");
  city.innerHTML = `${currentCity}`;
}

function searchCurrentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "add14ae795612e68aab6557cae6f369f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);
