import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const BASE_URL = "https://nagpur-ev-stations.onrender.com";

const ALL_COMPANIES = ["All", "Tata", "Ather", "Jio", "Statiq", "Iocl", "Other"];
const ALL_POWERS = ["All", "7kW", "15kW", "30kW", "60kW", "120kW", "Unknown"];

export default function App() {
  const listRef = useRef(null);

  const [viewMode, setViewMode] = useState("list");
  const [query, setQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedPower, setSelectedPower] = useState("All");

  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    loadChargers();
  }, []);

  async function loadChargers(options = {}) {
    const isRefresh = options.isRefresh === true;

    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorText("");
      const response = await fetch(BASE_URL + "/api/chargers");

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setChargers(data);
        setLastUpdated(new Date().toLocaleTimeString());
        if (data.length === 0) {
          setErrorText("API returned empty data.");
        }
      } else {
        setChargers([]);
        setErrorText("Invalid API response.");
      }
    } catch (err) {
      setErrorText("Could not connect to server. Please retry.");
      if (!isRefresh && chargers.length === 0) {
        setChargers([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function handleGlobalReload() {
    setViewMode("list");
    setQuery("");
    setSelectedCompany("All");
    setSelectedPower("All");

    loadChargers({ isRefresh: true });

    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    });
  }

  const filtered = useMemo(() => {
    return chargers.filter((c) => {
      const name = String(c.name || "").toLowerCase();
      const q = query.trim().toLowerCase();

      const company = normalizeCompany(c.company);
      const power = normalizePower(c.power);

      const searchMatch = q.length === 0 || name.includes(q);
      const companyMatch = selectedCompany === "All" || company === selectedCompany;
      const powerMatch = selectedPower === "All" || power === selectedPower;

      return searchMatch && companyMatch && powerMatch;
    });
  }, [chargers, query, selectedCompany, selectedPower]);

  const fastCount = useMemo(() => {
    return filtered.filter((c) => {
      const p = normalizePower(c.power).toLowerCase();
      if (!p.endsWith("kw")) return false;
      const n = parseFloat(p.replace("kw", ""));
      return !Number.isNaN(n) && n >= 30;
    }).length;
  }, [filtered]);

  const mapBase = filtered.length > 0 ? filtered[0] : chargers[0];
  const initialRegion = {
    latitude: mapBase ? Number(mapBase.latitude) : 21.1458,
    longitude: mapBase ? Number(mapBase.longitude) : 79.0882,
    latitudeDelta: 0.12,
    longitudeDelta: 0.12,
  };

  function renderChip(label, active, onPress) {
    return (
      <TouchableOpacity
        key={label}
        style={[styles.chip, active && styles.chipActive]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  function renderCard({ item }) {
    const company = normalizeCompany(item.company);
    const power = normalizePower(item.power);

    return (
      <View style={styles.card}>
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
        </View>
      </View>
    );
  }

  function Header() {
    return (
      <View>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Charge Atlas</Text>
          <Text style={styles.heroSubtitle}>Find EV chargers faster in Nagpur</Text>

          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{filtered.length}</Text>
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
            onChangeText={setQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Company</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rowPad}>
          {ALL_COMPANIES.map((option) =>
            renderChip(option, selectedCompany === option, () => setSelectedCompany(option))
          )}
        </ScrollView>

        <Text style={styles.sectionTitle}>Power</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rowPad}>
          {ALL_POWERS.map((option) =>
            renderChip(option, selectedPower === option, () => setSelectedPower(option))
          )}
        </ScrollView>

        <View style={styles.metaRow}>
          <Text style={styles.resultsText}>Showing {filtered.length} chargers</Text>
          <Text style={styles.resultsText}>{lastUpdated ? "Updated: " + lastUpdated : ""}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>EV Navigator</Text>

        <View style={styles.segment}>
          <TouchableOpacity
            style={[styles.segmentBtn, viewMode === "list" && styles.segmentBtnActive]}
            onPress={() => setViewMode("list")}
          >
            <Text style={[styles.segmentTxt, viewMode === "list" && styles.segmentTxtActive]}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, viewMode === "map" && styles.segmentBtnActive]}
            onPress={() => setViewMode("map")}
          >
            <Text style={[styles.segmentTxt, viewMode === "map" && styles.segmentTxtActive]}>Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#d97706" />
          <Text style={styles.centerText}>Loading chargers...</Text>
        </View>
      ) : viewMode === "map" ? (
        <View style={styles.mapWrap}>
          <MapView style={styles.map} initialRegion={initialRegion}>
            {filtered.map((c, index) => (
              <Marker
                key={String(c.id || index)}
                coordinate={{
                  latitude: Number(c.latitude) || 0,
                  longitude: Number(c.longitude) || 0,
                }}
                title={c.name || "EV Charger"}
                description={normalizeCompany(c.company) + " • " + normalizePower(c.power)}
              />
            ))}
          </MapView>

          <TouchableOpacity style={styles.mapRefreshBtn} onPress={() => loadChargers({ isRefresh: true })}>
            <Text style={styles.mapRefreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={filtered}
          keyExtractor={(item, index) => String(item.id || index)}
          renderItem={renderCard}
          ListHeaderComponent={<Header />}
          contentContainerStyle={styles.listPad}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadChargers({ isRefresh: true })}
              tintColor="#d97706"
            />
          }
          ListEmptyComponent={
            <View style={styles.centerBox}>
              <Text style={styles.centerText}>No chargers found for this filter.</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.floatingReloadBtn} onPress={handleGlobalReload} activeOpacity={0.9}>
        <Text style={styles.floatingReloadText}>Reload</Text>
      </TouchableOpacity>

      {!!errorText && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorText}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => loadChargers()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

function normalizeCompany(value) {
  const txt = String(value || "").toLowerCase();
  if (txt.includes("tata")) return "Tata";
  if (txt.includes("ather")) return "Ather";
  if (txt.includes("jio")) return "Jio";
  if (txt.includes("statiq")) return "Statiq";
  if (txt.includes("iocl")) return "Iocl";
  return "Other";
}

function normalizePower(value) {
  const txt = String(value || "").trim().toLowerCase();
  if (!txt || txt === "unknown") return "Unknown";

  if (txt.endsWith("kw")) {
    const n = txt.replace("kw", "").trim();
    return n ? n + "kW" : "Unknown";
  }

  const n = Number(txt);
  if (!Number.isNaN(n)) return String(n) + "kW";
  return "Unknown";
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f7f3eb",
  },

  topBar: {
    backgroundColor: "#0f172a",
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 14,
  },

  brand: {
    color: "#f8fafc",
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 10,
    letterSpacing: 0.3,
  },

  segment: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 4,
    flexDirection: "row",
  },

  segmentBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 9,
  },

  segmentBtnActive: {
    backgroundColor: "#f59e0b",
  },

  segmentTxt: {
    color: "#cbd5e1",
    fontWeight: "700",
  },

  segmentTxtActive: {
    color: "#111827",
    fontWeight: "800",
  },

  hero: {
    margin: 14,
    marginBottom: 10,
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 16,
  },

  heroTitle: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 4,
  },

  heroSubtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    marginBottom: 14,
  },

  statRow: {
    flexDirection: "row",
  },

  statCard: {
    flex: 1,
    backgroundColor: "#1f2937",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  statValue: {
    color: "#f59e0b",
    fontSize: 22,
    fontWeight: "900",
  },

  statLabel: {
    color: "#cbd5e1",
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700",
  },

  searchWrap: {
    paddingHorizontal: 14,
  },

  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5dccd",
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: "#0f172a",
  },

  sectionTitle: {
    marginTop: 12,
    marginBottom: 7,
    paddingHorizontal: 14,
    fontSize: 13,
    fontWeight: "800",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  rowPad: {
    paddingHorizontal: 14,
    paddingBottom: 2,
  },

  chip: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
    marginRight: 8,
  },

  chipActive: {
    backgroundColor: "#111827",
  },

  chipText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 14,
  },

  chipTextActive: {
    color: "#f9fafb",
  },

  metaRow: {
    paddingHorizontal: 14,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  resultsText: {
    color: "#6b7280",
    fontWeight: "700",
    fontSize: 12,
  },

  listPad: {
    paddingBottom: 24,
  },

  card: {
    marginHorizontal: 14,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee4d7",
    flexDirection: "row",
    overflow: "hidden",
  },

  cardAccent: {
    width: 6,
    backgroundColor: "#f59e0b",
  },

  cardContent: {
    flex: 1,
    padding: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 8,
  },

  badgeRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  badgePrimary: {
    backgroundColor: "#1f2937",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginRight: 8,
  },

  badgePrimaryText: {
    color: "#f9fafb",
    fontWeight: "800",
    fontSize: 12,
  },

  badgeMuted: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  badgeMutedText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 12,
  },

  cardLine: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
  },

  mapWrap: {
    flex: 1,
    margin: 14,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd6c9",
  },

  map: {
    flex: 1,
  },

  mapRefreshBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  mapRefreshText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 12,
  },

  floatingReloadBtn: {
    position: "absolute",
    right: 16,
    bottom: 20,
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 4,
  },

  floatingReloadText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 13,
  },

  centerBox: {
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  centerText: {
    marginTop: 8,
    color: "#6b7280",
    fontWeight: "700",
  },

  errorBox: {
    marginHorizontal: 14,
    marginBottom: 70,
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  errorText: {
    color: "#b91c1c",
    fontWeight: "700",
    flex: 1,
    marginRight: 10,
    fontSize: 12,
  },

  retryBtn: {
    backgroundColor: "#b91c1c",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  retryText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 12,
  },
});