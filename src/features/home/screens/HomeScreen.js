import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import BatteryRing from "../../../ui/components/BatteryRing";
import { fetchDemoAvailability, releaseDemoSlot } from "../../chargers/api/demoAvailabilityApi";
import styles from "../../../styles/appStyles";

const ACTIVE_BOOKING_KEY = "demo_active_booking";

function formatCountdown(ms) {
  if (ms == null || ms <= 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function HomeScreen({ navigation }) {
  const [booking, setBooking] = useState(null);
  const [timeLeftMs, setTimeLeftMs] = useState(null);
  const [loadingBooking, setLoadingBooking] = useState(true);

  const loadBooking = useCallback(async () => {
    setLoadingBooking(true);
    try {
      const raw = await AsyncStorage.getItem(ACTIVE_BOOKING_KEY);
      if (!raw) {
        setBooking(null);
        setTimeLeftMs(null);
        return;
      }
      const parsed = JSON.parse(raw);
      setBooking(parsed);
    } catch (err) {
      setBooking(null);
      setTimeLeftMs(null);
    } finally {
      setLoadingBooking(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBooking();
    }, [loadBooking])
  );

  useEffect(() => {
    if (!booking?.expires_at) {
      setTimeLeftMs(null);
      return;
    }

    const update = () => {
      const remaining = new Date(booking.expires_at).getTime() - Date.now();
      setTimeLeftMs(remaining);
    };

    update();
    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, [booking?.expires_at]);

  useEffect(() => {
    if (!booking?.charger?.id) return;

    let active = true;
    const poll = async () => {
      try {
        const data = await fetchDemoAvailability();
        const items = Array.isArray(data?.items) ? data.items : [];
        const current = items.find((item) => item.charger_id === booking.charger.id);
        const slotInfo = current?.slots?.find((slot) => slot.gun_id === booking.gun_id);
        if (active && slotInfo?.expires_at) {
          const updated = {
            ...booking,
            slot: slotInfo.slot || booking.slot,
            gun_label: slotInfo.gun_label || booking.gun_label,
            expires_at: slotInfo.expires_at,
          };
          setBooking(updated);
          await AsyncStorage.setItem(ACTIVE_BOOKING_KEY, JSON.stringify(updated));
        }

        if (active && slotInfo?.status === "AVAILABLE" && booking?.status !== "active") {
          setBooking(null);
          setTimeLeftMs(null);
          await AsyncStorage.removeItem(ACTIVE_BOOKING_KEY);
        }
      } catch (err) {
        // Ignore polling errors.
      }
    };

    poll();
    const intervalId = setInterval(poll, 5000);
    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, [booking]);

  const handleRelease = async () => {
    if (!booking?.charger?.id) return;
    try {
      await releaseDemoSlot({
        chargerId: booking.charger.id,
        slot: booking.slot,
        gunId: booking.gun_id,
        source: "app",
      });
      await AsyncStorage.removeItem(ACTIVE_BOOKING_KEY);
      setBooking(null);
      setTimeLeftMs(null);
    } catch (err) {
      Alert.alert("Unable to release", err?.message || "Slot is locked by another client.");
    }
  };

  const countdownLabel = useMemo(() => formatCountdown(timeLeftMs), [timeLeftMs]);
  const chargerName = booking?.charger?.name || "Charger";
  const gunLabel = booking?.gun_label || "Gun";
  const expired = timeLeftMs != null && timeLeftMs <= 0;
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
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.sessionTitle}>
                {loadingBooking
                  ? "Checking booking..."
                  : booking
                    ? "Booked slot"
                    : "No active session"}
              </Text>
              <Text style={styles.sessionSubtitle}>
                {booking
                  ? `${chargerName} · ${gunLabel} · ${booking?.slot || ""} · ${
                      expired ? "Expired" : countdownLabel
                    }`
                  : "Start a new charge in 2 taps."}
              </Text>
            </View>
            {booking ? (
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => navigation.navigate("ChargingSession")}
                >
                  <Text style={styles.primaryButtonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ghostButton} onPress={handleRelease}>
                  <Text style={styles.ghostButtonText}>Release</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("ChargingSession")}
              >
                <Text style={styles.primaryButtonText}>Start</Text>
              </TouchableOpacity>
            )}
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
