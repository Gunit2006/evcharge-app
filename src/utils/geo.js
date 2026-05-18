const FALLBACK_REGION = {
  latitude: 21.1458,
  longitude: 79.0882,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

function degreesToRadians(value) {
  return (value * Math.PI) / 180;
}

export function getInitialRegion(base) {
  if (!base) return FALLBACK_REGION;

  const latitude = Number(base.latitude);
  const longitude = Number(base.longitude);

  return {
    latitude: Number.isFinite(latitude) ? latitude : FALLBACK_REGION.latitude,
    longitude: Number.isFinite(longitude) ? longitude : FALLBACK_REGION.longitude,
    latitudeDelta: FALLBACK_REGION.latitudeDelta,
    longitudeDelta: FALLBACK_REGION.longitudeDelta,
  };
}

export function getDistanceKm(from, to) {
  const fromLat = Number(from?.latitude);
  const fromLng = Number(from?.longitude);
  const toLat = Number(to?.latitude);
  const toLng = Number(to?.longitude);

  if (![fromLat, fromLng, toLat, toLng].every(Number.isFinite)) {
    return null;
  }

  const earthRadiusKm = 6371;
  const dLat = degreesToRadians(toLat - fromLat);
  const dLng = degreesToRadians(toLng - fromLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(fromLat)) *
      Math.cos(degreesToRadians(toLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export function formatDistance(km) {
  if (km == null) return "";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}
