import { Days, getDays, getForecast, getForecastTemps, 
         getDayOfWeek, getDayConditions, getIconByText } from "./days.js";

export function displayForecast(data) {
    const forecast = getForecast(data);
    const temps = getForecastTemps(data);
    const dayConditions = getDayConditions(data);
    const degree = String.fromCharCode(176);
    const locationDisplay = document.querySelector('.location');
    const mainTemp = document.querySelector('.main-temp');
    const mainCondition = document.querySelector('.condition');
    const lowTemp = document.querySelector('.main-low');
    const highTemp = document.querySelector('.main-high');
    const dateElements = document.querySelectorAll('.date');
    const iconElements = document.querySelectorAll('.icon');
    const tempLowElements = document.querySelectorAll('.temp-low');
    const tempHighElements = document.querySelectorAll('.temp-high');

    locationDisplay.textContent = data[0].location;
    mainTemp.textContent = data[2].conditions.temp + degree;
    mainCondition.textContent = data[2].conditions.condition;
    lowTemp.textContent = `L: ${temps[0][0]}` + degree;
    highTemp.textContent = `H: ${temps[0][1]}` + degree;
    
    
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
            tempLowElements[index].textContent = `${temp[0]}` + degree;
            tempHighElements[index].textContent = `${temp[1]}` + degree;
        }
    })
}

export function displayConditions(data){
    const degree = String.fromCharCode(176);
    const feelsLike = document.getElementById('feels');
    const humidity = document.getElementById('humid');
    const precip = document.getElementById('precip');
    const precipProb = document.getElementById('precip-prob');
    const uv = document.getElementById('uv');
    const vis = document.getElementById('vis');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const snow = document.getElementById('snow');
    const wind = document.getElementById('wind');

    if ( data[2].conditions.precipitation === null ){
        precip.textContent = 0;
    } else {
        precip.textContent = `${data[2].conditions.precipitation} inches`;
    }

    feelsLike.textContent = data[2].conditions.feelsLike + degree;
    humidity.textContent = `${data[2].conditions.humidity} %`;
    precipProb.textContent = `${data[2].conditions.precipitationProbability}%`;
    uv.textContent = data[2].conditions.uvIndex;
    vis.textContent = data[2].conditions.visibility;
    sunrise.textContent = convertMilitaryToStandard(data[2].conditions.sunrise);
    sunset.textContent = convertMilitaryToStandard(data[2].conditions.sunset);
    snow.textContent = `${data[2].conditions.snow} inches`;
    wind.textContent = `${data[2].conditions.windSpeed} mph`;
}

export function convertMilitaryToStandard(timeStr){

    let [hours, minutes] = timeStr.split(':');
    hours = parseInt(hours, 10);

    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${amPm}`;

}