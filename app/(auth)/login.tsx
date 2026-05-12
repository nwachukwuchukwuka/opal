import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email && password) {
      router.replace("/(tabs)");
    } else {
      setError("please enter your email and password");
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSignInWithApple = () => {
  };

  const handleSignInWithPhone = () => {
  };

  const handleCreateAccount = () => {
    router.push("/create-account");
  };

  const canLogin = email && password;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-50"
    >
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]} className="flex-1">
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-8">
            {/* Header */}
            <View className="flex-row justify-between items-center py-6">
              <View className="w-10 h-10 bg-white rounded-xl border border-slate-100 items-center justify-center">
                <View className="w-6 h-6 rounded-full border-2 border-emerald-600 items-center justify-center">
                  <View className="w-2 h-2 rounded-full bg-emerald-600" />
                </View>
              </View>
              <Pressable onPress={() => router.back()} className="bg-white px-5 py-2 rounded-full border border-slate-100">
                <Text className="text-slate-400 font-bold text-sm">Cancel</Text>
              </Pressable>
            </View>

            {/* Title Section */}
            <View className="mt-8 mb-10">
              <Text className="text-emerald-600 text-sm font-bold mb-3 uppercase">Welcome back</Text>
              <Text className="text-slate-900 text-4xl font-bold leading-tight">
                Sign in to your account.
              </Text>
              <Text className="text-slate-500 text-lg mt-3 font-medium">
                Continue your journey to focus and clarity.
              </Text>
            </View>

            {/* Main Form Bento */}
            <View className="bg-white rounded-[40px] p-8 border border-slate-100 mb-8">
              <View className="mb-6">
                <Text className="text-slate-400 text-xs font-bold uppercase mb-3 ml-1">Email address</Text>
                <View className={`flex-row items-center bg-slate-50 rounded-2xl px-4 border ${error ? 'border-red-100' : 'border-slate-50'}`}>
                  <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                  <TextInput
                    className="flex-1 py-4 ml-3 text-slate-900 font-bold text-base"
                    placeholder="name@example.com"
                    placeholderTextColor="#cbd5e1"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setError("");
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor="#059669"
                  />
                </View>
              </View>

              <View className="mb-2">
                <Text className="text-slate-400 text-xs font-bold uppercase mb-3 ml-1">Password</Text>
                <View className={`flex-row items-center bg-slate-50 rounded-2xl px-4 border ${error ? 'border-red-100' : 'border-slate-50'}`}>
                  <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
                  <TextInput
                    className="flex-1 py-4 ml-3 text-slate-900 font-bold text-base"
                    placeholder="your password"
                    placeholderTextColor="#cbd5e1"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setError("");
                    }}
                    secureTextEntry
                    selectionColor="#059669"
                  />
                </View>
              </View>

              {/* Forgot Password */}
              <Pressable onPress={handleForgotPassword} className="py-4 mb-4">
                <Text className="text-slate-400 font-bold text-sm text-right">
                  Forgot password?
                </Text>
              </Pressable>

              {/* Error Message */}
              {error ? (
                <View className="bg-red-50 p-4 rounded-2xl mb-6 border border-red-100">
                  <Text className="text-red-500 text-sm text-center font-medium">
                    {error}
                  </Text>
                </View>
              ) : null}

              <Pressable
                onPress={handleLogin}
                disabled={!canLogin}
                className={`w-full py-6 rounded-[28px] items-center justify-center ${
                  canLogin ? "bg-emerald-600" : "bg-slate-100"
                }`}
              >
                <Text className={`text-xl font-bold ${canLogin ? "text-white" : "text-slate-300"}`}>
                  Sign in
                </Text>
              </Pressable>
            </View>

            {/* Social Options */}
            <View className="gap-4">
              <View className="flex-row items-center px-4 mb-2">
                <View className="flex-1 h-px bg-slate-100" />
                <Text className="text-slate-400 text-xs font-bold mx-4 uppercase">Or continue with</Text>
                <View className="flex-1 h-px bg-slate-100" />
              </View>

              <View className="flex-row gap-4">
                <Pressable
                  onPress={handleSignInWithApple}
                  className="flex-1 bg-white py-5 rounded-[28px] border border-slate-100 flex-row items-center justify-center"
                >
                  <Ionicons name="logo-apple" size={24} color="#0f172a" />
                  <Text className="text-slate-900 font-bold ml-3">Apple</Text>
                </Pressable>

                <Pressable
                  onPress={handleSignInWithPhone}
                  className="flex-1 bg-white py-5 rounded-[28px] border border-slate-100 flex-row items-center justify-center"
                >
                  <Ionicons name="call-outline" size={24} color="#0f172a" />
                  <Text className="text-slate-900 font-bold ml-3">Phone</Text>
                </Pressable>
              </View>
            </View>

            {/* Footer */}
            <View className="mt-12 items-center">
              <Pressable onPress={handleCreateAccount} className="flex-row items-center">
                <Text className="text-slate-400 font-medium text-base">Don't have an account? </Text>
                <Text className="text-emerald-600 font-bold text-base">Sign up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
