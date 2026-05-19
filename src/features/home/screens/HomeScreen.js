import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import BatteryRing from "../../../ui/components/BatteryRing";
import styles from "../../../styles/appStyles";

export default function HomeScreen({ navigation }) {
  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Good evening</Text>
        <Text style={styles.screenTitle}>Your EV is ready</Text>
        <Text style={styles.screenSubtitle}>Nagpur · 4 chargers nearby</Text>
      </View>

      <GlassCard style={styles.heroCard}>
        <View style={styles.heroRow}>
          <BatteryRing value={0.78} size={120} />
          <View style={styles.heroMeta}>
            <Text style={styles.heroValueText}>312 km</Text>
            <Text style={styles.heroLabel}>Estimated range</Text>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Battery healthy</Text>
            </View>
          </View>
        </View>
      </GlassCard>

      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitleAlt}>Charging</Text>
        <GlassCard style={styles.sessionCard}>
          <View style={styles.sessionRow}>
            <View>
              <Text style={styles.sessionTitle}>No active session</Text>
              <Text style={styles.sessionSubtitle}>Start a new charge in 2 taps.</Text>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("ChargingSession")}
            >
              <Text style={styles.primaryButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitleAlt}>Nearby highlight</Text>
        <GlassCard style={styles.highlightCard}>
          <Text style={styles.highlightTitle}>Civil Lines Supercharge</Text>
          <Text style={styles.highlightSubtitle}>0.8 km · 60 kW · 2 ports free</Text>
          <View style={styles.highlightRow}>
            <Text style={styles.highlightMeta}>Open 24/7</Text>
            <Text style={styles.highlightMeta}>From 19/kWh</Text>
          </View>
          <View style={styles.highlightActionRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() =>
                navigation.navigate("BookingSlot", {
                  charger: {
                    id: 1,
                    name: "Civil Lines Supercharge",
                    company: "Statiq",
                    power: "60kW",
                    latitude: 21.1612,
                    longitude: 79.0823,
                  },
                })
              }
            >
              <Text style={styles.primaryButtonText}>Book slot</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>
    </MainLayout>
  );
}
