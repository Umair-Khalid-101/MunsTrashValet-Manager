import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialIcons } from "@expo/vector-icons";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

// SVGS
import { Vector, MunsTrashValet } from "../svgs";

// CONTEXT
import { useStateContext } from "../context";

// SERVICES
import {
  signInWithEmailAndPassword,
  getAuth,
  getDocs,
  db,
  collection,
  where,
  query,
} from "../services";

// COMPONENTS
import { Loader } from "../components";

// COLORS
import { colors } from "../constants";

export default function SignIn() {
  const { setStoredCredentials } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  // PERSIST USER
  const persistUser = async (credentials) => {
    AsyncStorage.setItem("userCredentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup.string().required("Password cannot be empty!"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signInValidationSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const auth = getAuth();
    const email = data?.email.toLowerCase();
    const password = data?.password;
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential?.user;
        // setUser(user);
        console.log(`Signed In as ${user?.uid}`);
        try {
          const q = query(
            collection(db, "users"),
            where("email", "==", user?.email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot?.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const User = doc?.data();
            console.log("USER:", User);
            persistUser(User);
            if (User?.role === "manager" && User?.status === "Active") {
              // Alert.alert("Success!", "Signed In as Manager!");
              navigation.replace("TabNavigator");
            } else {
              Alert.alert("Error!", "Make sure You're a Manager to Sign IN");
            }
            setIsLoading(false);
          });
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        // console.log(errorCode);
        const errorMessage = error.message;
        // console.log(errorMessage);
        Alert.alert("Error", "Wrong Email or Password!");
        setIsLoading(false);
      });
  };

  return (
    <>
      {!isLoading && (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <Vector />
          </View>
          <Text
            style={{
              // backgroundColor: "pink",
              alignSelf: "center",
              color: colors.primary,
              fontFamily: "Montserrat",
              marginTop: "4%",
              fontSize: 24,
            }}
          >
            Muns Trash Valet
          </Text>
          <View style={styles.greyline}></View>
          <View style={styles.inputview}>
            <Text style={styles.SignIntext}>Sign In</Text>
            <Text style={styles.text2}>Please sign-in to your account</Text>
            <Text style={styles.text3}>Email</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => onChange(value.trim())}
                  value={value}
                  placeholder="Enter your Email"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errors}>{errors.email.message}</Text>
            )}
            <Text style={styles.text4}>Password</Text>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.iconTextInput}>
                  <TextInput
                    value={value}
                    onChangeText={(value) => onChange(value.trim())}
                    secureTextEntry={hidePassword}
                    placeholder="Enter your password"
                    style={styles.passwordinput}
                  />
                  <TouchableOpacity onPress={toggleHidePassword}>
                    <MaterialIcons
                      name={hidePassword ? "visibility-off" : "visibility"}
                      size={24}
                      color="black"
                      style={styles.toggleButton}
                    />
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errors}>{errors.password.message}</Text>
            )}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.getstarted}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.getstartedtext}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
      {isLoading && <Loader title={"Logging IN!"} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
    height: 40,
    marginTop: "5%",
  },
  greyline: {
    width: "100%",
    height: 1,
    backgroundColor: colors.line,
    marginTop: 30,
  },
  SignIntext: {
    fontSize: 28,
    fontFamily: "CircularStdBold",
    marginTop: "5%",
    marginLeft: "5%",
    letterSpacing: -1,
  },
  text2: {
    fontSize: 14,
    fontFamily: "CircularStd",
    color: colors.grey,
    marginTop: "2%",
    marginLeft: "5%",
  },
  text3: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: colors.grey,
    marginTop: "5%",
    marginLeft: "5%",
  },
  text4: {
    fontSize: 12,
    fontFamily: "CircularStd",
    color: colors.grey,
    marginTop: "5%",
    marginLeft: "5%",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    height: 50,
    width: "90%",
    marginTop: "2%",
    borderRadius: 12,
    paddingLeft: 20,
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
  },

  getstarted: {
    width: "90%",
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  getstartedtext: {
    color: colors.white,
    fontFamily: "CircularStdBold",
    fontSize: 14,
  },
  errors: {
    fontSize: 10,
    color: "red",
    marginLeft: 45,
    marginTop: 5,
  },
  passwordinput: {
    borderWidth: 1,
    borderColor: colors.line,
    height: 50,
    width: "90%",
    marginTop: "2%",
    borderRadius: 12,
    paddingLeft: 20,
    alignSelf: "center",
    fontFamily: "CircularStd",
    fontSize: 14,
  },
  iconTextInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: -8,
  },
});
