import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// SVG
import { Back } from "../svgs";

// NAVIGATION
import { useNavigation } from "@react-navigation/native";

export default function PrivacyPolicy() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity>
          <View>
            <Back
              style={styles.back}
              onPress={() => navigation.navigate("TabNavigator")}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.text1}>Privacy Policy</Text>
      </View>
      <View style={styles.greyline}></View>
      <View style={styles.termsbox}>
        <Text style={styles.text2}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
  },
  nav: {
    display: "flex",
    marginTop: "3%",
    height: 40,
  },
  back: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 16,
  },
  text1: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 16,
    position: "absolute",
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: "2%",
  },
  termsbox: {
    width: "93%",
    display: "flex",
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
  },
  text2: {
    color: "#94A1B2",
    fontFamily: "CircularStd",
    fontSize: 16,
    marginTop: 20,
  },
});
