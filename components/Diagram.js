import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme, SegmentedButtons, Card, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '../context/DataContext';
import Settings from './Settings';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import { PrefContext } from '../context/PrefContext';
import { convertLength, convertTemp } from '../util/Convert';

const Diagram = ({ timeFrame }) => {

  const { weatherData } = useContext(DataContext);
  const { preferences } = useContext(PrefContext);

  const theme = useTheme();

  const [aggregate, setAggregate] = useState({});
  const [selectedChart, setSelectedChart] = useState('tempMax');
  const [chartData, setChartData] = useState({ labels: [''], datasets: [{ data: [0, 1] }] });

  useEffect(() => {
    let label = [];
    let data = [];
    let suffix = '';
    let color = (opacity = 1) => { };

    for (let i = 0; i < timeFrame; i++) {
      if (timeFrame > 7) {
        if ((i + 6) % 7 === 0) {
          label.push(new Date(weatherData.daily[i].time).toLocaleString('en-US', { month: 'numeric', day: 'numeric' }));
        } else { label.push(''); }
      }
      else { label.push(new Date(weatherData.daily[i].time).toLocaleString('en-US', { month: 'short', day: 'numeric' })); }
    }

    switch (selectedChart) {
      case 'tempMax':
        data = [];
        for (let i = 0; i < timeFrame; i++) {
          data.push(convertTemp(weatherData.daily[i].tempMax, preferences.tempUnit));
        }
        color = (opacity = 1) => `rgba(220, 188, 255, ${opacity})`;
        suffix = preferences.tempUnit;
        break;
      case 'tempMin':
        data = [];
        for (let i = 0; i < timeFrame; i++) {
          data.push(convertTemp(weatherData.daily[i].tempMin, preferences.tempUnit));
        }
        color = (opacity = 1) => `rgba(168, 200, 255, ${opacity})`;
        suffix = preferences.tempUnit;
        break;
      case 'precip':
        data = [];
        for (let i = 0; i < timeFrame; i++) {
          data.push(convertLength(weatherData.daily[i].precip, preferences.precipUnit));
        }
        color = (opacity = 1) => `rgba(0, 70, 138, ${opacity})`;
        suffix = ' ' + preferences.precipUnit;
        break;
    }

    setChartData({
      labels: label.reverse(),
      suffix: suffix,
      datasets: [
        {
          data: data.reverse(),
          color: color,
          strokeWidth: 5,
        }],
    });
  }, [weatherData, selectedChart, timeFrame, preferences]);

  useEffect(() => {
    let maxAvg = 0;
    let minAvg = 0;
    let precipSum = 0;

    for (let i = 0; i < timeFrame; i++) {
      maxAvg += (convertTemp(weatherData.daily[i].tempMax, preferences.tempUnit));
      minAvg += (convertTemp(weatherData.daily[i].tempMin, preferences.tempUnit));
      precipSum += (convertLength(weatherData.daily[i].precip, preferences.precipUnit));
    }

    setAggregate({
      maxAvg: (maxAvg / timeFrame).toFixed(2),
      minAvg: (minAvg / timeFrame).toFixed(2),
      precipSum: precipSum.toPrecision(2),
    });
  }, [weatherData, timeFrame, preferences]);


  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={[theme.colors.elevation.level1, theme.colors.elevation.level5]}
          style={styles.gradient}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.column}>
              <Text style={styles.text} variant="bodyLarge">Average maximum temperature:</Text>
              <Text style={styles.text} variant="bodyLarge">Average minimum temperature:</Text>
              <Text style={styles.text} variant="bodyLarge">Total precipitation:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text2} variant="bodyLarge">{aggregate.maxAvg}{preferences.tempUnit}</Text>
              <Text style={styles.text2} variant="bodyLarge">{aggregate.minAvg}{preferences.tempUnit}</Text>
              <Text style={styles.text2} variant="bodyLarge">{aggregate.precipSum} {preferences.precipUnit}</Text>
            </View>
          </Card.Content>
        </LinearGradient>
        <LineChart
          data={chartData}
          width={useWindowDimensions().width - 32}
          height={useWindowDimensions().height / 1.5}
          withShadow={false}
          segments={5}
          yAxisSuffix={chartData.suffix}
          yAxisInterval={(timeFrame > 7) ? 7 : 1}
          chartConfig={{
            backgroundGradientFrom: theme.colors.elevation.level1,
            backgroundGradientTo: theme.colors.elevation.level5,
            decimalPlaces: chartData.suffix === ' inch' ? 2 : 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 8,
            },
            scrollableDotFill: theme.colors.onPrimaryContainer,
            scrollableDotRadius: 6,
            scrollableDotStrokeColor: theme.colors.primary,
            scrollableDotStrokeWidth: 3,
            scrollableInfoViewStyle: {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              backgroundColor: theme.colors.secondaryContainer,
              borderRadius: 10,
            },
            scrollableInfoTextStyle: {
              color: theme.colors.secondary,
              textAlignVertical: 'bottom',
              textAlign: 'center',
              flex: 1,
              fontSize: 16,
            },
            scrollableInfoTextDecorator: (number) => { return `${number}${chartData.suffix}`; },
            scrollableInfoSize: { width: 60, height: 40 },
            scrollableInfoOffset: 14,
          }}
          bezier
          withScrollableDot
          style={styles.chart}
        />
        <SegmentedButtons
          style={styles.buttons}
          onValueChange={() => { }}
          buttons={[
            {
              value: 'tempMax',
              icon: ({ size, color }) => { return <AwesomeIcon name="temperature-high" size={size} color={color} />; },
              onPress: () => setSelectedChart('tempMax'),
            },
            {
              value: 'tempMin',
              icon: ({ size, color }) => { return <AwesomeIcon name="temperature-low" size={size} color={color} />; },
              onPress: () => setSelectedChart('tempMin'),
            },
            {
              value: 'tempMin',
              icon: ({ size, color }) => { return <MaterialIcon name="water" size={size} color={color} />; },
              onPress: () => setSelectedChart('precip'),
            },
          ]}
        />
      </View>
      <Settings />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: { flex: 1, padding: 16 },
  buttons: { alignSelf: 'center', position: 'absolute', bottom: '7.5%' },
  cardContent: { flex: 1, flexDirection: 'row' },
  column: { flexDirection: 'column', justifyContent: 'center' },
  chart: { marginVertical: 8, borderRadius: 8 },
  text: { fontSize: 16, textAlignVertical: 'bottom' },
  text2: { fontSize: 16, textAlignVertical: 'bottom', textAlign: 'right', paddingLeft: 8 },
  gradient: { marginVertical: 10, padding: 10, flex: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
});

export default Diagram;
