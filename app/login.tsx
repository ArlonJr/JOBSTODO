import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "./store/slices/authSlice";
import { validateLogin } from "./services/authService";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert("Login Error", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter both username and password"
      );
      return;
    }

    dispatch(loginStart());

    try {
      const result = await validateLogin({
        username: username.trim(),
        password,
      });

      if (result.success && result.user) {
        dispatch(loginSuccess(result.user));
        setShowSuccess(true);

        setTimeout(() => {
          router.push("/home");
        }, 2000);
      } else {
        dispatch(loginFailure(result.error || "Login failed"));
      }
    } catch (error) {
      dispatch(loginFailure("An unexpected error occurred"));
    }
  };

  if (showSuccess) {
    return (
      <View style={styles.container}>
        <View style={styles.successContent}>
          <View style={styles.successIcon}>
            <Text style={styles.successCheckmark}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Login Successful!</Text>
          <Text style={styles.successSubtitle}>Welcome back, {username}</Text>
          <ActivityIndicator
            style={styles.successSpinner}
            size="large"
            color="#E2E2B6"
          />
          <Text style={styles.successText}>Redirecting to dashboard...</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>JUST DO IT APP</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor="#999"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              placeholderTextColor="#999"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4e6190",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E2E2B6",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#E2E2B6",
    opacity: 0.8,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E2E2B6",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  loginButton: {
    backgroundColor: "#6EACDA",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonDisabled: {
    backgroundColor: "#999",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  successContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  successCheckmark: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E2E2B6",
    marginBottom: 10,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 18,
    color: "#E2E2B6",
    marginBottom: 40,
    textAlign: "center",
    opacity: 0.9,
  },
  successSpinner: {
    marginBottom: 20,
  },
  successText: {
    fontSize: 16,
    color: "#E2E2B6",
    textAlign: "center",
    opacity: 0.8,
  },
});
