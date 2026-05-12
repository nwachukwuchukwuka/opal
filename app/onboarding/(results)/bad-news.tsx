import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function BadNewsScreen() {
  const handleContinue = () => {
    router.push("/onboarding/(results)/good-news");
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />

      {/* Content */}
      <View className="flex-1 items-center justify-center px-10">
        <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-10 border border-emerald-100/50">
          <Ionicons name="time-outline" size={32} color="#059669" />
        </View>

        {/* Bad news text */}
        <Text className="text-slate-500 text-lg text-center mb-2 font-medium">
          The bad news is that you'll spend
          <Text className="text-emerald-600 font-bold"> 114 days </Text>
          on your phone this year.   Meaning that you're on track to spend
        </Text>


        {/* Big number */}
        <Text className="text-emerald-600 text-[50px] font-bold mb-4">
          22 years
        </Text>

        {/* Subtitle */}
        <Text className="text-slate-900 text-xl font-bold text-center leading-7">
          of your life looking down at your phone. Yep, you read this right.
        </Text>
      </View>

      {/* Footer text */}
      <View className="px-10 mb-8">
        <Text className="text-slate-400 text-xs text-center font-medium leading-5">
          Projection of your current Screen Time habits, based on an average 80 years lifespan.
        </Text>
      </View>

      {/* Continue Action Zone */}
      <View className="px-8 pb-12">
        <Pressable
          onPress={handleContinue}
          className="w-full py-6 rounded-[32px] bg-[#059669] items-center justify-center"
        >
          <Text className="text-white text-xl font-bold">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

