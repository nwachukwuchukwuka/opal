import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const FooterInfo = () => (
  <View className="bg-white border border-slate-200 rounded-[44px] p-8 mb-10">
    <View className="items-center mb-8">
      <View className="w-14 h-14 bg-slate-50 rounded-full items-center justify-center border border-slate-200 mb-4">
        <Ionicons name="sparkles" size={24} color="#059669" />
      </View>
      <Text className="text-slate-900 text-xl font-semibold text-center">Opal Gem Since 2 September 2024</Text>
    </View>

    <View className="flex-row justify-between bg-slate-50/50 p-6 rounded-[32px] border border-slate-200">
      <View className="items-center">
        <Text className="text-emerald-600 text-2xl font-bold">25</Text>
        <Text className="text-slate-400 text-xs font-medium mt-1">Sessions</Text>
      </View>
      <View className="w-[1px] h-10 bg-slate-200 self-center" />
      <View className="items-center">
        <Text className="text-emerald-600 text-2xl font-bold">21h 43m</Text>
        <Text className="text-slate-400 text-xs font-medium mt-1">Session Time</Text>
      </View>
      <View className="w-[1px] h-10 bg-slate-200 self-center" />
      <View className="items-center">
        <Text className="text-emerald-600 text-2xl font-bold">0m</Text>
        <Text className="text-slate-400 text-xs font-medium mt-1">Snooze Time</Text>
      </View>
    </View>

    <Text className="text-slate-300 text-center text-[10px] mt-8 uppercase tracking-widest font-bold">
      Opal Version 4.1.0 (522)
    </Text>
  </View>
);