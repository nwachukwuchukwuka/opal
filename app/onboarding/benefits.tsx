import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const benefits = [
  {
    id: 1,
    icon: "checkmark-circle",
    text: "Reduce your screen time by 30% to 3h 30m each day",
  },
  {
    id: 2,
    icon: "checkmark-circle",
    text: "Reduce work hour distraction to less than 20%",
  },
  {
    id: 3,
    icon: "checkmark-circle",
    text: "Become 30% more focused than the average of your peers",
  },
  {
    id: 4,
    icon: "checkmark-circle",
    text: "Develop habits to save 30 days this year",
  },
];

export default function BenefitsScreen() {
  const handleContinue = () => {
    router.push("/onboarding/fist-bump");
  };

  return (
    <View className="flex-1 bg-slate-50">
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* Content */}
        <View className="flex-1 px-8 pt-12">
          {/* Header Section */}
          <View className="mb-12">
            <Text className="text-emerald-600 text-sm font-bold mb-3 text-center uppercase">Insights</Text>
            <Text className="text-slate-900 text-3xl font-bold text-center leading-tight">
              Based on your data, Zenith can help you:
            </Text>
          </View>

          {/* Benefits List Bento */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="gap-4">
              {benefits.map((benefit) => (
                <View
                  key={benefit.id}
                  className="flex-row items-center bg-white rounded-[28px] p-6 border border-slate-100"
                >
                  <View className="w-12 h-12 rounded-2xl bg-emerald-50 items-center justify-center mr-5 border border-emerald-100/50">
                    <Ionicons name="checkmark-circle" size={24} color="#059669" />
                  </View>
                  <Text className="text-slate-900 text-lg font-bold flex-1 leading-6">
                    {benefit.text}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Action Zone: Fist Bump Bento */}
        <View className="px-8 pb-12 pt-6">
          <Pressable
            onPress={handleContinue}
            className="w-full bg-white rounded-[40px] p-8 border border-slate-100 items-center active:scale-[0.98] transition-transform"
          >
            <View className="w-20 h-20 bg-emerald-50 rounded-[32px] items-center justify-center mb-6 border border-emerald-100/50">
              <Text className="text-5xl">👊</Text>
            </View>
            <Text className="text-slate-900 text-xl font-bold text-center mb-2">
              Solidify it with a fist bump
            </Text>
            <Text className="text-slate-400 text-sm font-bold uppercase">
              Tap to continue
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
