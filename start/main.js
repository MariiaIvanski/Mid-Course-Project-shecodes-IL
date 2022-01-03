function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let placeholder = document.querySelector(`#city-input`);

  placeholder.value = ``;
  celsiusTemperature = response.data.main.temp;
  let fahrenheitDegrees = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML =
    Math.round(celsiusTemperature) +
    ` °C/ ` +
    Math.round(fahrenheitDegrees) +
    ` °F`;
  cityElement.innerHTML = response.data.name;
  function displayActivities(temperature) {
    let activities = document.querySelector(`#activities`);
    activities.innerHTML = `<h3>Activities</h3>
        <div class="activities-list row m-0">
          <button class="col">Solo</button><button class="col">Team</button
          ><button class="col">All</button>
        </div>
        <div>
          <ul>
            <li>swimming</li>
            <li>rowing</li>
            <li>running</li>
            <li>jogging</li>
          </ul>
        </div>`;
  }
  displayActivities(celsiusTemperature);
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
