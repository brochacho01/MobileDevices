import * as React from "react"
import { Svg, Circle, Path, G } from 'react-native-svg';
const PlaySVG = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={75} height={75} {...props}>
    <G fill="#A445ED" fillRule="evenodd">
      <Circle cx={37.5} cy={37.5} r={37.5} opacity={0.25} />
      <Path d="M29 27v21l21-10.5z" />
    </G>
  </Svg>
)
export default PlaySVG