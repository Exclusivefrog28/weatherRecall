import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Res from '../res';

export const WeatherIcon = ({ weatherCode, night }) => {

    const styles = new StyleSheet.create({
        container: { width: 96, height: 96, paddingRight: 10 },
    });

    if (night) {
        return (
            <View style={styles.container}>
                <Night code={weatherCode} />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Day code={weatherCode} />
            </View>
        );
    }
};

const Day = ({ code }) => {
    switch (code) {
        case 0: return (<Res.Clear />);
        case 1: return (<Res.Mostlysunny />);
        case 2: return (<Res.Mostlycloudy />);
        default: return (<Covered code={code} />);
    }
};

const Night = ({ code }) => {
    switch (code) {
        case 0: return (<Res.NtClear />);
        case 1: return (<Res.NtMostlysunny />);
        case 2: return (<Res.NtMostlycloudy />);
        default: return (<Covered code={code} />);
    }
};

const Covered = ({ code }) => {
    switch (code) {
        case 3: return (<Res.Cloudy />);
        case 45:
        case 48: return (<Res.Fog />);
        case 51:
        case 53:
        case 55:
        case 56:
        case 57: return (<Res.Flurries />);
        case 61: return (<Res.Chancerain />);
        case 63:
        case 65:
        case 80:
        case 81:
        case 82: return (<Res.Rain />);
        case 66: return (<Res.Chancesleet />);
        case 77:
        case 67: return (<Res.Sleet />);
        case 71:
        case 73:
        case 85: return (<Res.Chancesnow />);
        case 86:
        case 75: return (<Res.Snow />);
        case 80:
        case 81:
        case 82: return (<Res.Chanceflurries />);
        case 95: return (<Res.Chancetstorms />);
        case 96:
        case 99: return (<Res.Tstorms />);
        default: return (<Res.Unknown />);
    }
};

export function dataToWeatherCode(cloudCover, rain, snow) {
    if (snow > 0) { return 73; }
    if (rain > 0) { return 63; }
    if (cloudCover > 75) { return 3; }
    if (cloudCover > 50) { return 2; }
    if (cloudCover > 25) { return 1; }
    return 0;
}
