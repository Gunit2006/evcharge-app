import React, { useEffect, useMemo, useRef, useState } from "react";
import { ALL_COMPANIES, ALL_POWERS, SORT_OPTIONS } from "../constants/filters";
import { normalizeCompany, normalizePower } from "../models/charger";
import useChargers from "../hooks/useChargers";
import useUserLocation from "../../../hooks/useUserLocation";
import { getDistanceKm, getInitialRegion } from "../../../utils/geo";
import TopBar from "../components/TopBar";
import ChargersListScreen from "./ChargersListScreen";
import ChargersMapScreen from "./ChargersMapScreen";
import ErrorBanner from "../../../ui/components/ErrorBanner";
import FloatingReloadButton from "../../../ui/components/FloatingReloadButton";
import LoadingState from "../../../ui/components/LoadingState";
import MainLayout from "../../../ui/components/MainLayout";

export default function ChargersHomeScreen() {
  const listRef = useRef(null);

  const [viewMode, setViewMode] = useState("list");
  const [query, setQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedPower, setSelectedPower] = useState("All");
  const [sortMode, setSortMode] = useState("Nearest");

  const { chargers, loading, refreshing, errorText, lastUpdated, loadChargers } = useChargers();
  const {
    coords: userCoords,
    status: locationStatus,
    error: locationError,
    requestLocation,
  } = useUserLocation();

  const handleRefresh = () => loadChargers({ isRefresh: true });

  function handleGlobalReload() {
    setViewMode("list");
    setQuery("");
    setSelectedCompany("All");
    setSelectedPower("All");
    setSortMode("Nearest");

    handleRefresh();

    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    });
  }

  useEffect(() => {
    if (sortMode === "Nearest" && !userCoords && locationStatus === "idle") {
      requestLocation();
    }
  }, [sortMode, userCoords, locationStatus, requestLocation]);

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

  const withDistance = useMemo(() => {
    if (!userCoords) return filtered;

    return filtered.map((c) => ({
      ...c,
      distanceKm: getDistanceKm(userCoords, c),
    }));
  }, [filtered, userCoords]);

  const sorted = useMemo(() => {
    if (sortMode !== "Nearest" || !userCoords) return withDistance;

    return [...withDistance].sort((a, b) => {
      const distanceA = a.distanceKm ?? Number.POSITIVE_INFINITY;
      const distanceB = b.distanceKm ?? Number.POSITIVE_INFINITY;
      return distanceA - distanceB;
    });
  }, [sortMode, userCoords, withDistance]);

  const locationHint = useMemo(() => {
    if (sortMode !== "Nearest") return "";
    if (locationStatus === "loading") return "Getting your location...";
    if (locationStatus === "denied") return "Location permission is needed for nearest sorting.";
    if (locationStatus === "error") return locationError || "Location unavailable. Showing default order.";
    if (!userCoords) return "Location unavailable. Showing default order.";
    return "";
  }, [sortMode, locationStatus, locationError, userCoords]);

  const displayedChargers = sorted;
  const mapBase = displayedChargers.length > 0 ? displayedChargers[0] : chargers[0];
  const initialRegion = getInitialRegion(mapBase);

  const listHeaderProps = {
    filteredCount: filtered.length,
    fastCount,
    query,
    onQueryChange: setQuery,
    companyOptions: ALL_COMPANIES,
    selectedCompany,
    onSelectCompany: setSelectedCompany,
    powerOptions: ALL_POWERS,
    selectedPower,
    onSelectPower: setSelectedPower,
    lastUpdated,
    sortOptions: SORT_OPTIONS,
    selectedSort: sortMode,
    onSelectSort: setSortMode,
    locationHint,
    locationStatus,
    onRequestLocation: requestLocation,
  };

  return (
    <MainLayout>
      <TopBar title="Nearby" viewMode={viewMode} onChangeView={setViewMode} />

      {loading ? (
        <LoadingState />
      ) : viewMode === "map" ? (
        <ChargersMapScreen data={displayedChargers} initialRegion={initialRegion} onRefresh={handleRefresh} />
      ) : (
        <ChargersListScreen
          listRef={listRef}
          data={displayedChargers}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          headerProps={listHeaderProps}
        />
      )}

      <FloatingReloadButton onPress={handleGlobalReload} />
      <ErrorBanner message={errorText} onRetry={() => loadChargers()} />
    </MainLayout>
  );
}
