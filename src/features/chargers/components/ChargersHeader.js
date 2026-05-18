import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../../styles/appStyles";
import FilterChips from "./FilterChips";

export default function ChargersHeader({
  filteredCount,
  fastCount,
  query,
  onQueryChange,
  companyOptions,
  selectedCompany,
  onSelectCompany,
  powerOptions,
  selectedPower,
  onSelectPower,
  lastUpdated,
  sortOptions,
  selectedSort,
  onSelectSort,
  locationHint,
  locationStatus,
  onRequestLocation,
}) {
  const showLocationAction =
    selectedSort === "Nearest" &&
    locationStatus !== "granted" &&
    locationStatus !== "loading";

  return (
    <View>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Charge Atlas</Text>
        <Text style={styles.heroSubtitle}>Find EV chargers faster in Nagpur</Text>

        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{filteredCount}</Text>
            <Text style={styles.statLabel}>Visible</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{fastCount}</Text>
            <Text style={styles.statLabel}>Fast (30+)</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by charger name..."
          placeholderTextColor="#8a96a8"
          value={query}
          onChangeText={onQueryChange}
        />
      </View>

      <FilterChips
        title="Company"
        options={companyOptions}
        selectedValue={selectedCompany}
        onSelect={onSelectCompany}
      />

      <FilterChips
        title="Power"
        options={powerOptions}
        selectedValue={selectedPower}
        onSelect={onSelectPower}
      />

      <FilterChips
        title="Sort"
        options={sortOptions}
        selectedValue={selectedSort}
        onSelect={onSelectSort}
      />

      {!!locationHint && <Text style={styles.hintText}>{locationHint}</Text>}
      {showLocationAction && (
        <View style={styles.locationActionRow}>
          <Text style={styles.locationActionLabel}>Enable location to sort nearest chargers.</Text>
          <Text style={styles.locationActionBtn} onPress={onRequestLocation}>
            Enable
          </Text>
        </View>
      )}

      <View style={styles.metaRow}>
        <Text style={styles.resultsText}>Showing {filteredCount} chargers</Text>
        <Text style={styles.resultsText}>{lastUpdated ? "Updated: " + lastUpdated : ""}</Text>
      </View>
    </View>
  );
}
