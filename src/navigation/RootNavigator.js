import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../features/auth/hooks/useAuth";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import LoadingState from "../ui/components/LoadingState";
import ScreenContainer from "../ui/components/ScreenContainer";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <ScreenContainer>
        <LoadingState label="Checking session..." />
      </ScreenContainer>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
