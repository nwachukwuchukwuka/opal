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

export default function CreateAccountScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !text.includes("@")) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    if (text && text.length < 6) {
      setPasswordError("Please enter your password");
    } else {
      setPasswordError("");
    }
  };

  const handleCreateAccount = () => {
    if (email && password && !emailError && !passwordError) {
      router.push("/onboarding/gem-name");
    }
  };

  const handleSkip = () => {
    router.push("/onboarding/gem-name");
  };

  const handleSignInWithApple = () => {
    router.push("/onboarding/gem-name");
  };

  const handleSignInWithPhone = () => {
    router.push("/onboarding/gem-name");
  };

  const handleAlreadyHaveAccount = () => {
    router.push("/login");
  };

  const canCreateAccount = email && password && !emailError && !passwordError;

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
            <Pressable onPress={handleSkip}>
              <Text className="text-zinc-500 text-base">Skip</Text>
            </Pressable>
          </View>

          {/* Title */}
          <View className="mb-8">
            <Text className="text-white text-2xl font-bold mb-2">
              Let's create your account
            </Text>
            <Text className="text-zinc-500 text-sm">
              Join 4,000,000+ gems on their journey
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
                onChangeText={validateEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {emailError ? (
                <Text className="text-red-500 text-xs mt-1">{emailError}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <TextInput
                className="w-full py-4 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-base"
                placeholder="Your Password"
                placeholderTextColor="#71717a"
                value={password}
                onChangeText={validatePassword}
                secureTextEntry
              />
              {passwordError ? (
                <Text className="text-red-500 text-xs mt-1">
                  {passwordError}
                </Text>
              ) : null}
            </View>

            {/* Create Account Button */}
            <Pressable
              onPress={handleCreateAccount}
              disabled={!canCreateAccount}
              className={`w-full py-4 rounded-full border ${
                canCreateAccount
                  ? "border-white bg-transparent"
                  : "border-zinc-700 bg-transparent"
              } active:bg-white/10`}
            >
              <Text
                className={`text-center text-base font-semibold ${
                  canCreateAccount ? "text-white" : "text-zinc-600"
                }`}
              >
                Create account
              </Text>
            </Pressable>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-zinc-800" />
            <Text className="text-zinc-500 text-sm mx-4">or</Text>
            <View className="flex-1 h-px bg-zinc-800" />
          </View>

          {/* Social Sign Up Buttons */}
          <View className="mb-6">
            <Pressable
              onPress={handleSignInWithApple}
              className="w-full py-4 rounded-full bg-zinc-900 border border-zinc-800 mb-3 flex-row items-center justify-center active:bg-zinc-800"
            >
              <Text className="text-white text-base mr-2">🍎</Text>
              <Text className="text-white text-base font-medium">
                Sign Up With Apple
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSignInWithPhone}
              className="w-full py-4 rounded-full bg-zinc-900 border border-zinc-800 flex-row items-center justify-center active:bg-zinc-800"
            >
              <Text className="text-white text-base mr-2">📱</Text>
              <Text className="text-white text-base font-medium">
                Sign Up With Phone
              </Text>
            </Pressable>
          </View>

          {/* Already have account */}
          <Pressable onPress={handleAlreadyHaveAccount} className="py-2">
            <Text className="text-zinc-500 text-center text-base">
              Already have an account?
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

