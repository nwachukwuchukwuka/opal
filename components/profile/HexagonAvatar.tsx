import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

interface HexagonAvatarProps {
  color: string;
  size?: number;
}

export const HexagonAvatar = ({ color, size = 40 }: HexagonAvatarProps) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <MaterialCommunityIcons name="hexagon-outline" size={size} color={color} />
    <View
      style={{
        position: "absolute",
        width: size * 0.8,
        height: size * 0.8,
        backgroundColor: color,
        opacity: 0.1,
        borderRadius: size / 2,
      }}
    />
  </View>
);
