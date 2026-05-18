import React from "react";
import { Platform, View } from "react-native";
import { BlurView } from "expo-blur";
import styles from "../../styles/appStyles";

export default function GlassCard({ children, style, intensity = 18 }) {
  if (Platform.OS === "android") {
    return <View style={[styles.glassCard, style]}>{children}</View>;
  }

  return (
    <BlurView tint="dark" intensity={intensity} style={[styles.glassCard, style]}>
      {children}
    </BlurView>
  );
}
