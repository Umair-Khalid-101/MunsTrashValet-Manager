import React, { useEffect, useState } from "react";

// SCREEN IMPORTS
import {
  SignIn,
  GetStarted,
  IncidentReports,
  ViewReport,
  WriteUs,
  TermsConditions,
  PrivacyPolicy,
  AboutUs,
} from "../screens";

// COMPONENT IMPORTS
import { Loader } from "../components";

// NAVIGATION
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
import TabNavigator from "./TabNavigator";

// ASYNC STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage";

// CONTEXT
import { useStateContext } from "../context";

export default function AppNavigation() {
  const { storedCredentials, setStoredCredentials } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  // CHECK CREDENTIALS
  const checkCredentials = async () => {
    setIsLoading(true);
    AsyncStorage.getItem("userCredentials")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
          setIsLoading(false);
        } else {
          setStoredCredentials(null);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    checkCredentials();
  }, []);

  return (
    <>
      {!isLoading && (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={`${
              storedCredentials ? "TabNavigator" : "GetStarted"
            }`}
          >
            {storedCredentials ? (
              <>
                <Stack.Screen
                  name="GetStarted"
                  component={GetStarted}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TabNavigator"
                  component={TabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="IncidentReports"
                  component={IncidentReports}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ViewReport"
                  component={ViewReport}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="WriteUs"
                  component={WriteUs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TermsConditions"
                  component={TermsConditions}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PrivacyPolicy"
                  component={PrivacyPolicy}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AboutUs"
                  component={AboutUs}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="GetStarted"
                  component={GetStarted}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TabNavigator"
                  component={TabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="IncidentReports"
                  component={IncidentReports}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ViewReport"
                  component={ViewReport}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="WriteUs"
                  component={WriteUs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TermsConditions"
                  component={TermsConditions}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PrivacyPolicy"
                  component={PrivacyPolicy}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AboutUs"
                  component={AboutUs}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {isLoading && <Loader title={"Loading..."} />}
    </>
  );
}
