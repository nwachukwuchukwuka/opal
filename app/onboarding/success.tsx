import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function SuccessScreen() {
  const handleDone = () => {
    router.push("/create-account");
  };

  return (
    <View className="flex-1 bg-slate-50 pt-14">
      {/* Content */}
      <View className="flex-1 items-center px-10 pt-16">
        {/* Success Icon */}
        <View className="w-24 h-24 bg-emerald-50 rounded-[32px] items-center justify-center mb-10 border border-emerald-100/50">
          <Ionicons name="checkmark-circle" size={48} color="#059669" />
        </View>

        {/* Title */}
        <Text className="text-slate-900 text-3xl font-bold text-center mb-6 leading-tight">
          Zenith approved to access screen time.
        </Text>

        {/* Description */}
        <Text className="text-slate-500 text-lg text-center leading-7 font-medium">
          Zenith has been approved to help you manage your digital wellbeing on this iPhone.
        </Text>
      </View>

      {/* Done Action Zone */}
      <View className="px-8 pb-12">
        <Pressable
          onPress={handleDone}
          className="w-full py-6 rounded-[32px] bg-emerald-600 items-center justify-center shadow-lg shadow-emerald-900/10"
        >
          <Text className="text-white text-xl font-bold">
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

