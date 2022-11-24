import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, {Path, Circle} from 'react-native-svg';
const SvgUnknown = props => (
  <Svg
    className="unknown_svg__weather-icon unknown_svg__weather-icon-white unknown_svg__unknown"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    {...props}>
    <Path
      d="M49.7 50H16.8c-5.6 0-10.2-4.6-10.2-10.2 0-4.4 2.9-8.3 7-9.7v-.3c0-5.1 4.2-9.3 9.3-9.3 1.3 0 2.5.3 3.6.8 2.5-3.7 6.6-6 11.2-6 7.4 0 13.4 6 13.4 13.4 0 .8-.1 1.6-.2 2.4 4.7.6 8.3 4.6 8.3 9.4 0 5.2-4.3 9.5-9.5 9.5zM22.9 23.2c-3.6 0-6.6 3-6.6 6.6 0 .3 0 .7.1 1.1l.2 1.3-1.3.2c-3.5.7-6.1 3.8-6.1 7.4 0 4.2 3.4 7.5 7.5 7.5h32.9c3.8 0 6.8-3.1 6.8-6.8 0-3.8-3.1-6.8-6.8-6.8h-.3l-2 .1.6-1.9c.3-1.1.5-2.2.5-3.3 0-5.9-4.8-10.7-10.7-10.7-4 0-7.6 2.2-9.5 5.7l-.7 1.2-1.2-.7c-1-.6-2.2-.9-3.4-.9z"
      style={{
        fill: useTheme().colors.cloud,
      }}
    />
    <Path
      d="M33.9 39.5c-.7 0-1.3-.6-1.3-1.3 0-1.9.1-3.2 1.6-4.8l.9-.9c1.2-1.2 1.9-2 1.8-3.1-.1-1.2-.7-1.9-2-2.2-1-.3-2.3.1-3 .9-.4.4-.6 1.1-.6 1.8.1.7-.5 1.4-1.2 1.4s-1.4-.5-1.4-1.2c-.1-1.3.4-2.8 1.3-3.7 1.4-1.5 3.7-2.2 5.7-1.7 2.3.6 3.8 2.4 3.9 4.7.1 2.3-1.4 3.8-2.6 5l-.8.8c-.8.9-.9 1.5-.9 3.1-.1.6-.7 1.2-1.4 1.2z"
      style={{
        fill: useTheme().colors.cloud,
      }}
    />
    <Circle
      cx={33.9}
      cy={43.3}
      style={{
        fill: useTheme().colors.cloud,
      }}
      r={1.4}
    />
    <Path
      d="M33.9 45.2c-1 0-1.9-.8-1.9-1.9 0-1 .8-1.9 1.9-1.9 1 0 1.9.9 1.9 1.9 0 1-.8 1.9-1.9 1.9zm0-2.8c-.5 0-.8.4-.8.8 0 .5.4.8.8.8.5 0 .8-.4.8-.8.1-.4-.3-.8-.8-.8z"
      style={{
        fill: useTheme().colors.cloud,
      }}
    />
  </Svg>
);
export default SvgUnknown;
