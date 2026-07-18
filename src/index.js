import "./css/weather-icons.css";
import "./styles.css";
import { WeatherConditions, getConditions } from "./conditions.js";
import { Days, getDays, getForecast, getForecastTemps, 
         getDayOfWeek, getDayConditions, getIconByText } from "./days.js";
import { displayForecast, displayConditions, convertMilitaryToStandard } from "./ui.js";

const third = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/jupiterFlorida?key=KET5CP5U8SBQZTKTWY5PX2PFM&contentType=json';

const getSearch = function(search){
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const key = '?key=KET5CP5U8SBQZTKTWY5PX2PFM&contentType=json';
    const query = `${url}${search}${key}`;
    return query;
}

 const handleWeather = async function(search){
        
        try {
            const response = await fetch(search);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
            const searchData = await response.json();
            const dataForDisplay = getWeatherData(searchData);
            displayWeather(dataForDisplay);

        } catch(error) {
            console.error('Error:', error);
        }
}

function displayWeather(data){
     displayForecast(data);
     displayConditions(data);
}

function getWeatherData(data){
    const address = data.resolvedAddress;
    const description = data.description;
    const currentConditions = data.currentConditions;
    const days = data.days 
    const conditionsResult = getConditions(currentConditions);
    const dayResults = getDays(days);

    const weatherData = [
        { location: `${data.resolvedAddress}`},
        { description: `${data.description}`},
        { conditions: conditionsResult },
        { days: dayResults },
    ];

    console.log(data);
    console.log(weatherData);

    return weatherData;
}

const weatherForm = document.getElementById('form');

weatherForm.addEventListener('submit', (event) => {
    const hiddenClass = document.querySelector('.hidden')
    event.preventDefault();
    const formData = new FormData(weatherForm);
    const input = formData.get('weather-search');
    const searchedInput = input.split(' ').join('');
    const weather = getSearch(searchedInput);
    handleWeather(weather);
    hiddenClass.classList.remove('hidden');
    weatherForm.reset();
})
