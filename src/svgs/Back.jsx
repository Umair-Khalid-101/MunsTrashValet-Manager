import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const Back = (props) => (
  <SafeAreaView>
    <Svg
      width={14}
      height={20}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8 15L1 8l7-7"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </SafeAreaView>
);

export default Back;
