import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function NotificationsScreen() {
  const handleAllow = () => {
    // Request notification permissions here
    router.push("/onboarding/referral-source");
  };

  const handleSkip = () => {
    router.push("/onboarding/referral-source");
  };

  return (
    <View className="flex-1 bg-black pt-14">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="px-6 mb-8">
        <Text className="text-zinc-500 text-sm mb-2">Now, let's start to focus.</Text>
        <Text className="text-white text-[28px] font-bold mb-3">
          Get notified about{"\n"}your report.
        </Text>
        <Text className="text-zinc-500 text-sm leading-5">
          We'll also let you know when your protection{"\n"}starts and nudge you when your focus is low.
        </Text>
      </View>

      {/* iOS Notification Dialog Mockup */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Phone frame with notification */}
        <View className="w-72 h-48 bg-zinc-800/60 rounded-2xl p-4 backdrop-blur-sm border border-zinc-700/50">
          {/* Dialog content */}
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-base font-semibold text-center mb-2">
              "Opal" Would Like to Send{"\n"}You Notifications
            </Text>
            <Text className="text-zinc-400 text-xs text-center mb-4 px-2">
              Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.
            </Text>

            {/* Dialog buttons */}
            <View className="flex-row border-t border-zinc-700 w-full mt-2">
              <Pressable className="flex-1 py-3 border-r border-zinc-700">
                <Text className="text-blue-500 text-base text-center">Don't Allow</Text>
              </Pressable>
              <Pressable className="flex-1 py-3">
                <Text className="text-blue-500 text-base font-semibold text-center">Allow</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Arrow pointing to Allow */}
        <View className="mt-4">
          <Text className="text-blue-500 text-4xl">↗</Text>
        </View>
      </View>

      {/* Allow Button */}
      <View className="px-6 pb-4">
        <Pressable
          onPress={handleAllow}
          className="w-full py-4 rounded-full bg-white active:bg-zinc-200"
        >
          <Text className="text-black text-center text-lg font-semibold">
            Allow Notifications
          </Text>
        </Pressable>
      </View>

      {/* Skip */}
      <View className="px-6 pb-10">
        <Pressable onPress={handleSkip} className="py-3">
          <Text className="text-zinc-500 text-center text-base">
            Skip
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

