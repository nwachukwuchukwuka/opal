import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function SuccessScreen() {
  const handleDone = () => {
    router.push("/create-account");
  };

  return (
    <View className="flex-1 bg-white pt-14">
      <StatusBar barStyle="dark-content" />

      {/* Content */}
      <View className="flex-1 items-center px-6 pt-16">
        {/* Success Icon */}
        <View className="w-20 h-20 rounded-full border-4 border-violet-600 items-center justify-center mb-8">
          <View className="w-14 h-14 rounded-full border-4 border-violet-600" />
        </View>

        {/* Title */}
        <Text className="text-black text-2xl font-bold text-center mb-4">
          "Opal" Approved to{"\n"}Access Screen Time
        </Text>

        {/* Description */}
        <Text className="text-zinc-600 text-base text-center leading-6">
          "Opal" has been approved by Joshua{"\n"}to access Screen Time on this iPhone.
        </Text>
      </View>

      {/* Done Button */}
      <View className="px-6 pb-10">
        <Pressable
          onPress={handleDone}
          className="w-full py-4 rounded-full bg-blue-500 active:bg-blue-600"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

