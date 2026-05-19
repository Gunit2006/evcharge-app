import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import styles from "../../../styles/appStyles";

const slotOptions = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
];

export default function BookingSlotScreen({ navigation, route }) {
  const charger = route?.params?.charger || {};
  const [selectedSlot, setSelectedSlot] = useState("");

  const subtitle = useMemo(() => {
    const company = charger.company ? String(charger.company) : "";
    const power = charger.power ? String(charger.power) : "";
    const parts = [company, power].filter(Boolean);
    return parts.length ? parts.join(" | ") : "";
  }, [charger]);

  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Booking</Text>
        <Text style={styles.screenTitle}>{charger.name || "Select a slot"}</Text>
        <Text style={styles.screenSubtitle}>{subtitle}</Text>
      </View>

      <GlassCard style={styles.bookingCard}>
        <Text style={styles.bookingSectionTitle}>Choose a time</Text>
        <View style={styles.slotGrid}>
          {slotOptions.map((slot) => {
            const active = slot === selectedSlot;
            return (
              <TouchableOpacity
                key={slot}
                style={[styles.slotChip, active && styles.slotChipActive]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text style={[styles.slotText, active && styles.slotTextActive]}>{slot}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassCard>

      <View style={styles.bookingFooter}>
        <TouchableOpacity
          style={[styles.primaryButton, !selectedSlot && styles.primaryButtonDisabled]}
          onPress={() => navigation.navigate("BookingConfirm", { charger, slot: selectedSlot })}
          disabled={!selectedSlot}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.goBack()}>
          <Text style={styles.ghostButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
