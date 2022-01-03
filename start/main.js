function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let placeholder = document.querySelector(`#city-input`);
  placeholder.value = ``;
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
}

function search(city) {
  let apiKey = "a2d283df905dedf8786b96ad24673f92";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  if (!cityInputElement.value.match(/^[A-Z a-z_-]+$/)) {
    alert("English letters only 😉");
    let placeholder = document.querySelector(`#city-input`);
    placeholder.value = ``;
  } else {
    search(cityInputElement.value.trim());
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
