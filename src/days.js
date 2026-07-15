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
