import { Ionicons } from "@expo/vector-icons";
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
        stroke="#059669"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <Path
        d="M60 45 L 80 40 L 85 60"
        stroke="#059669"
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
    <SafeAreaView edges={["top"]} className="flex-1 bg-slate-50 px-8 pt-12">

      {/* Top Text Content */}
      <View className="mb-12">
        <Text className="text-emerald-600 text-sm font-bold mb-3">
          Now, let's start to focus.
        </Text>
        <Text className="text-slate-900 text-3xl font-bold mb-4 leading-tight">
          Get notified about your report.
        </Text>
        <Text className="text-slate-500 text-lg leading-7 font-medium">
          We'll also let you know when your protection starts and nudge you when
          your focus is low.
        </Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="w-full border border-slate-100 rounded-[3rem] p-10 items-center justify-center relative bg-white">
          <View className="bg-slate-50 w-full rounded-[24px] border border-slate-100 overflow-hidden">
            <View className="p-6 items-center">
              <View className="w-12 h-12 bg-emerald-100 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="notifications" size={24} color="#059669" />
              </View>
              <Text className="text-slate-900 font-bold text-lg text-center mb-2 leading-6">
                Zenith would like to send you notifications.
              </Text>
              <Text className="text-slate-500 text-sm text-center leading-5 font-medium">
                Notifications may include alerts, sounds, and icon badges. These
                can be configured in Settings.
              </Text>
            </View>

            {/* Alert Actions */}
            <View className="flex-row border-t border-slate-200 h-16">
              <Pressable
                onPress={handleRequestPermission}
                className="flex-1 items-center justify-center border-r border-slate-200 active:bg-slate-100"
              >
                <Text className="text-slate-400 text-lg font-bold">Don't Allow</Text>
              </Pressable>
              <Pressable
                onPress={handleRequestPermission}
                className="flex-1 items-center justify-center active:bg-slate-100"
              >
                <Text className="text-emerald-600 text-lg font-bold">
                  Allow
                </Text>
              </Pressable>
            </View>
          </View>

          <CurvedArrow />
        </View>
      </View>

      <View className="pb-12 pt-6">
        <Pressable
          onPress={handleRequestPermission}
          className="w-full py-6 rounded-[32px] bg-emerald-600 items-center justify-center"
        >
          <Text className="text-white text-xl font-bold">
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
