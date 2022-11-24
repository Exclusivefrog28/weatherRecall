import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, {Path, Circle } from 'react-native-svg';
const SvgSnow = props => (
  <Svg
    className="snow_svg__weather-icon snow_svg__weather-icon-white snow_svg__snow"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    {...props}>
    <Path
      d="M39.2 41c.7-.9.5-2.2-.4-2.9-.9-.7-2.2-.5-2.9.4-.7.9-.5 2.2.4 2.9.9.7 2.2.5 2.9-.4z"
      style={{
        fill:useTheme().colors.cloud,
      }}
    />
    <Circle
      transform="rotate(-52.533 28.135 39.777)"
      cx={28.1}
      cy={39.8}
      style={{
        fill:useTheme().colors.cloud,
      }}
      r={2.1}
    />
    <Path
      d="M39.2 58.1c.7-.9.5-2.2-.4-2.9-.9-.7-2.2-.5-2.9.4-.7.9-.5 2.2.4 2.9.9.7 2.2.6 2.9-.4z"
      style={{
        fill:useTheme().colors.cloud,
      }}
    />
    <Circle
      transform="rotate(-52.533 28.134 56.89)"
      cx={28.1}
      cy={56.9}
      style={{
        fill:useTheme().colors.cloud,
      }}
      r={2.1}
    />
    <Circle
      transform="rotate(-52.57 32.522 48.335)"
      cx={32.5}
      cy={48.3}
      style={{
        fill:useTheme().colors.cloud,
      }}
      r={2.1}
    />
    <Path
      d="M23.4 49.6c.7-.9.5-2.2-.4-2.9-.9-.7-2.2-.5-2.9.4-.7.9-.5 2.2.4 2.9.9.7 2.2.5 2.9-.4zm21.5 0c.7-.9.5-2.2-.4-2.9-.9-.7-2.2-.5-2.9.4-.6.9-.5 2.2.4 2.9.9.7 2.2.5 2.9-.4z"
      style={{
        fill:useTheme().colors.cloud,
      }}
    />
    <Path
      d="M50.9 22.3c.2-.8.2-1.6.2-2.4 0-7.4-6-13.4-13.4-13.4-4.5 0-8.7 2.3-11.2 6-1.2-.5-2.4-.8-3.6-.8-5.1 0-9.3 4.2-9.3 9.3v.3c-4.1 1.4-7 5.3-7 9.7 0 5.6 4.6 10.2 10.2 10.2h5c1.6 0 1.5-2.7 0-2.7h-5c-4.2 0-7.5-3.4-7.5-7.5 0-3.6 2.5-6.7 6-7.4l1.3-.2-.2-1.3c-.1-.4-.1-.7-.1-1.1 0-3.6 3-6.6 6.6-6.6 1.2 0 2.4.3 3.5 1l1.2.7.7-1.3c1.9-3.5 5.5-5.7 9.5-5.7 5.9 0 10.7 4.8 10.7 10.7 0 1.1-.2 2.2-.5 3.3l-.6 1.9 2.1-.1h.3c3.8 0 6.8 3.1 6.8 6.8 0 3.8-3.1 6.8-6.8 6.8h-5.7c-1.7 0-2 2.7 0 2.7h5.7c5.2 0 9.5-4.3 9.5-9.5-.1-4.8-3.8-8.8-8.4-9.4z"
      style={{
        fill: useTheme().colors.cloud,
      }}
    />
  </Svg>
);
export default SvgSnow;
