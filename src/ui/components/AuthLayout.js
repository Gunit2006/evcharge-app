import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import GlassCard from "./GlassCard";
import styles from "../../styles/appStyles";

export default function AuthLayout({ title, subtitle, children }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const enterStyle = useMemo(
    () => ({
      opacity: progress,
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 0],
          }),
        },
      ],
    }),
    [progress]
  );

  return (
    <LinearGradient colors={["#0b0f14", "#0f172a", "#111827"]} style={styles.authBackground}>
      <SafeAreaView style={styles.authSafeArea}>
        <View style={styles.authGlowTop} />
        <View style={styles.authGlowBottom} />
        <ScrollView contentContainerStyle={styles.authScroll} keyboardShouldPersistTaps="handled">
          <Animated.View style={[styles.authHero, enterStyle]}>
            <Text style={styles.authBrand}>EV Navigator</Text>
            <Text style={styles.authHeroTitle}>Charge smarter, anywhere.</Text>
            <Text style={styles.authHeroSubtitle}>
              One login for every charger in your city.
            </Text>
          </Animated.View>

          <Animated.View style={enterStyle}>
            <GlassCard style={styles.authSheet}>
            <Text style={styles.authTitle}>{title}</Text>
            {!!subtitle && <Text style={styles.authSubtitle}>{subtitle}</Text>}
            <View style={styles.authForm}>{children}</View>
            </GlassCard>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
