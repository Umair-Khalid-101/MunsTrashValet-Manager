import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

// COLORS
import { colors } from "../constants";

export default function Loader({ title }) {
  const animation = useRef(null);

  return (
    <View style={styles.loaderContainer}>
      <LottieView
        autoPlay
        ref={animation}
        source={require("../../assets/Loader.json")}
        style={styles.loader}
      />
      <View>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>Please Wait!!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  loader: {
    position: "absolute",
    marginTop: 100,
    height: 100,
    width: 100,
  },
  text: {
    color: colors.white,
    fontSize: 24,
  },
});
