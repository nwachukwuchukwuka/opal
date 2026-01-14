import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const benefits = [
  {
    id: 1,
    icon: "✅",
    text: "Reduce your Screen Time by 30% to 3h 30m each day",
  },
  {
    id: 2,
    icon: "✅",
    text: "Reduce work hour distraction to <20%",
  },
  {
    id: 3,
    icon: "✅",
    text: "Become 30% more focused than the average of your peers",
  },
  {
    id: 4,
    icon: "✅",
    text: "Develop habits to save 30d this year",
  },
];

export default function BenefitsScreen() {
  const handleContinue = () => {
    router.push("/onboarding/fist-bump");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      {/* Floating Emojis Background */}

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* Title */}
        <Text className="text-white text-2xl font-bold text-center mb-2">
          This week, based on your{"\n"}data, Opal can help you:
        </Text>

        {/* Benefits List */}
        <ScrollView className="flex-1 mt-8">
          {benefits.map((benefit) => (
            <View
              key={benefit.id}
              className="flex-row items-start  bg-black/50 rounded-xl p-4"
            >
              <View className="w-8 h-8 rounded-full bg-emerald-500/20 items-center justify-center mr-4">
                <Text className="text-emerald-400 text-sm">{benefit.icon}</Text>
              </View>
              <Text className="text-white text-base flex-1 leading-6">
                {benefit.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Continue Button */}
      <Pressable
        onPress={handleContinue}
        className="px-6 pb-20 items-center justify-center"
      >
        <Text className="text-5xl mb-8">👊</Text>
        <Text className="text-white text-xl font-bold text-center mb-4">
          Let's solidify it with a fist bump
        </Text>
        <Text className="text-zinc-500 text-base text-center">
          tap to continue
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
