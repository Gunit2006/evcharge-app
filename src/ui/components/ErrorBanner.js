import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/appStyles";

export default function ErrorBanner({ message, onRetry }) {
  if (!message) return null;

  return (
    <View style={styles.errorBox}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}
