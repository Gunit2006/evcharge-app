import React from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import styles from "../../../styles/appStyles";

const region = {
  latitude: 21.1458,
  longitude: 79.0882,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1f2937" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0b1221" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
];

export default function RoutePlanningScreen() {
  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Route planning</Text>
        <Text style={styles.screenTitle}>Nagpur to Wardha</Text>
        <Text style={styles.screenSubtitle}>1 fast stop recommended</Text>
      </View>

      <View style={styles.routeMapWrap}>
        <MapView style={styles.routeMap} initialRegion={region} customMapStyle={mapStyle} />
      </View>

      <GlassCard style={styles.routeCard}>
        <View style={styles.routeRow}>
          <View>
            <Text style={styles.routeValue}>76 km</Text>
            <Text style={styles.routeLabel}>Total distance</Text>
          </View>
          <View>
            <Text style={styles.routeValue}>1h 12m</Text>
            <Text style={styles.routeLabel}>Estimated time</Text>
          </View>
        </View>
        <View style={styles.routeDivider} />
        <Text style={styles.routeStopTitle}>Suggested stop</Text>
        <Text style={styles.routeStopSubtitle}>Statiq MIHAN · 120 kW · 10 mins</Text>
      </GlassCard>
    </MainLayout>
  );
}
