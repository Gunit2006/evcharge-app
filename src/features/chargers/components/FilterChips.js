import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "../../../styles/appStyles";

export default function FilterChips({ title, options, selectedValue, onSelect }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rowPad}>
        {options.map((option) => {
          const active = selectedValue === option;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => onSelect(option)}
              activeOpacity={0.9}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
