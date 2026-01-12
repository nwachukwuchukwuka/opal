import React from "react";
import { Text, View } from "react-native";

export const PageYearsPrediction = () => (
  <View className="items-center justify-center flex-1">
    <Text className="text-white text-md text-center mb-10">
      When you joined Opal, you were on track to spend...
    </Text>

    <View className="items-center mb-12">
      <Text className="text-zinc-700 text-5xl font-bold mb-2">22 years</Text>
      <Text className="text-green-300 text-7xl font-bold mb-2 shadow-lg">
        23 years
      </Text>
      <Text className="text-zinc-800 text-5xl font-bold">24 years</Text>
    </View>

    <Text className="text-white text-md text-center mb-20">
      ...looking down at your phone.
    </Text>

    <Text className="text-zinc-600 text-sm text-center w-2/3">
      *Based on your onboarding assessment of 5h daily Screen Time average.
    </Text>
  </View>
);
