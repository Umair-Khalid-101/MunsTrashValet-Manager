import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// SVGS
import { MunsAppLogo } from "../svgs";

// COLORS
import { colors } from "../constants";

export default function GetStarted() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* LOGO */}
      <MunsAppLogo />
      <Text
        style={{
          // backgroundColor: "pink",
          alignSelf: "center",
          color: colors.primary,
          fontFamily: "Montserrat",
          marginTop: "2%",
          fontSize: 24,
        }}
      >
        Muns Trash Valet
      </Text>
      {/* LOGO */}
      {/* IMAGE */}
      <View style={styles.image}>
        <Image
          source={require("../../assets/Frame.png")}
          style={styles.frame}
        />
      </View>
      {/* IMAGE */}
      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.text}>MunsApp!</Text>
      </View>
      {/* TEXT */}
      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={styles.lighttext}>
          Muns provides professional door pick up trash
        </Text>
        <Text style={styles.lighttext}>
          valet services to apartment complexes
        </Text>
      </View>
      {/* TEXT */}
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("SignIn")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      {/* BUTTON */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "70%",
    alignSelf: "center",
    backgroundColor: colors.primary,
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: "CircularStd",
    fontSize: 16,
    color: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  frame: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  image: {
    width: "100%",
    height: "50%",
    marginTop: "2%",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
  },
  text: {
    fontFamily: "CircularStdBold",
    fontSize: 30,
  },
  lighttext: {
    fontFamily: "CircularStd",
    fontSize: 16,
    color: colors.grey,
  },
});
