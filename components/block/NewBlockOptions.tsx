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
    className="bg-zinc-800 rounded-2xl flex-1 h-24 items-center justify-center gap-2"
  >
    <Ionicons name={icon} size={28} color="#a3e635" />
    <Text className="text-lime-300 font-semibold text-center text-xs">{label}</Text>
  </Pressable>
);

export const NewBlockOptions = () => (
  <View className="flex-row gap-3">
    <NewBlockOption icon="calendar-outline" label="Schedule Session" />
    <NewBlockOption icon="hourglass-outline" label="Set App Limit" />
    <NewBlockOption icon="lock-closed-outline" label="Set Lock" />
  </View>
);

export default NewBlockOptions;