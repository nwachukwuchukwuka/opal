import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  StatusBar,
  Text,
  View,
} from "react-native";

export default function SubscriptionSuccessScreen() {
  useEffect(() => {
    // Auto-navigate after showing success
    const timer = setTimeout(() => {
      router.replace("/onboarding/focus-intro");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-black items-center justify-center px-8">
      <StatusBar barStyle="light-content" />

      {/* Success Icon */}
      <View className="w-20 h-20 rounded-full bg-blue-500 items-center justify-center mb-6">
        <Text className="text-white text-4xl">✓</Text>
      </View>

      {/* Success Text */}
      <Text className="text-white text-2xl font-bold text-center mb-2">
        You're all set.
      </Text>
      <Text className="text-zinc-500 text-base text-center">
        Your purchase was successful.
      </Text>
    </View>
  );
}

