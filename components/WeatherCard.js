import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text, Card, useTheme, TouchableRipple, Divider } from 'react-native-paper';
import { PrefContext } from '../context/PrefContext';
import { convertLength, convertTemp } from '../util/Convert';
import { WeatherIcon } from './WeatherIcon';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const WeatherCard = ({ data, index, title }) => {

    const theme = useTheme();

    const { preferences } = useContext(PrefContext);
    const [open, setOpen] = useState(false);

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

    let hourly = data.hourly[index];
    let daily = data.daily[index];

    let time = new Date();
    let hour = time.getHours();
    let date = new Date(hourly[hour].time);

    if (title == null) { title = date.getFullYear(); }

    if (time.getTime() - date.getTime() < 604800000) {
        date = new Intl.DateTimeFormat('en-CA', { weekday: 'long' }).format(date) + ' ' + time.getHours() + ':00';
    } else { date = date.toLocaleDateString('en-CA', { month: 'long', day: '2-digit' }) + ' ' + time.getHours() + ':00'; }

    const DropDown = () => {
        if (open) {
            return (
                <Card.Content>
                    <Divider style={styles.gradient}/>
                    <View style={styles.row}>
                        <View style={styles.extraUnit}>
                            <AwesomeIcon name="temperature-high" color={theme.colors.tertiary} size={16} />
                            <Text variant="labelMedium" style={styles.extraText}>{convertTemp(daily.tempMax, preferences.tempUnit)}{preferences.tempUnit}</Text>
                        </View>
                        <View style={styles.extraUnit}>
                            <AwesomeIcon name="temperature-low" color={theme.colors.primary} size={16} />
                            <Text variant="labelMedium" style={styles.extraText}>{convertTemp(daily.tempMin, preferences.tempUnit)}{preferences.tempUnit}</Text>
                        </View>
                        <View style={styles.extraUnit}>
                            <MaterialIcon name="water" color={theme.colors.primary} size={18} />
                            <Text variant="labelMedium" style={styles.extraText}>{convertLength(daily.precip, preferences.precipUnit)} {preferences.precipUnit}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.extraUnit}>
                            <MaterialIcon name="weather-sunset-up" color={theme.colors.sun} size={18} />
                            <Text variant="labelMedium" style={styles.extraText}>{new Date(daily.sunrise).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                        <View style={styles.extraUnit}>
                            <AwesomeIcon name="arrows-alt-h" color={theme.colors.secondary} size={16} />
                            <Text variant="labelMedium" style={styles.extraText}>{new Date(new Date(daily.sunset) - new Date(daily.sunrise)).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                        <View style={styles.extraUnit}>
                            <MaterialIcon name="weather-sunset-down" color={theme.colors.sun} size={18} />
                            <Text variant="labelMedium" style={styles.extraText}>{new Date(daily.sunset).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                    </View>
                </Card.Content>
            );
        }
    };

    return (
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[theme.colors.elevation.level1, theme.colors.elevation.level5]}
            style={styles.gradient}>
            <TouchableRipple
                onPress={() => setOpen(!open)}
                style={styles.ripple}>
                <Card mode="contained" style={styles.card}>
                    <View style={styles.cardTitle}>
                        <Text variant="labelLarge" style={styles.titleText}>{title}</Text>
                        <Text variant="bodyLarge" style={styles.subtitleText}>{date}</Text>
                    </View>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.mainInfo}>
                            <WeatherIcon weatherCode={hourly[hour].weatherCode} night={hourly[hour].night} />
                            <Text style={styles.weatherText} variant={'labelLarge'}>{convertTemp(hourly[hour].temp, preferences.tempUnit)}{preferences.tempUnit}</Text>
                        </View>
                        <View style={styles.sideInfo}>
                            <Text variant="titleMedium">{weatherCodeMap.get(hourly[hour].weatherCode)}</Text>
                            <Text>Feels like: {convertTemp(hourly[hour].tempApparent, preferences.tempUnit)}{preferences.tempUnit}</Text>
                            <Text>Humidity: {hourly[hour].humidity}%</Text>
                        </View>
                    </Card.Content>
                    <DropDown />
                </Card>
            </TouchableRipple>
        </LinearGradient>
    );
};

const styles = new StyleSheet.create({
    gradient: { flex: 1, borderRadius: 8, marginVertical: 10 },
    ripple: { borderRadius: 8 },
    card: { flex: 1, paddingLeft: 6, paddingRight: 3, backgroundColor: 'transparent', marginVertical: 10 },
    cardTitle: { paddingTop: 8, paddingHorizontal: 20, flexDirection: 'row', alignContent: 'center' },
    titleText: { flex: 20, textAlign: 'left', textAlignVertical: 'center', fontSize: 17 },
    subtitleText: { flex: 13.5, textAlign: 'left', textAlignVertical: 'center', fontSize: 15 },
    cardContent: { flexDirection: 'row', marginTop: 10 },
    mainInfo: { flex: 3, flexDirection: 'row', justifyContent: 'flex-start' },
    sideInfo: { flex: 2, justifyContent: 'center' },
    weatherText: { flex: 1, lineHeight: 32, fontSize: 30, bottom: 18, textAlignVertical: 'bottom' },
    row: { flexDirection: 'row', alignItems: 'baseline', marginVertical: 4, justifyContent: 'space-evenly' },
    extraUnit: { flex: 1, flexDirection: 'row', paddingHorizontal: 10 },
    extraText: { paddingLeft: 10, fontSize: 16, textAlignVertical: 'bottom' },
});

export default WeatherCard;

