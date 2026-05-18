import { useCallback, useState } from "react";
import * as Location from "expo-location";

const LOCATION_OPTIONS = {
  accuracy: Location.Accuracy.Balanced,
};

export default function useUserLocation() {
  const [status, setStatus] = useState("idle");
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");

  const requestLocation = useCallback(async () => {
    if (status === "loading") return null;

    setStatus("loading");
    setError("");

    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        setStatus("denied");
        setError("Location permission denied.");
        return null;
      }

      const location = await Location.getCurrentPositionAsync(LOCATION_OPTIONS);
      const nextCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setCoords(nextCoords);
      setStatus("granted");
      return nextCoords;
    } catch (err) {
      setStatus("error");
      setError("Location unavailable.");
      return null;
    }
  }, [status]);

  return {
    coords,
    status,
    error,
    requestLocation,
  };
}
