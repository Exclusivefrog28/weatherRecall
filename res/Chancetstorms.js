import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
const SvgChancetstorms = props => (
  <Svg
    className="chancetstorms_svg__weather-icon chancetstorms_svg__weather-icon-white chancetstorms_svg__chancetstorms"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    {...props}>
    <Path
      d="M50.9 22.4c.1-.8.2-1.6.2-2.4 0-7.4-6-13.4-13.4-13.4-4.5 0-8.7 2.3-11.2 6-1.2-.5-2.4-.8-3.6-.8-5.1 0-9.3 4.2-9.3 9.3v.3c-4.1 1.4-7 5.2-7 9.7 0 5.6 4.6 10.2 10.2 10.2h5c1.6 0 1.5-2.7 0-2.7h-5c-4.2 0-7.5-3.4-7.5-7.5 0-3.6 2.5-6.7 6.1-7.4l1.3-.3-.2-1.3c-.1-.4-.1-.7-.1-1.1 0-3.6 3-6.6 6.6-6.6 1.2 0 2.4.3 3.5 1l1.2.7.7-1.3c1.9-3.5 5.5-5.7 9.5-5.7 5.9 0 10.7 4.8 10.7 10.7 0 1.1-.2 2.2-.5 3.3l-.6 1.9 2.1-.1h.3c3.8 0 6.8 3.1 6.8 6.8 0 3.8-3.1 6.8-6.8 6.8h-5.7c-1.7 0-2 2.7 0 2.7h5.7c5.2 0 9.5-4.3 9.5-9.5-.2-4.7-3.9-8.7-8.5-9.3z"
      style={{
        fill: useTheme().colors.precipitation,
      }}
    />
    <Path
      d="M27.2 59.2c-.2 0-.5-.1-.7-.2-.6-.4-.8-1.2-.4-1.8L34 44.1h-8.3L35 30.9c.4-.6 1.2-.7 1.8-.3.6.4.7 1.3.3 1.9l-6.4 9.1h7.9l-10.2 17c-.3.4-.7.6-1.2.6z"
      style={{
        fill: useTheme().colors.sun,
      }}
    />
  </Svg>
);
export default SvgChancetstorms;
