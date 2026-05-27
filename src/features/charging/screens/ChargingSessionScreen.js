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

export default function ChargingSessionScreen({ navigation }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timeLeftMs, setTimeLeftMs] = useState(null);

  const loadBooking = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(ACTIVE_BOOKING_KEY);
      if (!raw) {
        setBooking(null);
        setSessionStarted(false);
        setTimeLeftMs(null);
        return;
      }
      const parsed = JSON.parse(raw);
      setBooking(parsed);
      setSessionStarted(parsed?.status === "active");
    } catch (err) {
      setBooking(null);
      setSessionStarted(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBooking();
    }, [loadBooking])
  );

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

        if (active && slotInfo?.status === "AVAILABLE" && !sessionStarted) {
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
  }, [booking, sessionStarted]);

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
      setSessionStarted(false);
      setTimeLeftMs(null);
    } catch (err) {
      Alert.alert("Unable to release", err?.message || "Slot is locked by another client.");
    }
  };

  const handleEndCharging = async () => {
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
      setSessionStarted(false);
      setTimeLeftMs(null);
    } catch (err) {
      Alert.alert("Unable to end session", err?.message || "Slot is locked by another client.");
    }
  };

  const handleStart = async () => {
    if (timeLeftMs != null && timeLeftMs <= 0) {
      Alert.alert("Booking expired", "You arrived too late to start this session.");
      return;
    }
    const updated = { ...booking, status: "active" };
    setSessionStarted(true);
    setBooking(updated);
    await AsyncStorage.setItem(ACTIVE_BOOKING_KEY, JSON.stringify(updated));
  };

  const countdownLabel = useMemo(() => formatCountdown(timeLeftMs), [timeLeftMs]);
  const expired = timeLeftMs != null && timeLeftMs <= 0;
  const chargerName = booking?.charger?.name || "Charger";
  const gunLabel = booking?.gun_label || "Gun";
  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Live session</Text>
        <Text style={styles.screenTitle}>
          {sessionStarted ? "Charging active" : "Reach within 15 minutes"}
        </Text>
        <Text style={styles.screenSubtitle}>
          {loading
            ? "Checking booking..."
            : booking
                ? `${chargerName} · ${gunLabel} · ${countdownLabel} remaining`
              : "No active booking"}
        </Text>
      </View>

      {booking ? (
        <GlassCard style={styles.sessionHeroCard}>
          <BatteryRing value={sessionStarted ? 0.62 : 0.2} size={150} />
          <View style={styles.sessionStats}>
            <View style={styles.sessionStatItem}>
              <Text style={styles.metricLabel}>Charger</Text>
              <Text style={styles.metricValue}>{chargerName}</Text>
            </View>
            <View style={styles.sessionStatItem}>
              <Text style={styles.metricLabel}>Gun</Text>
              <Text style={styles.metricValue}>{gunLabel}</Text>
            </View>
            <View style={styles.sessionStatItem}>
              <Text style={styles.metricLabel}>Slot</Text>
              <Text style={styles.metricValue}>{booking?.slot || "-"}</Text>
            </View>
            <View style={styles.sessionStatItem}>
              <Text style={styles.metricLabel}>Arrival window</Text>
              <Text style={styles.metricValue}>{expired ? "Expired" : countdownLabel}</Text>
            </View>
          </View>
        </GlassCard>
      ) : (
        <GlassCard style={styles.sessionHeroCard}>
          <Text style={styles.authHelperText}>No active booking yet.</Text>
        </GlassCard>
      )}

      <View style={styles.sessionActions}>
        {booking ? (
          <>
            {!sessionStarted && !expired && (
              <TouchableOpacity style={styles.primaryButton} onPress={handleStart}>
                <Text style={styles.primaryButtonText}>Start charging</Text>
              </TouchableOpacity>
            )}
            {sessionStarted ? (
              <TouchableOpacity style={styles.primaryButton} onPress={handleEndCharging}>
                <Text style={styles.primaryButtonText}>End charging</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.ghostButton} onPress={handleRelease}>
                <Text style={styles.ghostButtonText}>Release slot</Text>
              </TouchableOpacity>
            )}
            {!sessionStarted && expired && (
              <TouchableOpacity style={styles.ghostButton} onPress={handleRelease}>
                <Text style={styles.ghostButtonText}>Clear booking</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.goBack()}>
            <Text style={styles.ghostButtonText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </MainLayout>
  );
}
