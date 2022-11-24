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
          <WeatherCard data={weatherData.home.current}/>
          <WeatherCard data={weatherData.home.yesterday}/>
          <WeatherCard data={weatherData.home.weekago}/>
        </View>
      </ScrollView>
      <Settings />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: { flex: 1, padding: 16 },
  gradient: { flex: 1, borderRadius: 8, marginVertical: 10, paddingTop: 6 },
  card: { flex: 1, paddingLeft: 6, paddingRight: 3, backgroundColor: 'transparent' },
  cardTitle: { paddingTop: 8, paddingHorizontal: 20, flexDirection: 'row', alignContent: 'center' },
  titleText: { flex: 20, textAlign: 'left', textAlignVertical: 'center', fontSize: 17 },
  subtitleText: { flex: 13.5, textAlign: 'left', textAlignVertical: 'center', fontSize: 15 },
  cardContent: { flexDirection: 'row', marginTop: 10 },
  mainInfo: { flex: 3, flexDirection: 'row', justifyContent: 'flex-start' },
  sideInfo: { flex: 2, justifyContent: 'center' },
  weatherText: { fontSize: 30, bottom: 18, textAlignVertical: 'bottom' },
});

export default Home;
