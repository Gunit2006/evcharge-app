import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "../../styles/appStyles";

export default function LoadingState({ label }) {
  return (
    <View style={styles.centerBox}>
      <ActivityIndicator size="large" color="#5ac8fa" />
      <Text style={styles.centerText}>{label || "Loading chargers..."}</Text>
    </View>
  );
}
