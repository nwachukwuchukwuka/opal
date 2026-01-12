import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TabSwitcher } from "./TabSwitcher";

export const ScreenTimeCard = () => {
  const [activeTab, setActiveTab] = useState("Week");
  const bars = [20, 30, 25, 40, 50, 80, 60]; 

  return (
    <View className="bg-zinc-900 rounded-3xl p-5 mb-6">
      <TabSwitcher 
        tabs={["Week", "Month", "Lifetime"]} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <View className="flex-row justify-between items-end mb-1">
        <View>
            {activeTab === "Week" ? (
                 <Text className="text-white text-3xl font-bold">4 hrs, 4 min</Text>
            ) : (
                <Text className="text-zinc-500 text-3xl font-bold">--</Text>
            )}
          <Text className="text-zinc-500 text-sm">Avg Screen Time</Text>
        </View>
        <View className="items-end">
            <Text className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Awake Time</Text>
            {activeTab === "Week" ? (
                 <Text className="text-white text-xl font-bold">26%</Text>
            ) : (
                <View className="flex-row items-center">
                    <Text className="text-zinc-500 text-xs mr-2">APPROX</Text>
                    <Text className="text-white text-base font-bold">18 Years</Text>
                </View>
            )}
        </View>
      </View>

      <View className="h-24 flex-row items-end gap-1 mt-6 mb-2">
        {bars.map((h, i) => (
          <View key={i} className="flex-1 bg-zinc-800 rounded-sm overflow-hidden h-full justify-end">
             <View style={{ height: `${h}%` }} className={`w-full ${i > 3 ? 'bg-teal-700/50' : ''}`} />
             {i > 3 && <View style={{ height: 2 }} className="w-full bg-teal-400" />}
          </View>
        ))}
        <View className="absolute right-0 top-0 bottom-0 justify-between">
            <Text className="text-zinc-700 text-[8px]">12h</Text>
            <Text className="text-zinc-700 text-[8px]">6h</Text>
            <Text className="text-zinc-700 text-[8px]">0h</Text>
        </View>
      </View>

      <View className="flex-row justify-between px-1 mb-4">
        {['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'].map((d, i) => (
            <Text key={i} className="text-zinc-600 text-[10px]">{d}</Text>
        ))}
      </View>

      <Pressable className="flex-row justify-between items-center bg-zinc-800/50 py-3 px-4 rounded-xl">
        <Ionicons name="chevron-back" size={16} color="#71717a" />
        <Text className="text-zinc-400 text-sm font-medium">Last 7 Days</Text>
        <Ionicons name="chevron-forward" size={16} color="#71717a" />
      </Pressable>
    </View>
  );
};