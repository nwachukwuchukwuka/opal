import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface NewBlockOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}

const NewBlockOption = ({ icon, label, onPress }: NewBlockOptionProps) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center p-4 bg-white rounded-[24px] border border-slate-200"
  >
    <View className="w-12 h-12 bg-emerald-50 rounded-full items-center justify-center border border-emerald-100 mr-4">
      <Ionicons name={icon} size={22} color="#059669" />
    </View>
    <Text className="flex-1 text-slate-900 font-bold text-base">
      {label}
    </Text>
    <View className="w-8 h-8 bg-slate-50 rounded-full items-center justify-center">
      <Ionicons name="arrow-forward" size={16} color="#64748b" />
    </View>
  </Pressable>
);

export const NewBlockOptions = () => (
  <View className="gap-3">
    <NewBlockOption icon="calendar-outline" label="Schedule Session" />
    <NewBlockOption icon="hourglass-outline" label="Set App Limit" />
    <NewBlockOption icon="lock-closed-outline" label="Set Lock" />
  </View>
);

export default NewBlockOptions;