import { Slot, usePathname } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../../../components/ProgressBar";

const routes = [
  "/onboarding/(results)/news-intro",
  "/onboarding/(results)/bad-news",
  "/onboarding/(results)/good-news",
  "/onboarding/(results)/connect-intro",
];

export default function ResultsLayout() {
  const pathname = usePathname();

  const getCurrentStep = () => {
    if (pathname.includes("news-intro")) return 1;
    if (pathname.includes("bad-news")) return 2;
    if (pathname.includes("good-news")) return 3;
    if (pathname.includes("connect-intro")) return 4;
    return 1;
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      {/* Fixed Progress Bar */}
      <View className=" pb-4">
        <ProgressBar currentStep={getCurrentStep()} totalSteps={4} />
      </View>

      <View className="flex-1">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
