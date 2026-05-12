import { Slot, usePathname } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ResultsLayout() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50">
      <View className="flex-1">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
