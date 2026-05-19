import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import styles from "../../../styles/appStyles";

export default function BookingConfirmScreen({ navigation, route }) {
  const charger = route?.params?.charger || {};
  const slot = route?.params?.slot || "";

  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Confirm</Text>
        <Text style={styles.screenTitle}>Review booking</Text>
        <Text style={styles.screenSubtitle}>Make sure details are correct.</Text>
      </View>

      <GlassCard style={styles.bookingCard}>
        <View style={styles.bookingRow}>
          <Text style={styles.bookingLabel}>Charger</Text>
          <Text style={styles.bookingValue}>{charger.name || "-"}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Text style={styles.bookingLabel}>Slot</Text>
          <Text style={styles.bookingValue}>{slot || "-"}</Text>
        </View>
        <View style={styles.bookingRow}>
          <Text style={styles.bookingLabel}>Estimate</Text>
          <Text style={styles.bookingValue}>Rs 120</Text>
        </View>
      </GlassCard>

      <View style={styles.bookingFooter}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("BookingSuccess", { charger, slot })}
        >
          <Text style={styles.primaryButtonText}>Confirm booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.goBack()}>
          <Text style={styles.ghostButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
