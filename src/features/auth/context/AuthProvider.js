import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../services/authApi";

export const AuthContext = createContext(null);
const STORAGE_TOKEN = "auth_token";
const STORAGE_USER = "auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_USER);
        const storedToken = await AsyncStorage.getItem(STORAGE_TOKEN);
        if (isMounted && storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (err) {
        if (isMounted) {
          setUser(null);
          setToken("");
        }
      } finally {
        if (isMounted) {
          setInitializing(false);
        }
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = useCallback(async ({ identifier, password }) => {
    const data = await loginUser({ identifier, password });
    await AsyncStorage.setItem(STORAGE_TOKEN, data.token);
    await AsyncStorage.setItem(STORAGE_USER, JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const signUp = useCallback(async ({ name, username, email, phone, password }) => {
    const data = await registerUser({ name, username, email, phone, password });
    return data.user;
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_TOKEN);
    await AsyncStorage.removeItem(STORAGE_USER);
    setToken("");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      token,
      signIn,
      signUp,
      signOut,
    }),
    [user, initializing, token, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
