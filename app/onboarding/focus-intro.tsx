import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function FocusIntroScreen() {
  const handleContinue = () => {
    // Navigate to sessions intro screens
    router.push("/onboarding/sessions");
  };

  return (
    <View className="flex-1 bg-black pt-14">
      <StatusBar barStyle="light-content" />

      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-white text-[28px] font-bold text-center leading-10">
          Now, let's look at how{"\n"}Opal can help you focus{"\n"}better and find your flow{"\n"}today.
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

