import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StatusBar, Text, View } from "react-native";

const FocusModule = ({ icon, label, color }: any) => (
  <View className="bg-white rounded-[32px] p-5 flex-row items-center border border-slate-200 mb-4">
    <View className={`w-12 h-12 rounded-2xl items-center justify-center ${color} bg-opacity-10`}>
      <Ionicons name={icon} size={24} color={color.replace('bg-', '#').replace('600', '')} />
    </View>
    <View className="ml-4 flex-1">
      <Text className="text-slate-900 text-lg font-bold">{label}</Text>
      <View className="h-1.5 bg-slate-50 rounded-full mt-2 overflow-hidden">
        <View className="h-full bg-emerald-500 w-2/3 rounded-full" />
      </View>
    </View>
  </View>
);

const BentoHero = () => (
  <View className="w-full px-6 pt-3 pb-8">
    <View className="relative">
      {/* Decorative Aurora Glows */}
      <View className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl" />
      <View className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl" />

      {/* Hero Stack */}
      <View className="z-10">
        <View className="transform -rotate-2">
          <FocusModule icon="briefcase" label="Deep work" color="bg-emerald-600" />
        </View>
        <View className="transform rotate-1 -mt-2">
          <FocusModule icon="moon" label="Restful sleep" color="bg-blue-600" />
        </View>
        <View className="transform -rotate-1 -mt-2">
          <FocusModule icon="fitness" label="Mindful living" color="bg-indigo-600" />
        </View>
      </View>
    </View>
  </View>
);

export default function OnboardingScreen() {
  const handleGetStarted = () => {
    router.push("/onboarding/screen-time");
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-1">
        <View className="flex-1 px-8 pt-20">
          {/* Logo & Headline */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-white rounded-[28px] border border-slate-200 items-center justify-center mb-8">
              <View className="w-12 h-12 rounded-full border-4 border-emerald-600 items-center justify-center">
                <View className="w-4 h-4 rounded-full bg-emerald-600" />
              </View>
            </View>

            <Text className="text-emerald-600 text-sm font-bold mb-3">
              Focus is power
            </Text>
            <Text className="text-slate-900 text-4xl font-bold text-center leading-tight">
              Reclaim your time.
            </Text>
            <Text className="text-slate-500 text-lg font-medium text-center mt-4 px-4 leading-7">
              Starting today, let's focus better and accomplish your biggest dreams.
            </Text>
          </View>

          {/* Hero Visual */}
          <BentoHero />
        </View>

        {/* Footer Actions */}
        <View className="px-8 pb-16 pt-2">
          <View className="bg-white rounded-[48px] p-4 border border-slate-200">
            <Pressable
              onPress={handleGetStarted}
              className="w-full bg-emerald-600 py-6 rounded-[32px] items-center justify-center"
            >
              <Text className="text-white text-xl font-bold">
                Get started
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSignIn}
              className="py-6 items-center"
            >
              <Text className="text-slate-400 font-bold text-base">
                Already have an account? <Text className="text-emerald-600">Sign in</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
