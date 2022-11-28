import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '../context/DataContext';
import Settings from './Settings';
import WeatherCard from './WeatherCard';

const Home = () => {

  const { weatherData } = useContext(DataContext);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <WeatherCard data={weatherData} index={0} title="Current weather" />
          <WeatherCard data={weatherData} index={1} title="Yesterday" />
          <WeatherCard data={weatherData} index={7} title="Last week" />
          <WeatherCard data={weatherData} index={29} title="30 days ago" />
        </View>
      </ScrollView>
      <Settings />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: { flex: 1, padding: 10, paddingBottom: 80 },
});

export default Home;
