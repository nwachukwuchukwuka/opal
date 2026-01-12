import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { FocusReportModal } from "./FocusReport/FocusReportModal";

export const FocusReportCard = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="bg-zinc-900 rounded-3xl p-5 mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white text-lg font-bold">Focus Reports</Text>
        </View>
        <Text className="text-zinc-400 text-sm mb-4 leading-5">
          Your daily average Screen Time is up{" "}
          <Text className="text-red-400">10.1%</Text> since you installed Opal.
        </Text>

        <View className="bg-zinc-800 rounded-2xl w-40 h-48 p-4 items-center justify-center relative overflow-hidden">
          <View className="absolute inset-0 bg-teal-900/20" />
          <Text className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">
            Focus Report
          </Text>
          <Text className="text-white font-bold text-base mb-1">
            First Week
          </Text>
          <Text className="text-red-400 text-xs font-bold mb-4">
            ▲ 10.1% Increase
          </Text>
          <Ionicons name="medal-outline" size={60} color="#52525b" />

          {/* Open Button */}
          <Pressable
            onPress={() => setModalVisible(true)}
            className="absolute bottom-4 w-full bg-zinc-900/80 py-2 rounded-full items-center"
          >
            <Text className="text-white font-bold text-sm">Open</Text>
          </Pressable>
        </View>
      </View>

      {/* The Full Screen Modal */}
      <FocusReportModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};