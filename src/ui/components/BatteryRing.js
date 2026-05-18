import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import styles from "../../styles/appStyles";

export default function BatteryRing({ value = 0.78, size = 110, stroke = 10 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, value));
  const offset = circumference * (1 - clamped);

  return (
    <View style={[styles.batteryRing, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          stroke="rgba(255,255,255,0.12)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <Circle
          stroke="#5ac8fa"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation={-90}
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <View style={styles.batteryRingLabel}>
        <Text style={styles.batteryRingValue}>{Math.round(clamped * 100)}%</Text>
        <Text style={styles.batteryRingCaption}>Battery</Text>
      </View>
    </View>
  );
}
