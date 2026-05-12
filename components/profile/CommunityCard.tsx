import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CommunityCard = () => (
  <View className="bg-white border border-slate-200 rounded-[44px] p-7 mb-2">
    {/* Large Metric Header */}
    <View className="flex-row justify-between items-start mb-6">
      <View>
        <Text className="text-slate-400 text-xs font-semibold mb-1">Community Rank</Text>
        <Text className="text-slate-900 text-4xl font-semibold">23% Higher</Text>
      </View>
      <View className="w-12 h-12 bg-emerald-50 rounded-2xl items-center justify-center border border-emerald-100">
        <Ionicons name="trending-up" size={24} color="#059669" />
      </View>
    </View>

    <Text className="text-slate-400 text-sm leading-6 mb-8">
      Your Screen Time was higher than your peers yesterday. Opal can help to keep you on track!
    </Text>

    {/* Modern Side-by-Side Comparison */}
    <View className="gap-5">
      <View className="flex-row items-center">
        <View className="w-24">
          <Text className="text-slate-900 text-xs font-bold">You</Text>
        </View>
        <View className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden">
          <View className="h-full w-[65%] bg-emerald-600 rounded-full" />
        </View>
        <Text className="text-slate-900 text-xs font-bold ml-4">5h 15m</Text>
      </View>

      <View className="flex-row items-center">
        <View className="w-24">
          <Text className="text-slate-400 text-xs font-medium">Peers Average</Text>
        </View>
        <View className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden">
          <View className="h-full w-[40%] bg-slate-200 rounded-full" />
        </View>
        <Text className="text-slate-400 text-xs font-medium ml-4">4h 17m</Text>
      </View>
    </View>
  </View>
);
