import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Home from './components/Home.js';
import Diagram from './components/Diagram.js';
import Years from './components/Years.js';
import { DataContext } from './context/DataContext.js';
import { LocationContext } from './context/LocationContext.js';
import { PrefContext } from './context/PrefContext.js';
import { dataToWeatherCode } from './components/WeatherIcon.js';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from './util/API.js';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [preferences, setPreferences] = useState({
    tempUnit: '°C',
    precipUnit: 'mm',
    numOfYears: 10,
  });

  const YearRoute = () => <Years numOfYears={preferences.numOfYears} />;
  const WeekRoute = () => <Diagram timeFrame={7} />;
  const MonthRoute = () => <Diagram timeFrame={30} />;

  const [location, setLocation] = useState({ lat: 47.2293.toFixed(4), long: 16.6123.toFixed(4) });
  const [weatherData, setWeatherData] = useState({
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

  const prefValue = useMemo(
    () => ({ preferences, setPreferences }),
    [preferences]
  );

  useEffect(() => {
    AsyncStorage.multiGet(['location', 'preferences'])
      .then(value => {

        if (value[0][1] !== null && JSON.stringify(location) !== value[0][1]) { setLocation(JSON.parse(value[0][1])); }
        if (value[1][1] !== null && JSON.stringify(preferences) !== value[1][1]) { setPreferences(JSON.parse(value[1][1])); }

        getData(location,preferences).then(
          data => {
            setWeatherData(data);
            setTimeout(() => { SplashScreen.hide(); }, 500);
          }
        );
      });
  }, [location, preferences]);

  return (
    <LocationContext.Provider value={locationValue}>
      <DataContext.Provider value={weatherDataValue}>
        <PrefContext.Provider value={prefValue}>
          <NavigationContainer theme={useTheme()}>
            <Tab.Navigator
              initialRouteName="Home"
              shifting={true}
              compact={true}>
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
        </PrefContext.Provider>
      </DataContext.Provider>
    </LocationContext.Provider>
  );
};

export default App;
