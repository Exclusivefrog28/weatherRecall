/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {MD3DarkTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(168, 200, 255)',
    onPrimary: 'rgb(0, 48, 98)',
    primaryContainer: 'rgb(0, 70, 138)',
    onPrimaryContainer: 'rgb(214, 227, 255)',
    secondary: 'rgb(189, 199, 220)',
    onSecondary: 'rgb(39, 49, 65)',
    secondaryContainer: 'rgb(62, 71, 88)',
    onSecondaryContainer: 'rgb(217, 227, 248)',
    tertiary: 'rgb(220, 188, 225)',
    onTertiary: 'rgb(62, 40, 69)',
    tertiaryContainer: 'rgb(86, 62, 92)',
    onTertiaryContainer: 'rgb(249, 216, 254)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 27, 30)',
    onBackground: 'rgb(227, 226, 230)',
    surface: 'rgb(26, 27, 30)',
    onSurface: 'rgb(227, 226, 230)',
    surfaceVariant: 'rgb(67, 71, 78)',
    onSurfaceVariant: 'rgb(196, 198, 207)',
    outline: 'rgb(142, 144, 153)',
    outlineVariant: 'rgb(67, 71, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(227, 226, 230)',
    inverseOnSurface: 'rgb(47, 48, 51)',
    inversePrimary: 'rgb(38, 94, 167)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(33, 36, 41)',
      level2: 'rgb(37, 41, 48)',
      level3: 'rgb(42, 46, 55)',
      level4: 'rgb(43, 48, 57)',
      level5: 'rgb(46, 51, 62)',
    },
    surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
    onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
    backdrop: 'rgba(45, 48, 56, 0.4)',

    sun: '#f9db62',
    precipitation: '#a3b5c7',
    cloud: '#fefefe',
    water: '#6ab9e9',
    ice: '#9ed8f0',
    fog: '#a5b7c9',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
