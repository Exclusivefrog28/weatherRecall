import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '../context/DataContext';
import Settings from './Settings';
import WeatherCard from './WeatherCard';

const Home = () => {

  let now = new Date().getHours();

  const { weatherData } = useContext(DataContext);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <WeatherCard data={weatherData.hourly[0][now]}/>
          <WeatherCard data={weatherData.hourly[1][now]}/>
          <WeatherCard data={weatherData.hourly[7][now]}/>
        </View>
      </ScrollView>
      <Settings />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default Home;
