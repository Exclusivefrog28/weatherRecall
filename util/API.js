import axios from 'axios';
import { dataToWeatherCode } from '../components/WeatherIcon';


export function getData(location, preferences, now) {
    let tempUnit = (preferences.tempUnit === '°F') ? 'fahrenheit' : 'celsius';

    let weekago = new Date(now.getTime() - 604800000);
    let weekagoExc = new Date(now.getTime() - 691200000);
    let monthago = new Date(now.getTime() - 2592000000);

    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').join('%2F');

    let forecastURL = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&temperature_unit=${tempUnit}&precipitation_unit=${preferences.precipUnit}&timezone=${timezone}`;

    let historicalURL = `https://archive-api.open-meteo.com/v1/era5?latitude=${location.lat}&longitude=${location.long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,snowfall,cloudcover&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&temperature_unit=${tempUnit}&precipitation_unit=${preferences.precipUnit}&timezone=${timezone}`;

    let requests = [
        axios.get(`${forecastURL}&start_date=${weekago.toLocaleDateString('en-CA')}&end_date=${now.toLocaleDateString('en-CA')}`),
        axios.get(`${historicalURL}&start_date=${monthago.toLocaleDateString('en-CA')}&end_date=${weekagoExc.toLocaleDateString('en-CA')}`),
    ];

    for (let i = 0; i < (preferences.numOfYears - 1); i++) {
        let date = new Date(now.getTime());
        date.setFullYear((now.getFullYear() - (i + 1)));
        date = date.toLocaleDateString('en-CA');
        requests.push(
            axios.get(
                `${historicalURL}&start_date=${date}&end_date=${date}`
            )
        );
    }

    return new Promise((resolve, reject) => {
        axios.all(requests)
            .then(
                axios.spread((...responses) => {

                    let weekResponse = responses[0];
                    let monthResponse = responses[1];
                    let yearsResponse = responses.slice(2, responses.length);

                    let day = [];
                    let weekH = [];
                    let monthH = [];

                    for (let i = 1; i < 193; i++) {
                        let sunset = new Date(weekResponse.data.daily.sunset[Math.floor((i - 1) / 24)]).getTime();
                        let sunrise = new Date(weekResponse.data.daily.sunrise[Math.floor((i - 1) / 24)]).getTime();
                        let time = weekResponse.data.hourly.time[i - 1];
                        day.push({
                            time: time,
                            temp: weekResponse.data.hourly.temperature_2m[i - 1],
                            humidity: weekResponse.data.hourly.relativehumidity_2m[i - 1],
                            tempApparent: weekResponse.data.hourly.apparent_temperature[i - 1],
                            weatherCode: weekResponse.data.hourly.weathercode[i - 1],
                            night: true ? sunrise > new Date(time).getTime() || sunset < new Date(time).getTime() : false,
                        });
                        if (i % 24 === 0) {
                            weekH.push(day);
                            day = [];
                        }
                    }
                    for (let i = 1; i < 529; i++) {
                        let sunset = new Date(monthResponse.data.daily.sunset[Math.floor((i - 1) / 24)]).getTime();
                        let sunrise = new Date(monthResponse.data.daily.sunrise[Math.floor((i - 1) / 24)]).getTime();
                        let time = monthResponse.data.hourly.time[i - 1];
                        day.push({
                            time: monthResponse.data.hourly.time[i - 1],
                            temp: monthResponse.data.hourly.temperature_2m[i - 1],
                            humidity: monthResponse.data.hourly.relativehumidity_2m[i - 1],
                            tempApparent: monthResponse.data.hourly.apparent_temperature[i - 1],
                            weatherCode: dataToWeatherCode(monthResponse.data.hourly.cloudcover[i - 1], monthResponse.data.hourly.rain[i - 1], monthResponse.data.hourly.snowfall[i - 1]),
                            night: true ? sunrise < new Date(time).getTime() || sunset < new Date(time).getTime() : false,
                        });
                        if (i % 24 === 0) {
                            monthH.push(day);
                            day = [];
                        }
                    }
                    let weekD = [];
                    let monthD = [];
                    for (let i = 0; i < weekResponse.data.daily.time.length; i++) {
                        weekD.push({
                            time: weekResponse.data.daily.time[i],
                            tempMax: weekResponse.data.daily.temperature_2m_max[i],
                            tempMin: weekResponse.data.daily.temperature_2m_min[i],
                            precip: weekResponse.data.daily.precipitation_sum[i],
                            sunset: weekResponse.data.daily.sunset[i],
                            sunrise: weekResponse.data.daily.sunrise[i],
                        });
                    }
                    for (let i = 0; i < monthResponse.data.daily.time.length; i++) {
                        monthD.push({
                            time: monthResponse.data.daily.time[i],
                            tempMax: monthResponse.data.daily.temperature_2m_max[i],
                            tempMin: monthResponse.data.daily.temperature_2m_min[i],
                            precip: monthResponse.data.daily.precipitation_sum[i],
                            sunset: monthResponse.data.daily.sunset[i],
                            sunrise: monthResponse.data.daily.sunrise[i],
                        });
                    }

                    let year = [];
                    for (let i = 0; i < yearsResponse.length; i++) {
                        let hours = [];
                        for (let j = 0; j < yearsResponse[i].data.hourly.time.length; j++) {
                            hours.push({
                                time: yearsResponse[i].data.hourly.time[j],
                                temp: yearsResponse[i].data.hourly.temperature_2m[j],
                                humidity: yearsResponse[i].data.hourly.relativehumidity_2m[j],
                                tempApparent: yearsResponse[i].data.hourly.apparent_temperature[j],
                                weatherCode: dataToWeatherCode(yearsResponse[i].data.hourly.cloudcover[j], yearsResponse[i].data.hourly.rain[j], yearsResponse[i].data.hourly.snowfall[j]),
                            });
                        }
                        year.push({
                            hourly: hours,
                            daily: {
                                time: yearsResponse[i].data.daily.time[0],
                                tempMax: yearsResponse[i].data.daily.temperature_2m_max[0],
                                tempMin: yearsResponse[i].data.daily.temperature_2m_min[0],
                                precip: yearsResponse[i].data.daily.precipitation_sum[0],
                                sunset: yearsResponse[i].data.daily.sunset[0],
                                sunrise: yearsResponse[i].data.daily.sunrise[0],
                            },
                        });
                    }

                    let rawData = {
                        timeStamp: now.toLocaleDateString('en-CA'),
                        location: JSON.stringify(location),
                        numOfYears: preferences.numOfYears,
                        hourly: weekH.reverse().concat(monthH.reverse()),
                        daily: weekD.reverse().concat(monthD.reverse()),
                        yearly: year,
                    };
                    //console.log(rawData.hourly);
                    resolve(rawData);
                })
            )
            .catch(errors => {
                reject();
                console.error(errors);
            });
    });
}

export function parseData(rawData) {

}
