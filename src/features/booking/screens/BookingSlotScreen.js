import React, { useEffect, useMemo, useState } from "react";
import { Alert, Platform, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import { fetchDemoAvailability } from "../../chargers/api/demoAvailabilityApi";
import styles from "../../../styles/appStyles";

export default function BookingSlotScreen({ navigation, route }) {
  const charger = route?.params?.charger || {};
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availabilityMap, setAvailabilityMap] = useState({});

  const subtitle = useMemo(() => {
    const company = charger.company ? String(charger.company) : "";
    const power = charger.power ? String(charger.power) : "";
    const parts = [company, power].filter(Boolean);
    return parts.length ? parts.join(" | ") : "";
  }, [charger]);

  useEffect(() => {
    let isMounted = true;

    const loadAvailability = async () => {
      try {
        const data = await fetchDemoAvailability();
        const items = Array.isArray(data?.items) ? data.items : [];
        const map = {};
        items.forEach((item) => {
          if (item?.charger_id != null) {
            map[item.charger_id] = item;
          }
        });
        if (isMounted) {
          setAvailabilityMap(map);
        }
      } catch (err) {
        const message = "Unable to load slot availability.";
        if (Platform.OS === "android") {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
          Alert.alert("Demo", message);
        }
      }
    };

    loadAvailability();
    const intervalId = setInterval(loadAvailability, 5000);

    return () => {
      clearInterval(intervalId);
      isMounted = false;
    };
  }, []);

  const demoSlots = availabilityMap?.[charger?.id]?.slots || [];

  useEffect(() => {
    if (!selectedSlot) return;
    const match = demoSlots.find((slot) => slot.gun_id === selectedSlot.gun_id);
    if (!match || match.status === "BOOKED") {
      setSelectedSlot(null);
    } else if (match.slot !== selectedSlot.slot) {
      setSelectedSlot({
        gun_id: match.gun_id,
        gun_label: match.gun_label,
        slot: match.slot,
      });
    }
  }, [demoSlots, selectedSlot]);

  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Booking</Text>
        <Text style={styles.screenTitle}>{charger.name || "Select a slot"}</Text>
        <Text style={styles.screenSubtitle}>{subtitle}</Text>
      </View>

      <GlassCard style={styles.bookingCard}>
        <Text style={styles.bookingSectionTitle}>Choose a time</Text>
        <View style={styles.slotGrid}>
          {demoSlots.length > 0 ? (
            demoSlots.map((slotInfo) => {
              const active = selectedSlot?.gun_id === slotInfo.gun_id;
              const isBooked = slotInfo.status === "BOOKED";
              return (
                <TouchableOpacity
                  key={slotInfo.gun_id}
                  style={[
                    styles.slotChip,
                    active && styles.slotChipActive,
                    isBooked && styles.slotChipDisabled,
                  ]}
                  onPress={() =>
                    setSelectedSlot({
                      gun_id: slotInfo.gun_id,
                      gun_label: slotInfo.gun_label,
                      slot: slotInfo.slot,
                    })
                  }
                  disabled={isBooked}
                >
                  <Text
                    style={[
                      styles.slotText,
                      active && styles.slotTextActive,
                      isBooked && styles.slotTextDisabled,
                    ]}
                  >
                    {slotInfo.gun_label}
                  </Text>
                  <Text style={[styles.slotMetaText, isBooked && styles.slotTextDisabled]}>
                    {slotInfo.slot}
                  </Text>
                  {isBooked && <Text style={styles.slotStatusText}>Booked</Text>}
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.authHelperText}>No live slot available.</Text>
          )}
        </View>
      </GlassCard>

      <View style={styles.bookingFooter}>
        <TouchableOpacity
          style={[styles.primaryButton, !selectedSlot && styles.primaryButtonDisabled]}
          onPress={() =>
            navigation.navigate("BookingConfirm", {
              charger,
              slot: selectedSlot?.slot,
              gunId: selectedSlot?.gun_id,
              gunLabel: selectedSlot?.gun_label,
            })
          }
          disabled={!selectedSlot}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.goBack()}>
          <Text style={styles.ghostButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
