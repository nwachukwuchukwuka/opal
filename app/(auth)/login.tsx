import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email && password) {
      // Placeholder - will implement actual login later
      router.replace("/home");
    } else {
      setError("Please enter your email and password");
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSignInWithApple = () => {
    // Placeholder - will implement later
    router.replace("/home");
  };

  const handleSignInWithPhone = () => {
    // Placeholder - will implement later
    router.replace("/home");
  };

  const handleCreateAccount = () => {
    router.push("/create-account");
  };

  const canLogin = email && password;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-black"
    >
      <StatusBar barStyle="light-content" />

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 pt-14 px-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-white text-xl font-bold">Opal</Text>
            <Pressable onPress={() => router.back()}>
              <Text className="text-zinc-500 text-base">Cancel</Text>
            </Pressable>
          </View>

          {/* Title */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-bold mb-2">
              Welcome back
            </Text>
            <Text className="text-zinc-500 text-sm">
              Sign in to continue your journey
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            {/* Email Input */}
            <View className="mb-4">
              <TextInput
                className="w-full py-4 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-base"
                placeholder="Your Email"
                placeholderTextColor="#71717a"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View className="mb-2">
              <TextInput
                className="w-full py-4 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-base"
                placeholder="Your Password"
                placeholderTextColor="#71717a"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                secureTextEntry
              />
            </View>

            {/* Forgot Password */}
            <Pressable onPress={handleForgotPassword} className="mb-4">
              <Text className="text-zinc-500 text-sm text-right">
                Forgot password?
              </Text>
            </Pressable>

            {/* Error Message */}
            {error ? (
              <Text className="text-red-500 text-sm text-center mb-4">
                {error}
              </Text>
            ) : null}

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={!canLogin}
              className={`w-full py-4 rounded-full ${
                canLogin ? "bg-white" : "bg-zinc-800"
              } active:opacity-90`}
            >
              <Text
                className={`text-center text-base font-semibold ${
                  canLogin ? "text-black" : "text-zinc-600"
                }`}
              >
                Sign In
              </Text>
            </Pressable>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-zinc-800" />
            <Text className="text-zinc-500 text-sm mx-4">or</Text>
            <View className="flex-1 h-px bg-zinc-800" />
          </View>

          {/* Social Sign In Buttons */}
          <View className="mb-6">
            <Pressable
              onPress={handleSignInWithApple}
              className="w-full py-4 rounded-full bg-zinc-900 border border-zinc-800 mb-3 flex-row items-center justify-center active:bg-zinc-800"
            >
              <Text className="text-white text-base mr-2">🍎</Text>
              <Text className="text-white text-base font-medium">
                Sign In With Apple
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSignInWithPhone}
              className="w-full py-4 rounded-full bg-zinc-900 border border-zinc-800 flex-row items-center justify-center active:bg-zinc-800"
            >
              <Text className="text-white text-base mr-2">📱</Text>
              <Text className="text-white text-base font-medium">
                Sign In With Phone
              </Text>
            </Pressable>
          </View>

          {/* Create account */}
          <Pressable onPress={handleCreateAccount} className="py-2">
            <Text className="text-zinc-500 text-center text-base">
              Don't have an account?{" "}
              <Text className="text-white">Sign up</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

