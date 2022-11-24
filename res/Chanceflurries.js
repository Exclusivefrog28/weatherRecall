import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, { Path, Circle } from 'react-native-svg';


const SvgChanceflurries = props => (
  <Svg
    className="chanceflurries_svg__weather-icon chanceflurries_svg__weather-icon-white chanceflurries_svg__chanceflurries"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    {...props}>
    <Path
      d="M51 22c.1-.8.2-1.6.2-2.4 0-7.4-6-13.4-13.4-13.4-4.6 0-8.7 2.3-11.2 6-1.2-.5-2.4-.8-3.7-.8-5.1 0-9.3 4.2-9.3 9.3v.3c-4.1 1.4-7 5.3-7 9.7 0 5.6 4.6 10.2 10.2 10.2h5c1.6 0 1.5-2.7 0-2.7h-5c-4.2 0-7.6-3.4-7.6-7.6 0-3.6 2.6-6.7 6.1-7.4l1.3-.2-.2-1.3c-.1-.4-.1-.8-.1-1.1 0-3.7 3-6.6 6.6-6.6 1.2 0 2.4.3 3.5 1l1.2.7.7-1.3c1.9-3.5 5.5-5.8 9.5-5.8 5.9 0 10.8 4.8 10.8 10.8 0 1.1-.2 2.2-.5 3.3l-.6 1.9 2.1-.1h.3c3.8 0 6.9 3.1 6.9 6.9 0 3.8-3.1 6.9-6.9 6.9h-5.8c-1.7 0-2 2.7 0 2.7h5.8c5.2 0 9.5-4.3 9.5-9.5 0-4.9-3.7-8.9-8.4-9.5z"
      style={{
        fill: useTheme().colors.precipitation,
      }}
    />
    <Path
      d="M40.9 49.3c.7-.9.5-2.2-.4-2.9-.9-.7-2.2-.5-2.9.4-.6.9-.5 2.2.4 2.9.9.7 2.2.5 2.9-.4zm-12.7 0c.7-.9.5-2.2-.4-2.9-.9-.7-2.2-.5-2.9.4-.7.9-.5 2.2.4 2.9.9.7 2.2.5 2.9-.4z"
      style={{
        fill: useTheme().colors.water,
      }}
    />
    <Circle
      transform="rotate(-52.562 32.904 56.797)"
      cx={32.9}
      cy={56.8}
      style={{
        fill: useTheme().colors.water,
      }}
      r={2.1}
    />
    <Circle
      transform="rotate(-52.54 32.904 39.302)"
      cx={32.9}
      cy={39.3}
      style={{
        fill: useTheme().colors.water,
      }}
      r={2.1}
    />
  </Svg>
);
export default SvgChanceflurries;
