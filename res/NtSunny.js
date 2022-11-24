import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
const SvgNtSunny = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    style={{
      enableBackground: 'new 0 0 64 64',
    }}
    xmlSpace="preserve"
    {...props}>
    <Path
      d="M50.5 35.1C39 35.1 26.3 26 32.1 11.2c-12.4-.1-20.9 10-20.9 20.8 0 11.5 9.3 20.9 20.9 20.9 10.5 0 19.2-7.6 20.7-17.7 0-.1-1.5-.1-2.3-.1zM32.4 49.8c-9.9 0-17.9-8-17.9-17.9 0-8.2 5.8-15.1 13.3-17.3v.1c-1.8 12.5 7.1 23 20.7 24.2-3.5 6.8-8.3 10.6-16.1 10.9z"
      style={{
        fill:useTheme().colors.water,
      }}
    />
  </Svg>
);
export default SvgNtSunny;
