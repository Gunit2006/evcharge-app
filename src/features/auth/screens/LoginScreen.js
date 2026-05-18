import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthLayout from "../../../ui/components/AuthLayout";
import styles from "../../../styles/appStyles";
import useAuth from "../hooks/useAuth";

export default function LoginScreen({ navigation, route }) {
  const { signIn } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const successMessage = route?.params?.successMessage || "";

  const normalizePhone = (value) => {
    const trimmed = value.trim();
    if (trimmed.startsWith("+")) return trimmed;
    if (/^\d{10}$/.test(trimmed)) return "+91" + trimmed;
    return trimmed;
  };

  const validateIdentifier = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Enter email, phone, or username.";

    if (trimmed.includes("@")) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
      return emailOk ? "" : "Enter a valid email address.";
    }

    if (trimmed.startsWith("+")) {
      const phoneOk = /^\+\d{10,15}$/.test(trimmed);
      return phoneOk ? "" : "Enter a valid phone with country code, e.g. +91...";
    }

    if (/^\d+$/.test(trimmed)) {
      return trimmed.length === 10 ? "" : "Enter a valid 10-digit phone number.";
    }

    return trimmed.length >= 3 ? "" : "Username must be at least 3 characters.";
  };

  const handleLogin = async () => {
    if (loading) return;

    const identifierError = validateIdentifier(identifier);
    if (identifierError) {
      setError(identifierError);
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const normalized = normalizePhone(identifier);
      await signIn({ identifier: normalized, password });
    } catch (err) {
      setError(err?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Use your username, email, or phone.">
      <TextInput
        style={styles.authInput}
        placeholder="Email, phone, or username"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        value={identifier}
        onChangeText={setIdentifier}
      />

      <TextInput
        style={styles.authInput}
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {!!error && <Text style={styles.authErrorText}>{error}</Text>}
      {!!successMessage && <Text style={styles.authSuccessText}>{successMessage}</Text>}

      <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
        <Text style={styles.authButtonText}>{loading ? "Signing in..." : "Sign in"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.authSecondaryBtn} onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.authSecondaryText}>Create an account</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
