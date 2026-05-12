import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { FocusReportModal } from "./FocusReport/FocusReportModal";

export const FocusReportCard = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="bg-white border border-slate-200 rounded-[44px] p-7 mb-2">
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-slate-50 rounded-2xl items-center justify-center mr-4 border border-slate-200">
              <Ionicons name="stats-chart" size={22} color="#059669" />
            </View>
            <View>
              <Text className="text-slate-900 text-xl font-semibold">Focus Reports</Text>
              <Text className="text-slate-400 text-xs">Your progress summary</Text>
            </View>
          </View>
        </View>

        {/* Hero Preview Module */}
        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-emerald-50/50 rounded-[36px] p-6 border border-emerald-100 flex-row items-center justify-between mb-8"
        >
          <View className="flex-1">
            <View className="bg-white self-start px-3 py-1 rounded-full border border-emerald-100 mb-3">
              <Text className="text-emerald-600 text-[10px] font-bold">First Week</Text>
            </View>
            <Text className="text-emerald-950 text-2xl font-semibold mb-1">Report Ready</Text>
            <Text className="text-emerald-700/60 text-xs font-medium">View your daily insights</Text>
          </View>

          <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center border border-emerald-100">
            <Ionicons name="medal" size={32} color="#059669" />
          </View>
        </Pressable>

        {/* Insight Text */}
        <View className="px-2 mb-8">
          <Text className="text-slate-400 text-sm leading-6">
            Your daily average Screen Time is up{" "}
            <Text className="text-emerald-600 font-bold">10.1%</Text> since you installed Opal.
          </Text>
        </View>

        {/* Action Button */}
        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-emerald-600 rounded-[28px] py-5 items-center justify-center"
        >
          <Text className="text-white font-bold text-base">Open Report</Text>
        </Pressable>
      </View>

      <FocusReportModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};