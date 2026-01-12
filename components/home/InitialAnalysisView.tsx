import React from "react";
import { Pressable, Text, View } from "react-native";

interface InitialAnalysisViewProps {
  onPressMilestones: () => void;
}

export const InitialAnalysisView = ({
  onPressMilestones,
}: InitialAnalysisViewProps) => (
  <Pressable onPress={onPressMilestones} className="items-center py-8 px-5">
    {/* Glowing gem effect */}
    <View className="w-64 h-64 rounded-full items-center justify-center mb-6">
      <View
        className="absolute w-64 h-64 rounded-full"
        style={{
          backgroundColor: "rgba(251, 191, 36, 0.15)",
          shadowColor: "#fbbf24",
          shadowOpacity: 0.5,
          shadowRadius: 60,
        }}
      />
      <View
        className="absolute w-48 h-48 rounded-full"
        style={{
          backgroundColor: "rgba(52, 211, 153, 0.2)",
          shadowColor: "#34d399",
          shadowOpacity: 0.4,
          shadowRadius: 40,
        }}
      />
      <View
        className="absolute w-32 h-32 rounded-full"
        style={{
          backgroundColor: "rgba(147, 51, 234, 0.25)",
          shadowColor: "#9333ea",
          shadowOpacity: 0.5,
          shadowRadius: 30,
        }}
      />
      <View
        className="absolute w-20 h-20 rounded-full"
        style={{
          backgroundColor: "rgba(59, 130, 246, 0.3)",
          shadowColor: "#3b82f6",
          shadowOpacity: 0.6,
          shadowRadius: 20,
        }}
      />
    </View>
    <Text className="text-zinc-400 text-base mb-1">29:04 Left</Text>
    <Text className="text-white text-xl font-semibold mb-6">First Gem</Text>
    <View className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-6">
      <View
        className="h-full rounded-full"
        style={{ width: "35%", backgroundColor: "#22c55e" }}
      />
    </View>
    <Text className="text-zinc-400 text-center text-base leading-6 mb-6">
      Analyzing your Screen Time to compute{"\n"}your personal Focus Score
    </Text>
    <Pressable
      onPress={onPressMilestones}
      className="px-8 py-4 rounded-full border-2 border-white"
    >
      <Text className="text-white text-base font-semibold">
        See Next MileStones
      </Text>
    </Pressable>
  </Pressable>
);
