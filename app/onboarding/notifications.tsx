import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const CurvedArrow = () => (
  <View className="absolute bottom-[-60] right-20">
    <Svg width="60" height="60" viewBox="0 0 100 100" fill="none">
      {/* Curved Line */}
      <Path
        d="M20 90 Q 60 90 80 40"
        stroke="#3b82f6"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <Path
        d="M60 45 L 80 40 L 85 60"
        stroke="#3b82f6"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  </View>
);

export default function NotificationsScreen() {
  const router = useRouter();
  const handleRequestPermission = () => {
    router.push("/onboarding/referral-source");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-black px-6 pt-10">
      {/* Top Text Content */}
      <View className="mb-12">
        <Text className="text-zinc-400 text-base font-medium mb-2">
          Now, let's start to focus.
        </Text>
        <Text className="text-white text-2xl font-bold mb-4 leading-tight">
          Get notified about your report.
        </Text>
        <Text className="text-zinc-500 text-lg leading-6">
          We'll also let you know when your protection starts and nudge you when
          your focus is low.
        </Text>
      </View>

      <View className="flex-1 items-center">
        <View className="w-full border-2 border-blue-600 rounded-[2.5rem] p-10 items-center justify-center relative">
          <View className="bg-[#252525] w-full rounded-2xl overflow-hidden">
            <View className="p-5 items-center">
              <Text className="text-white font-bold text-[17px] text-center mb-1">
                "Opal" Would Like to Send You Notifications
              </Text>
              <Text className="text-white/80 text-[13px] text-center leading-4">
                Notifications may include alerts, sounds, and icon badges. These
                can be configured in Settings.
              </Text>
            </View>

            {/* Alert Actions */}
            <View className="flex-row border-t border-white/15 h-11">
              <Pressable
                onPress={handleRequestPermission}
                className="flex-1 items-center justify-center border-r border-white/15 active:bg-white/10"
              >
                <Text className="text-[#0A84FF] text-[17px]">Don't Allow</Text>
              </Pressable>
              <Pressable
                onPress={handleRequestPermission}
                className="flex-1 items-center justify-center active:bg-white/10"
              >
                <Text className="text-[#0A84FF] text-[17px] font-semibold">
                  Allow
                </Text>
              </Pressable>
            </View>
          </View>

          <CurvedArrow />
        </View>
      </View>

      <Pressable
        className="absolute inset-0"
        onPress={handleRequestPermission}
        pointerEvents="box-none"
      />
    </SafeAreaView>
  );
}
