const apiKey = "1bc37bb707e73b8e0645aec83d3649ae";
const lat = 50.728; // Duchess, Alberta latitude
const lon = -111.904; // Duchess, Alberta longitude

// DOM elements for current weather
const tempElem = document.getElementById("current-temp");
const iconElem = document.getElementById("weather-icon");
const descElem = document.querySelector("#weather-current figcaption");

// DOM elements for forecast
const forecastDays = [
    document.getElementById("forecast-day-1"),
    document.getElementById("forecast-day-2"),
    document.getElementById("forecast-day-3")
];

// Fetch current weather
async function getCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    // Display current weather
    tempElem.textContent = `${Math.round(data.main.temp)}°C`;
    iconElem.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconElem.alt = data.weather[0].description;
    descElem.textContent = data.weather[0].description;
}

// Fetch 3-day forecast
async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    // OpenWeatherMap's forecast is every 3 hours; we'll pick the forecast for 12:00 each day
    let daysFound = 0;
    let lastDate = "";
    for (let i = 0; i < data.list.length && daysFound < 3; i++) {
        const item = data.list[i];
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();
        const dayLabel = date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });

        // Pick the forecast closest to 12:00 for each day
        if (hour === 12 && lastDate !== date.toDateString()) {
            forecastDays[daysFound].innerHTML = `
        <br><strong>${dayLabel}</strong><br>
        ${Math.round(item.main.temp)}°C, ${item.weather[0].description}
      `;
            lastDate = date.toDateString();
            daysFound++;
        }
    }
}

// Run both fetches on page load
getCurrentWeather();
getForecast();