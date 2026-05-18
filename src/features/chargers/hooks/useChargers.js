import { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getChargers } from "../data/chargersRepository";

const CACHE_KEY = "chargers_cache_v1";
const REQUEST_TIMEOUT_MS = 10000;

export default function useChargers() {
  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const chargersRef = useRef([]);

  useEffect(() => {
    chargersRef.current = chargers;
  }, [chargers]);

  const loadChargers = useCallback(async (options = {}) => {
    const isRefresh = options.isRefresh === true;
    const skipLoading = options.skipLoading === true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      if (isRefresh) {
        setRefreshing(true);
      } else if (!skipLoading) {
        setLoading(true);
      }

      setErrorText("");
      const data = await getChargers({ signal: controller.signal });

      setChargers(data);
      setLastUpdated(new Date().toLocaleTimeString());
      await AsyncStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data,
          cachedAt: Date.now(),
        })
      );

      if (data.length === 0) {
        setErrorText("API returned empty data.");
      }
    } catch (err) {
      const fallbackMessage =
        chargersRef.current.length > 0
          ? "Server is taking too long. Showing cached data."
          : "Could not connect to server. Please retry.";

      setErrorText(err?.name === "AbortError" ? fallbackMessage : "Could not connect to server. Please retry.");
      if (!isRefresh && chargersRef.current.length === 0) {
        setChargers([]);
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      try {
        const cachedRaw = await AsyncStorage.getItem(CACHE_KEY);
        if (!cachedRaw) {
          loadChargers();
          return;
        }

        const cached = JSON.parse(cachedRaw);
        if (isMounted && Array.isArray(cached?.data)) {
          setChargers(cached.data);
          setLastUpdated(
            cached.cachedAt ? new Date(cached.cachedAt).toLocaleTimeString() : ""
          );
          setLoading(false);
        }

        loadChargers({ skipLoading: true });
      } catch (err) {
        loadChargers();
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, [loadChargers]);

  return {
    chargers,
    loading,
    refreshing,
    errorText,
    lastUpdated,
    loadChargers,
  };
}
