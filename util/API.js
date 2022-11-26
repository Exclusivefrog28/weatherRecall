import axios from 'axios';
import { dataToWeatherCode } from '../components/WeatherIcon';


export function getData(location, preferences, now) {
    let tempUnit = (preferences.tempUnit === '°F') ? 'fahrenheit' : 'celsius';

    let yesterday = new Date(now.getTime() - 86400000);
    let weekago = new Date(now.getTime() - 604800000);
    let monthago = new Date(now.getTime() - 2592000000);

    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').join('%2F');

    let locationURL = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.long}&temperature_unit=${tempUnit}&precipitation_unit=${preferences.precipUnit}`;

    let baseURL = `${locationURL}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode&daily=sunrise,sunset&timezone=${timezone}`;

    let requests = [
        axios.get(`${baseURL}&start_date=${now.toLocaleDateString('en-CA')}&end_date=${now.toLocaleDateString('en-CA')}`),
        axios.get(`${baseURL}&start_date=${yesterday.toLocaleDateString('en-CA')}&end_date=${yesterday.toLocaleDateString('en-CA')}`),
        axios.get(`${baseURL}&start_date=${weekago.toLocaleDateString('en-CA')}&end_date=${weekago.toLocaleDateString('en-CA')}`),
        axios.get(`${locationURL}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=${timezone}&start_date=${monthago.toLocaleDateString('en-CA')}&end_date=${now.toLocaleDateString('en-CA')}`),
    ];

    for (let i = 0; i < (preferences.numOfYears - 1); i++) {
        let date = new Date(now.getTime());
        date.setFullYear((now.getFullYear() - (i + 1)));
        date = date.toLocaleDateString('en-CA');
        requests.push(
            axios.get(
                `https://archive-api.open-meteo.com/v1/era5?latitude=${location.lat}&longitude=${location.long}&start_date=${date}&end_date=${date}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,snowfall,cloudcover&daily=sunrise,sunset&timezone=${timezone}&temperature_unit=${tempUnit}&precipitation_unit=${preferences.precipUnit}`
            )
        );
    }

    return new Promise((resolve, reject) => {
        axios.all(requests)
            .then(
                axios.spread((...responses) => {

                    let todayResponse = responses[0];
                    let yesterdayResponse = responses[1];
                    let weekagoResponse = responses[2];
                    let monthData = responses[3];
                    let yearsData = responses.slice(4, responses.length);

                    let offset = (preferences.tempUnit === ' K') ? -273.15 : 0;

                    let hour = now.getHours();

                    let yearsDataParsed = [{
                        title: now.getFullYear(),
                        time: now.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + '. ' + hour + ':00',
                        night: true ? new Date(todayResponse.data.daily.sunrise).getTime() > now.getTime() || now.getTime() > new Date(todayResponse.data.daily.sunset).getTime() : false,
                        temp: parseFloat((todayResponse.data.hourly.temperature_2m[hour] + offset).toFixed(2)),
                        humidity: todayResponse.data.hourly.relativehumidity_2m[hour],
                        tempApparent: parseFloat((todayResponse.data.hourly.apparent_temperature[hour] + offset).toFixed(2)),
                        weatherCode: todayResponse.data.hourly.weathercode[hour],
                    }];

                    for (let i = 0; i < yearsData.length; i++) {
                        let response = yearsData[i];
                        let timeStamp = new Date(now.getTime());
                        timeStamp.setFullYear((now.getFullYear() - (i + 1)));

                        yearsDataParsed.push({
                            title: (timeStamp.getFullYear()),
                            time: timeStamp.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + '. ' + hour + ':00',
                            night: true ? new Date(response.data.daily.sunrise).getTime() > timeStamp.getTime() || timeStamp.getTime() > new Date(response.data.daily.sunset).getTime() : false,
                            temp: parseFloat((response.data.hourly.temperature_2m[hour] + offset).toFixed(2)),
                            humidity: response.data.hourly.relativehumidity_2m[hour],
                            tempApparent: parseFloat((response.data.hourly.apparent_temperature[hour] + offset).toFixed(2)),
                            weatherCode: dataToWeatherCode(response.data.hourly.cloudcover[hour], response.data.hourly.rain[hour], response.data.hourly.snowfall[hour]),
                        });
                    }

                    resolve({
                        timeStamp: now.toLocaleDateString('en-CA'),
                        location: JSON.stringify(location),
                        home: {
                            current: {
                                title: 'Current weather',
                                time: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now) + ' ' + hour + ':00',
                                night: true ? new Date(todayResponse.data.daily.sunrise).getTime() > now.getTime() || now.getTime() > new Date(todayResponse.data.daily.sunset).getTime() : false,
                                temp: parseFloat((todayResponse.data.hourly.temperature_2m[hour] + offset).toFixed(2)),
                                humidity: todayResponse.data.hourly.relativehumidity_2m[hour],
                                tempApparent: parseFloat((todayResponse.data.hourly.apparent_temperature[hour] + offset).toFixed(2)),
                                weatherCode: todayResponse.data.hourly.weathercode[hour],
                            },
                            yesterday: {
                                title: 'Yesterday',
                                time: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(yesterday) + ' ' + hour + ':00',
                                night: true ? new Date(yesterdayResponse.data.daily.sunrise).getTime() > yesterday.getTime() || yesterday.getTime() > new Date(yesterdayResponse.data.daily.sunset).getTime() : false,
                                temp: parseFloat((yesterdayResponse.data.hourly.temperature_2m[hour] + offset).toFixed(2)),
                                humidity: yesterdayResponse.data.hourly.relativehumidity_2m[hour],
                                tempApparent: parseFloat((yesterdayResponse.data.hourly.apparent_temperature[hour] + offset).toFixed(2)),
                                weatherCode: yesterdayResponse.data.hourly.weathercode[hour],
                            },
                            weekago: {
                                title: 'Last week',
                                time: weekago.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + '. ' + hour + ':00',
                                night: true ? new Date(weekagoResponse.data.daily.sunrise).getTime() > weekago.getTime() || weekago.getTime() > new Date(weekagoResponse.data.daily.sunset).getTime() : false,
                                temp: parseFloat((weekagoResponse.data.hourly.temperature_2m[hour] + offset).toFixed(2)),
                                humidity: weekagoResponse.data.hourly.relativehumidity_2m[hour],
                                tempApparent: parseFloat((weekagoResponse.data.hourly.apparent_temperature[hour] + offset).toFixed(2)),
                                weatherCode: weekagoResponse.data.hourly.weathercode[hour],
                            },
                        },
                        daily: {
                            date: monthData.data.daily.time.reverse(),
                            tempMax: monthData.data.daily.temperature_2m_max.reverse().map(val => parseFloat((val + offset).toFixed(2))),
                            tempMin: monthData.data.daily.temperature_2m_min.reverse().map(val => parseFloat((val + offset).toFixed(2))),
                            precip: monthData.data.daily.precipitation_sum.reverse(),
                            sunrise: monthData.data.daily.sunrise.reverse(),
                            sunset: monthData.data.daily.sunset.reverse(),
                        },
                        years: yearsDataParsed,
                    });
                    //console.log(weatherData.years);
                })
            )
            .catch(errors => {
                reject();
                console.error(errors);
            });
    });
}
