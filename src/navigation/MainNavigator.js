import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import ChargersHomeScreen from "../features/chargers/screens/ChargersHomeScreen";
import HomeScreen from "../features/home/screens/HomeScreen";
import RoutePlanningScreen from "../features/route/screens/RoutePlanningScreen";
import BatteryHealthScreen from "../features/battery/screens/BatteryHealthScreen";
import ProfileScreen from "../features/profile/screens/ProfileScreen";
import ChargingSessionScreen from "../features/charging/screens/ChargingSessionScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(9, 12, 18, 0.95)",
          borderTopColor: "rgba(255,255,255,0.08)",
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#5ac8fa",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "SpaceGrotesk_500Medium",
        },
        tabBarIcon: ({ color, size }) => {
          const map = {
            Home: "home-outline",
            Nearby: "navigate-outline",
            Route: "map-outline",
            Battery: "battery-half-outline",
            Profile: "person-outline",
          };
          const iconName = map[route.name] || "ellipse-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Nearby" component={ChargersHomeScreen} />
      <Tab.Screen name="Route" component={RoutePlanningScreen} />
      <Tab.Screen name="Battery" component={BatteryHealthScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen
        name="ChargingSession"
        component={ChargingSessionScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
