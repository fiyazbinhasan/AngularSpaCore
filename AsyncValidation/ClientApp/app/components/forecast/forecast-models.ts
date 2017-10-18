export class WeatherForecast {
    id?: number;
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export const weatherForecasts: WeatherForecast[] = [
    { id: 1, dateFormatted: "10/19/2017", temperatureC: 21, summary: "Bracing", temperatureF: 69 },
    { id: 2, dateFormatted: "10/20/2017", temperatureC: 18, summary: "Warm", temperatureF: 64 },
    { id: 3, dateFormatted: "10/21/2017", temperatureC: 16, summary: "Bracing", temperatureF: 60 },
    { id: 4, dateFormatted: "10/22/2017", temperatureC: 37, summary: "Freezing", temperatureF: 98 },
    { id: 5, dateFormatted: "10/23/2017", temperatureC: -4, summary: "Sweltering", temperatureF: 25 }
];

export const summaries = ['Freezing', 'Bracing', 'Chilly', 'Cool', 'Mild', 'Warm', 'Balmy', 'Hot', 'Sweltering', 'Scorching'];
