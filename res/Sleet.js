import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
const SvgSleet = props => (
  <Svg
    className="sleet_svg__weather-icon sleet_svg__weather-icon-white sleet_svg__sleet"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    {...props}>
    <Path
      d="m22.3 57.4-2.8.9-.9-2.7 2.8-.9zm.3-4.7c-.1 0-.3 0-.4-.1-.6-.2-.9-.9-.7-1.6l5-12.3c.2-.6.9-.9 1.6-.7.6.3.9.9.6 1.6l-5 12.3c-.2.5-.7.8-1.1.8zm2.01 3.144 2.752-.918.918 2.75-2.75.92zM28.6 53c-.2 0-.3 0-.5-.1-.6-.2-.9-.9-.6-1.6l5-12.3c.2-.6.9-.9 1.6-.6.6.2.9.9.7 1.6l-5 12.3c-.3.4-.7.7-1.2.7zm2.11 2.828 2.75-.918.92 2.75-2.752.92zM34.6 53c-.1 0-.3 0-.5-.1-.6-.2-.9-.9-.6-1.6l5-12.3c.2-.6.9-.9 1.6-.6.6.2.9.9.6 1.6l-5 12.3c-.2.4-.6.7-1.1.7z"
      style={{
        fill:useTheme().colors.ice,
      }}
    />
    <Path
      d="M50.9 24.2c.1-.8.2-1.6.2-2.4 0-7.4-6-13.4-13.4-13.4-4.5 0-8.7 2.3-11.2 6-1.2-.5-2.4-.8-3.6-.8-5.1 0-9.3 4.2-9.3 9.3v.3c-4.1 1.4-7 5.2-7 9.7 0 5.6 4.6 10.2 10.2 10.2h5c1.6 0 1.5-2.7 0-2.7h-5c-4.2 0-7.5-3.4-7.5-7.5 0-3.6 2.5-6.7 6.1-7.4l1.3-.3-.3-1.2c-.1-.4-.1-.8-.1-1.1 0-3.6 3-6.6 6.6-6.6 1.2 0 2.4.3 3.5 1l1.2.7.7-1.3c1.9-3.5 5.5-5.7 9.5-5.7 5.9 0 10.7 4.8 10.7 10.7 0 1.1-.2 2.2-.5 3.3l-.6 1.9 2.1-.1h.3c3.8 0 6.8 3.1 6.8 6.8 0 3.8-3.1 6.8-6.8 6.8h-5.7c-1.7 0-2 2.7 0 2.7h5.7c5.2 0 9.5-4.3 9.5-9.5-.1-4.8-3.8-8.8-8.4-9.4z"
      style={{
        fill: useTheme().colors.precipitation,
      }}
    />
  </Svg>
);
export default SvgSleet;
