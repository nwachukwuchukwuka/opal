import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface NewBlockOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}

const NewBlockOption = ({ icon, label, onPress }: NewBlockOptionProps) => (
  <View className="flex-1 gap-2">
    <Pressable
      onPress={onPress}
      className="bg-zinc-900 rounded-2xl h-20 items-center justify-center"
    >
      <Ionicons name={icon} size={28} color="#a3e635" />
    </Pressable>

    <Text className="text-zinc-400 font-medium text-xs text-center">
      {label}
    </Text>
  </View>
);

export const NewBlockOptions = () => (
  <View className="flex-row gap-3">
    <NewBlockOption icon="calendar-outline" label="Schedule Session" />
    <NewBlockOption icon="hourglass-outline" label="Set App Limit" />
    <NewBlockOption icon="lock-closed-outline" label="Set Lock" />
  </View>
);

export default NewBlockOptions;
