// greeting.js
export const greeting = "Hello, Odinite!";

export class WeatherCondition {
    constructor(
        condition, 
        feelsLike,
        humidity, 
        precipitation, 
        precipitationProbability,
        snow,
        sunrise,
        sunset,
        temp,
        uvIndex,
        visibility,
        windGust,
        windSpeed
        ){
            this.condition = condition;
            this.feelsLike = feelsLike;
            this.humidity = humidity;
            this.precipitation = precipitation;
            this.precipitationProbability = precipitationProbability;
            this.snow = snow;
            this.sunrise = sunrise;
            this.sunset = sunset;
            this.temp = temp;
            this.uvIndex = uvIndex;
            this.visibility = visibility;
            this.windGust = windGust;
            this.windSpeed = windSpeed;
    }
}