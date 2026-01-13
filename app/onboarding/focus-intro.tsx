import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  Text,
  View
} from "react-native";

export default function FocusIntroScreen() {
  const handleContinue = () => {
    // Navigate to sessions intro screens
    router.push("/onboarding/sessions");
  };

  return (
    <View className="flex-1 bg-black pt-14">
      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-white text-[20px] font-bold text-center leading-10">
          Now, let's look at how Opal can help you focus better and find your flow today.
        </Text>
      </View>

      {/* Continue Button */}
      <View className="px-6 pb-10">
        <Pressable
          onPress={handleContinue}
          className="w-full py-4 rounded-full bg-white active:bg-zinc-200"
        >
          <Text className="text-black text-center text-lg font-semibold">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

