import { Slot, usePathname } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";
import ProgressBar from "../../../components/ProgressBar";

const routes = [
  "/onboarding/(results)/news-intro",
  "/onboarding/(results)/bad-news",
  "/onboarding/(results)/good-news",
  "/onboarding/(results)/connect-intro",
];

export default function ResultsLayout() {
  const pathname = usePathname();
  
  // Determine current step based on pathname
  const getCurrentStep = () => {
    if (pathname.includes("news-intro")) return 1;
    if (pathname.includes("bad-news")) return 2;
    if (pathname.includes("good-news")) return 3;
    if (pathname.includes("connect-intro")) return 4;
    return 1;
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      
      {/* Fixed Progress Bar */}
      <View className="pt-14 pb-4">
        <ProgressBar currentStep={getCurrentStep()} totalSteps={4} />
      </View>

      {/* Screen Content */}
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  );
}

