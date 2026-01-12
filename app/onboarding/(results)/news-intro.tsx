import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";

export default function NewsIntroScreen() {
  const handleContinue = () => {
    router.push("/onboarding/(results)/bad-news");
  };

  return (
    <View className="flex-1 bg-black">
      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-white text-2xl font-medium text-center leading-9">
          Some not-so-good news,{"\n"}and some great news.
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

