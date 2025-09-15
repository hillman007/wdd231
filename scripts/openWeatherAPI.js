const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=1bc37bb707e73b8e0645aec83d3649ae&units=metric'

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`; // Use data.main.temp for temperature
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`; // Use icon code and .png extension
    let desc = data.weather[0].description; // Use description for caption
    weatherIcon.setAttribute('src', iconsrc); // Set image src
    weatherIcon.setAttribute('alt', desc);    // Set image alt text
    captionDesc.textContent = `${desc}`;      // Set figcaption text
}