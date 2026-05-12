import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StatusBar, Text, View } from "react-native";

export default function PermissionsScreen() {
  const handleAllowWithPasscode = () => {
    router.push("/onboarding/success");
  };

  const handleDontAllow = () => {
    // router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 bg-slate-50 pt-14">
      {/* Content */}
      <View className="flex-1 items-center px-10 pt-12">
        {/* Icon */}
        <View className="w-24 h-24 bg-emerald-50 rounded-[32px] items-center justify-center mb-8 border border-emerald-100/50">
          <Ionicons name="key-outline" size={40} color="#059669" />
        </View>

        {/* Title */}
        <Text className="text-slate-900 text-3xl font-bold text-center mb-6 leading-tight">
          Allow access to{"\n"}screen time.
        </Text>

        {/* Description */}
        <Text className="text-slate-500 text-lg text-center leading-7 mb-6 font-medium">
          Providing Zenith access to screen time allows it to see your activity
          data and help you manage your focus sessions effectively.
        </Text>

        <Text className="text-slate-400 text-base text-center leading-6 font-medium">
          You can control which apps access your data in your iPhone Settings at any time.
        </Text>

        {/* Learn more link */}
        <Pressable className="mt-8 py-2">
          <Text className="text-emerald-600 text-base font-bold">Learn more about security</Text>
        </Pressable>
      </View>

      {/* Buttons */}
      <View className="px-8 pb-12">
        <Pressable
          onPress={handleAllowWithPasscode}
          className="w-full py-6 rounded-[32px] bg-emerald-600 mb-4 active:bg-emerald-700"
        >
          <Text className="text-white text-center text-xl font-bold">
            Allow with Passcode
          </Text>
        </Pressable>

        <Pressable onPress={handleDontAllow} className="w-full py-4 items-center">
          <Text className="text-slate-400 text-lg font-bold">
            Don't Allow
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
