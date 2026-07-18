export class Days {
    constructor(
        dayOne,
        dayTwo,
        dayThree,
        dayFour,
        dayFive,
        daySix,
        daySeven,
        dayEight,
        dayNine,
        dayTen
    ){
            this.dayOne = dayOne;
            this.dayTwo = dayTwo;
            this.dayThree = dayThree;
            this.dayFour = dayFour;
            this.dayFive = dayFive;
            this.daySix = daySix;
            this.daySeven = daySeven;
            this.dayEight = dayEight;
            this.dayNine = dayNine;
            this.dayTen = dayTen;

    }
}

export function getDays(days){
    const tenDayForecast = new Days(
        days[0],
        days[1],
        days[2],
        days[3],
        days[4],
        days[5],
        days[6],
        days[7],
        days[8],
        days[9],
    );

    return tenDayForecast;
}

export function getForecast(data){
    const dayElement = data.find((days) => days === data[3]);
    const tenDays = dayElement.days;
    const arrOfDays = Object.values(tenDays);

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

export function getDayOfWeek(day){
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

export function getForecastTemps(data){
    const dayElement = data.find((days) => days === data[3]);
    const tenDays = dayElement.days;
    const arrOfDays = Object.values(tenDays);

    const temps = [
        [arrOfDays[0].tempmin, arrOfDays[1].tempmax],
        [arrOfDays[1].tempmin, arrOfDays[1].tempmax],
        [arrOfDays[1].tempmin, arrOfDays[1].tempmax],
        [arrOfDays[1].tempmin, arrOfDays[1].tempmax],
        [arrOfDays[1].tempmin, arrOfDays[1].tempmax],
        [arrOfDays[1].tempmin, arrOfDays[1].tempmax],
        [arrOfDays[1].tempmin, arrOfDays[1].tempmax],
        [arrOfDays[1].tempmin, arrOfDays[1].tempmax],
        [arrOfDays[1].tempmin, arrOfDays[1].tempmax],
        [arrOfDays[1].tempmin, arrOfDays[1].tempmax],
    ];
    
    return temps;
}

export function getDayConditions(data){
    const dayElement = data.find((days) => days === data[3]);
    const tenDays = dayElement.days;
    const arrOfDays = Object.values(tenDays);

    const dayConditions = [
        arrOfDays[0].conditions,
        arrOfDays[1].conditions,
        arrOfDays[2].conditions,
        arrOfDays[3].conditions,
        arrOfDays[4].conditions,
        arrOfDays[5].conditions,
        arrOfDays[6].conditions,
        arrOfDays[7].conditions,
        arrOfDays[8].conditions,
        arrOfDays[9].conditions,
    ];

    return dayConditions; 
}

export function getIconByText(conditionText){
    const condition = conditionText.toLowerCase();

    switch (true) {
        case condition.includes('snow') || condition.includes('blizzard') || condition.includes('ice'):
           return 'wi-snow';
        case condition.includes('thunder') || condition.includes('storm'):
           return 'wi-thunderstorm';
        case condition.includes('rain') || condition.includes('showers') || condition.includes('drizzle'):
           return 'wi-rain-wind';
        case condition.includes('cloud'):
           return 'wi-day-cloudy';
        case condition.includes('overcast'):
           return 'wi-cloudy';
        case condition.includes('clear') || condition.includes('sunny'):
           return 'wi-day-sunny';
        default:
           return 'wi';
    }
}

