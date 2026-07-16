// src/index.js
import "./css/weather-icons.css";
import "./styles.css";
import { greeting, WeatherConditions, getConditions } from "./conditions.js";
import { Days, getDays, getForecast, getForecastTemps, 
         getDayOfWeek, getDayConditions, getIconByText } from "./days.js";

console.log(greeting);



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
        console.log(dataForDisplay);
        displayWeather(dataForDisplay);

        } catch(error) {
            console.error('Error fetching the image:', error);
        }
}

function displayWeather(data){
    const forecast = getForecast(data);
    const temps = getForecastTemps(data);
    const dayConditions = getDayConditions(data);
    console.log(forecast);
    console.log(temps);
    console.log(dayConditions);
    const dateElements = document.querySelectorAll('.date');
    const iconElements = document.querySelectorAll('.icon');
    const tempLowElements = document.querySelectorAll('.temp-low');
    const tempHighElements = document.querySelectorAll('.temp-high');



    forecast.forEach((date, index) => {
        if (index === 0) {
            dateElements[index].textContent = 'Today';
        } else {
            dateElements[index].textContent = date;
        }

    })

    dayConditions.forEach((condition, index) => {
        if (iconElements[index]) {
            const iconClass = getIconByText(condition);
            iconElements[index].className = `icon wi ${iconClass}`;
        }
    });
    
    temps.forEach((temp, index) => {
        if (tempLowElements[index] && tempHighElements[index]) {
            tempLowElements[index].textContent = `L: ${temp[0]}`;
            tempHighElements[index].textContent = `H: ${temp[1]}`;
        }
    })
}

function getWeatherData(data){
    console.log(data);
    const address = data.resolvedAddress;
    const description = data.description;
    const currentConditions = data.currentConditions;
    const days = data.days 

    const conditionsResult = getConditions(currentConditions);
    console.log(conditionsResult);

    const dayResults = getDays(days);

    console.log(dayResults);

    const weatherData = [
        { location: `${data.resolvedAddress}`},
        { description: `${data.description}`},
        { conditions: conditionsResult },
        { days: dayResults },
    ];

    console.log(weatherData);
    console.log(weatherData[2].conditions.humidity);
    return weatherData;

}

const weatherForm = document.getElementById('form');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(weatherForm);
    const input = formData.get('weather-search');
    const searchedInput = input.split(' ').join('');
    const weather = getSearch(searchedInput);

    handleWeather(weather);
})


/*fetch(third)
.then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
})
.then((response) => {
    console.log(response);
})
.catch((error) => {
    console.error('Error fetching the image:', error);
});
*/