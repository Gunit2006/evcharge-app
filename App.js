import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const BASE_URL = "http://192.168.137.49:5000";
const ALL_COMPANIES = ["All", "Tata", "Ather", "Jio", "Statiq", "Iocl", "Other"];
const ALL_POWERS = ["All", "7kW", "15kW", "30kW", "60kW", "120kW"];

export default function App() {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedPower, setSelectedPower] = useState("All");

  const fetchChargers = async () => {
    try {
      setLoading(true);
      setErrorText("");

      const response = await fetch(BASE_URL + "/api/chargers");
      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setChargers(data);
        if (data.length === 0) {
          setErrorText("API returned empty data.");
        }
      } else {
        setChargers([]);
        setErrorText("API returned invalid data.");
      }
    } catch (e) {
      setChargers([]);
      setErrorText("Could not connect to API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChargers();
  }, []);

  const filteredChargers = useMemo(() => {
    return chargers.filter(function (c) {
      const name = String(c.name || "").toLowerCase();
      const q = query.trim().toLowerCase();

      const company = normalizeCompany(c.company);
      const power = normalizePower(c.power);

      const searchMatch = q.length === 0 || name.indexOf(q) !== -1;
      const companyMatch = selectedCompany === "All" || company === selectedCompany;
      const powerMatch = selectedPower === "All" || power === selectedPower;

      return searchMatch && companyMatch && powerMatch;
    });
  }, [chargers, query, selectedCompany, selectedPower]);

  const mapBase = filteredChargers.length > 0 ? filteredChargers[0] : (chargers.length > 0 ? chargers[0] : null);
  const initialRegion = {
    latitude: mapBase ? Number(mapBase.latitude) : 21.1458,
    longitude: mapBase ? Number(mapBase.longitude) : 79.0882,
    latitudeDelta: 0.12,
    longitudeDelta: 0.12
  };

  const renderChip = function (label, active, onPress) {
    return (
      <TouchableOpacity
        key={label}
        onPress={onPress}
        activeOpacity={0.85}
        style={[styles.chip, active && styles.chipActive]}
      >
        <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const renderCard = function ({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.name || "Unnamed Charger"}</Text>
        <Text style={styles.cardLine}>Company: {normalizeCompany(item.company)}</Text>
        <Text style={styles.cardLine}>Power: {normalizePower(item.power)}</Text>
        <Text style={styles.cardLine}>
          Location: {Number(item.latitude).toFixed(4)}, {Number(item.longitude).toFixed(4)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>EV Charger Finder</Text>

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === "list" && styles.toggleButtonActive]}
          onPress={function () { setViewMode("list"); }}
        >
          <Text style={[styles.toggleText, viewMode === "list" && styles.toggleTextActive]}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === "map" && styles.toggleButtonActive]}
          onPress={function () { setViewMode("map"); }}
        >
          <Text style={[styles.toggleText, viewMode === "map" && styles.toggleTextActive]}>Map</Text>
        </TouchableOpacity>
      </View>

      {viewMode === "map" ? (
        <View style={styles.fullMapWrap}>
          <MapView style={styles.fullMap} initialRegion={initialRegion}>
            {filteredChargers.map(function (c, index) {
              return (
                <Marker
                  key={String(c.id || index)}
                  coordinate={{
                    latitude: Number(c.latitude) || 0,
                    longitude: Number(c.longitude) || 0
                  }}
                  title={c.name || "EV Charger"}
                  description={normalizeCompany(c.company) + " • " + normalizePower(c.power)}
                />
              );
            })}
          </MapView>
        </View>
      ) : (
        <>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search charger name..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />

          <View style={styles.selectedRow}>
            <View style={styles.selectedBox}>
              <Text style={styles.selectedLabel}>Company</Text>
              <Text style={styles.selectedValue}>{selectedCompany}</Text>
            </View>
            <View style={styles.selectedBox}>
              <Text style={styles.selectedLabel}>Power</Text>
              <Text style={styles.selectedValue}>{selectedPower}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Company Filter</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {ALL_COMPANIES.map(function (option) {
              return renderChip(option, selectedCompany === option, function () {
                setSelectedCompany(option);
              });
            })}
          </ScrollView>

          <Text style={styles.sectionTitle}>Power Filter</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {ALL_POWERS.map(function (option) {
              return renderChip(option, selectedPower === option, function () {
                setSelectedPower(option);
              });
            })}
          </ScrollView>

          {loading ? (
            <View style={styles.centerBox}>
              <ActivityIndicator size="large" color="#2553d4" />
              <Text style={styles.helperText}>Loading chargers...</Text>
            </View>
          ) : (
            <FlatList
              data={filteredChargers}
              keyExtractor={function (item, index) { return String(item.id || index); }}
              renderItem={renderCard}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={
                <View style={styles.centerBox}>
                  <Text style={styles.helperText}>No chargers found.</Text>
                </View>
              }
            />
          )}
        </>
      )}

      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </SafeAreaView>
  );
}

function normalizeCompany(value) {
  const txt = String(value || "other").trim().toLowerCase();

  if (txt.indexOf("tata") !== -1) return "Tata";
  if (txt.indexOf("ather") !== -1) return "Ather";
  if (txt.indexOf("jio") !== -1) return "Jio";
  if (txt.indexOf("statiq") !== -1) return "Statiq";
  if (txt.indexOf("iocl") !== -1) return "Iocl";
  return "Other";
}

function normalizePower(value) {
  const txt = String(value || "").trim().toLowerCase();

  if (!txt || txt === "unknown") return "Unknown";

  if (txt.slice(-2) === "kw") {
    const n = txt.replace("kw", "").trim();
    return n ? n + "kW" : "Unknown";
  }

  const num = Number(txt);
  if (!Number.isNaN(num)) return String(num) + "kW";

  return "Unknown";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    paddingHorizontal: 14,
    paddingTop: 10
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 10
  },
  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    padding: 4,
    marginBottom: 10
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8
  },
  toggleButtonActive: {
    backgroundColor: "#ffffff"
  },
  toggleText: {
    color: "#64748b",
    fontWeight: "700"
  },
  toggleTextActive: {
    color: "#0f172a"
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dbe2ef",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    color: "#0f172a"
  },
  selectedRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8
  },
  selectedBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dbe2ef",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  selectedLabel: {
    color: "#64748b",
    fontWeight: "700",
    fontSize: 14
  },
  selectedValue: {
    marginTop: 2,
    color: "#0f172a",
    fontWeight: "900",
    fontSize: 24
  },
  sectionTitle: {
    marginTop: 6,
    marginBottom: 6,
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700"
  },
  chipRow: {
    paddingBottom: 2,
    paddingRight: 8
  },
  chip: {
    backgroundColor: "#dbe4f3",
    borderRadius: 999,
    minWidth: 90,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8
  },
  chipActive: {
    backgroundColor: "#2553d4"
  },
  chipText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "700"
  },
  chipTextActive: {
    color: "#ffffff"
  },
  listContainer: {
    paddingBottom: 24
  },
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 6
  },
  cardLine: {
    color: "#475569",
    fontSize: 13,
    marginTop: 2
  },
  centerBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28
  },
  helperText: {
    marginTop: 8,
    color: "#64748b",
    fontWeight: "600"
  },
  fullMapWrap: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#dbe2ef"
  },
  fullMap: {
    flex: 1
  },
  errorText: {
    color: "#b91c1c",
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "700"
  }
});