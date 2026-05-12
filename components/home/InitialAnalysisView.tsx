import React from "react";
import { Pressable, Text, View } from "react-native";

interface InitialAnalysisViewProps {
  onPressMilestones: () => void;
}

export const InitialAnalysisView = ({
  onPressMilestones,
}: InitialAnalysisViewProps) => (
  <View className="items-center py-12 px-6 bg-white rounded-[40px] border border-slate-200">
    {/* Glowing gem effect - Refined for light mode */}
    <View className="w-48 h-48 rounded-full items-center justify-center mb-8 relative">
      <View
        className="absolute w-48 h-48 rounded-full opacity-20"
        style={{
          backgroundColor: "#fbbf24",
        }}
      />
      <View
        className="absolute w-36 h-36 rounded-full opacity-30"
        style={{
          backgroundColor: "#34d399",
        }}
      />
      <View
        className="absolute w-24 h-24 rounded-full opacity-40"
        style={{
          backgroundColor: "#9333ea",
        }}
      />
      <View
        className="absolute w-12 h-12 rounded-full opacity-50"
        style={{
          backgroundColor: "#3b82f6",
        }}
      />
      <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center shadow-lg shadow-slate-200">
        <Text className="text-3xl">💎</Text>
      </View>
    </View>

    <Text className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">29:04 remaining</Text>
    <Text className="text-slate-900 text-3xl font-bold mb-6">Analyzing your focus</Text>
    
    <View className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-8">
      <View
        className="h-full rounded-full bg-emerald-500"
        style={{ width: "35%" }}
      />
    </View>

    <Text className="text-slate-500 text-center text-lg leading-7 font-medium mb-10 px-4">
      Zenith is currently analyzing your digital habits to compute your personal focus score.
    </Text>

    <Pressable
      onPress={onPressMilestones}
      className="w-full py-6 rounded-[32px] bg-emerald-600 items-center justify-center shadow-lg shadow-emerald-900/10"
    >
      <Text className="text-white text-xl font-bold">
        See next milestones
      </Text>
    </Pressable>
  </View>
);
