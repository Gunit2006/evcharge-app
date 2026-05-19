import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import styles from "../../../styles/appStyles";

export default function BookingSuccessScreen({ navigation, route }) {
  const charger = route?.params?.charger || {};
  const slot = route?.params?.slot || "";

  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Booked</Text>
        <Text style={styles.screenTitle}>Slot confirmed</Text>
        <Text style={styles.screenSubtitle}>We will hold the charger for you.</Text>
      </View>

      <GlassCard style={styles.bookingCard}>
        <Text style={styles.bookingSuccessTitle}>{charger.name || "Charger"}</Text>
        <Text style={styles.bookingSuccessSubtitle}>{slot || ""}</Text>
        <Text style={styles.bookingSuccessHint}>Arrive 5 minutes early to check in.</Text>
      </GlassCard>

      <View style={styles.bookingFooter}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Tabs", { screen: "Nearby" })}
        >
          <Text style={styles.primaryButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
