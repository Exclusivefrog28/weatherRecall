import React, { useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Home from './components/Home.js';
import Diagram from './components/Diagram.js';
import Years from './components/Years.js';
import { DataContext } from './context/DataContext.js';
import { LocationContext } from './context/LocationContext.js';
import { dataToWeatherCode } from './components/WeatherIcon.js';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const numOfYears = 10;

  const YearRoute = () => <Years numOfYears={numOfYears} />;
  const WeekRoute = () => <Diagram timeFrame={7} />;
  const MonthRoute = () => <Diagram timeFrame={30} />;

  const [location, setLocation] = React.useState({ lat: 47.2293.toFixed(4), long: 16.6123.toFixed(4) });
  const [weatherData, setWeatherData] = React.useState({
    home: {
      current: { title: 'Current weather', time: 'Friday 17:00', temp: 12, humidity: 82, tempApparent: 11, weatherCode: 2 },
      yesterday: { title: 'Yesterday', time: 'Thursday 17:00', temp: 8, humidity: 71, tempApparent: 9, weatherCode: 3 },
      weekago: { title: 'Last week', time: 'November 4. 17:00', temp: 15, humidity: 98, tempApparent: 13, weatherCode: 5 },
    },
    daily: {
      date: [1, 2],
      tempMax: [0, 0],
      tempMin: [0, 0],
      precip: [0, 0],
      sunrise: [0, 0],
      sunset: [0, 0],
    },
    years: [
      { title: '2022', time: 'November 22. 14:00', temp: 12, humidity: 82, tempApparent: 11, weatherCode: 2 },
      { title: '2021', time: 'November 22. 14:00', temp: 8, humidity: 71, tempApparent: 9, weatherCode: 3 },
    ],
  });

  const locationValue = useMemo(
    () => ({ location, setLocation }),
    [location]
  );

  const weatherDataValue = useMemo(
    () => ({ weatherData, setWeatherData }),
    [weatherData]
  );

  useEffect(() => {
    let now = new Date();
    let yesterday = new Date(now.getTime() - 86400000);
    let weekago = new Date(now.getTime() - 604800000);
    let monthago = new Date(now.getTime() - 2592000000);

    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').join('%2F');

    let locationURL = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.long}`;

    let baseURL = `${locationURL}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode&daily=sunrise,sunset&timezone=${timezone}`;

    let requests = [
      axios.get(`${baseURL}&start_date=${now.toLocaleDateString('en-CA')}&end_date=${now.toLocaleDateString('en-CA')}`),
      axios.get(`${baseURL}&start_date=${yesterday.toLocaleDateString('en-CA')}&end_date=${yesterday.toLocaleDateString('en-CA')}`),
      axios.get(`${baseURL}&start_date=${weekago.toLocaleDateString('en-CA')}&end_date=${weekago.toLocaleDateString('en-CA')}`),
      axios.get(`${locationURL}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=${timezone}&start_date=${monthago.toLocaleDateString('en-CA')}&end_date=${now.toLocaleDateString('en-CA')}`),
    ];

    for (let i = 0; i < (numOfYears - 1); i++) {
      let date = new Date(now.getTime());
      date.setFullYear((now.getFullYear() - (i + 1)));
      date = date.toLocaleDateString('en-CA');
      requests.push(
        axios.get(
          `https://archive-api.open-meteo.com/v1/era5?latitude=${location.lat}&longitude=${location.long}&start_date=${date}&end_date=${date}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain,snowfall,cloudcover&daily=sunrise,sunset&timezone=${timezone}`
        )
      );
    }


    axios.all(requests)
      .then(
        axios.spread((...responses) => {

          let todayResponse = responses[0];
          let yesterdayResponse = responses[1];
          let weekagoResponse = responses[2];
          let monthData = responses[3];
          let yearsData = responses.slice(4, responses.length);

          let hour = now.getHours();

          let yearsDataParsed = [{
            title: now.getFullYear(),
            time: now.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + '. ' + hour + ':00',
            night: true ? new Date(todayResponse.data.daily.sunrise).getTime() > now.getTime() || now.getTime() > new Date(todayResponse.data.daily.sunset).getTime() : false,
            temp: todayResponse.data.hourly.temperature_2m[hour],
            humidity: todayResponse.data.hourly.relativehumidity_2m[hour],
            tempApparent: todayResponse.data.hourly.apparent_temperature[hour],
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
              temp: response.data.hourly.temperature_2m[hour],
              humidity: response.data.hourly.relativehumidity_2m[hour],
              tempApparent: response.data.hourly.apparent_temperature[hour],
              weatherCode: dataToWeatherCode(response.data.hourly.cloudcover[hour], response.data.hourly.rain[hour], response.data.hourly.snowfall[hour]),
            });
          }

          setWeatherData({
            home: {
              current: {
                title: 'Current weather',
                time: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now) + ' ' + hour + ':00',
                night: true ? new Date(todayResponse.data.daily.sunrise).getTime() > now.getTime() || now.getTime() > new Date(todayResponse.data.daily.sunset).getTime() : false,
                temp: todayResponse.data.hourly.temperature_2m[hour],
                humidity: todayResponse.data.hourly.relativehumidity_2m[hour],
                tempApparent: todayResponse.data.hourly.apparent_temperature[hour],
                weatherCode: todayResponse.data.hourly.weathercode[hour],
              },
              yesterday: {
                title: 'Yesterday',
                time: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(yesterday) + ' ' + hour + ':00',
                night: true ? new Date(yesterdayResponse.data.daily.sunrise).getTime() > yesterday.getTime() || yesterday.getTime() > new Date(yesterdayResponse.data.daily.sunset).getTime() : false,
                temp: yesterdayResponse.data.hourly.temperature_2m[hour],
                humidity: yesterdayResponse.data.hourly.relativehumidity_2m[hour],
                tempApparent: yesterdayResponse.data.hourly.apparent_temperature[hour],
                weatherCode: yesterdayResponse.data.hourly.weathercode[hour],
              },
              weekago: {
                title: 'Last week',
                time: weekago.toLocaleString('en-US', { month: 'long', day: 'numeric' }) + '. ' + hour + ':00',
                night: true ? new Date(weekagoResponse.data.daily.sunrise).getTime() > weekago.getTime() || weekago.getTime() > new Date(weekagoResponse.data.daily.sunset).getTime() : false,
                temp: weekagoResponse.data.hourly.temperature_2m[hour],
                humidity: weekagoResponse.data.hourly.relativehumidity_2m[hour],
                tempApparent: weekagoResponse.data.hourly.apparent_temperature[hour],
                weatherCode: weekagoResponse.data.hourly.weathercode[hour],
              },
            },
            daily: {
              date: monthData.data.daily.time.reverse(),
              tempMax: monthData.data.daily.temperature_2m_max.reverse(),
              tempMin: monthData.data.daily.temperature_2m_min.reverse(),
              precip: monthData.data.daily.precipitation_sum.reverse(),
              sunrise: monthData.data.daily.sunrise.reverse(),
              sunset: monthData.data.daily.sunset.reverse(),
            },
            years: yearsDataParsed,
          });
          //console.log(weatherData.years);
          setTimeout(() => { SplashScreen.hide(); }, 500);
        })
      )
      .catch(errors => {
        console.error(errors);
      });
  }, [location]);

  return (
    <LocationContext.Provider value={locationValue}>
      <DataContext.Provider value={weatherDataValue}>
        <NavigationContainer theme={useTheme()}>
          <Tab.Navigator
            initialRouteName="Home"
            shifting={true}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: 'home',
                lazy: false,
              }} />
            <Tab.Screen
              name="Last week"
              component={WeekRoute}
              options={{
                tabBarIcon: 'calendar-week',
                lazy: false,
              }} />
            <Tab.Screen
              name="Last month"
              component={MonthRoute}
              options={{
                tabBarIcon: 'calendar-month',
                lazy: false,
              }} />
            <Tab.Screen
              name="Previous years"
              component={YearRoute}
              options={{
                tabBarIcon: 'calendar-multiple',
                lazy: false,
              }} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar backgroundColor={useTheme().colors.background} />
      </DataContext.Provider>
    </LocationContext.Provider>
  );
};

export default App;
