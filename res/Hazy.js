import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
const SvgHazy = props => (
  <Svg
    className="hazy_svg__weather-icon hazy_svg__weather-icon-white hazy_svg__hazy"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    {...props}>
    <Path
      d="M41.7 38.5c-3.2 0-6.1-.9-8.7-2.7-7.2-5.1-13.2-5.3-19.6-.9-.5.3-1.1.2-1.4-.3-.3-.5-.2-1.1.3-1.4 7.1-4.9 14.1-4.6 21.9.9 6.2 4.4 13.3 1.9 18.2-1 .5-.3 1.1-.1 1.4.4.3.5.1 1.1-.4 1.4-4 2.4-8 3.6-11.7 3.6z"
      style={{
        fill: useTheme().colors.fog,
      }}
    />
    <Path
      d="M41.7 46.3c-3.2 0-6.1-.9-8.7-2.7-7.2-5.1-13.2-5.3-19.6-.9-.5.3-1.1.2-1.4-.3-.3-.5-.2-1.1.3-1.4 7.1-4.9 14.1-4.6 21.9.9 6.2 4.3 13.3 1.9 18.2-1 .5-.3 1.1-.1 1.4.4.3.5.1 1.1-.4 1.4-4 2.4-8 3.6-11.7 3.6zm0-15.5c-3.2 0-6.1-.9-8.7-2.7-7.2-5.1-13.2-5.3-19.6-.9-.5.3-1.1.2-1.4-.3-.3-.5-.2-1.1.3-1.4 7.1-4.9 14.1-4.6 21.9.9 6.2 4.4 13.3 1.9 18.2-1 .5-.3 1.1-.1 1.4.4.3.5.1 1.1-.4 1.4-4 2.4-8 3.6-11.7 3.6z"
      style={{
        fill: useTheme().colors.fog,
      }}
    />
  </Svg>
);
export default SvgHazy;
