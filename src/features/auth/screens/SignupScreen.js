import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthLayout from "../../../ui/components/AuthLayout";
import styles from "../../../styles/appStyles";
import useAuth from "../hooks/useAuth";

export default function SignupScreen({ navigation }) {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const normalizePhone = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("+")) return trimmed;
    if (/^\d{10}$/.test(trimmed)) return "+91" + trimmed;
    return trimmed;
  };

  const validateEmail = (value) => {
    if (!value) return "";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email.";
  };

  const validatePhone = (value) => {
    if (!value) return "";
    if (value.startsWith("+")) {
      return /^\+\d{10,15}$/.test(value) ? "" : "Enter a valid phone with country code.";
    }
    if (/^\d+$/.test(value)) {
      return value.length === 10 ? "" : "Enter a valid 10-digit phone number.";
    }
    return "Enter a valid phone number.";
  };

  const handleSignup = async () => {
    if (loading) return;

    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = normalizePhone(phone);

    if (!normalizedEmail && !normalizedPhone) {
      setError("Email or phone is required.");
      return;
    }

    const emailError = validateEmail(normalizedEmail);
    if (emailError) {
      setError(emailError);
      return;
    }

    const phoneError = validatePhone(normalizedPhone);
    if (phoneError) {
      setError(phoneError);
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await signUp({
        name,
        username: trimmedUsername,
        email: normalizedEmail,
        phone: normalizedPhone,
        password,
      });
      setSuccess("Account created. Please sign in.");
      navigation.navigate("Login", { successMessage: "Account created. Please sign in." });
    } catch (err) {
      setError(err?.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Sign up with email or phone.">
      <TextInput
        style={styles.authInput}
        placeholder="Full name"
        placeholderTextColor="#9ca3af"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.authInput}
        placeholder="Username"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.authInput}
        placeholder="Email (optional)"
        placeholderTextColor="#9ca3af"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.authInput}
        placeholder="Phone (optional)"
        placeholderTextColor="#9ca3af"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
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
      {!!success && <Text style={styles.authSuccessText}>{success}</Text>}

      <TouchableOpacity style={styles.authButton} onPress={handleSignup}>
        <Text style={styles.authButtonText}>{loading ? "Creating..." : "Create account"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.authSecondaryBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.authSecondaryText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
