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
      <View className="flex-1 bg-slate-50">
        <StatusBar style="dark" />
        <SafeAreaView className="flex-1 px-8 items-center justify-center">
          <View className="bg-white w-full rounded-[48px] p-10 items-center border border-slate-100">
            <View className="w-24 h-24 bg-emerald-50 rounded-[32px] items-center justify-center mb-8 border border-emerald-100/50">
              <Ionicons name="mail-unread-outline" size={48} color="#059669" />
            </View>
            
            <Text className="text-slate-900 text-3xl font-bold text-center mb-4 leading-tight">
              Check your email.
            </Text>
            <Text className="text-slate-500 text-lg text-center mb-10 font-medium leading-7">
              We've sent a password reset link to{"\n"}
              <Text className="text-emerald-600 font-bold">{email}</Text>
            </Text>

            <Pressable
              onPress={handleBackToLogin}
              className="w-full py-6 rounded-[32px] bg-emerald-600 items-center justify-center shadow-lg shadow-emerald-900/10"
            >
              <Text className="text-white text-xl font-bold">
                Back to login
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

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
              <Text className="text-emerald-600 text-sm font-bold mb-3 uppercase">Security</Text>
              <Text className="text-slate-900 text-4xl font-bold leading-tight">
                Reset your password.
              </Text>
              <Text className="text-slate-500 text-lg mt-3 font-medium">
                Enter your email and we'll send you a link to get back in.
              </Text>
            </View>

            {/* Main Form Bento */}
            <View className="bg-white rounded-[40px] p-8 border border-slate-100 mb-8">
              <View className="mb-8">
                <Text className="text-slate-400 text-xs font-bold uppercase mb-3 ml-1">Email address</Text>
                <View className="flex-row items-center bg-slate-50 rounded-2xl px-4 border border-slate-50">
                  <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                  <TextInput
                    className="flex-1 py-4 ml-3 text-slate-900 font-bold text-base"
                    placeholder="name@example.com"
                    placeholderTextColor="#cbd5e1"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor="#059669"
                  />
                </View>
              </View>

              <Pressable
                onPress={handleSendReset}
                disabled={!email}
                className={`w-full py-6 rounded-[28px] items-center justify-center ${
                  email ? "bg-emerald-600" : "bg-slate-100"
                }`}
              >
                <Text className={`text-xl font-bold ${email ? "text-white" : "text-slate-300"}`}>
                  Send reset link
                </Text>
              </Pressable>
            </View>

            {/* Footer */}
            <View className="mt-auto items-center">
              <Pressable onPress={handleBackToLogin} className="flex-row items-center">
                <Text className="text-slate-400 font-medium text-base">Wait, I remember it. </Text>
                <Text className="text-emerald-600 font-bold text-base">Go back</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

