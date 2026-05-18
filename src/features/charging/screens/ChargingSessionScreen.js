import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import BatteryRing from "../../../ui/components/BatteryRing";
import styles from "../../../styles/appStyles";

export default function ChargingSessionScreen({ navigation }) {
  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Live session</Text>
        <Text style={styles.screenTitle}>Charging at 48 kW</Text>
        <Text style={styles.screenSubtitle}>Statiq Civil Lines · 12 min remaining</Text>
      </View>

      <GlassCard style={styles.sessionHeroCard}>
        <BatteryRing value={0.62} size={150} />
        <View style={styles.sessionStats}>
          <View style={styles.sessionStatItem}>
            <Text style={styles.metricLabel}>Energy</Text>
            <Text style={styles.metricValue}>18.4 kWh</Text>
          </View>
          <View style={styles.sessionStatItem}>
            <Text style={styles.metricLabel}>Cost</Text>
            <Text style={styles.metricValue}>Rs 352</Text>
          </View>
          <View style={styles.sessionStatItem}>
            <Text style={styles.metricLabel}>Time</Text>
            <Text style={styles.metricValue}>00:22</Text>
          </View>
        </View>
      </GlassCard>

      <View style={styles.sessionActions}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Pause charging</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.goBack()}>
          <Text style={styles.ghostButtonText}>Stop & return</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
