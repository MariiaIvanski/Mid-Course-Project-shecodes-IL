"use strict";
(function () {
  const apiKey = "a2d283df905dedf8786b96ad24673f92";
  const url = "http://api.openweathermap.org/data/2.5/weather?q=";
  const activities = {
      teamIn: ["basketball", "hockey", "volleyball"],
      teamOutWarm: [
        "softball/baseball",
        "football/soccer",
        "American football",
        "rowing",
        "tennis",
        "volleyball",
        "ultimate frisbee",
        "rugby",
      ],
      teamOutCold: ["hockey"],
      soloIn: ["rock climbing", "swimming", "ice skating"],
      soloOutWarm: ["rowing", "running", "hiking", "cycling", "rock climbing"],
      soloOutCold: [
        "snowshoeing",
        "downhill skiing",
        "cross-country skiing",
        "ice skating",
      ],

    let state = {};
    let category = "all";
  }
  
  document.querySelector(".forecast-button").addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      document.querySelector("#city-input").value = "";

	fetch(url + location + '&appid=' + apiKey).then(function(response){
return(response.json());
		}).then(function(response) {
			updateUISuccess(response);
		}).catch(function() {
			updateUIFailure();
		});
	}, false);



  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let placeholder = document.querySelector(`#city-input`);
    placeholder.value = ``;
    let celsiusTemperature = response.data.main.temp;
    let fahrenheitDegrees = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML =
      Math.round(celsiusTemperature) +
      ` °C/ ` +
      Math.round(fahrenheitDegrees) +
      ` °F`;
    cityElement.innerHTML = response.data.name;
    displayActivities(celsiusTemperature);
  }

  function search(city) {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(weatherUrl).then(displayTemperature);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector(`#city-input`);
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

  function updateUIFailure() {
    document.querySelector(".conditions").textContent =
      "Weather information unavailable";
  }


  search(`Odesa`);


})();
