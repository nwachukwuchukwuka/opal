import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  Text,
  View
} from "react-native";

export default function FocusIntroScreen() {
  const handleContinue = () => {
    router.push("/onboarding/sessions");
  };

  return (
    <View className="flex-1 bg-slate-50 pt-14 px-10">
      {/* Content */}
      <View className="flex-1 items-center justify-center">
        <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-10 border border-emerald-100/50">
          <Ionicons name="sparkles" size={32} color="#059669" />
        </View>
        <Text className="text-slate-900 text-3xl font-bold text-center leading-tight">
          Now, let's look at how Zenith can help you focus better and find your flow today.
        </Text>
      </View>

      {/* Continue Action Zone */}
      <View className="pb-12 pt-6">
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

