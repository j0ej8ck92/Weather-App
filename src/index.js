// src/index.js
import "./styles.css";
import { greeting, WeatherCondition } from "./conditions.js";

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
    const location = data[0].location;
    console.log(location);
}

function getWeatherData(data){
            console.log(data);
            const address = data.resolvedAddress;
            const description = data.description;
            const currentConditions = data.currentConditions; 

            const result = getConditions(currentConditions);
            console.log(result);

            const weatherData = [
                { location: `${data.resolvedAddress}`},
                { description: `${data.description}`},
                { conditions: result },
            ]

            console.log(weatherData);

            console.log(weatherData[2].conditions.humidity);
            return weatherData;

}

function getConditions(current){
    const conditions = new WeatherCondition(
        current.conditions,
        current.feelslike,
        current.humidity,
        current.precip,
        current.precipprob,
        current.snow,
        current.sunrise,
        current.sunset,
        current.temp,
        current.uvindex,
        current.visibility,
        current.windgust,
        current.windspeed
    );

    return conditions;
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