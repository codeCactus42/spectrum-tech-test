import "./global.css";
import "react-native-gesture-handler";
import { Navigation } from "./navigation";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { HeroUINativeProvider } from "heroui-native";

SplashScreen.preventAutoHideAsync();

export function App() {
  const [fontsLoaded] = useFonts({
    "DMSans-Regular": DMSans_400Regular,
    "DMSans-SemiBold": DMSans_600SemiBold,
    "DMSans-Bold": DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <HeroUINativeProvider>
      <Navigation />
    </HeroUINativeProvider>
  );
}
