import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function ConnectIntroScreen() {
  const handleContinue = () => {
    router.push("/onboarding/connect-screen-time");
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />

      {/* Content */}
      <View className="flex-1 items-center justify-center px-10">
        <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-10 border border-emerald-100/50">
          <Ionicons name="link" size={32} color="#059669" />
        </View>

        <Text className="text-slate-900 text-3xl font-bold text-center leading-tight mb-4">
          Let's take the first step.
        </Text>

        <Text className="text-slate-500 text-lg font-medium text-center leading-7 px-4">
          Zenith will connect to your screen time to give you a personalized focus report.
        </Text>
      </View>

      {/* Continue Action Zone */}
      <View className="px-8 pb-12 pt-6">
        <Pressable
          onPress={handleContinue}
          className="w-full py-6 rounded-[32px] bg-emerald-600 items-center justify-center"
        >
          <Text className="text-white text-xl font-bold">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

