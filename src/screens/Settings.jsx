import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// ICONS
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

// NAVIGATION
import { useNavigation } from "@react-navigation/native";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

// SERVICES
import { signOut, getAuth } from "../services";

// CONTEXT
import { useStateContext } from "../context";

// COMPONENTS
import { Loader } from "../components";

export default function Settings() {
  const { setStoredCredentials } = useStateContext();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  // HANDLE SIGN OUT
  const handleSignOut = async () => {
    const auth = getAuth();
    setIsLoading(true);
    signOut(auth)
      .then(async () => {
        // Sign-out successful.
        await AsyncStorage.removeItem("userCredentials")
          .then(() => {
            setStoredCredentials(null);
            setIsLoading(false);
            navigation.replace("GetStarted");
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading && (
        <SafeAreaView style={styles.container}>
          <Text style={styles.text1}>Setting</Text>
          <View style={styles.greyline}></View>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => navigation.navigate("WriteUs")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="file-edit-outline"
                size={24}
                color="#94A1B2"
                style={{ marginLeft: 20 }}
              />
              <Text style={styles.text2}>Write To Us</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A1B2"
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                right: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => navigation.navigate("TermsConditions")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesome
                name="file-text-o"
                size={22}
                color="#94A1B2"
                style={{ marginLeft: 20 }}
              />
              <Text style={styles.text2}>Terms & Conditions</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A1B2"
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                right: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="file-lock-outline"
                size={24}
                color="#94A1B2"
                style={{ marginLeft: 20 }}
              />

              <Text style={styles.text2}>Privacy Policy</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A1B2"
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                right: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => navigation.navigate("AboutUs")}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <AntDesign
                name="exclamationcircleo"
                size={22}
                color="#94A1B2"
                style={{ marginLeft: 20 }}
              />
              <Text style={styles.text2}>About Us</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A1B2"
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                right: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.redbutton} onPress={handleSignOut}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Ionicons
                name="power-outline"
                size={22}
                color="red"
                style={{ marginLeft: 20 }}
              />
              <Text style={styles.text2}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Signing Out!"} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text1: {
    fontFamily: "CircularStdBold",
    fontSize: 16,
    marginTop: "3%",
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: "5%",
  },
  buttoncontainer: {
    width: "90%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 1,
    marginTop: "7%",
  },
  text2: {
    fontFamily: "CircularStd",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 1,
  },
  redbutton: {
    width: "90%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#FFCCCB",
    marginTop: "7%",
  },
});
