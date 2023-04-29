import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";

// CONTEXT
import { useStateContext } from "../context";
import { colors } from "../constants";

export default function SelectProperty() {
  const navigation = useNavigation();
  const { selectedProperty, setSelectedProperty, storedCredentials } =
    useStateContext();

  const handlePress = async () => {
    console.log("selectedProperty:", selectedProperty);
    navigation.navigate("IncidentReports");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Select Property</Text>
      <SelectList
        setSelected={(val) => setSelectedProperty(val)}
        data={storedCredentials?.properties}
        boxStyles={styles.input}
        placeholder="Select Property"
        inputStyles={{
          width: "80%",
          alignSelf: "center",
        }}
        dropdownStyles={{
          width: "90%",
          alignSelf: "center",
        }}
      />
      {selectedProperty && (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>View Incident Reports</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 45,
    borderRadius: 12,
    backgroundColor: "#246BFD",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: "5%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 50,
    width: "80%",
    marginTop: "2%",
    borderRadius: 12,
    paddingLeft: 20,
    alignSelf: "center",
    fontSize: 14,
    display: "flex",
  },
  text: {
    fontSize: 20,
    marginBottom: "5%",
    fontFamily: "CircularStdBold",
  },
});
