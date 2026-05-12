import { router } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, Text, View } from "react-native";

export default function FistBumpScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding/subscription");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-slate-50 items-center justify-center px-10">

      {/* Celebratory Bento Module */}
      <View className="w-full bg-white rounded-[40px] p-12 items-center border border-slate-100">
        <View className="w-32 h-32 bg-emerald-50 rounded-[48px] items-center justify-center mb-10 border border-emerald-100/50">
          <Text className="text-7xl">👊</Text>
        </View>

        <Text className="text-slate-900 text-3xl font-bold text-center mb-4 leading-tight">
          You're in.
        </Text>
        
        <Text className="text-slate-500 text-lg font-medium text-center leading-7 px-4">
          You just took the first step towards a more focused life.
        </Text>
      </View>

      <Text className="text-slate-400 font-bold text-sm mt-12">
        Preparing your experience...
      </Text>
    </View>
  );
}
