import React from "react";
import { Alert, Platform, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import { reserveDemoSlot } from "../../chargers/api/demoAvailabilityApi";
import styles from "../../../styles/appStyles";

const ACTIVE_BOOKING_KEY = "demo_active_booking";

export default function BookingConfirmScreen({ navigation, route }) {
  const charger = route?.params?.charger || {};
  const slot = route?.params?.slot || "";
  const gunId = route?.params?.gunId || "";
  const gunLabel = route?.params?.gunLabel || "";

  const showSlotUnavailable = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Slot Unavailable", ToastAndroid.SHORT);
      return;
    }
    Alert.alert("Slot Unavailable", "Please pick another slot.");
  };

  const completeBooking = async () => {
    try {
      const booking = await reserveDemoSlot({
        chargerId: charger?.id,
        slot,
        gunId,
        source: "app",
      });
      await AsyncStorage.setItem(
        ACTIVE_BOOKING_KEY,
        JSON.stringify({
          charger,
          slot: booking?.slot || slot,
          gun_id: booking?.gun_id || gunId,
          gun_label: booking?.gun_label || gunLabel,
          expires_at: booking?.expires_at || null,
          status: "booked",
          booked_at: new Date().toISOString(),
          source: "app",
        })
      );
      navigation.navigate("BookingSuccess", { charger, slot, gunLabel });
    } catch (err) {
      if (err?.status === 409) {
        showSlotUnavailable();
        return;
      }

      Alert.alert("Booking failed", err?.message || "Unable to complete booking.");
    }
  };

  const handleConfirm = () => {
    Alert.alert(
      "Pay Rs 50",
      "Payment gateway (demo). Continue to confirm the booking?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Pay", onPress: completeBooking },
      ]
    );
  };

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
          <Text style={styles.bookingLabel}>Gun</Text>
          <Text style={styles.bookingValue}>{gunLabel || "-"}</Text>
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
          onPress={handleConfirm}
        >
          <Text style={styles.primaryButtonText}>Pay & book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.goBack()}>
          <Text style={styles.ghostButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
