import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

// SVGS
import { Back } from "../svgs";

// NAVIGATION
import { useNavigation } from "@react-navigation/native";

// COLORS
import { colors } from "../constants";

export default function ViewReport({ route }) {
  const { item } = route.params;
  console.log("ITEM:", item);
  const navigation = useNavigation();

  // PDF CREATION
  const html = `
    <html>
    <head>
    <style>
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40;
    }
    div {
      display: flex;
      align-items: center;
      margin-top: 20px;
    }
    h1 {
    font-size: 24;
    }
    p {
    font-size: 24;
    margin-left: 10px;
    }
    </style>
    </head>
    <body>
      <span>Incident Report</span>
      <div>
      <h1>Issue:</h1>
      <p>${item?.issue}</p>
      </div>
      <div>
      <h1>Apatment:</h1>
      <p>${item?.apartment}</p>
      </div>
      <div>
      <h1>Property Name:</h1>
      <p>${item?.propertyname}</p>
      </div>
      <div>
      <h1>State Name:</h1>
      <p>${item?.statename}</p>
      </div>
      <div>
      <h1>City Name:</h1>
      <p>${item?.cityname}</p>
      </div>
      <div>
      <h1>Other:</h1>
      <p>${item?.other}</p>
      </div>
      <div>
      <h1>Reported Date:</h1>
      <p>${item?.reportedDate}</p>
      </div>
      <div>
      <h1>Reported Time:</h1>
      <p>${item?.reportedTime}</p>
      </div>
    </body>
    </html>
  `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.nav}>
          <TouchableOpacity>
            <View>
              <Back
                style={styles.back}
                onPress={() => navigation.navigate("TabNavigator")}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.text1}>View Report</Text>
        </View>
        <View style={styles.greyline}></View>
        {item?.incidentImage && (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: "3%",
            }}
          >
            <Image
              source={{ uri: item?.incidentImage }}
              style={{
                width: "90%",
                height: 200,
                borderRadius: 8,
                marginTop: "5%",
                marginBottom: "5%",
              }}
            />
          </View>
        )}
        <Text style={styles.title}>State </Text>
        <View style={styles.inputbox}>
          <Text style={styles.title2}>{item?.statename} </Text>
        </View>
        <Text style={styles.title}>City </Text>
        <View style={styles.inputbox}>
          <Text style={styles.title2}>{item?.cityname}</Text>
        </View>
        <Text style={styles.title}>Property </Text>
        <View style={styles.inputbox}>
          <Text style={styles.title2}>{item?.propertyname}</Text>
        </View>
        <Text style={styles.title}>Apartment # (optional)</Text>
        <View style={styles.inputbox}>
          <Text style={styles.title2}>{item?.apartment}</Text>
        </View>
        <Text style={styles.title}>Other</Text>
        <View style={styles.inputbox2}>
          <Text style={styles.title2}>{item?.other}</Text>
        </View>
        <Text style={styles.title}>Issue</Text>
        <View style={styles.inputbox2}>
          <Text style={styles.title2}>{item?.issue}</Text>
        </View>
        <TouchableOpacity style={styles.printButton} onPress={generatePdf}>
          <Text style={styles.printButtonText}>Print as Pdf</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  nav: {
    display: "flex",
    marginTop: 5,
    // backgroundColor: "blue",
    height: 35,
    justifyContent: "center",
  },
  text1: {
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 16,
    position: "absolute",
  },
  back: {
    alignSelf: "flex-start",
    position: "absolute",
    marginLeft: "3%",
    marginTop: "2%",
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: "#D6D6D6",
    marginTop: "3%",
  },
  title: {
    fontFamily: "CircularStd",
    fontSize: 12,
    color: "#94A1B2",
    marginLeft: 10,
    marginTop: 10,
  },
  title2: {
    fontFamily: "CircularStd",
    fontSize: 12,
    color: "#94A1B2",
    marginLeft: 10,
  },
  inputbox: {
    width: "90%",
    borderRadius: 12,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    height: 50,
    alignSelf: "center",
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
  },
  inputbox2: {
    width: "90%",
    borderRadius: 12,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    height: 120,
    alignSelf: "center",
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
  },
  imagebutton: {
    width: "90%",
    backgroundColor: "#ECECEC",
    height: 70,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconbox: {
    display: "flex",
    width: 50,
    height: 50,
    borderRadius: 12,
    marginLeft: 10,
    borderColor: "",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textitem: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 10,
  },
  editicon: {
    backgroundColor: colors.editIcon,
    opacity: 0.1,
    width: 60,
    height: 40,
    borderRadius: 12,
    marginRight: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bluetext: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: "CircularStd",
  },
  printButton: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: colors.primary,
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "5%",
    borderRadius: 8,
  },
  printButtonText: {
    color: colors.white,
    fontFamily: "CircularStd",
    fontSize: 16,
  },
});
