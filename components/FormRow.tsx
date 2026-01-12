import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface FormRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  valueColor?: string;
  onPress: () => void;
}

export const FormRow = ({
  icon,
  label,
  value,
  valueColor = "#fff",
  onPress,
}: FormRowProps) => (
  <Pressable
    onPress={onPress}
    className="flex-row items-center justify-between bg-zinc-800 rounded-xl px-4 py-3.5"
  >
    <View className="flex-row items-center">
      <Ionicons name={icon} size={22} color="#a1a1aa" />
      <Text className="text-white text-base ml-4">{label}</Text>
    </View>
    <View className="flex-row items-center">
      <Text className="text-base mr-2" style={{ color: valueColor }}>
        {value}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#71717a" />
    </View>
  </Pressable>
);
