import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function GoodNewsScreen() {
  const handleContinue = () => {
    router.push("/onboarding/(results)/connect-intro");
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />

      {/* Content */}
      <View className="flex-1 items-center justify-center px-10">
        <View className="w-20 h-20 bg-emerald-100 rounded-[32px] items-center justify-center mb-10 border border-emerald-200/50">
          <Ionicons name="sparkles" size={32} color="#059669" />
        </View>

        {/* Good news text */}
        <Text className="text-slate-500 text-lg text-center mb-8 font-medium">
          The good news is that Opal can help you get back
        </Text>

        {/* Big number */}
        <Text className="text-emerald-600 text-[50px] font-bold mb-4">
          6 years+
        </Text>

        {/* Subtitle */}
        <Text className="text-slate-900 text-xl font-bold text-center leading-7">
          of your life free from distractions, and help you achieve your dreams.
        </Text>
      </View>

      {/* Footer text */}
      <View className="px-10 mb-8">
        <Text className="text-slate-400 text-xs text-center font-medium leading-5">
          According to an in-product estimate with Opal program.
        </Text>
      </View>

      {/* Continue Action Zone */}
      <View className="px-8 pb-12">
        <Pressable
          onPress={handleContinue}
          className="w-full py-6 rounded-[32px] bg-emerald-600 items-center justify-center shadow-lg shadow-emerald-900/10"
        >
          <Text className="text-white text-xl font-bold">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

