import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export const ScreenTimeCard = () => {
  const [activeTab, setActiveTab] = useState("Week");

  const categories = [
    { label: "Social", value: 65, color: "#059669", time: "2h 15m" },
    { label: "Productivity", value: 45, color: "#10b981", time: "1h 30m" },
    { label: "Entertainment", value: 30, color: "#34d399", time: "59m" },
  ];

  return (
    <View className="bg-white border border-slate-200 rounded-[44px] p-7 mb-2">
      {/* Top Navigation & Menu Selector */}
      <View className="flex-row justify-between items-center mb-10">
        <View className="flex-row items-center bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
          <Pressable className="w-9 h-9 bg-white rounded-full items-center justify-center border border-slate-200/50">
            <Ionicons name="chevron-back" size={16} color="#059669" />
          </Pressable>
          <Text className="text-slate-900 font-semibold text-sm px-4">Last 7 Days</Text>
          <Pressable className="w-9 h-9 bg-white rounded-full items-center justify-center border border-slate-200/50">
            <Ionicons name="chevron-forward" size={16} color="#059669" />
          </Pressable>
        </View>

        <Pressable className="flex-row items-center bg-emerald-50 px-5 py-3 rounded-full border border-emerald-100">
          <Text className="text-emerald-700 font-semibold text-sm mr-2">{activeTab}</Text>
          <Ionicons name="chevron-down" size={14} color="#059669" />
        </Pressable>
      </View>

      {/* Chart Headline Metric */}
      <View className="mb-10 px-2">
        <Text className="text-slate-900 text-5xl font-bold">4h 4m</Text>
        <Text className="text-slate-400 text-sm mt-1 font-medium">Avg Daily Use</Text>
      </View>

      {/* Weekly Activity Bar Chart - Premium Bento Style */}
      <View className="mb-12">
        <View className="flex-row items-end justify-between h-48 px-2 mb-6">
          {[40, 70, 55, 90, 65, 80, 45].map((height, i) => (
            <View key={i} className="items-center">
              <View 
                className="w-8 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden justify-end"
                style={{ height: 160 }}
              >
                <View 
                  className={`w-full rounded-t-xl ${i === 3 ? 'bg-emerald-600' : 'bg-emerald-100'}`}
                  style={{ height: `${height}%` }}
                />
              </View>
              <Text className={`text-[10px] mt-3 font-bold ${i === 3 ? 'text-emerald-600' : 'text-slate-400'}`}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row justify-center items-center gap-6">
          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-emerald-600 mr-2" />
            <Text className="text-slate-900 text-xs font-bold">Today</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-full bg-emerald-100 mr-2" />
            <Text className="text-slate-400 text-xs font-bold">Previous</Text>
          </View>
        </View>
      </View>

      {/* Stats Breakdown Section */}
      <View className="gap-8 mb-4">
        <View className="flex-row justify-between items-end px-2">
          <View>
            <Text className="text-slate-900 text-xl font-semibold">Awake Time</Text>
            <Text className="text-slate-400 text-sm">Percentage of your day active</Text>
          </View>
          <Text className="text-emerald-600 text-3xl font-semibold">26%</Text>
        </View>

        <View className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-200">
          {categories.map((cat, i) => (
            <View key={i} className={i !== 0 ? "mt-6" : ""}>
              <View className="flex-row justify-between mb-3">
                <Text className="text-slate-400 text-xs font-semibold">{cat.label}</Text>
                <Text className="text-slate-900 text-xs font-bold">{cat.time}</Text>
              </View>
              <View className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <View
                  style={{ width: `${cat.value}%`, backgroundColor: cat.color }}
                  className="h-full rounded-full"
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
