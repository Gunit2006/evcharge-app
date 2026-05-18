import { Linking, Platform } from "react-native";

export function openMaps({ latitude, longitude, label }) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return;
  }

  const destination = `${lat},${lng}`;
  const query = label ? encodeURIComponent(label) : destination;

  const url = Platform.select({
    ios: `http://maps.apple.com/?daddr=${destination}&q=${query}`,
    android: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    default: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
  });

  Linking.openURL(url);
}
