import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "../navigation/RootNavigator";
import { AuthProvider } from "../features/auth/context/AuthProvider";
import LoadingState from "../ui/components/LoadingState";
import ScreenContainer from "../ui/components/ScreenContainer";
import useAppFonts from "../ui/hooks/useAppFonts";

export default function AppRoot() {
  const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) {
    return (
      <ScreenContainer>
        <LoadingState label="Loading assets..." />
      </ScreenContainer>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
