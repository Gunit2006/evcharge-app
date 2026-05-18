import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../../styles/appStyles";

export default function TopBar({ title = "Nearby", viewMode, onChangeView }) {
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarTitle}>{title}</Text>

      <View style={styles.segment}>
        <TouchableOpacity
          style={[styles.segmentBtn, viewMode === "list" && styles.segmentBtnActive]}
          onPress={() => onChangeView("list")}
        >
          <Text style={[styles.segmentTxt, viewMode === "list" && styles.segmentTxtActive]}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentBtn, viewMode === "map" && styles.segmentBtnActive]}
          onPress={() => onChangeView("map")}
        >
          <Text style={[styles.segmentTxt, viewMode === "map" && styles.segmentTxtActive]}>Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
