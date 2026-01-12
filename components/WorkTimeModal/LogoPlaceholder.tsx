import React from "react";
import { Text, View } from "react-native";

export const LogoPlaceholder = () => (
  <View className="items-center justify-center">
    <View
      className="w-40 h-40 rounded-full border-4 border-zinc-600 items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      <View className="w-32 h-32 rounded-full border-2 border-zinc-500 items-center justify-center">
        <View className="w-16 h-16 rounded-full bg-zinc-800 border-4 border-zinc-400" />
      </View>
      <Text
        className="absolute text-zinc-400 text-[8px] tracking-widest"
        style={{ top: 20 }}
      >
        THE FOCUS COMPANY
      </Text>
      <Text
        className="absolute text-zinc-500 text-[6px] tracking-wider"
        style={{ bottom: 25 }}
      >
        SISTE PERTURBATIONIS
      </Text>
    </View>
  </View>
);