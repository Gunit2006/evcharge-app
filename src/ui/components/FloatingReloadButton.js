import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../../styles/appStyles";

export default function FloatingReloadButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.floatingReloadBtn} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.floatingReloadText}>Reload</Text>
    </TouchableOpacity>
  );
}
