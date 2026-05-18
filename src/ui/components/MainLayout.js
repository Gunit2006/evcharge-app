import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/appStyles";

export default function MainLayout({ children }) {
  return (
    <LinearGradient colors={["#0b0f14", "#0f172a", "#0b0f14"]} style={styles.appBackground}>
      <SafeAreaView style={styles.appSafeArea}>
        <View style={styles.appGlowTop} />
        <View style={styles.appGlowBottom} />
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}
