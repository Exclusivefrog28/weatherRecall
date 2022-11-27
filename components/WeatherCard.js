import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text, Card, useTheme } from 'react-native-paper';
import { PrefContext } from '../context/PrefContext';
import { convertTemp } from '../util/Convert';
import { WeatherIcon } from './WeatherIcon';


const WeatherCard = ({ data, title }) => {

    const theme = useTheme();

    const { preferences } = useContext(PrefContext);

    const weatherCodeMap = new Map([
        [0, 'Clear sky'],
        [1, 'Mainly clear'],
        [2, 'Partly cloudy'],
        [3, 'Overcast'],
        [45, 'Fog'],
        [48, 'Rime fog'],
        [51, 'Light drizzle'],
        [53, 'Moderate drizzle'],
        [55, 'Dense drizzle'],
        [56, 'Light freezing drizzle'],
        [57, 'Dense freezing drizzle'],
        [61, 'Slight rain'],
        [63, 'Moderate rain'],
        [65, 'Heavy rain'],
        [66, 'Slight freezing rain'],
        [67, 'Heavy freezing rain'],
        [71, 'Slight snow'],
        [73, 'Moderate snow'],
        [75, 'Heavy snow'],
        [77, 'Snow grains'],
        [80, 'Slight rain showers'],
        [81, 'Moderate rain showers'],
        [82, 'Violent rain showers'],
        [85, 'Slight snow showers'],
        [86, 'Heavy snow showers'],
        [95, 'Thunderstorm'],
        [96, 'Thunderstorm with slight hail'],
        [99, 'Thunderstorm with heavy hail'],
    ]);

    let time = new Date();
    let date = new Date(data.time);

    if (title == null) { title = date.getFullYear(); }

    if (time.getTime() - date.getTime() < 604800000) {
        date = new Intl.DateTimeFormat('en-CA', { weekday: 'long' }).format(date) + ' ' + time.getHours() + ':00';
    } else { date = date.toLocaleDateString('en-CA', { month: 'long', day: '2-digit' }) + ' ' + time.getHours() + ':00'; }

    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[theme.colors.elevation.level1, theme.colors.elevation.level5]}
            style={styles.gradient}>
            <Card mode="contained" style={styles.card}>
                <View style={styles.cardTitle}>
                    <Text variant="labelLarge" style={styles.titleText}>{title}</Text>
                    <Text variant="bodyLarge" style={styles.subtitleText}>{date}</Text>
                </View>
                <Card.Content style={styles.cardContent}>
                    <View style={styles.mainInfo}>
                        <WeatherIcon weatherCode={data.weatherCode} night={data.night} />
                        <Text style={styles.weatherText} variant={'labelLarge'}>{convertTemp(data.temp, preferences.tempUnit)}{preferences.tempUnit}</Text>
                    </View>
                    <View style={styles.sideInfo}>
                        <Text variant="titleMedium">{weatherCodeMap.get(data.weatherCode)}</Text>
                        <Text>Feels like: {convertTemp(data.tempApparent, preferences.tempUnit)}{preferences.tempUnit}</Text>
                        <Text>Humidity: {data.humidity}%</Text>
                    </View>
                </Card.Content>
            </Card>
        </LinearGradient>
    );
};

const styles = new StyleSheet.create({
    gradient: { flex: 1, borderRadius: 8, marginVertical: 10, paddingTop: 6 },
    card: { flex: 1, paddingLeft: 6, paddingRight: 3, backgroundColor: 'transparent' },
    cardTitle: { paddingTop: 8, paddingHorizontal: 20, flexDirection: 'row', alignContent: 'center' },
    titleText: { flex: 20, textAlign: 'left', textAlignVertical: 'center', fontSize: 17 },
    subtitleText: { flex: 13.5, textAlign: 'left', textAlignVertical: 'center', fontSize: 15 },
    cardContent: { flexDirection: 'row', marginTop: 10 },
    mainInfo: { flex: 3, flexDirection: 'row', justifyContent: 'flex-start' },
    sideInfo: { flex: 2, justifyContent: 'center' },
    weatherText: { flex: 1, lineHeight: 32, fontSize: 30, bottom: 18, textAlignVertical: 'bottom' },
});

export default WeatherCard;

