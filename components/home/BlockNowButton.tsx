import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants";

interface BlockNowButtonProps {
  onPress: () => void;
}

export const BlockNowButton = ({ onPress }: BlockNowButtonProps) => (
  <View className="px-5 mb-4 pt-4 ">
    <Pressable
      onPress={onPress}
      className="w-full py-4 rounded-full flex-row items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#22c55e" }}
    >

      <Ionicons
        name="play"
        size={18}
        color={COLORS.black}
        style={{ marginRight: 8 }}
      />
      <Text className="text-black text-lg font-semibold">Block Now</Text>
    </Pressable>
  </View>
);
