import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "../../../styles/appStyles";
import { normalizeCompany, normalizePower } from "../models/charger";

export default function ChargersMapScreen({ data, initialRegion, onRefresh }) {
  return (
    <View style={styles.mapWrap}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {data.map((c, index) => (
          <Marker
            key={String(c.id || index)}
            coordinate={{
              latitude: Number(c.latitude) || 0,
              longitude: Number(c.longitude) || 0,
            }}
            title={c.name || "EV Charger"}
            description={normalizeCompany(c.company) + " - " + normalizePower(c.power)}
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.mapRefreshBtn} onPress={onRefresh}>
        <Text style={styles.mapRefreshText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}
