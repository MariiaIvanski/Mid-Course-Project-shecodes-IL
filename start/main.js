"use strict";
(function () {
  const apiKey = "a2d283df905dedf8786b96ad24673f92";

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
  };
  let state = {};
  let category = "all";

  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector(`#location`).value;
    city = city.trim();
    search(city);
  }

  function search(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather).catch(updateUIFailure);
    document.querySelector(`#location`).value = "";
  }

  let types = document.querySelector(".options");
  types.addEventListener("click", updateActivityList, false);

  function displayWeather(response) {
    document.querySelector(".conditions").textContent = "";
    let celsiusTemperature = response.data.main.temp;
    celsiusTemperature = Math.round(celsiusTemperature);

    let fahrenheitDegrees = Math.round((celsiusTemperature * 9) / 5 + 32);
    state = {
      condition: response.data.weather[0].main,
      icon:
        "http://openweathermap.org/img/w/" +
        response.data.weather[0].icon +
        ".png",
      celsiusTemperature: celsiusTemperature,
      fahrenheitDegrees: fahrenheitDegrees,
      city: response.data.name,
    };

    const into = document.querySelector(".conditions");
    let container = document.createElement("div");
    let cityParagr = document.createElement("p");
    cityParagr.setAttribute("class", "city");
    cityParagr.textContent = state.city;
    let conditionsPara = document.createElement("p");
    conditionsPara.innerHTML = `${state.celsiusTemperature}\u00B0 C / ${state.fahrenheitDegrees}\u00B0 F`;

    let iconImage = document.createElement("img");
    iconImage.setAttribute("src", state.icon);
    iconImage.setAttribute("alt", state.condition);

    conditionsPara.appendChild(iconImage);
    container.appendChild(cityParagr);
    container.appendChild(conditionsPara);

    if (document.querySelector(".conditions div")) {
      into.replaceChild(container, document.querySelector(".conditions div"));
    } else {
      into.appendChild(container);
    }
    updateActivityList();
  }

  function updateActivityList(event) {
    if (event !== undefined) {
      category = event.target.id;
      document.querySelectorAll(".option").forEach(function (el) {
        el.classList.remove("selected");
      });

      event.target.classList.add("selected");
    }

    state.activities = [];
    if (state.condition === "Rain") {
      updateState("In");
    } else if (state.condition === "Snow" || state.fahrenheitDegrees < 50) {
      updateState("OutCold");
    } else {
      updateState("OutWarm");
    }

    function updateState(type) {
      if (category === "solo") {
        state.activities.push(...activities["solo" + type]);
      } else if (category === "team") {
        state.activities.push(...activities["team" + type]);
      } else {
        state.activities.push(...activities["solo" + type]);
        state.activities.push(...activities["team" + type]);
      }
    }

    const into = document.querySelector(".activities");

    let activitiesContainer = document.createElement("div");
    let list = document.createElement("ul");
    state.activities.forEach(function (activity, index) {
      let listItem = document.createElement("li");
      listItem.setAttribute("key", index);
      listItem.textContent = activity;
      list.appendChild(listItem);
    });
    activitiesContainer.appendChild(list);
    if (document.querySelector(".activities div")) {
      into.replaceChild(
        activitiesContainer,
        document.querySelector(".activities div")
      );
    } else {
      into.appendChild(activitiesContainer);
    }

    document.querySelector(".results").classList.add("open");
  }

  function updateUIFailure() {
    document.querySelector(".conditions").textContent =
      "Weather information unavailable, try again";
  }

  let form = document.querySelector(`#search-city`);
  form.addEventListener("submit", handleSubmit);
})();
