import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
const SvgNtPartlycloudy = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    style={{
      enableBackground: 'new 0 0 64 64',
    }}
    xmlSpace="preserve"
    {...props}>
    <Path
      d="M40.2 58.2H15.1c-4.6 0-8.4-3.8-8.4-8.4 0-3.5 2.1-6.7 5.4-7.9.1-4.1 3.5-7.5 7.8-7.5.9 0 1.8.1 2.5.5 2-2.8 5.3-4.5 8.8-4.5 6 0 10.9 4.9 10.9 10.9 0 .5 0 .9-.1 1.4 3.5.8 6.3 3.9 6.3 7.8-.2 4.2-3.7 7.7-8.1 7.7zM19.8 37.7c-2.4 0-4.4 2-4.4 4.4 0 .3 0 .5.1.8l.3 1.6-1.6.4c-2.4.5-4.1 2.6-4.1 5 0 2.8 2.3 5.1 5.1 5.1h25.1c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5H40l-2.5.1.8-2.4c.3-.8.4-1.5.4-2.4 0-4.1-3.4-7.5-7.5-7.5-2.8 0-5.4 1.5-6.7 4l-.9 1.6-1.6-.8c-.6-.6-1.5-.9-2.2-.9z"
      style={{
        fill: useTheme().colors.cloud,
      }}
    />
    <Path
      d="M58.1 24.7h-1.6c-5 0-9.8-2.3-12.3-5.9-2.1-3.1-2.4-7.4-.9-11.4H43c-4.1 0-8.1 1.5-10.9 4.4-2.9 2.9-4.6 6.9-4.6 11.1 0 1.3.2 2.7.5 4l.1.4.4-.1c.7-.2 1.5-.3 2.3-.4h.5l-.1-.4c-.3-1.1-.5-2.3-.5-3.4 0-5.3 3.6-10.2 8.8-12-.5 4.1.6 8 3.1 11.1 2.7 3.5 6.9 5.7 11.7 6.2-2.2 4.2-5 6.4-9 7.1l-.4.1.2.4c.3.7.5 1.4.6 2.1l.1.4.4-.1c6.5-1.3 11.5-6.4 12.4-12.9l.1-.4-.6-.3z"
      style={{
        fill:useTheme().colors.water,
      }}
    />
  </Svg>
);
export default SvgNtPartlycloudy;
