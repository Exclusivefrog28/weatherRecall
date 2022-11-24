import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
const SvgCloudy = props => (
  <Svg
    className="cloudy_svg__weather-icon cloudy_svg__weather-icon-white cloudy_svg__cloudy"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    {...props}>
    <Path
      d="M49.7 50.2H16.8c-5.6 0-10.2-4.6-10.2-10.2 0-4.4 2.9-8.3 7-9.7V30c0-5.1 4.2-9.3 9.3-9.3 1.3 0 2.5.3 3.7.8 2.5-3.7 6.6-6 11.2-6 7.4 0 13.4 6 13.4 13.4 0 .8-.1 1.6-.2 2.4 4.7.6 8.3 4.6 8.3 9.4-.1 5.2-4.4 9.5-9.6 9.5zM22.9 23.4c-3.6 0-6.6 3-6.6 6.6 0 .3 0 .7.1 1.1l.2 1.3-1.3.2c-3.5.7-6.1 3.8-6.1 7.4 0 4.2 3.4 7.5 7.5 7.5h32.9c3.8 0 6.8-3.1 6.8-6.8 0-3.8-3.1-6.8-6.8-6.8h-.3l-2 .1.6-1.9c.3-1.1.5-2.2.5-3.3 0-5.9-4.8-10.7-10.7-10.7-4 0-7.6 2.2-9.5 5.7l-.7 1.3-1.2-.7c-1-.7-2.2-1-3.4-1z"
      style={{
        fill: useTheme().colors.cloud,
      }}
    />
  </Svg>
);
export default SvgCloudy;
