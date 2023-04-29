import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

// NAVIAGTOR
import AppNavigation from "./src/navigation/AppNavigation";

// CONTEXT PROVIDER
import { StateContextProvider } from "./src/context";

export default function App() {
  const [fontsLoaded] = useFonts({
    CircularStd: require("./assets/CircularStd.ttf"),
    CircularStdBold: require("./assets/CircularStd-Bold.otf"),
    Montserrat: require("./assets/Montserrat.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <StateContextProvider>
      <StatusBar style="light" backgroundColor="#246BFD" />
      <AppNavigation />
    </StateContextProvider>
  );
}
