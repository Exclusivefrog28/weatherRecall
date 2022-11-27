import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Home from './components/Home.js';
import Diagram from './components/Diagram.js';
import Years from './components/Years.js';
import { DataContext } from './context/DataContext.js';
import { LocationContext } from './context/LocationContext.js';
import { PrefContext } from './context/PrefContext.js';
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
  const [weatherData, setWeatherData] = useState(null);

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
    AsyncStorage.multiGet(['location', 'preferences', 'cache'])
      .then(value => {
        let now = new Date();
        let dontFetch = false;
        console.log('loading...');
        if (value[0][1] !== null && value[1][1] !== null && value[2][1] !== null) {
          if (JSON.stringify(location) !== value[0][1]) {
            setLocation(JSON.parse(value[0][1]));
            dontFetch = true;
            console.log('Saved location read');
          }
          else {
            if (JSON.stringify(preferences) !== value[1][1]) {
              setPreferences(JSON.parse(value[1][1]));
              dontFetch = true;
              console.log('Saved preferences read');
            }
            else {
              let cache = JSON.parse(value[2][1]);
              if (cache.location === JSON.stringify(location) && cache.timeStamp === now.toLocaleDateString('en-CA')) {
                setWeatherData(cache);
                console.log('Loaded data from cache.');
                dontFetch = true;
                setTimeout(() => { SplashScreen.hide(); }, 500);
              }
            }
          }
        }
        if (!dontFetch) {
          getData(location, preferences, now).then(
            data => {
              setWeatherData(data);
              console.log('Fetched data.');
              AsyncStorage.setItem('cache', JSON.stringify(data))
                .then(setTimeout(() => { SplashScreen.hide(); }, 1000));
            }
          );
        }
      });
  }, [location, preferences]);

  const theme = useTheme();
  if (weatherData !== null) {
    return (
      <LocationContext.Provider value={locationValue}>
        <DataContext.Provider value={weatherDataValue}>
          <PrefContext.Provider value={prefValue}>
            <NavigationContainer theme={theme}>
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
            <StatusBar backgroundColor={theme.colors.background} />
          </PrefContext.Provider>
        </DataContext.Provider>
      </LocationContext.Provider>
    );
  }
};

export default App;
