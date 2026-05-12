import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function NewsIntroScreen() {
  const handleContinue = () => {
    router.push("/onboarding/(results)/bad-news");
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      {/* Content */}
      <View className="flex-1 items-center justify-center px-10">
        <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-10 border border-emerald-100/50">
          <Ionicons name="megaphone" size={32} color="#059669" />
        </View>
        <Text className="text-slate-900 text-3xl font-bold text-center leading-tight">
          Some not-so-good news, and some great news.
        </Text>
      </View>

      {/* Continue Action Zone */}
      <View className="px-8 pb-12 pt-6">
        <Pressable
          onPress={handleContinue}
          className="w-full py-6 rounded-[32px] bg-[#059669] items-center justify-center"
        >
          <Text className="text-white text-xl font-bold">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

