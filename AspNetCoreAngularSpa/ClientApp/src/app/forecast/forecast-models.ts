export class WeatherForecast {
  id?: number;
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export const weatherForecasts: WeatherForecast[] = [
  {
    id: 1,
    dateFormatted: '2017-10-20T09:00',
    temperatureC: 21,
    summary: 'Bracing',
    temperatureF: 69
  },
  {
    id: 2,
    dateFormatted: '2017-10-20T10:00',
    temperatureC: 18,
    summary: 'Warm',
    temperatureF: 64
  }
  //{ id: 3, dateFormatted: "2017-10-20T11:00", temperatureC: 16, summary: "Bracing", temperatureF: 60 },
  //{ id: 4, dateFormatted: "2017-10-20T12:00", temperatureC: 37, summary: "Freezing", temperatureF: 98 },
  //{ id: 5, dateFormatted: "2017-10-20T13:00", temperatureC: -4, summary: "Sweltering", temperatureF: 25 }
];

export const summaries = [
  'Freezing',
  'Bracing',
  'Chilly',
  'Cool',
  'Mild',
  'Warm',
  'Balmy',
  'Hot',
  'Sweltering',
  'Scorching'
];
