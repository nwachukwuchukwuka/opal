import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendReset = () => {
    if (email) {
      setSent(true);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  if (sent) {
    return (
      <View className="flex-1 bg-black pt-14 px-6">
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-white text-xl font-bold">Opal</Text>
        </View>

        {/* Success Message */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-5xl mb-6">✉️</Text>
          <Text className="text-white text-2xl font-bold text-center mb-4">
            Check your email
          </Text>
          <Text className="text-zinc-500 text-base text-center mb-8">
            We've sent a password reset link to{"\n"}
            <Text className="text-white">{email}</Text>
          </Text>
          <Pressable
            onPress={handleBackToLogin}
            className="w-full py-4 rounded-full bg-white active:opacity-90"
          >
            <Text className="text-black text-center text-base font-semibold">
              Back to Login
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-black"
    >
      <StatusBar barStyle="light-content" />

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
            Reset your password
          </Text>
          <Text className="text-zinc-500 text-sm">
            Enter your email and we'll send you a link to reset your password
          </Text>
        </View>

        {/* Form */}
        <View>
          {/* Email Input */}
          <View className="mb-6">
            <TextInput
              className="w-full py-4 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-base"
              placeholder="Your Email"
              placeholderTextColor="#71717a"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Send Reset Button */}
          <Pressable
            onPress={handleSendReset}
            disabled={!email}
            className={`w-full py-4 rounded-full ${
              email ? "bg-white" : "bg-zinc-800"
            } active:opacity-90`}
          >
            <Text
              className={`text-center text-base font-semibold ${
                email ? "text-black" : "text-zinc-600"
              }`}
            >
              Send Reset Link
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

