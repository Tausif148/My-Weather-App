//  Geting value from 
async function fetchWeatherData(cityValue) {
    try {
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=54d3fc2327c271abc85608d4ea4c015f`);
        let result = await weatherData.json()
        console.log(result);
        updateOnUI(result);

        weather_body.style = "display:flex";
        location_not_found.style = "display:none"
    } catch (error) {
        console.log(error);
        location_not_found.style = "display:block";
        city_blank.textContent = "Sorry, Location not found!!!";
        city_blank.style = "display:block";
        weather_body.style = "display:none";
    }
}


// Set value on UI
const cityName = document.querySelector('.cityName');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind_speed = document.querySelector('#wind-speed');
const date = document.querySelector('.date');
const weather_image = document.querySelector('.weather-image');


function updateOnUI(result) {
    cityName.textContent = result.name;
    temperature.innerHTML = result.main.temp + '<sup>°C</sup>';
    description.textContent = result.weather[0].main;
    humidity.textContent = `${result.main.humidity}%`;
    wind_speed.textContent = `${result.wind.speed} Km/H`;
    // set weather img 
    const inImgFormate = result.weather[0].main.toLocaleLowerCase();

    console.log(inImgFormate);
    // console.log(typeof inImgFormate)

    weather_image.src = `img/${inImgFormate}.png`;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
}


// get value as per search by user
const search_city = document.querySelector('.search-city');
const city = document.querySelector('.city');

const weather_body = document.querySelector('.weather-body');
const location_not_found = document.querySelector('.location-not-found');
const city_blank = document.querySelector('.city-blank');

// fetchWeatherData("pune");
search_city.addEventListener('submit', (e) => {
    e.preventDefault();

    const cityValue = city.value;
    // console.log(cityValue);
    if (cityValue !== "") {
        fetchWeatherData(cityValue);
        city.value = "";
    } else {
        location_not_found.style = "display:block";
        city_blank.style = "display:block";
        weather_body.style = "display:none";

        console.log("Please enter a city name.");
    }
});