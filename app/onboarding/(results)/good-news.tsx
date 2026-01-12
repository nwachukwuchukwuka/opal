import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";

export default function GoodNewsScreen() {
  const handleContinue = () => {
    router.push("/onboarding/(results)/connect-intro");
  };

  return (
    <View className="flex-1 bg-black">
      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Good news text */}
        <Text className="text-zinc-400 text-base text-center mb-6">
          The good news is that Opal can help you{"\n"}get back
        </Text>

        {/* Big number */}
        <Text className="text-violet-400 text-7xl font-bold mb-4">
          6 years+
        </Text>

        {/* Subtitle */}
        <Text className="text-zinc-400 text-base text-center leading-6">
          of your life free from distractions, and{"\n"}help you achieve your dreams.
        </Text>
      </View>

      {/* Footer text */}
      <View className="px-8 mb-4">
        <Text className="text-zinc-600 text-xs text-center">
          According to an in-product estimate with Opal program.
        </Text>
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

