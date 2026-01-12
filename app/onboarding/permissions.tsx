import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function PermissionsScreen() {
  const handleAllowWithPasscode = () => {
    // In a real app, this would trigger the iOS Screen Time permission
    // For now, navigate to success screen
    router.push("/onboarding/success");
  };

  const handleDontAllow = () => {
    // Skip permissions and go to home
    router.replace("/home");
  };

  return (
    <View className="flex-1 bg-white pt-14">
      <StatusBar barStyle="dark-content" />

      {/* Content */}
      <View className="flex-1 items-center px-6 pt-12">
        {/* Icon */}
        <View className="w-20 h-20 bg-violet-600 rounded-2xl items-center justify-center mb-6">
          <Text className="text-white text-3xl">⏳</Text>
        </View>

        {/* Title */}
        <Text className="text-black text-2xl font-bold text-center mb-4">
          Allow Access to{"\n"}Screen Time
        </Text>

        {/* Description */}
        <Text className="text-zinc-600 text-base text-center leading-6 mb-4">
          Providing "Opal" access to Screen Time allows it to see your activity data, restrict content, and limit the usage of apps and websites.
        </Text>

        <Text className="text-zinc-600 text-base text-center leading-6">
          You can control which apps access your own in Screen Time Options in Settings.
        </Text>

        {/* Learn more link */}
        <Pressable className="mt-4">
          <Text className="text-blue-500 text-base">Learn more...</Text>
        </Pressable>
      </View>

      {/* Buttons */}
      <View className="px-6 pb-10">
        <Pressable
          onPress={handleAllowWithPasscode}
          className="w-full py-4 rounded-full bg-blue-500 mb-3 active:bg-blue-600"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Allow with Passcode
          </Text>
        </Pressable>
        
        <Pressable
          onPress={handleDontAllow}
          className="w-full py-3"
        >
          <Text className="text-blue-500 text-center text-base">
            Don't Allow
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

