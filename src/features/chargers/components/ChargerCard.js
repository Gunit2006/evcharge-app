import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../styles/appStyles";
import { normalizeCompany, normalizePower } from "../models/charger";
import { formatDistance } from "../../../utils/geo";
import { openMaps } from "../../../utils/maps";
import GlassCard from "../../../ui/components/GlassCard";

export default function ChargerCard({ item }) {
  const company = normalizeCompany(item.company);
  const power = normalizePower(item.power);
  const distanceLabel = formatDistance(item.distanceKm);
  const latitude = Number(item.latitude);
  const longitude = Number(item.longitude);
  const canNavigate = Number.isFinite(latitude) && Number.isFinite(longitude);
  const showDistance = Boolean(distanceLabel);

  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardAccent} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name || "Unnamed Charger"}</Text>

        <View style={styles.badgeRow}>
          <View style={styles.badgePrimary}>
            <Text style={styles.badgePrimaryText}>{company}</Text>
          </View>
          <View style={styles.badgeMuted}>
            <Text style={styles.badgeMutedText}>{power}</Text>
          </View>
        </View>

        <Text style={styles.cardLine}>
          Lat: {Number(item.latitude).toFixed(4)} | Lng: {Number(item.longitude).toFixed(4)}
        </Text>

        {(showDistance || canNavigate) && (
          <View style={showDistance ? styles.cardMetaRow : styles.cardMetaRowEnd}>
            {showDistance && <Text style={styles.cardMetaText}>{distanceLabel} away</Text>}
            {canNavigate && (
              <TouchableOpacity
                style={styles.cardActionBtn}
                onPress={() => openMaps({ latitude, longitude, label: item.name })}
              >
                <Text style={styles.cardActionText}>Directions</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </GlassCard>
  );
}
