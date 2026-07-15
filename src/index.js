// src/index.js
import "./css/weather-icons.css";
import "./styles.css";
import { greeting, WeatherConditions, getConditions } from "./conditions.js";
import { Days, getDays } from "./days.js";

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
    console.log(forecast);
    console.log(forecast[0]);
    console.log(forecast[1]);
   
}

function getForecast(data){
    const dayElement = data.find((days) => days === data[3]);
    const tenDays = dayElement.days;
    console.log(tenDays);
    const arrOfDays = Object.values(tenDays);
    console.log(arrOfDays);

    const forecast = [
        getDayOfWeek(arrOfDays[0].datetime),
        getDayOfWeek(arrOfDays[1].datetime),
        getDayOfWeek(arrOfDays[2].datetime),
        getDayOfWeek(arrOfDays[3].datetime),
        getDayOfWeek(arrOfDays[4].datetime),
        getDayOfWeek(arrOfDays[5].datetime),
        getDayOfWeek(arrOfDays[6].datetime),
        getDayOfWeek(arrOfDays[7].datetime),
        getDayOfWeek(arrOfDays[8].datetime),
        getDayOfWeek(arrOfDays[9].datetime),
    ];

    return forecast; 
}

function getDayOfWeek(day){
    const week = [
        'Sunday', 
        'Monday', 
        'Tuesday',
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday'
    ];
    const dayIndex = new Date(day).getDay();
    const dayOfWeek = week[dayIndex];
    return dayOfWeek;
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