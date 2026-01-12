import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants";

interface HomeHeaderProps {
  dateToDisplay: string;
  onDatePress: () => void;
}

export const HomeHeader = ({ dateToDisplay, onDatePress }: HomeHeaderProps) => {
  return (
    <View className="flex-row justify-between items-center px-5 pt-14 pb-4">
      <View className="flex-row items-center">
        <Text className="text-white text-3xl font-light mr-3">Opal</Text>
        <Pressable onPress={onDatePress} className="flex-row items-center">
          <Text className="text-zinc-400 text-base">{dateToDisplay}</Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={COLORS.zinc400}
            style={{ marginLeft: 4 }}
          />
        </Pressable>
      </View>
      <Pressable className="p-2 relative">
        <Ionicons name="share-outline" size={24} color={COLORS.white} />
        <View className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
      </Pressable>
    </View>
  );
};