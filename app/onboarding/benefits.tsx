import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
  ScrollView,
} from "react-native";

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

// Floating emoji component
const FloatingEmoji = ({ emoji, style }: { emoji: string; style: object }) => (
  <Text style={[{ position: "absolute", fontSize: 32 }, style]}>{emoji}</Text>
);

export default function BenefitsScreen() {
  const handleContinue = () => {
    router.push("/onboarding/fist-bump");
  };

  return (
    <View className="flex-1 bg-black pt-14">
      <StatusBar barStyle="light-content" />

      {/* Floating Emojis Background */}
      <View className="absolute inset-0 overflow-hidden">
        <FloatingEmoji emoji="👊" style={{ top: "10%", left: "10%" }} />
        <FloatingEmoji emoji="🎯" style={{ top: "15%", right: "15%" }} />
        <FloatingEmoji emoji="👊" style={{ top: "25%", left: "5%" }} />
        <FloatingEmoji emoji="🎯" style={{ top: "30%", right: "8%" }} />
        <FloatingEmoji emoji="👊" style={{ top: "45%", right: "20%" }} />
        <FloatingEmoji emoji="🎯" style={{ top: "55%", left: "12%" }} />
        <FloatingEmoji emoji="👊" style={{ top: "65%", right: "5%" }} />
        <FloatingEmoji emoji="🎯" style={{ top: "75%", left: "8%" }} />
      </View>

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
              className="flex-row items-start mb-6 bg-black/50 rounded-xl p-4"
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
      <View className="px-6 pb-10">
        <Pressable
          onPress={handleContinue}
          className="w-full py-4 rounded-full bg-violet-600 active:bg-violet-700"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

