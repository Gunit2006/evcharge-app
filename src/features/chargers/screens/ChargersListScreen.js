import React from "react";
import { FlatList, View, Text, RefreshControl } from "react-native";
import styles from "../../../styles/appStyles";
import ChargerCard from "../components/ChargerCard";
import ChargersHeader from "../components/ChargersHeader";

export default function ChargersListScreen({ listRef, data, refreshing, onRefresh, headerProps }) {
  return (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={(item, index) => String(item.id || index)}
      renderItem={({ item }) => <ChargerCard item={item} />}
      ListHeaderComponent={<ChargersHeader {...headerProps} />}
      contentContainerStyle={styles.listPad}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#d97706" />}
      ListEmptyComponent={
        <View style={styles.centerBox}>
          <Text style={styles.centerText}>No chargers found for this filter.</Text>
        </View>
      }
    />
  );
}
