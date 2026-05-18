import React from "react";
import { Text, View } from "react-native";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import BatteryRing from "../../../ui/components/BatteryRing";
import styles from "../../../styles/appStyles";

export default function BatteryHealthScreen() {
  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Battery health</Text>
        <Text style={styles.screenTitle}>Healthy, optimized</Text>
        <Text style={styles.screenSubtitle}>Last check today, 9:40 AM</Text>
      </View>

      <GlassCard style={styles.healthCard}>
        <BatteryRing value={0.92} size={140} />
        <View style={styles.healthStats}>
          <View style={styles.healthStatItem}>
            <Text style={styles.metricLabel}>State of health</Text>
            <Text style={styles.metricValue}>92%</Text>
          </View>
          <View style={styles.healthStatItem}>
            <Text style={styles.metricLabel}>Cycles</Text>
            <Text style={styles.metricValue}>214</Text>
          </View>
          <View style={styles.healthStatItem}>
            <Text style={styles.metricLabel}>Avg temp</Text>
            <Text style={styles.metricValue}>31 C</Text>
          </View>
        </View>
      </GlassCard>

      <GlassCard style={styles.healthInsightCard}>
        <Text style={styles.healthInsightTitle}>Daily tip</Text>
        <Text style={styles.healthInsightText}>
          Keep charge between 20-80% for longer battery life.
        </Text>
      </GlassCard>
    </MainLayout>
  );
}
