import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";

export default function BadNewsScreen() {
  const handleContinue = () => {
    router.push("/onboarding/(results)/good-news");
  };

  return (
    <View className="flex-1 bg-black">
      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Bad news text */}
        <Text className="text-zinc-400 text-base text-center mb-2">
          The bad news is that you'll spend{" "}
          <Text className="text-violet-400 font-semibold">114 days</Text>
          {" "}on your phone this year.
        </Text>
        
        <Text className="text-zinc-400 text-base text-center mb-6">
          Meaning that you're on track to spend
        </Text>

        {/* Big number */}
        <Text className="text-violet-400 text-7xl font-bold mb-4">
          22 years
        </Text>

        {/* Subtitle */}
        <Text className="text-zinc-400 text-base text-center leading-6">
          of your life looking down at your phone.{"\n"}Yep, you read this right.
        </Text>
      </View>

      {/* Footer text */}
      <View className="px-8 mb-4">
        <Text className="text-zinc-600 text-xs text-center">
          Projection of your current Screen Time habits, based on an average 80 years lifespan each day.
        </Text>
      </View>

      {/* Continue Button */}
      <View className="px-6 pb-10">
        <Pressable
          onPress={handleContinue}
          className="w-full py-4 rounded-full border border-zinc-700 bg-transparent active:bg-white/5"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

