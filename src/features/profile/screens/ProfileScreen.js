import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../../ui/components/MainLayout";
import GlassCard from "../../../ui/components/GlassCard";
import useAuth from "../../auth/hooks/useAuth";
import { fetchMyBookings, subscribeBookingSync } from "../../booking/services/bookingApi";
import styles from "../../../styles/appStyles";

export default function ProfileScreen() {
  const { user, token, signOut } = useAuth();

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    const unsubscribe = subscribeBookingSync(() => {
      fetchMyBookings({ token, onUnauthorized: signOut }).catch(() => {});
    });

    return unsubscribe;
  }, [token, signOut]);

  return (
    <MainLayout>
      <View style={styles.screenPad}>
        <Text style={styles.screenEyebrow}>Account</Text>
        <Text style={styles.screenTitle}>{user?.name || "EV Driver"}</Text>
        <Text style={styles.screenSubtitle}>{user?.email || user?.phone || ""}</Text>
      </View>

      <GlassCard style={styles.profileCard}>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Username</Text>
          <Text style={styles.profileValue}>{user?.username || "-"}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Member since</Text>
          <Text style={styles.profileValue}>{user?.created_at ? user.created_at.slice(0, 10) : "-"}</Text>
        </View>
      </GlassCard>

      <TouchableOpacity style={styles.ghostButton} onPress={signOut}>
        <Text style={styles.ghostButtonText}>Sign out</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
