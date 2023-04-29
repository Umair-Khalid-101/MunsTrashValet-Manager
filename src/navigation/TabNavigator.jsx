import React from "react";

// ICONS
import { AntDesign } from "@expo/vector-icons";

// NAVIGATION
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

// SCREEN IMPORTS
import { SelectProperty, Settings } from "../screens";

// COLORS
import { colors } from "../constants";

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Incident Reports") {
            iconName = focused ? "filetext1" : "filetext1";
          } else if (route.name === "Settings") {
            iconName = focused ? "setting" : "setting";
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        tabBarLabelStyle: {
          fontFamily: "CircularStd",
        },
      })}
      initialRouteName="Incident Reports"
    >
      <Tab.Screen
        name="Incident Reports"
        component={SelectProperty}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
