import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/appStyles";

export default function ScreenContainer({ children }) {
  return <SafeAreaView style={styles.root}>{children}</SafeAreaView>;
}
