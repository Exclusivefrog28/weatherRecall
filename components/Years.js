import React, { useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '../context/DataContext';
import Settings from './Settings';
import WeatherCard from './WeatherCard';

const Years = ({ numOfYears }) => {
  const { weatherData } = useContext(DataContext);

  const renderItem = ({ item }) => (
    <WeatherCard data={item} index={0}/>
  );

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        data={weatherData.yearly}
        extraData={weatherData.yearly}
        renderItem={renderItem}
      />
      <Settings />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: { paddingBottom: 96},
  list: {flex: 1, padding: 16},
});

export default Years;
