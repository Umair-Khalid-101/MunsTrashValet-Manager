import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SafeAreaView } from "react-native-safe-area-context";

// SVG
import { Back } from "../svgs";

// NAVIGATION
import { useNavigation } from "@react-navigation/native";

// SERVICES
import { doc, db, setDoc } from "../services";

// CONTEXT
import { useStateContext } from "../context";

// COMPONENTS
import { Loader } from "../components";

export default function WriteUs() {
  const { storedCredentials } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const feedbackValidationSchema = yup.object().shape({
    feedback: yup.string().required("Feedback cannot be empty!"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(feedbackValidationSchema),
  });

  const onSubmit = async (data) => {
    data.sentBy = storedCredentials?.email;
    data.from = storedCredentials?.role;
    console.log(data);

    setIsLoading(true);
    try {
      await setDoc(doc(db, "feedback", Date.now().toString()), data);
      Alert.alert("Feedback Sent!");
      setIsLoading(false);
      navigation.navigate("TabNavigator");
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error);
    }
    reset();
  };

  return (
    <>
      {!isLoading && (
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
            <Text style={styles.text1}>Write To Us</Text>
          </View>
          <View style={styles.greyline}></View>
          <View style={styles.termsbox}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input2}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  multiline={true}
                  placeholder="Type Your Feedback Here..."
                />
              )}
              name="feedback"
            />
            {errors.feedback && (
              <Text style={styles.errors}>{errors.feedback.message}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.getstarted}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.getstartedtext}>Send Feedback</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Sending Feedback..."} />}
    </>
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
    // backgroundColor: "yellow",
    height: 30,
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
  input2: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    height: 190,
    width: "93%",
    marginTop: 30,
    borderRadius: 12,
    padding: 20,
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
    display: "flex",
    textAlignVertical: "top",
  },
  getstarted: {
    width: "93%",
    backgroundColor: "#246BFD",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "15%",
  },
  getstartedtext: {
    color: "white",
    fontFamily: "CircularStd",
    fontSize: 14,
  },
  errors: {
    fontSize: 14,
    color: "red",
    marginRight: "50%",
    marginBottom: "4%",
  },
});
